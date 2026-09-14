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
    description: "Private flats & apartments",
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
  const secondaryStay = listings[1];

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

      <div className="heroWrapper">
        <div className="heroBackdrop">
          <Image
            src="/images/hero-bg.jpg"
            alt="Modern residential living background"
            fill
            priority
            sizes="100vw"
            className="heroBackdropImage"
          />
          <div className="heroBackdropOverlay" />
        </div>

        <section className="heroSection">
          <div className="heroCopy">
            <div className="heroBadge">
              <span className="heroBadgeDot" />
              Verified Long-Term Stays
            </div>

            <h1>Find your next place to call home.</h1>
            <p>
              Explore verified apartments, managed PGs, and shared spaces with
              transparent monthly rent and direct provider inquiries.
            </p>

            <form action="/listings" className="heroSearch" method="GET">
              <label>
                <span>Where</span>
                <input name="q" placeholder="City or neighbourhood..." />
              </label>

              <div
                style={{
                  padding: "4px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
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

              <button type="submit">Search Stays</button>
            </form>

            <div className="heroQuickChips">
              <span>Popular:</span>
              <Link href="/listings?q=Bengaluru">Bengaluru</Link>
              <Link href="/listings?q=Pune">Pune</Link>
              <Link href="/listings?type=home">Homes</Link>
              <Link href="/listings?type=pg">PGs</Link>
              <Link href="/listings?type=shared_room">Shared</Link>
            </div>

            <div className="heroMeta">
              <span>Verified availability</span>
              <span>Zero broker fees</span>
              <span>Direct provider contact</span>
            </div>
          </div>

          <div className="heroVisual">
            <div className="floatingTop">
              <span className="floatingTopDot" />
              <span>Available for move-in</span>
            </div>

            {featuredStay && (
              <Link
                href={`/listings/${featuredStay.id}`}
                className="visualCardMain"
                aria-label={`View ${featuredStay.title}`}
              >
                <span className="visualTag">
                  {featuredStay.type.toUpperCase()} · VERIFIED
                </span>
                <div className="visualImage">
                  <Image
                    src={featuredStay.image}
                    alt={featuredStay.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
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
              </Link>
            )}

            {secondaryStay && (
              <Link
                href={`/listings/${secondaryStay.id}`}
                className="visualSecondaryCard"
                aria-label={`View ${secondaryStay.title}`}
              >
                <div className="visualSecondaryThumb">
                  <Image
                    src={secondaryStay.image}
                    alt={secondaryStay.title}
                    fill
                    sizes="46px"
                  />
                </div>
                <div className="visualSecondaryInfo">
                  <strong>{secondaryStay.title}</strong>
                  <span>{secondaryStay.price} / mo</span>
                </div>
              </Link>
            )}
          </div>
        </section>
      </div>

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
