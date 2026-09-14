import Link from "next/link";
import Image from "next/image";
import {
  PremiumDropdown,
  type DropdownOption,
} from "../components/premium-dropdown";
import { ListingCard } from "../components/listing-card";
import { getPublishedListings } from "../lib/listings-data";

const stayTypeOptions: DropdownOption[] = [
  {
    value: "",
    label: "Any stay type",
    description: "Explore all available stays",
  },
  {
    value: "home",
    label: "Homes & Apartments",
    description: "Independent private flats",
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
    title: "Homes",
    href: "/listings?type=home",
    image: "/images/home-apartment.jpg",
    desc: "Private flats & apartments",
  },
  {
    title: "PGs",
    href: "/listings?type=pg",
    image: "/images/pg-room.jpg",
    desc: "Managed accommodation & food",
  },
  {
    title: "Shared rooms",
    href: "/listings?type=shared_room",
    image: "/images/shared-room.jpg",
    desc: "Cost-friendly shared spaces",
  },
];

export default async function HomePage() {
  const listings = await getPublishedListings();

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
          <span className="eyebrow">VERIFIED LONG-TERM STAYS</span>
          <h1>Find your next place to call home.</h1>
          <p>
            Explore curated apartments, PGs, and shared rooms ready for move-in.
          </p>

          <form action="/listings" className="heroSearch">
            <label>
              <span>Where</span>
              <input name="q" placeholder="City, neighbourhood, or locality" />
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

            <button type="submit">Search homes</button>
          </form>

          <div className="heroMeta">
            <span>Verified availability</span>
            <span>Zero hidden costs</span>
            <span>Direct provider contact</span>
          </div>
        </div>

        <div className="heroVisual" aria-hidden="true">
          <div className="visualCard visualMain">
            <span className="visualTag">FEATURED STAY</span>
            <div className="visualImage">
              <Image
                src="/images/home-apartment.jpg"
                alt="Sunlit Residence"
                width={430}
                height={290}
                priority
              />
            </div>
            <div className="visualDetails">
              <div>
                <strong>Sunlit Residence</strong>
                <span>Indiranagar · Bengaluru</span>
              </div>
              <strong>
                ₹28k <small>/ month</small>
              </strong>
            </div>
          </div>
          <div className="floatingCard floatingTop">
            <span>AVAILABLE NOW</span>
            <strong>Long-term</strong>
          </div>
          <div className="floatingCard floatingBottom">
            <strong>Ready to move</strong>
            <span>Verified units</span>
          </div>
        </div>
      </section>

      <section className="sectionBlock">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">AVAILABLE NOW</span>
            <h2>Places ready for move-in</h2>
          </div>
          <Link href="/listings">
            View all available stays ({listings.length}) →
          </Link>
        </div>

        <div className="listingGrid" style={{ margin: "0", padding: "0" }}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="sectionBlock">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">BROWSE BY TYPE</span>
            <h2>Explore places by stay style</h2>
          </div>
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
              <p>{cat.desc}</p>
              <strong>Explore {cat.title.toLowerCase()} →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="providerBanner">
        <div>
          <span className="eyebrow">FOR PROPERTY PROVIDERS</span>
          <h2>Have a place to rent?</h2>
          <p>
            Publish listings, track inquiries, and update availability
            instantly.
          </p>
        </div>
        <Link className="bannerButton" href="/provider">
          Open provider workspace →
        </Link>
      </section>

      <footer className="siteFooter">
        <strong>myStay</strong>
        <span>Verified long-term rental marketplace.</span>
      </footer>
    </main>
  );
}
