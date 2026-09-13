create type public.inquiry_status as enum ('submitted','viewed','responded','closed','withdrawn');

create table public.inquiries (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  renter_id uuid not null references auth.users(id) on delete cascade,
  message text not null check (char_length(trim(message)) between 1 and 5000),
  status public.inquiry_status not null default 'submitted',
  provider_response text check (provider_response is null or char_length(provider_response) <= 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (listing_id, renter_id)
);
create index inquiries_renter_id_idx on public.inquiries(renter_id, created_at desc);
create index inquiries_listing_id_idx on public.inquiries(listing_id, created_at desc);

alter table public.inquiries enable row level security;
revoke all on table public.inquiries from anon, authenticated;
grant select, insert, update on public.inquiries to authenticated;

create policy inquiries_renter_select on public.inquiries for select to authenticated
using (renter_id = (select auth.uid()) or exists (
  select 1 from public.listings l join public.providers p on p.id = l.provider_id
  where l.id = listing_id and p.user_id = (select auth.uid())
));
create policy inquiries_renter_insert on public.inquiries for insert to authenticated
with check (renter_id = (select auth.uid()) and exists (
  select 1 from public.listings l
  join public.inventory i on i.id = l.inventory_id
  where l.id = listing_id and l.status = 'published' and i.status = 'available'
));
create policy inquiries_renter_update on public.inquiries for update to authenticated
using (renter_id = (select auth.uid()) or exists (
  select 1 from public.listings l join public.providers p on p.id = l.provider_id
  where l.id = listing_id and p.user_id = (select auth.uid())
))
with check (renter_id = (select auth.uid()) or exists (
  select 1 from public.listings l join public.providers p on p.id = l.provider_id
  where l.id = listing_id and p.user_id = (select auth.uid())
));
