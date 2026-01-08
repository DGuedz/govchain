-- Create documents table
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  file_url text not null,
  file_hash text not null,
  eas_uid text,
  signer_wallet text,
  status text check (status in ('pending', 'signed_govbr', 'attested_onchain')),
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table documents enable row level security;

-- Create policy to allow all actions for public (MVP mode)
-- In production, this should be restricted to authenticated users
create policy "Allow public access for MVP"
  on documents
  for all
  using (true)
  with check (true);

-- Create Storage Bucket 'atas-govchain' if it doesn't exist
-- Note: Buckets are usually created via UI, but this is for reference
insert into storage.buckets (id, name, public)
values ('atas-govchain', 'atas-govchain', true)
on conflict (id) do nothing;

-- Storage Policy to allow public uploads
create policy "Allow public uploads"
  on storage.objects
  for insert
  with check ( bucket_id = 'atas-govchain' );

-- Storage Policy to allow public reads
create policy "Allow public reads"
  on storage.objects
  for select
  using ( bucket_id = 'atas-govchain' );
