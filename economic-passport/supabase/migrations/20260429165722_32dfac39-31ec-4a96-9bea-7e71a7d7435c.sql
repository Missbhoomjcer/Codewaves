
-- Profiles table for app users
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles
  for update using (auth.uid() = id);
create policy "Users insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Auto-create profile trigger
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Lender queries (real persistence)
create table public.lender_queries (
  id uuid primary key default gen_random_uuid(),
  lender_id uuid references auth.users(id) on delete cascade,
  passport_did text not null,
  query_type text not null default 'verify',
  result jsonb,
  created_at timestamptz not null default now()
);

alter table public.lender_queries enable row level security;

create policy "Lenders view own queries" on public.lender_queries
  for select using (auth.uid() = lender_id);
create policy "Lenders insert own queries" on public.lender_queries
  for insert with check (auth.uid() = lender_id);

-- API keys
create table public.api_keys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  key_prefix text not null,
  created_at timestamptz not null default now()
);

alter table public.api_keys enable row level security;

create policy "Users view own keys" on public.api_keys
  for select using (auth.uid() = user_id);
create policy "Users create own keys" on public.api_keys
  for insert with check (auth.uid() = user_id);
create policy "Users delete own keys" on public.api_keys
  for delete using (auth.uid() = user_id);
