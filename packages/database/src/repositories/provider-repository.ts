import type { SupabaseClient } from "@supabase/supabase-js";
export class ProviderRepository {
  constructor(private readonly db: SupabaseClient) {}
  async create(userId: string, providerType: string) {
    const { data, error } = await this.db
      .from("providers")
      .insert({ user_id: userId, provider_type: providerType })
      .select("id,user_id,provider_type,verification_state,status")
      .single();
    if (error) throw new Error("PROVIDER_CREATE_FAILED");
    return data;
  }
  async getOwn(userId: string) {
    const { data, error } = await this.db
      .from("providers")
      .select("id,user_id,provider_type,verification_state,status")
      .eq("user_id", userId)
      .maybeSingle();
    if (error) throw new Error("PROVIDER_READ_FAILED");
    return data;
  }
}
