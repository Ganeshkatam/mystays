import { createSupabaseServerClient } from '../../lib/supabase-server';
import { NotificationCenter } from '../../components/notification-center';

export default async function NotificationsPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase)
    return (
      <main>
        <h1>Notifications</h1>
        <p>Please configure Supabase environment variables to enable notifications.</p>
      </main>
    );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return (
      <main>
        <h1>Notifications</h1>
        <p>Please sign in to view your notifications.</p>
      </main>
    );
  return (
    <main>
      <NotificationCenter userId={user.id} />
    </main>
  );
}
