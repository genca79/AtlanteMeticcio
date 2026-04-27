create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.community_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid,
  owner_email text default '',
  name text not null,
  role text default '',
  bio text default '',
  desire text default '',
  offers text default '',
  needs text default '',
  talents text default '',
  tags text default '',
  availability text default 'Media',
  closeness integer default 50 check (closeness >= 0 and closeness <= 100),
  collage jsonb not null default '{"head":"shell","body":"sea","element":"air","companion":"tube","transforms":{"element":{"x":0,"y":0,"scale":1,"rotation":0,"visible":true},"body":{"x":0,"y":0,"scale":1,"rotation":0,"visible":true},"head":{"x":0,"y":0,"scale":1,"rotation":0,"visible":true},"companion":{"x":0,"y":0,"scale":1,"rotation":0,"visible":true}},"fragments":[],"customImage":null}'::jsonb,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.community_profiles
  add column if not exists owner_id uuid;

alter table public.community_profiles
  add column if not exists owner_email text default '';

alter table public.community_profiles
  add column if not exists is_visible boolean not null default true;

alter table public.community_profiles
  add column if not exists created_at timestamptz not null default now();

alter table public.community_profiles
  alter column collage set default '{"head":"shell","body":"sea","element":"air","companion":"tube","transforms":{"element":{"x":0,"y":0,"scale":1,"rotation":0,"visible":true},"body":{"x":0,"y":0,"scale":1,"rotation":0,"visible":true},"head":{"x":0,"y":0,"scale":1,"rotation":0,"visible":true},"companion":{"x":0,"y":0,"scale":1,"rotation":0,"visible":true}},"fragments":[],"customImage":null}'::jsonb;

alter table public.admin_users enable row level security;
alter table public.community_profiles enable row level security;

drop policy if exists "admin_users_read_self" on public.admin_users;
create policy "admin_users_read_self"
on public.admin_users
for select
to authenticated
using (email = (auth.jwt() ->> 'email'));

drop policy if exists "community_profiles_read_authenticated" on public.community_profiles;
drop policy if exists "community_profiles_write_authenticated" on public.community_profiles;
drop policy if exists "community_profiles_insert_own" on public.community_profiles;
drop policy if exists "community_profiles_update_own" on public.community_profiles;
drop policy if exists "community_profiles_delete_own" on public.community_profiles;
drop policy if exists "community_profiles_public_read_visible" on public.community_profiles;
drop policy if exists "community_profiles_admin_read_all" on public.community_profiles;
drop policy if exists "community_profiles_public_insert" on public.community_profiles;
drop policy if exists "community_profiles_admin_update" on public.community_profiles;
drop policy if exists "community_profiles_admin_delete" on public.community_profiles;
drop policy if exists "community_profiles_public_update" on public.community_profiles;
drop policy if exists "community_profiles_public_delete" on public.community_profiles;

create policy "community_profiles_public_read_visible"
on public.community_profiles
for select
to anon, authenticated
using (is_visible = true);

create policy "community_profiles_public_insert"
on public.community_profiles
for insert
to anon, authenticated
with check (is_visible = true);

create policy "community_profiles_public_update"
on public.community_profiles
for update
to anon, authenticated
using (true)
with check (true);

create policy "community_profiles_public_delete"
on public.community_profiles
for delete
to anon, authenticated
using (true);

-- Versione sperimentale con codice laboratorio in config.js.
-- Chi conosce il codice puo creare, modificare, nascondere e cancellare profili dall'interfaccia.
