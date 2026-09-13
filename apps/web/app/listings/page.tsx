import Link from 'next/link';
import Image from 'next/image';
import '../marketplace.css';
import { PremiumDropdown, type DropdownOption } from '../../components/premium-dropdown';

const listings = [
  {
    id: '1',
    title: 'Sunlit 2BHK',
    location: 'Indiranagar, Bengaluru',
    price: '₹28,000',
    type: 'Home',
    image: '/images/home-apartment.jpg',
    meta: '2 bed · 2 bath · Furnished',
    featured: true,
  },
  {
    id: '2',
    title: 'Green View PG',
    location: 'Kothrud, Pune',
    price: '₹12,500',
    type: 'PG',
    image: '/images/pg-room.jpg',
    meta: 'Single room · Meals · Wi-Fi',
    featured: false,
  },
  {
    id: '3',
    title: 'City Shared Room',
    location: 'HSR Layout, Bengaluru',
    price: '₹9,000',
    type: 'Shared room',
    image: '/images/shared-room.jpg',
    meta: 'Shared room · Furnished · Wi-Fi',
    featured: false,
  },
  {
    id: '4',
    title: 'Parkside 1BHK',
    location: 'Baner, Pune',
    price: '₹21,000',
    type: 'Home',
    image: '/images/parkside-1bhk.jpg',
    meta: '1 bed · 1 bath · Semi-furnished',
    featured: false,
  },
  {
    id: '5',
    title: 'Metro Heights PG',
    location: 'Koramangala, Bengaluru',
    price: '₹14,000',
    type: 'PG',
    image: '/images/metro-pg-room.jpg',
    meta: 'Single room · Housekeeping · Wi-Fi',
    featured: false,
  },
  {
    id: '6',
    title: 'Lakeview Shared Home',
    location: 'Viman Nagar, Pune',
    price: '₹10,500',
    type: 'Shared room',
    image: '/images/shared-room.jpg',
    meta: 'Shared room · 2 flatmates · Furnished',
    featured: false,
  },
];

const filterOptions: DropdownOption[] = [
  {
    value: '',
    label: 'All stay types',
    description: 'Show every available long-term stay',
  },
  {
    value: 'home',
    label: 'Homes',
    description: 'Private flats and independent homes',
    badge: 'Private',
  },
  {
    value: 'pg',
    label: 'PGs',
    description: 'Managed accommodation for longer stays',
    badge: 'Managed',
  },
  {
    value: 'shared_room',
    label: 'Shared rooms',
    description: 'Affordable rooms with flatmate sharing',
    badge: 'Shared',
  },
];

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    type?: string;
  }>;
}) {
  const params = await searchParams;
  const currentQuery = params?.q?.trim() ?? '';
  const currentType = params?.type ?? '';

  const visibleListings = listings.filter((listing) => {
    const matchesType =
      !currentType ||
      listing.type.toLowerCase().replace(' ', '_') === currentType;

    const query = currentQuery.toLowerCase();

    const matchesQuery =
      !query ||
      listing.title.toLowerCase().includes(query) ||
      listing.location.toLowerCase().includes(query);

    return matchesType && matchesQuery;
  });

  return (
    <main>
      <nav className="nav">
        <Link href="/">
          <strong>myStay</strong>
        </Link>

        <div>
          <Link href="/provider">For providers</Link>
          <Link href="/notifications">Notifications</Link>
          <Link href="/auth">Sign in</Link>
        </div>
      </nav>

      <section className="listingHead">
        <div className="listingIntro">
          <div>
            <span className="eyebrow">EXPLORE LONG-TERM LIVING</span>
            <h1>Places worth staying for.</h1>
            <p>
              Find homes, PGs, and shared rooms with monthly pricing and
              practical details upfront.
            </p>
          </div>

          <div className="resultSummary">
            <strong>{visibleListings.length}</strong>
            <span>stays matching your search</span>
          </div>
        </div>

        <form className="filter" action="/listings">
          <label className="filterSearch">
            <span>⌕</span>
            <input
              name="q"
              placeholder="Search city, neighbourhood, or property"
              defaultValue={currentQuery}
            />
          </label>

          <PremiumDropdown
            name="type"
            defaultValue={currentType}
            options={filterOptions}
            placeholder="All stay types"
            variant="filter"
            ariaLabel="Filter listings by stay type"
          />

          <button type="submit">Search</button>
        </form>

        <div className="quickFilters">
          <span>Popular:</span>
          <Link href="/listings?q=Bengaluru">Bengaluru</Link>
          <Link href="/listings?q=Pune">Pune</Link>
          <Link href="/listings?type=home">Homes</Link>
          <Link href="/listings?type=pg">PGs</Link>
        </div>
      </section>

      <section className="listingToolbar">
        <div>
          <strong>Available stays</strong>
          <span>Updated for long-term availability</span>
        </div>

        <button type="button" className="viewToggle" aria-label="Grid view">
          ▦ Grid
        </button>
      </section>

      {visibleListings.length > 0 ? (
        <section className="listingGrid">
          {visibleListings.map((listing) => (
            <article className="listing" key={listing.id}>
              <Link href={'/listings/' + listing.id} className="photoContainer">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  width={600}
                  height={340}
                  className="photoImg"
                />
                <span className="photoTag">{listing.type}</span>
                {listing.featured && (
                  <span className="featuredLabel">Featured</span>
                )}
              </Link>

              <div className="listingBody">
                <div className="listingTopline">
                  <span>{listing.type}</span>
                  <button
                    type="button"
                    className="saveButton"
                    aria-label={'Save ' + listing.title}
                  >
                    ♡
                  </button>
                </div>

                <Link href={'/listings/' + listing.id}>
                  <h2>{listing.title}</h2>
                </Link>

                <p className="listingLocation">{listing.location}</p>

                <p className="listingMeta">{listing.meta}</p>

                <div className="listingFooter">
                  <div>
                    <strong>{listing.price}</strong>
                    <span>/ month</span>
                  </div>

                  <Link href={'/listings/' + listing.id}>
                    View stay →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <section className="emptyListings">
          <div className="emptyIcon">⌕</div>
          <span className="eyebrow">NO MATCHES</span>
          <h2>We couldn&apos;t find that stay.</h2>
          <p>
            Try a broader location or remove one of the filters to see more
            long-term options.
          </p>
          <Link href="/listings">Clear search</Link>
        </section>
      )}
    </main>
  );
}
