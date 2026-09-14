export interface DatabaseEnv {
  url: string;
  publishableKey: string;
  serviceRoleKey?: string;
}

export function getDatabaseEnv(env: NodeJS.ProcessEnv): DatabaseEnv {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !publishableKey) throw new Error("DATABASE_CONFIG_MISSING");
  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
  return serviceRoleKey === undefined
    ? { url, publishableKey }
    : { url, publishableKey, serviceRoleKey };
}
