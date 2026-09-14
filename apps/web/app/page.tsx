import Link from "next/link";
import Image from "next/image";
import {
  PremiumDropdown,
  type DropdownOption,
} from "../components/premium-dropdown";

const stayTypeOptions: DropdownOption[] = [
  {
    value: "",
    label: "Any stay type",
    description: "Explore all homes, PGs, and shared rooms",
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
    description: "Serviced stays with meals & Wi-Fi",
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
    description: "Private apartments and independent homes for longer stays.",
    href: "/listings?type=home",
    icon: "⌂",
    image: "/images/home-apartment.jpg",
  },
  {
    title: "PGs",
    description: "Managed accommodation with practical long-term essentials.",
    href: "/listings?type=pg",
    icon: "▦",
    image: "/images/pg-room.jpg",
  },
  {
    title: "Shared rooms",
    description: "Flexible shared living with transparent monthly pricing.",
    href: "/listings?type=shared_room",
    icon: "◫",
    image: "/images/shared-room.jpg",
  },
];

const benefits = [
  [
    "Long-term focused",
    "Search around monthly living instead of short-stay noise.",
  ],
  ["Clear pricing", "See monthly rent and important costs before you inquire."],
  ["Direct inquiries", "Ask providers questions from the listing itself."],
];

export default function HomePage() {
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
          <span className="eyebrow">THE LONG-TERM RENTAL MARKETPLACE</span>
          <h1>Find your next place to call home.</h1>
          <p>
            Discover homes, PGs, and shared rooms built around the realities of
            long-term living.
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
            <span>Monthly living</span>
            <span>Flexible choices</span>
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
            <strong>3,200+</strong>
            <span>ways to stay</span>
          </div>
        </div>
      </section>

      <section className="sectionBlock">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">EXPLORE YOUR WAY</span>
            <h2>Choose the kind of place that fits your life.</h2>
          </div>
          <Link href="/listings">View all stays →</Link>
        </div>

        <div className="categoryGrid">
          {categories.map((category, index) => (
            <Link
              className="categoryCard"
              href={category.href}
              key={category.title}
            >
              <div className="categoryThumb">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={380}
                  height={140}
                />
              </div>
              <span className="categoryNumber">0{index + 1}</span>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <strong>Explore {category.title.toLowerCase()} →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="whySection">
        <div>
          <span className="eyebrow">WHY MYSTAY</span>
          <h2>Built for the part of renting that happens after the search.</h2>
        </div>

        <div className="benefitList">
          {benefits.map(([title, description], index) => (
            <div className="benefit" key={title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="providerBanner">
        <div>
          <span className="eyebrow">FOR PROPERTY PROVIDERS</span>
          <h2>Have a place people would love to live in?</h2>
          <p>
            Manage listings, inventory, inquiries, and availability from one
            workspace.
          </p>
        </div>
        <Link className="bannerButton" href="/provider">
          Open provider workspace →
        </Link>
      </section>

      <footer className="siteFooter">
        <strong>myStay</strong>
        <span>Long-term living, simplified.</span>
      </footer>
    </main>
  );
}
