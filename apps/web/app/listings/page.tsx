import Link from 'next/link';
import '../marketplace.css';
import { PremiumDropdown, type DropdownOption } from '../../components/premium-dropdown';

const sample = [
  ['1', 'Sunlit 2BHK', 'Indiranagar, Bengaluru', '₹28,000 / month', 'Home'],
  ['2', 'Green View PG', 'Kothrud, Pune', '₹12,500 / month', 'PG'],
  ['3', 'City Shared Room', 'HSR Layout, Bengaluru', '₹9,000 / month', 'Shared room'],
];

const filterOptions: DropdownOption[] = [
  { value: '', label: 'All stay types', description: 'Show all available rental properties' },
  { value: 'home', label: 'Homes', description: 'Flats & independent apartments', badge: 'Private' },
  { value: 'pg', label: 'PGs', description: 'Furnished co-living stays with meals', badge: 'Managed' },
  { value: 'shared_room', label: 'Shared rooms', description: 'Affordable flatmate sharing', badge: 'Shared' },
];

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentType = resolvedParams?.type ?? '';
  const currentQuery = resolvedParams?.q ?? '';

  return (
    <main>
      <nav className="nav">
        <Link href="/">
          <strong>myStay</strong>
        </Link>
        <div>
          <a href="/provider/listings">For providers</a>
          <a href="/notifications">Notifications</a>
        </div>
      </nav>
      <section className="listingHead">
        <span className="eyebrow">DISCOVER</span>
        <h1>Long-term places to live.</h1>
        <p>Browse homes, PGs and shared rooms. Availability is shown from the shared backend.</p>
        <form className="filter">
          <input name="q" placeholder="Search by area or city" defaultValue={currentQuery} />
          <PremiumDropdown
            name="type"
            defaultValue={currentType}
            options={filterOptions}
            placeholder="All stay types"
            variant="filter"
            ariaLabel="Filter listings by stay type"
          />
          <button>Apply filters</button>
        </form>
      </section>
      <section className="listingGrid">
        {sample.map((x) => (
          <article className="listing" key={x[0]}>
            <div className="photo">{x[4]}</div>
            <div className="listingBody">
              <span>{x[4]}</span>
              <h2>{x[1]}</h2>
              <p>{x[2]}</p>
              <strong>{x[3]}</strong>
              <a href={'/listings/' + x[0]}>View details →</a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
