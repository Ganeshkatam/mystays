# Database Migration Policy

All schema changes are versioned in `supabase/migrations/` and tested locally before deployment. Do not make production schema changes directly through the dashboard once migrations are established. Supabase recommends migration files as the source of truth and `supabase db push` for deployment. citeturn0search1turn0search2

Every exposed table must have deliberate grants and RLS policies. Policies are not a substitute for grants; both must be reviewed. citeturn0search0

RLS policies should use explicit roles and indexed policy columns. Test authorization boundaries with database tests before production deployment. citeturn0search0