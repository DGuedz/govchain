-- Create profiles table to extend auth.users
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  wallet_address text,
  full_name text,
  role text check (role in ('admin', 'council', 'member')) default 'member',
  created_at timestamptz default now()
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Create proposals table (Pautas de Votação)
create table if not exists public.proposals (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  created_by uuid references public.profiles(id),
  status text check (status in ('active', 'closed', 'passed', 'rejected')) default 'active',
  expires_at timestamptz,
  created_at timestamptz default now()
);

-- Enable RLS for proposals
alter table public.proposals enable row level security;

create policy "Proposals are viewable by everyone."
  on proposals for select
  using ( true );

create policy "Only admins can create proposals."
  on proposals for insert
  with check ( 
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Create votes table
create table if not exists public.votes (
  id uuid default gen_random_uuid() primary key,
  proposal_id uuid references public.proposals(id) on delete cascade,
  user_id uuid references public.profiles(id),
  choice text check (choice in ('yes', 'no', 'abstain')),
  created_at timestamptz default now(),
  unique(proposal_id, user_id)
);

-- Enable RLS for votes
alter table public.votes enable row level security;

create policy "Votes are viewable by everyone."
  on votes for select
  using ( true );

create policy "Members can vote."
  on votes for insert
  with check ( auth.uid() = user_id );

-- Function to handle new user signup (Trigger)
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, role, wallet_address)
  values (new.id, 'member', new.raw_user_meta_data->>'wallet_address');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Initial Seed (Optional - Insert if you want to test manually via SQL Editor)
-- insert into public.proposals (title, description, status) values 
-- ('Aprovação do Balanço 2025', 'Votação para aprovar as contas do exercício de 2025.', 'active');
