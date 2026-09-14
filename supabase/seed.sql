-- Seed initial provider user and authentic properties, inventory, published listings, and media
do $$
declare
  v_user_id uuid := 'a0000000-0000-0000-0000-000000000001'::uuid;
  v_provider_id uuid := 'b0000000-0000-0000-0000-000000000001'::uuid;
  
  -- Properties
  v_prop_1 uuid := 'c0000000-0000-0000-0000-000000000001'::uuid;
  v_prop_2 uuid := 'c0000000-0000-0000-0000-000000000002'::uuid;
  v_prop_3 uuid := 'c0000000-0000-0000-0000-000000000003'::uuid;
  v_prop_4 uuid := 'c0000000-0000-0000-0000-000000000004'::uuid;
  v_prop_5 uuid := 'c0000000-0000-0000-0000-000000000005'::uuid;
  v_prop_6 uuid := 'c0000000-0000-0000-0000-000000000006'::uuid;

  -- Inventory
  v_inv_1 uuid := 'd0000000-0000-0000-0000-000000000001'::uuid;
  v_inv_2 uuid := 'd0000000-0000-0000-0000-000000000002'::uuid;
  v_inv_3 uuid := 'd0000000-0000-0000-0000-000000000003'::uuid;
  v_inv_4 uuid := 'd0000000-0000-0000-0000-000000000004'::uuid;
  v_inv_5 uuid := 'd0000000-0000-0000-0000-000000000005'::uuid;
  v_inv_6 uuid := 'd0000000-0000-0000-0000-000000000006'::uuid;

  -- Listings
  v_list_1 uuid := 'e0000000-0000-0000-0000-000000000001'::uuid;
  v_list_2 uuid := 'e0000000-0000-0000-0000-000000000002'::uuid;
  v_list_3 uuid := 'e0000000-0000-0000-0000-000000000003'::uuid;
  v_list_4 uuid := 'e0000000-0000-0000-0000-000000000004'::uuid;
  v_list_5 uuid := 'e0000000-0000-0000-0000-000000000005'::uuid;
  v_list_6 uuid := 'e0000000-0000-0000-0000-000000000006'::uuid;
