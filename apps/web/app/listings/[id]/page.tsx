import Link from "next/link";
import Image from "next/image";
import "../detail.css";
import { getPublishedListingById } from "../../../lib/listings-data";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = await getPublishedListingById(id);

  if (!listing) {
    return (
      <main>
        <nav className="siteNav">
          <Link className="brand" href="/">
            myStay
          </Link>
          <div className="navLinks">
            <Link href="/listings">Explore</Link>
            <Link href="/auth">Sign in</Link>
          </div>
        </nav>
        <div
          style={{
            maxWidth: 800,
            margin: "80px auto",
            textAlign: "center",
            padding: "0 20px",
          }}
        >
          <h1>Listing not found</h1>
          <p style={{ color: "var(--muted)", margin: "16px 0 24px" }}>
            This place is either unavailable or has been unlisted.
          </p>
          <Link
            href="/listings"
            style={{ color: "var(--brand)", fontWeight: 700 }}
          >
            ← Back to all stays
          </Link>
        </div>
      </main>
    );
  }

  const property = listing.properties;
  const inventory = listing.inventory;
  const media = listing.listing_media || [];
  const coverImage = media[0]?.object_key || "/images/home-apartment.jpg";
  const defaultLabels = ["Living space", "Bedroom", "Kitchen"];

  const facts = [
    ["Property", property?.name || "Verified Residence"],
    ["Type", (property?.property_type || "HOME").toUpperCase()],
    ["Unit / Space", inventory?.label || "Private Unit"],
    ["Furnishing", inventory?.furnishing || "Furnished"],
    ["Deposit", `₹${Number(listing.deposit).toLocaleString("en-IN")}`],
    [
      "Availability",
      listing.available_from
        ? `From ${listing.available_from}`
        : "Available now",
    ],
  ];

  return (
    <main>
      <nav className="siteNav">
        <Link className="brand" href="/">
          myStay
        </Link>
        <div className="navLinks">
          <Link href="/listings">Explore</Link>
          <Link href="/auth">Sign in</Link>
        </div>
      </nav>

      <section className="detailPage">
        <div className="detailGallery">
          <div className="detailCover">
            <Image
              src={coverImage}
              alt={listing.title}
              fill
              priority
              className="detailCoverImg"
            />
            <div className="detailCoverOverlay">
              <span>
                {(property?.property_type || "HOME").toUpperCase()} · VERIFIED
              </span>
              <strong>{inventory?.label || "Ready"}</strong>
            </div>
          </div>
          {media.length > 0 && (
            <div className="detailThumbs">
              {media.slice(0, 3).map((item, idx) => (
                <div key={item.object_key + idx} className="detailThumbItem">
                  <Image
                    src={item.object_key}
                    alt={`${listing.title} photo ${idx + 1}`}
                    fill
                    className="detailThumbImg"
                  />
                  <span className="detailThumbLabel">
                    {defaultLabels[idx] || `View ${idx + 1}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="detailPanel">
          <span className="status">AVAILABLE · VERIFIED</span>
          <h1>{listing.title}</h1>
          <p className="detailLocation">
            {property
              ? `${property.address_line1 ? property.address_line1 + ", " : ""}${property.locality}, ${property.city}`
              : "Available now"}
          </p>

          <div className="price">
            <strong>
              ₹{Number(listing.monthly_rent).toLocaleString("en-IN")}
            </strong>
            <span>/ month</span>
          </div>

          <div className="detailFacts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>

          <div className="detailDescription">
            <h2>About this place</h2>
            <p>{listing.description}</p>
          </div>

          <form className="inquiryBox" action="/api/v1/inquiries" method="POST">
            <input type="hidden" name="listing_id" value={listing.id} />
            <div>
              <h2>Interested in this place?</h2>
              <p>
                Send the property manager a message about your move-in plans.
              </p>
            </div>
            <textarea
              name="message"
              required
              minLength={1}
              maxLength={5000}
              placeholder="Hi, I'm interested in this place. When is it available for a visit?"
            />
            <button type="submit">Send inquiry</button>
          </form>
        </aside>
      </section>

      <p className="listingId">Listing reference · {id}</p>
    </main>
  );
}
