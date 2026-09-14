import Link from "next/link";
import "../marketplace.css";
import {
  PremiumDropdown,
  type DropdownOption,
} from "../../components/premium-dropdown";
import { ListingCard } from "../../components/listing-card";
import { getPublishedListings } from "../../lib/listings-data";

const filterOptions: DropdownOption[] = [
  {
    value: "",
    label: "All stay types",
    description: "Show every available long-term stay",
  },
  {
    value: "home",
    label: "Homes",
    description: "Private flats and independent homes",
    badge: "Private",
  },
  {
    value: "pg",
    label: "PGs",
    description: "Managed accommodation for longer stays",
    badge: "Managed",
  },
  {
    value: "shared_room",
    label: "Shared rooms",
    description: "Affordable rooms with flatmate sharing",
    badge: "Shared",
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
  const currentQuery = params?.q?.trim() ?? "";
  const currentType = params?.type ?? "";

  const visibleListings = await getPublishedListings({
    q: currentQuery,
    type: currentType,
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
            <ListingCard key={listing.id} listing={listing} />
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
