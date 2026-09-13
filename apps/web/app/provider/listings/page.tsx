import Link from 'next/link';
import '../provider.css';
import './workspace.css';

const listings = [
  ['Sunlit 2BHK', 'Indiranagar, Bengaluru', 'Home', '₹28,000', 'Published', '2 units'],
  ['Green View PG', 'Kothrud, Pune', 'PG', '₹12,500', 'Published', '12 units'],
  ['City Shared Room', 'HSR Layout, Bengaluru', 'Shared room', '₹9,000', 'Draft', '8 units'],
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
          <p>Build, publish, and maintain the listings that represent your rental inventory.</p>
        </div>
        <Link className="workspacePrimary" href="/provider/listings/new">
          + Create listing
        </Link>
      </section>

      <section className="workspaceStats">
        <div><strong>3</strong><span>Total listings</span></div>
        <div><strong>2</strong><span>Published</span></div>
        <div><strong>1</strong><span>Draft</span></div>
        <div><strong>22</strong><span>Units represented</span></div>
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
          {listings.map(([title, location, type, price, status, units]) => (
            <article className="providerListingRow" key={title}>
              <div className="listingVisual">
                <span>{type}</span>
              </div>
              <div className="rowMain">
                <span className="rowType">{type}</span>
                <h3>{title}</h3>
                <p>{location}</p>
              </div>
              <div className="rowMetric"><span>Rent</span><strong>{price}<small> / mo</small></strong></div>
              <div className="rowMetric"><span>Status</span><strong className={status.toLowerCase()}>{status}</strong></div>
              <div className="rowMetric"><span>Inventory</span><strong>{units}</strong></div>
              <Link className="rowAction" href="/provider/listings/edit">Edit →</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
