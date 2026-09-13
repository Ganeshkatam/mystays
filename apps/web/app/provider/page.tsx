import Link from 'next/link';
import './provider.css';
import './table.css';

interface ProviderStat {
  value: string;
  label: string;
}

interface ProviderAction {
  title: string;
  description: string;
  href: string;
  number: string;
}

const stats: ProviderStat[] = [
  { value: '12', label: 'Active listings' },
  { value: '8', label: 'Available units' },
  { value: '6', label: 'New inquiries' },
  { value: '94%', label: 'Response rate' },
];

const actions: ProviderAction[] = [
  { title: 'Listings', description: 'Create, publish, and manage your rental listings.', href: '/provider/listings', number: '01' },
  { title: 'Properties', description: 'Keep your physical properties and inventory organised.', href: '/provider/properties', number: '02' },
  { title: 'Inquiries', description: 'Respond to prospective renters and keep conversations moving.', href: '/provider/inquiries', number: '03' },
  { title: 'Availability', description: 'Keep rental availability accurate in real time.', href: '/provider/availability', number: '04' },
];

export default function ProviderDashboard() {
  return (
    <main>
      <nav className="nav">
        <Link href="/"><strong>myStay</strong></Link>
        <div>
          <a href="/provider/listings">Listings</a>
          <a href="/provider/properties">Properties</a>
          <a href="/notifications">Notifications</a>
        </div>
      </nav>

      <section className="providerHero">
        <div>
          <span className="eyebrow">PROVIDER WORKSPACE</span>
          <h1>Everything you need to run long-term rentals.</h1>
          <p>Manage inventory, listings, availability, and renter conversations from one focused workspace.</p>
        </div>
        <Link className="providerHeroAction" href="/provider/listings">Manage listings →</Link>
      </section>

      <section className="statsGrid">
        {stats.map((stat) => (
          <div className="statCard" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="workspace">
        <div className="workspaceHeading">
          <div>
            <span className="eyebrow">WORKSPACE</span>
            <h2>Run the day-to-day.</h2>
          </div>
          <span className="workspaceHint">Your operational overview</span>
        </div>

        <div className="dashboardGrid">
          {actions.map((action) => (
            <Link className="dashCard" href={action.href} key={action.title}>
              <span className="dashNumber">{action.number}</span>
              <div>
                <h2>{action.title}</h2>
                <p>{action.description}</p>
              </div>
              <strong>Open workspace ↗</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
