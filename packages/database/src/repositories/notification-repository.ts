import type { SupabaseClient } from "@supabase/supabase-js";
export class NotificationRepository {
  constructor(private readonly db: SupabaseClient) {}
  async create(input: {
    user_id: string;
    type: string;
    title: string;
    body: string;
    entity_type: string;
    entity_id: string;
  }) {
    const { data, error } = await this.db
      .from("notifications")
      .insert(input)
      .select("id,type,title,body,entity_type,entity_id,read_at,created_at")
      .single();
    if (error || !data) throw new Error("NOTIFICATION_CREATE_FAILED");
    return data;
  }
  async listMine(userId: string) {
    const { data, error } = await this.db
      .from("notifications")
      .select("id,type,title,body,entity_type,entity_id,read_at,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error("NOTIFICATION_LIST_FAILED");
    return data ?? [];
  }
  async markRead(id: string, userId: string) {
    const { data, error } = await this.db
      .from("notifications")
      .update({ read_at: new Date().toISOString() })
      .eq("id", id)
      .eq("user_id", userId)
      .select("id,read_at")
      .maybeSingle();
    if (error) throw new Error("NOTIFICATION_READ_FAILED");
    return data;
  }
}
