import Link from 'next/link';
import '../provider.css';
import '../table.css';

const stats = [
  ['12', 'Active listings'],
  ['8', 'Available units'],
  ['6', 'New inquiries'],
  ['94%', 'Response rate'],
];

const actions = [
  ['Listings', 'Create, publish, and manage your rental listings.', '/provider/listings', '01'],
  ['Properties', 'Keep your physical properties and inventory organised.', '/provider/properties', '02'],
  ['Inquiries', 'Respond to prospective renters and keep conversations moving.', '/provider/inquiries', '03'],
  ['Availability', 'Keep rental availability accurate in real time.', '/provider/availability', '04'],
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
        {stats.map(([value, label]) => (
          <div className="statCard" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
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
          {actions.map(([title, description, href, number]) => (
            <Link className="dashCard" href={href} key={title}>
              <span className="dashNumber">{number}</span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
              <strong>Open workspace ↗</strong>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
