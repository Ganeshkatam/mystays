import Link from "next/link";
import "../workspace.css";

const properties = [
  ["Green View Residence", "Kothrud, Pune", "Residential", "12", "9"],
  ["Sunlit Apartments", "Indiranagar, Bengaluru", "Apartment", "6", "4"],
];

export default function ProviderPropertiesPage() {
  return (
    <main>
      <nav className="nav">
        <Link href="/provider">
          <strong>myStay</strong>
        </Link>
        <div>
          <Link href="/provider/listings">Listings</Link>
          <Link href="/provider/inquiries">Inquiries</Link>
        </div>
      </nav>

      <section className="workspaceHero">
        <div>
          <span className="eyebrow">PROPERTIES</span>
          <h1>Your properties, organised around real inventory.</h1>
          <p>
            Keep the buildings and rental spaces behind your listings accurate
            and easy to manage.
          </p>
        </div>
        <Link className="workspacePrimary" href="/provider/properties/new">
          + Add property
        </Link>
      </section>

      <section className="workspaceStats">
        <div>
          <strong>2</strong>
          <span>Properties</span>
        </div>
        <div>
          <strong>18</strong>
          <span>Total units</span>
        </div>
        <div>
          <strong>13</strong>
          <span>Available units</span>
        </div>
        <div>
          <strong>72%</strong>
          <span>Occupancy</span>
        </div>
      </section>

      <section className="propertyGrid">
        {properties.map(([name, location, type, units, available]) => (
          <article className="propertyWorkspaceCard" key={name}>
            <div className="propertyVisual">
              <span>{type}</span>
            </div>
            <div className="propertyWorkspaceBody">
              <span className="rowType">{type}</span>
              <h2>{name}</h2>
              <p>{location}</p>
              <div className="propertyNumbers">
                <div>
                  <strong>{units}</strong>
                  <span>Units</span>
                </div>
                <div>
                  <strong>{available}</strong>
                  <span>Available</span>
                </div>
              </div>
              <Link className="rowAction" href="/provider/properties">
                Manage property →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
