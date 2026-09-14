import Link from "next/link";
import Image from "next/image";
import {
  PremiumDropdown,
  type DropdownOption,
} from "../components/premium-dropdown";
import { ListingCard } from "../components/listing-card";
import { getPublishedListings } from "../lib/listings-data";

const stayTypeOptions: DropdownOption[] = [
  { value: "", label: "Any stay type", description: "Explore all stay styles" },
  {
    value: "home",
    label: "Homes & Apartments",
    description: "Private flats",
    badge: "Private",
  },
  {
    value: "pg",
    label: "Paying Guest (PG)",
    description: "Serviced stays with meals",
    badge: "Managed",
  },
  {
    value: "shared_room",
    label: "Shared Rooms",
    description: "Affordable spaces with flatmates",
    badge: "Budget",
  },
];

const categories = [
  {
    title: "Homes & Flats",
    description: "Private 1BHK, 2BHK, and independent homes",
    href: "/listings?type=home",
    image: "/images/home-apartment.jpg",
  },
  {
    title: "Managed PGs",
    description: "Serviced single rooms with meals & Wi-Fi",
    href: "/listings?type=pg",
    image: "/images/pg-room.jpg",
  },
  {
    title: "Shared Co-Living",
    description: "Budget-friendly shared spaces with flatmates",
    href: "/listings?type=shared_room",
    image: "/images/shared-room.jpg",
  },
];

export default async function HomePage() {
  const listings = await getPublishedListings();
  const featuredStay = listings[0];

  return (
    <main>
      <nav className="siteNav">
        <Link className="brand" href="/">
          myStay
        </Link>
        <div className="navLinks">
          <Link href="/listings">Explore</Link>
          <Link href="/provider">For providers</Link>
          <Link href="/notifications">Notifications</Link>
          <Link className="navCta" href="/auth">
            Sign in
          </Link>
        </div>
      </nav>

      <section className="heroSection">
        <div className="heroCopy">
          <span className="eyebrow">LONG-TERM LIVING</span>
          <h1>Find your next place to call home.</h1>
          <p>
            Verified apartments, managed PGs, and shared co-living spaces with
            transparent monthly rent and direct provider inquiries.
          </p>

          <form action="/listings" className="heroSearch" method="GET">
            <label>
              <span>Where</span>
              <input name="q" placeholder="City or neighbourhood..." />
            </label>

            <div
              style={{
                padding: "4px 8px",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--muted)",
                  fontWeight: 700,
                }}
              >
                Stay type
              </span>
              <PremiumDropdown
                name="type"
                defaultValue=""
                options={stayTypeOptions}
                placeholder="Any type"
                variant="search"
                ariaLabel="Stay type"
              />
            </div>

            <button type="submit">Find stays</button>
          </form>

          <div className="heroMeta">
            <span>Verified availability</span>
            <span>Zero broker fees</span>
            <span>Direct provider contact</span>
          </div>
        </div>

        {featuredStay && (
          <Link
            href={`/listings/${featuredStay.id}`}
            className="heroVisual"
            aria-label={`View ${featuredStay.title}`}
          >
            <div className="visualCard visualMain">
              <span className="visualTag">FEATURED STAY</span>
              <div className="visualImage">
                <Image
                  src={featuredStay.image}
                  alt={featuredStay.title}
                  width={430}
                  height={290}
                  priority
                />
              </div>
              <div className="visualDetails">
                <div>
                  <strong>{featuredStay.title}</strong>
                  <span>{featuredStay.location}</span>
                </div>
                <strong>
                  {featuredStay.price} <small>/ month</small>
                </strong>
              </div>
            </div>
            <div className="floatingCard floatingTop">
              <span>AVAILABLE NOW</span>
              <strong>{featuredStay.type}</strong>
            </div>
          </Link>
        )}
      </section>

      <section className="sectionBlock">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">EXPLORE STYLES</span>
            <h2>Choose how you want to live</h2>
          </div>
          <Link href="/listings">View all stays →</Link>
        </div>

        <div className="categoryGrid">
          {categories.map((cat, i) => (
            <Link className="categoryCard" href={cat.href} key={cat.title}>
              <div className="categoryThumb">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={380}
                  height={140}
                />
              </div>
              <span className="categoryNumber">0{i + 1}</span>
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
              <strong>Explore {cat.title.toLowerCase()} →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="sectionBlock">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">AVAILABLE NOW</span>
            <h2>Places ready for move-in</h2>
          </div>
          <Link href="/listings">Browse all ({listings.length}) →</Link>
        </div>

        <div className="listingGrid" style={{ margin: "0", padding: "0" }}>
          {listings.slice(0, 6).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <footer className="siteFooter">
        <strong>myStay</strong>
        <span>Long-term living, simplified.</span>
      </footer>
    </main>
  );
}
