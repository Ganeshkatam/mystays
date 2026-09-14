import Link from "next/link";
import Image from "next/image";
import type { Listing } from "../lib/listings-data";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="listing">
      <Link href={`/listings/${listing.id}`} className="photoContainer">
        <Image
          src={listing.image}
          alt={listing.title}
          width={600}
          height={340}
          className="photoImg"
        />
        <span className="photoTag">{listing.type}</span>
        {listing.featured && <span className="featuredLabel">Featured</span>}
      </Link>

      <div className="listingBody">
        <div className="listingTopline">
          <span>{listing.type}</span>
        </div>

        <Link href={`/listings/${listing.id}`}>
          <h2>{listing.title}</h2>
        </Link>

        <p className="listingLocation">{listing.location}</p>
        <p className="listingMeta">{listing.meta}</p>

        <div className="listingFooter">
          <div>
            <strong>{listing.price}</strong>
            <span>/ month</span>
          </div>
          <Link className="listingCta" href={`/listings/${listing.id}`}>
            View place →
          </Link>
        </div>
      </div>
    </article>
  );
}
