import Link from "next/link";
import "../provider.css";
import "../workspace.css";

interface ProviderListingItem {
  title: string;
  location: string;
  type: string;
  price: string;
  status: string;
  units: string;
}

const listings: ProviderListingItem[] = [
  {
    title: "Sunlit 2BHK",
    location: "Indiranagar, Bengaluru",
    type: "Home",
    price: "₹28,000",
    status: "Published",
    units: "2 units",
  },
  {
    title: "Green View PG",
    location: "Kothrud, Pune",
    type: "PG",
    price: "₹12,500",
    status: "Published",
    units: "12 units",
  },
  {
    title: "City Shared Room",
    location: "HSR Layout, Bengaluru",
    type: "Shared room",
    price: "₹9,000",
    status: "Draft",
    units: "8 units",
  },
];

export default function ProviderListingsPage() {
  return (
    <main>
      <nav className="nav">
        <Link href="/provider">
          <strong>myStay</strong>
        </Link>
        <div>
          <Link href="/provider/properties">Properties</Link>
          <Link href="/provider/inquiries">Inquiries</Link>
          <Link href="/notifications">Notifications</Link>
        </div>
      </nav>

      <section className="workspaceHero">
        <div>
          <span className="eyebrow">LISTINGS</span>
          <h1>Turn available inventory into places people can find.</h1>
          <p>
            Build, publish, and maintain the listings that represent your rental
            inventory.
          </p>
        </div>
        <Link className="workspacePrimary" href="/provider/listings/new">
          + Create listing
        </Link>
      </section>

      <section className="workspaceStats">
        <div>
          <strong>3</strong>
          <span>Total listings</span>
        </div>
        <div>
          <strong>2</strong>
          <span>Published</span>
        </div>
        <div>
          <strong>1</strong>
          <span>Draft</span>
        </div>
        <div>
          <strong>22</strong>
          <span>Units represented</span>
        </div>
      </section>

      <section className="providerTable">
        <div className="tableTitle">
          <div>
            <span className="eyebrow">INVENTORY</span>
            <h2>All listings</h2>
          </div>
          <select defaultValue="all" aria-label="Filter listings">
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="listingRows">
          {listings.map((item) => (
            <article className="providerListingRow" key={item.title}>
              <div className="listingVisual">
                <span>{item.type}</span>
              </div>
              <div className="rowMain">
                <span className="rowType">{item.type}</span>
                <h3>{item.title}</h3>
                <p>{item.location}</p>
              </div>
              <div className="rowMetric">
                <span>Rent</span>
                <strong>
                  {item.price}
                  <small> / mo</small>
                </strong>
              </div>
              <div className="rowMetric">
                <span>Status</span>
                <strong className={item.status.toLowerCase()}>
                  {item.status}
                </strong>
              </div>
              <div className="rowMetric">
                <span>Inventory</span>
                <strong>{item.units}</strong>
              </div>
              <Link className="rowAction" href="/provider/listings/edit">
                Edit →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
