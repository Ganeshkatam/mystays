-- Allow public (anon and authenticated) to read published listings and related property details
grant select on public.listings to anon, authenticated;
grant select on public.properties to anon, authenticated;
grant select on public.inventory to anon, authenticated;
grant select on public.listing_media to anon, authenticated;
grant select on public.providers to anon, authenticated;

drop policy if exists listings_select_published on public.listings;
create policy listings_select_published on public.listings
  for select
  to anon, authenticated
  using (
    status = 'published'
    or exists (
      select 1 from public.providers p
      where p.id = provider_id and p.user_id = (select auth.uid())
    )
  );

drop policy if exists properties_select_owner on public.properties;
drop policy if exists properties_select_public on public.properties;
create policy properties_select_public on public.properties
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.listings l
      where l.property_id = properties.id and l.status = 'published'
    )
    or exists (
      select 1 from public.providers p
      where p.id = provider_id and p.user_id = (select auth.uid())
    )
  );

drop policy if exists inventory_select_owner on public.inventory;
drop policy if exists inventory_select_public on public.inventory;
create policy inventory_select_public on public.inventory
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.listings l
      where l.inventory_id = inventory.id and l.status = 'published'
    )
    or exists (
      select 1 from public.properties x
      join public.providers p on p.id = x.provider_id
      where x.id = inventory.property_id and p.user_id = (select auth.uid())
    )
  );

drop policy if exists listing_media_select_public_or_owner on public.listing_media;
create policy listing_media_select_public_or_owner on public.listing_media
  for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.listings l
      where l.id = listing_id and (
        l.status = 'published'
        or exists (
          select 1 from public.providers p
          where p.id = l.provider_id and p.user_id = (select auth.uid())
        )
      )
    )
  );
