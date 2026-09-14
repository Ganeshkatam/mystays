import Link from "next/link";
import Image from "next/image";
import "../detail.css";

const facts = [
  ["Bedrooms", "2"],
  ["Bathrooms", "2"],
  ["Furnishing", "Furnished"],
  ["Availability", "Available now"],
];

const gallery = [
  { src: "/images/home-apartment.jpg", label: "Living room" },
  { src: "/images/detail-bedroom.jpg", label: "Bedroom" },
  { src: "/images/detail-kitchen.jpg", label: "Kitchen" },
];

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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
              src="/images/home-apartment.jpg"
              alt="Sunlit 2BHK Interior"
              fill
              priority
              className="detailCoverImg"
            />
            <div className="detailCoverOverlay">
              <span>HOME · FEATURED</span>
              <strong>2BHK</strong>
            </div>
          </div>
          <div className="detailThumbs">
            {gallery.map(({ src, label }) => (
              <div key={label} className="detailThumbItem">
                <Image src={src} alt={label} fill className="detailThumbImg" />
                <span className="detailThumbLabel">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="detailPanel">
          <span className="status">AVAILABLE · LONG TERM</span>
          <h1>Sunlit 2BHK</h1>
          <p className="detailLocation">Indiranagar, Bengaluru</p>

          <div className="price">
            <strong>₹28,000</strong>
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
            <p>
              A comfortable long-term home close to everyday essentials,
              neighbourhood cafés, transport, and work hubs.
            </p>
          </div>

          <form className="inquiryBox">
            <div>
              <h2>Interested in this place?</h2>
              <p>Send the provider a message about your move-in plans.</p>
            </div>
            <textarea
              name="message"
              required
              minLength={1}
              maxLength={5000}
              placeholder="Hi, I'm interested in this listing..."
            />
            <button type="submit">Send inquiry</button>
          </form>
        </aside>
      </section>

      <p className="listingId">Listing reference · {id}</p>
    </main>
  );
}
