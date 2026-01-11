
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Hybrid Storage Manager
 * 
 * Strategy:
 * 1. Read: Fetch from Supabase AND LocalStorage. Merge results (prioritizing Local changes).
 * 2. Write: Always write to LocalStorage (Instant UI). Try Supabase in background (Best Effort).
 * 3. Fallback: If Supabase quota exceeded (error 507/402), rely purely on LocalStorage.
 */

const IS_HYBRID_MODE = true; // Force Hybrid Mode for now
const LS_PREFIX = "govchain_db_";

// Helper to generate UUIDs locally if needed
function generateUUID() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const hybridStorage = {
    
    // Generic Read
    async from(table: string) {
        return {
            select: (columns: string = '*') => {
                return {
                    eq: (column: string, value: any) => {
                        return {
                            order: (col: string, { ascending }: { ascending: boolean } = { ascending: true }) => {
                                return hybridStorage.executeSelect(table, column, value, col, ascending);
                            },
                            single: () => hybridStorage.executeSelect(table, column, value, undefined, undefined, true)
                        };
                    },
                    order: (col: string, { ascending }: { ascending: boolean } = { ascending: true }) => {
                        return hybridStorage.executeSelect(table, undefined, undefined, col, ascending);
                    }
                }
            },
            insert: (data: any) => hybridStorage.executeInsert(table, data),
            upsert: (data: any, { onConflict }: { onConflict: string }) => hybridStorage.executeUpsert(table, data, onConflict),
            update: (data: any) => {
                return {
                    eq: (column: string, value: any) => hybridStorage.executeUpdate(table, data, column, value)
                }
            }
        }
    },

    // Execution Logic
    async executeSelect(table: string, eqCol?: string, eqVal?: any, orderCol?: string, ascending?: boolean, single?: boolean) {
        let supabaseData: any[] = [];
        let supabaseError = null;

        // 1. Try Supabase
        if (isSupabaseConfigured()) {
            try {
                let query = supabase.from(table).select('*');
                
                // Apply filters dynamically if query is filterable
                if (eqCol && eqVal) {
                    // @ts-ignore
                    query = query.eq(eqCol, eqVal);
                }
                if (orderCol) {
                    // @ts-ignore
                    query = query.order(orderCol, { ascending });
                }
                if (single) {
                    // @ts-ignore
                    query = query.single();
                }

                const { data, error } = await query;
                if (error) {
                    supabaseError = error;
                    // Don't throw yet, check local
                } else if (data) {
                    supabaseData = Array.isArray(data) ? data : [data];
                }
            } catch (err) {
                console.warn(`[HybridStorage] Supabase fetch failed for ${table}`, err);
            }
        }

        // 2. Read LocalStorage
        const localData = hybridStorage.readLocal(table);
        let localFiltered = localData;

        // Apply local filters to match query
        if (eqCol && eqVal) {
            localFiltered = localFiltered.filter((item: any) => item[eqCol] === eqVal);
        }

        // 3. Merge Strategies
        // We create a map by ID to merge. Local wins if ID matches (optimistic update assumption), 
        // OR we can assume Supabase is authority. 
        // Given "Supabase Full" mode, Local might have items that Supabase doesn't.
        // We'll treat Local as "Newer/Unsynced" and Supabase as "Base".
        
        const mergedMap = new Map();

        // Add Supabase data first
        supabaseData.forEach(item => {
            const key = item.id || JSON.stringify(item); // Fallback key
            mergedMap.set(key, item);
        });

        // Overlay Local data (this preserves local-only items and updates)
        localFiltered.forEach((item: any) => {
            const key = item.id || JSON.stringify(item);
            mergedMap.set(key, item);
        });

        let result = Array.from(mergedMap.values());

        // Apply ordering to merged result
        if (orderCol) {
            result.sort((a: any, b: any) => {
                const valA = a[orderCol];
                const valB = b[orderCol];
                if (valA < valB) return ascending ? -1 : 1;
                if (valA > valB) return ascending ? 1 : -1;
                return 0;
            });
        }

        if (single) {
            // If strictly single and we found multiple after merge?
            // Usually .single() implies 1 result.
            const item = result.length > 0 ? result[0] : null;
            return { data: item, error: (!item && supabaseError) ? supabaseError : null };
        }

        return { data: result, error: null };
    },

    async executeInsert(table: string, data: any) {
        // Ensure ID exists for local storage tracking
        const dataWithId = Array.isArray(data) 
            ? data.map(d => ({ id: generateUUID(), ...d })) 
            : { id: generateUUID(), ...data };

        // 1. Write Local (Instant)
        hybridStorage.writeLocal(table, dataWithId);

        // 2. Try Write Supabase (Best Effort)
        if (isSupabaseConfigured()) {
            try {
                // We try to insert the original data. 
                // If Supabase generates IDs, we might have a conflict or mismatch.
                // Ideally we send the UUID we generated to Supabase if the column allows it.
                // If Supabase table uses `default gen_random_uuid()`, sending an ID usually overrides it, which is good.
                const { error } = await supabase.from(table).insert(dataWithId);
                
                if (error) {
                    console.warn(`[HybridStorage] Supabase insert failed for ${table}:`, error.message);
                    // We don't throw, we rely on local
                }
                return { error: null, data: dataWithId }; 
            } catch (err) {
                return { error: null, data: dataWithId };
            }
        }
        return { error: null, data: dataWithId };
    },

    async executeUpsert(table: string, data: any, onConflict: string) {
        // 1. Write Local
        hybridStorage.writeLocal(table, data, onConflict);

        // 2. Try Supabase
        if (isSupabaseConfigured()) {
            try {
                const { error } = await supabase.from(table).upsert(data, { onConflict });
                if (error) console.warn(`[HybridStorage] Supabase upsert failed:`, error.message);
                return { error: null };
            } catch (err) {
                return { error: null };
            }
        }
        return { error: null };
    },

    async executeUpdate(table: string, data: any, eqCol: string, eqVal: any) {
        // 1. Update Local
        hybridStorage.updateLocal(table, data, eqCol, eqVal);

        // 2. Try Supabase
        if (isSupabaseConfigured()) {
            try {
                const { error } = await supabase.from(table).update(data).eq(eqCol, eqVal);
                if (error) console.warn(`[HybridStorage] Supabase update failed:`, error.message);
                return { error: null };
            } catch (err) {
                return { error: null };
            }
        }
        return { error: null };
    },

    // Helpers
    readLocal(table: string) {
        if (typeof window === 'undefined') return [];
        const raw = localStorage.getItem(`${LS_PREFIX}${table}`);
        return raw ? JSON.parse(raw) : [];
    },

    writeLocal(table: string, data: any, uniqueKey: string = 'id') {
        if (typeof window === 'undefined') return;
        
        const current = hybridStorage.readLocal(table);
        const newItems = Array.isArray(data) ? data : [data];
        
        let updated = [...current];

        newItems.forEach(newItem => {
            if (uniqueKey && newItem[uniqueKey]) {
                const index = updated.findIndex(item => item[uniqueKey] === newItem[uniqueKey]);
                if (index >= 0) {
                    updated[index] = { ...updated[index], ...newItem };
                } else {
                    updated.push(newItem);
                }
            } else {
                // If no unique key, just append? Risk of duplicates.
                // Try to find exact match?
                updated.push(newItem);
            }
        });

        localStorage.setItem(`${LS_PREFIX}${table}`, JSON.stringify(updated));
    },

    updateLocal(table: string, data: any, eqCol: string, eqVal: any) {
        if (typeof window === 'undefined') return;
        
        const current = hybridStorage.readLocal(table);
        const updated = current.map((item: any) => {
            if (item[eqCol] === eqVal) {
                return { ...item, ...data };
            }
            return item;
        });

        localStorage.setItem(`${LS_PREFIX}${table}`, JSON.stringify(updated));
    },

    syncToLocal(table: string, data: any) {
        if (typeof window === 'undefined') return;
        // Merge Supabase data into Local, preferring Supabase as authority for those specific items?
        // Actually, if we just fetched from Supabase, we should update our local cache.
        hybridStorage.writeLocal(table, data, 'id');
    }
};

