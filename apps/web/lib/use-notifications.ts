'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  entity_type: string;
  entity_id: string;
  read_at: string | null;
  created_at: string;
}

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
      return;
    const client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    );
    let active = true;
    const load = async () => {
      const { data, error } = await client
        .from('notifications')
        .select('id,type,title,body,entity_type,entity_id,read_at,created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(100);
      if (!error && active) setNotifications(data as Notification[]);
    };
    void load();
    const channel = client
      .channel('user-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: 'user_id=eq.' + userId,
        },
        (payload) => {
          if (active)
            setNotifications((current) => [payload.new as Notification, ...current].slice(0, 100));
        },
      )
      .subscribe();
    return () => {
      active = false;
      void client.removeChannel(channel);
    };
  }, [userId]);
  return notifications;
}