begin
  -- Ensure provider auth user exists
  insert into auth.users (
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
  ) values (
    v_user_id,
    'authenticated',
    'authenticated',
    'provider@mystay.local',
    '$2a$10$abcdefghijklmnopqrstuvwxyzABCDEF',
    now(),
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{"name":"myStay Verified Residences"}'::jsonb,
    now(),
    now()
  ) on conflict (id) do nothing;

  -- Ensure profile exists
  insert into public.profiles (
    id,
    display_name,
    status
  ) values (
    v_user_id,
    'myStay Verified Residences',
    'active'
  ) on conflict (id) do update set display_name = excluded.display_name;

  -- Ensure provider exists
  insert into public.providers (
    id,
    user_id,
    provider_type,
    verification_state,
    status
  ) values (
    v_provider_id,
    v_user_id,
    'verified_operator',
    'verified',
    'active'
  ) on conflict (user_id) do update set status = 'active';

  -- 1. Property: Indiranagar, Bengaluru
  insert into public.properties (
    id, provider_id, name, property_type, description,
    address_line1, locality, city, state, postal_code, country_code, location
  ) values (
    v_prop_1, v_provider_id, 'Indiranagar Urban Heights', 'apartment',
    'Sunlit residential apartments in prime Indiranagar with high-speed fiber and round-the-clock security.',
    '12th Main Road, HAL 2nd Stage', 'Indiranagar', 'Bengaluru', 'Karnataka', '560038', 'IN',
    extensions.ST_SetSRID(extensions.ST_MakePoint(77.6412, 12.9784), 4326)
  ) on conflict (id) do nothing;

  -- 2. Property: Kothrud, Pune
  insert into public.properties (
    id, provider_id, name, property_type, description,
    address_line1, locality, city, state, postal_code, country_code, location
  ) values (
    v_prop_2, v_provider_id, 'Green View Residency', 'pg',
    'Managed co-living and PG accommodation nestled in serene green residential lanes of Kothrud.',
    'Paud Road, Ideal Colony', 'Kothrud', 'Pune', 'Maharashtra', '411038', 'IN',
    extensions.ST_SetSRID(extensions.ST_MakePoint(73.8143, 18.5074), 4326)
  ) on conflict (id) do nothing;

  -- 3. Property: HSR Layout, Bengaluru
  insert into public.properties (
    id, provider_id, name, property_type, description,
    address_line1, locality, city, state, postal_code, country_code, location
  ) values (
    v_prop_3, v_provider_id, 'HSR Co-Living Suites', 'co_living',
    'Modern community co-living home close to tech parks, cafés, and transit hubs.',
    '27th Main Road, Sector 1', 'HSR Layout', 'Bengaluru', 'Karnataka', '560102', 'IN',
    extensions.ST_SetSRID(extensions.ST_MakePoint(77.6521, 12.9121), 4326)
  ) on conflict (id) do nothing;

  -- 4. Property: Baner, Pune
  insert into public.properties (
    id, provider_id, name, property_type, description,
    address_line1, locality, city, state, postal_code, country_code, location
  ) values (
    v_prop_4, v_provider_id, 'Baner Parkside Enclave', 'apartment',
    'Contemporary apartments facing lush tree canopies with private balconies and gym access.',
    'Pan Card Club Road', 'Baner', 'Pune', 'Maharashtra', '411045', 'IN',
    extensions.ST_SetSRID(extensions.ST_MakePoint(73.7898, 18.5590), 4326)
  ) on conflict (id) do nothing;

  -- 5. Property: Koramangala, Bengaluru
  insert into public.properties (
    id, provider_id, name, property_type, description,
    address_line1, locality, city, state, postal_code, country_code, location
  ) values (
    v_prop_5, v_provider_id, 'Metro Heights Executive Living', 'pg',
    'Fully serviced boutique executive single accommodation with daily housekeeping and meals.',
    '80 Feet Road, 4th Block', 'Koramangala', 'Bengaluru', 'Karnataka', '560034', 'IN',
    extensions.ST_SetSRID(extensions.ST_MakePoint(77.6245, 12.9352), 4326)
  ) on conflict (id) do nothing;

  -- 6. Property: Viman Nagar, Pune
  insert into public.properties (
    id, provider_id, name, property_type, description,
    address_line1, locality, city, state, postal_code, country_code, location
  ) values (
    v_prop_6, v_provider_id, 'Viman Lakeview Residence', 'apartment',
    'Spacious shared apartments overlooking the park, walking distance from IT business parks.',
    'Symbiosis Road, Clover Park', 'Viman Nagar', 'Pune', 'Maharashtra', '411014', 'IN',
    extensions.ST_SetSRID(extensions.ST_MakePoint(73.9143, 18.5679), 4326)
  ) on conflict (id) do nothing;

  -- Inventory units
  insert into public.inventory (id, property_id, inventory_type, label, occupancy_capacity, furnishing, status) values
    (v_inv_1, v_prop_1, 'unit', 'Flat 302 (2BHK)', 4, 'Furnished', 'available'),
    (v_inv_2, v_prop_2, 'room', 'Room 104 (Single PG)', 1, 'Furnished', 'available'),
    (v_inv_3, v_prop_3, 'bed', 'Twin Bed A (Room 2)', 2, 'Furnished', 'available'),
    (v_inv_4, v_prop_4, 'unit', 'Flat 201 (1BHK Studio)', 2, 'Semi-furnished', 'available'),
    (v_inv_5, v_prop_5, 'room', 'Studio Suite 402', 1, 'Furnished', 'available'),
    (v_inv_6, v_prop_6, 'bed', 'Twin Bed B (Room 1)', 2, 'Furnished', 'available')
  on conflict (id) do nothing;

  -- Published Listings
  insert into public.listings (
    id, provider_id, property_id, inventory_id, title, description,
    monthly_rent, deposit, status, available_from, published_at
  ) values
    (
      v_list_1, v_provider_id, v_prop_1, v_inv_1,
      'Sunlit 2BHK Apartment with Balcony',
      'Spacious and sunlit 2BHK furnished home in Indiranagar. Features a modern living room, modular kitchen, wooden flooring, and 24/7 backup.',
      28000.00, 50000.00, 'published', current_date, now()
    ),
    (
      v_list_2, v_provider_id, v_prop_2, v_inv_2,
      'Green View PG Private Room with Study',
      'Comfortable and managed private PG room in Kothrud with nutritious meals, high-speed Wi-Fi, laundry, and daily housekeeping included.',
      12500.00, 20000.00, 'published', current_date, now()
    ),
    (
      v_list_3, v_provider_id, v_prop_3, v_inv_3,
      'City Shared Room in HSR Tech Hub',
      'Vibrant co-living shared space in HSR Layout. Includes dedicated ergonomic work desks, high-speed Wi-Fi, community lounge, and utilities.',
      9000.00, 15000.00, 'published', current_date, now()
    ),
    (
      v_list_4, v_provider_id, v_prop_4, v_inv_4,
      'Parkside 1BHK Studio with Green Views',
      'Peaceful 1BHK apartment in Baner overlooking city park. Bright natural light, private terrace balcony, modular kitchen, and reserved parking.',
      21000.00, 40000.00, 'published', current_date, now()
    ),
    (
      v_list_5, v_provider_id, v_prop_5, v_inv_5,
      'Metro Heights PG Suite in Koramangala',
      'Executive single room in central Koramangala. Premium spring mattress, ergonomic workstation, 300 Mbps Wi-Fi, and weekly linen service.',
      14000.00, 25000.00, 'published', current_date, now()
    ),
    (
      v_list_6, v_provider_id, v_prop_6, v_inv_6,
      'Lakeview Shared Home in Viman Nagar',
      'Airy twin-sharing room in prime Viman Nagar apartment with peaceful lake views, fully equipped kitchen, washing machine, and dining area.',
      10500.00, 18000.00, 'published', current_date, now()
    )
  on conflict (id) do nothing;

  -- Listing Media (real architectural images)
  insert into public.listing_media (listing_id, object_key, media_type, sort_order, moderation_state) values
    (v_list_1, '/images/home-apartment.jpg', 'image', 0, 'approved'),
    (v_list_1, '/images/detail-bedroom.jpg', 'image', 1, 'approved'),
    (v_list_1, '/images/detail-kitchen.jpg', 'image', 2, 'approved'),
    (v_list_2, '/images/pg-room.jpg', 'image', 0, 'approved'),
    (v_list_3, '/images/shared-room.jpg', 'image', 0, 'approved'),
    (v_list_4, '/images/parkside-1bhk.jpg', 'image', 0, 'approved'),
    (v_list_5, '/images/metro-pg-room.jpg', 'image', 0, 'approved'),
    (v_list_6, '/images/shared-room.jpg', 'image', 0, 'approved')
  on conflict do nothing;

end $$;
