import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { getDatabaseEnv } from './env';
export function createDatabaseClient(env:NodeJS.ProcessEnv):SupabaseClient { const config=getDatabaseEnv(env); return createClient(config.url,config.publishableKey,{auth:{persistSession:false,autoRefreshToken:false,detectSessionInUrl:false}}); }