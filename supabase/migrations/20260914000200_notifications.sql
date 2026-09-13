create table public.notifications (id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id) on delete cascade,type text not null check(char_length(trim(type)) between 1 and 100),title text not null check(char_length(trim(title)) between 1 and 200),body text not null check(char_length(trim(body)) between 1 and 2000),entity_type text not null check(char_length(trim(entity_type)) between 1 and 100),entity_id uuid not null,read_at timestamptz,created_at timestamptz not null default now());
create index notifications_user_created_idx on public.notifications(user_id,created_at desc);
alter table public.notifications enable row level security;
revoke all on table public.notifications from anon,authenticated;
grant select,update on public.notifications to authenticated;
create policy notifications_select_own on public.notifications for select to authenticated using(user_id=(select auth.uid()));
create policy notifications_update_own on public.notifications for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));