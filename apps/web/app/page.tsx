import Link from "next/link";
import {
  PremiumDropdown,
  type DropdownOption,
} from "../components/premium-dropdown";
import { ListingCard } from "../components/listing-card";
import { getPublishedListings } from "../lib/listings-data";

const stayTypeOptions: DropdownOption[] = [
  {
    value: "",
    label: "All stay types",
    description: "All available long-term units",
  },
  {
    value: "home",
    label: "Homes & Apartments",
    description: "Private flats & apartments",
    badge: "Private",
  },
  {
    value: "pg",
    label: "Paying Guest (PG)",
    description: "Serviced rooms with meals",
    badge: "Managed",
  },
  {
    value: "shared_room",
    label: "Shared Rooms",
    description: "Budget flatmate spaces",
    badge: "Budget",
  },
];

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const { q = "", type = "" } = (await searchParams) || {};
  const listings = await getPublishedListings({ q, type });

  return (
    <main>
      <nav className="siteNav">
        <Link className="brand" href="/">
          myStay
        </Link>
        <div className="navLinks">
          <Link href="/listings">All Stays</Link>
          <Link href="/provider">For providers</Link>
          <Link href="/notifications">Notifications</Link>
          <Link className="navCta" href="/auth">
            Sign in
          </Link>
        </div>
      </nav>

      <section className="listingHead" style={{ margin: "20px auto 10px" }}>
        <div className="listingIntro">
          <div>
            <span className="eyebrow">VERIFIED AVAILABLE RENTALS</span>
            <h1>Available Places to Stay</h1>
            <p>
              Browse long-term homes, PGs, and shared rooms ready for move-in.
            </p>
          </div>

          <div className="resultSummary">
            <strong>{listings.length}</strong>
            <span>available places</span>
          </div>
        </div>

        <form className="filter" action="/" method="GET">
          <label className="filterSearch">
            <span>⌕</span>
            <input
              name="q"
              placeholder="Search by city, neighbourhood, or property..."
              defaultValue={q}
            />
          </label>

          <PremiumDropdown
            name="type"
            defaultValue={type}
            options={stayTypeOptions}
            placeholder="All stay types"
            variant="filter"
            ariaLabel="Filter listings by stay type"
          />

          <button type="submit">Search</button>
        </form>

        <div className="quickFilters">
          <span>Quick filter:</span>
          <Link
            href="/?q=Bengaluru"
            className={q === "Bengaluru" ? "active" : ""}
          >
            Bengaluru
          </Link>
          <Link href="/?q=Pune" className={q === "Pune" ? "active" : ""}>
            Pune
          </Link>
          <Link href="/?type=home" className={type === "home" ? "active" : ""}>
            Homes
          </Link>
          <Link href="/?type=pg" className={type === "pg" ? "active" : ""}>
            PGs
          </Link>
          <Link
            href="/?type=shared_room"
            className={type === "shared_room" ? "active" : ""}
          >
            Shared rooms
          </Link>
          {(q || type) && (
            <Link href="/" style={{ color: "var(--brand)", fontWeight: 700 }}>
              Reset
            </Link>
          )}
        </div>
      </section>

      {listings.length > 0 ? (
        <section className="listingGrid" style={{ marginTop: 20 }}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </section>
      ) : (
        <section className="emptyListings">
          <div className="emptyIcon">⌕</div>
          <span className="eyebrow">NO MATCHES</span>
          <h2>No available stays found.</h2>
          <p>Try searching for a different city or clearing the filters.</p>
          <Link href="/">View all available stays</Link>
        </section>
      )}

      <footer className="siteFooter">
        <strong>myStay</strong>
        <span>Direct rental marketplace.</span>
      </footer>
    </main>
  );
}
