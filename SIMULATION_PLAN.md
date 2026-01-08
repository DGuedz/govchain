# GovChain Simulation Walkthrough Plan

This document outlines the step-by-step procedure to manually test the complete user journey of the GovChain platform, ensuring all roles and flows are functional.

## 1. Landing Page & Onboarding
- **URL:** `http://localhost:3000/`
- **Action:** Click the "Associe-se Agora" button.
- **Expected Result:** Redirect to `/kyc`.

## 2. KYC Registration (Garimpeiro - Tier 3)
- **URL:** `http://localhost:3000/kyc`
- **Action:** 
    1. Select the "Garimpeiro" tab.
    2. Connect Wallet (if not connected).
    3. Fill in Name ("João Garimpeiro"), CPF ("123.456.789-00"), and Phone.
    4. Click "Confirmar Identidade Gov.br".
- **Expected Result:** 
    - Toast success message.
    - Redirect to `/governance`.

## 3. Governance Dashboard (Garimpeiro View)
- **URL:** `http://localhost:3000/governance`
- **Verification:**
    - Check if the "Garimpeiro (Tier 3)" badge is visible.
    - Verify the presence of the "Registrar Descoberta" card.
- **Action:** Click "Acessar Painel do Garimpeiro".
- **Expected Result:** Redirect to `/garimpeiro/dashboard`.

## 4. Garimpeiro Dashboard (Discovery Registration)
- **URL:** `http://localhost:3000/garimpeiro/dashboard`
- **Action:**
    1. Enter "Peso Aproximado" (e.g., 5.5).
    2. Select "Outra origem (Sem rastreio)" if no batches exist.
    3. Click "Registrar Pedra".
- **Expected Result:**
    - Toast success message.
    - The new find appears in "Minhas Descobertas" list with status "Em Análise".

## 5. Miner Flow (Tier 2 Simulation)
*To test this, you must switch wallets or reset the profile role in Supabase.*
- **Action (DB):** Update `profiles.role` to `'miner'` for the current wallet.
- **URL:** `http://localhost:3000/governance`
- **Verification:** Check for "Minerador (Tier 2)" badge and "Produção Mineral" card.
- **Action:** Click "Acessar Painel do Minerador".
- **URL:** `http://localhost:3000/miner/dashboard`
- **Action:** Register a new batch (Buyer Wallet: use your own for test, Weight: 1000kg).
- **Expected Result:** Batch appears in history.

## 6. Council Flow (Tier 1 Simulation)
*To test this, you must switch wallets or reset the profile role in Supabase.*
- **Action (DB):** Update `profiles.role` to `'council'` for the current wallet.
- **URL:** `http://localhost:3000/governance`
- **Verification:** Check for "Conselho Deliberativo" badge and "Validação Técnica" card.
- **Action:** Click "Acessar Mesa de Classificação".
- **URL:** `http://localhost:3000/council/validation`
- **Action:** Locate the pending discovery from Step 4 and click "Certificar".
- **Expected Result:** Status updates to "Certificada".

---
**Note:** Ensure `npm run dev` is running before starting the simulation.
