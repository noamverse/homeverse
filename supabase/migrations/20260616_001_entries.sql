-- HOME entries table
-- Apply via: Supabase Dashboard → SQL Editor → run this file
-- Or via Supabase CLI: supabase db push

create table if not exists entries (
  id             uuid        primary key default gen_random_uuid(),
  created_at     timestamptz not null    default now(),
  room           text        not null,
  name           text,
  email          text,
  city           text,
  market         text,
  answers        jsonb       not null    default '{}',
  classification jsonb       not null    default '{}',
  routing        text[]      not null    default '{}',
  priority       text        not null    default 'normal',
  status         text        not null    default 'new',
  source         text,
  metadata       jsonb       not null    default '{}',

  constraint entries_room_check
    check (room in ('belong','build','bring','seed','partner'))
);

-- Row Level Security: enabled with NO anon/public policies.
-- The anon/public key cannot read or write this table.
-- All access is server-side via the service-role key (which bypasses RLS).
alter table entries enable row level security;
