create extension if not exists postgis;

create type public.user_status as enum ('active','suspended','deleted');
create type public.provider_status as enum ('pending','active','suspended');
create type public.property_type as enum ('house','apartment','pg','hostel','co_living','other');
create type public.inventory_type as enum ('unit','room','bed');
create type public.inventory_status as enum ('available','occupied','inactive');
create type public.listing_status as enum ('draft','review','published','paused','expired','archived');
create type public.verification_state as enum ('pending','in_review','verified','failed','expired','revoked');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(trim(display_name)) between 1 and 120),
  avatar_url text,
  status public.user_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.providers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  provider_type text not null check (char_length(trim(provider_type)) between 1 and 50),
  verification_state public.verification_state not null default 'pending',
  status public.provider_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index providers_user_id_idx on public.providers(user_id);

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 160),
  property_type public.property_type not null,
  description text not null default '' check (char_length(description) <= 10000),
  address_line1 text not null check (char_length(trim(address_line1)) between 1 and 240),
  address_line2 text,
  locality text not null check (char_length(trim(locality)) between 1 and 120),
  city text not null check (char_length(trim(city)) between 1 and 120),
  state text not null check (char_length(trim(state)) between 1 and 120),
  postal_code text not null check (char_length(trim(postal_code)) between 1 and 20),
  country_code char(2) not null default 'IN',
  location extensions.geography(Point,4326),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index properties_provider_id_idx on public.properties(provider_id);
create index properties_location_gist_idx on public.properties using gist(location);

create table public.inventory (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  inventory_type public.inventory_type not null,
  parent_inventory_id uuid references public.inventory(id) on delete cascade,
  label text not null check (char_length(trim(label)) between 1 and 120),
  occupancy_capacity integer not null default 1 check (occupancy_capacity between 1 and 100),
  furnishing text,
  status public.inventory_status not null default 'available',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index inventory_property_id_idx on public.inventory(property_id);
create index inventory_parent_id_idx on public.inventory(parent_inventory_id);

create table public.listings (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  inventory_id uuid not null references public.inventory(id) on delete restrict,
  title text not null check (char_length(trim(title)) between 10 and 160),
  description text not null check (char_length(description) between 20 and 10000),
  monthly_rent numeric(12,2) not null check (monthly_rent >= 0),
  deposit numeric(12,2) not null default 0 check (deposit >= 0),
  status public.listing_status not null default 'draft',
  available_from date,
  published_at timestamptz,
  last_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint listing_dates_valid check (available_from is null or available_from >= date '2000-01-01')
);
create index listings_provider_id_idx on public.listings(provider_id);
create index listings_property_id_idx on public.listings(property_id);
create index listings_inventory_id_idx on public.listings(inventory_id);
create index listings_status_published_idx on public.listings(status, published_at desc);

create table public.listing_media (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  object_key text not null check (char_length(trim(object_key)) between 1 and 500),
  media_type text not null check (media_type in ('image','video')), 
  sort_order integer not null default 0 check (sort_order >= 0),
  moderation_state text not null default 'pending' check (moderation_state in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);
create index listing_media_listing_id_idx on public.listing_media(listing_id, sort_order);

alter table public.profiles enable row level security;
alter table public.providers enable row level security;
alter table public.properties enable row level security;
alter table public.inventory enable row level security;
alter table public.listings enable row level security;
alter table public.listing_media enable row level security;

revoke all on table public.profiles, public.providers, public.properties, public.inventory, public.listings, public.listing_media from anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.providers to authenticated;
grant select, insert, update, delete on public.properties, public.inventory, public.listing_media to authenticated;
grant select, insert, update, delete on public.listings to authenticated;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select to authenticated using ((select auth.uid()) = id);
drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy providers_select_own on public.providers for select to authenticated using ((select auth.uid()) = user_id);
create policy providers_insert_own on public.providers for insert to authenticated with check ((select auth.uid()) = user_id);
create policy providers_update_own on public.providers for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy properties_select_owner on public.properties for select to authenticated using (exists (select 1 from public.providers p where p.id = provider_id and p.user_id = (select auth.uid())));
create policy properties_insert_owner on public.properties for insert to authenticated with check (exists (select 1 from public.providers p where p.id = provider_id and p.user_id = (select auth.uid())));
create policy properties_update_owner on public.properties for update to authenticated using (exists (select 1 from public.providers p where p.id = provider_id and p.user_id = (select auth.uid()))) with check (exists (select 1 from public.providers p where p.id = provider_id and p.user_id = (select auth.uid())));
create policy properties_delete_owner on public.properties for delete to authenticated using (exists (select 1 from public.providers p where p.id = provider_id and p.user_id = (select auth.uid())));

create policy inventory_select_owner on public.inventory for select to authenticated using (exists (select 1 from public.properties x join public.providers p on p.id = x.provider_id where x.id = property_id and p.user_id = (select auth.uid())));
create policy inventory_insert_owner on public.inventory for insert to authenticated with check (exists (select 1 from public.properties x join public.providers p on p.id = x.provider_id where x.id = property_id and p.user_id = (select auth.uid())));
create policy inventory_update_owner on public.inventory for update to authenticated using (exists (select 1 from public.properties x join public.providers p on p.id = x.provider_id where x.id = property_id and p.user_id = (select auth.uid()))) with check (exists (select 1 from public.properties x join public.providers p on p.id = x.provider_id where x.id = property_id and p.user_id = (select auth.uid())));
create policy inventory_delete_owner on public.inventory for delete to authenticated using (exists (select 1 from public.properties x join public.providers p on p.id = x.provider_id where x.id = property_id and p.user_id = (select auth.uid())));

create policy listings_select_published on public.listings for select to authenticated using (status = 'published' or exists (select 1 from public.providers p where p.id = provider_id and p.user_id = (select auth.uid())));
create policy listings_insert_owner on public.listings for insert to authenticated with check (exists (select 1 from public.providers p where p.id = provider_id and p.user_id = (select auth.uid())));
create policy listings_update_owner on public.listings for update to authenticated using (exists (select 1 from public.providers p where p.id = provider_id and p.user_id = (select auth.uid()))) with check (exists (select 1 from public.providers p where p.id = provider_id and p.user_id = (select auth.uid())));
create policy listings_delete_owner on public.listings for delete to authenticated using (exists (select 1 from public.providers p where p.id = provider_id and p.user_id = (select auth.uid())));

create policy listing_media_select_public_or_owner on public.listing_media for select to authenticated using (exists (select 1 from public.listings l where l.id = listing_id and (l.status = 'published' or exists (select 1 from public.providers p where p.id = l.provider_id and p.user_id = (select auth.uid())))));
create policy listing_media_insert_owner on public.listing_media for insert to authenticated with check (exists (select 1 from public.listings l join public.providers p on p.id = l.provider_id where l.id = listing_id and p.user_id = (select auth.uid())));
create policy listing_media_update_owner on public.listing_media for update to authenticated using (exists (select 1 from public.listings l join public.providers p on p.id = l.provider_id where l.id = listing_id and p.user_id = (select auth.uid()))) with check (exists (select 1 from public.listings l join public.providers p on p.id = l.provider_id where l.id = listing_id and p.user_id = (select auth.uid())));
create policy listing_media_delete_owner on public.listing_media for delete to authenticated using (exists (select 1 from public.listings l join public.providers p on p.id = l.provider_id where l.id = listing_id and p.user_id = (select auth.uid())));
