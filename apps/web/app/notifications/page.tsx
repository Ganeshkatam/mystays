import { createSupabaseServerClient } from '../../lib/supabase-server';
import { NotificationCenter } from '../../components/notification-center';
import Link from 'next/link';

export default async function NotificationsPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return <NotificationShell><p>Notification service is not configured.</p></NotificationShell>;
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return <NotificationShell><p>Sign in to view your notifications.</p><Link className="notificationCta" href="/auth">Sign in</Link></NotificationShell>;
  }

  return <NotificationShell><NotificationCenter userId={user.id} /></NotificationShell>;
}

function NotificationShell({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <nav className="nav">
        <Link href="/"><strong>myStay</strong></Link>
        <div><Link href="/listings">Explore</Link><Link href="/provider">For providers</Link></div>
      </nav>
      <section className="notificationHero">
        <span className="eyebrow">YOUR UPDATES</span>
        <h1>Keep track of what needs your attention.</h1>
        <p>Inquiries, listing activity, and important account updates live here.</p>
      </section>
      <section className="notificationShell">{children}</section>
    </main>
  );
}
