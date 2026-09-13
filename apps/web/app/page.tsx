import { PremiumDropdown, type DropdownOption } from '../components/premium-dropdown';

const types = [
  ['Homes', 'Independent homes and apartments'],
  ['PGs', 'Managed stays for long-term living'],
  ['Shared rooms', 'Affordable rooms with compatible flatmates'],
];

const stayTypeOptions: DropdownOption[] = [
  {
    value: '',
    label: 'Any stay type',
    description: 'Explore all homes, PGs, and shared rooms',
  },
  {
    value: 'home',
    label: 'Homes & Apartments',
    description: 'Private flats for families and professionals',
    badge: 'Private',
  },
  {
    value: 'pg',
    label: 'Paying Guest (PG)',
    description: 'Fully serviced stays with meals & housekeeping',
    badge: 'Managed',
  },
  {
    value: 'shared_room',
    label: 'Shared Rooms',
    description: 'Budget-friendly rooms with verified flatmates',
    badge: 'Budget',
  },
];

export default function HomePage() {
  return (
    <main>
      <nav className="nav">
        <strong>myStay</strong>
        <div>
          <a href="/listings">Find a stay</a>
          <a href="/provider/listings">List a property</a>
          <a href="/notifications">Notifications</a>
        </div>
      </nav>
      <section className="hero">
        <span className="eyebrow">LONG-TERM LIVING, SIMPLIFIED</span>
        <h1>Find a place that feels like home.</h1>
        <p>Discover homes, PGs, and shared rooms built for longer stays.</p>
        <form action="/listings" className="search">
          <input
            name="q"
            placeholder="Search city, neighbourhood, or property"
            aria-label="Search listings"
          />
          <PremiumDropdown
            name="type"
            defaultValue=""
            options={stayTypeOptions}
            placeholder="Any stay type"
            variant="search"
            ariaLabel="Filter by stay type"
          />
          <button>Search stays</button>
        </form>
      </section>
      <section className="grid">
        {types.map(([title, text]) => (
          <article className="card" key={title}>
            <div className="icon">⌂</div>
            <h2>{title}</h2>
            <p>{text}</p>
            <a href="/listings">Explore →</a>
          </article>
        ))}
      </section>
      <section className="trust">
        <div>
          <strong>One account</strong>
          <span>Web today, mobile later.</span>
        </div>
        <div>
          <strong>Long-term first</strong>
          <span>Designed around monthly living.</span>
        </div>
        <div>
          <strong>Direct inquiries</strong>
          <span>Talk to verified providers.</span>
        </div>
      </section>
    </main>
  );
}
