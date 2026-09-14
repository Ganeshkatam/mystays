import Link from 'next/link';
import '../provider.css';
import './availability.css';
import { PremiumDropdown, type DropdownOption } from '../../../components/premium-dropdown';

const statusOptions: DropdownOption[] = [
  { value: 'available', label: 'Available', statusColor: 'available', description: 'Ready for a new renter' },
  { value: 'occupied', label: 'Occupied', statusColor: 'occupied', description: 'Currently leased' },
  { value: 'inactive', label: 'Inactive', statusColor: 'inactive', description: 'Maintenance or temporarily unavailable' },
];

const units = [
  { unit: 'Room 204', property: 'Green View Residence', type: 'Private room', rent: '₹12,500', status: 'available' },
  { unit: 'Room 205', property: 'Green View Residence', type: 'Private room', rent: '₹12,500', status: 'occupied' },
  { unit: 'Flat 3A', property: 'Sunlit Apartments', type: '2BHK', rent: '₹28,000', status: 'available' },
  { unit: 'Flat 2B', property: 'Sunlit Apartments', type: '1BHK', rent: '₹21,000', status: 'inactive' },
];

const statusLabels: Record<string, string> = {
  available: 'Available',
  occupied: 'Occupied',
  inactive: 'Inactive',
};

export default function AvailabilityPage() {
  const counts = {
    total: units.length,
    available: units.filter((unit) => unit.status === 'available').length,
    occupied: units.filter((unit) => unit.status === 'occupied').length,
    inactive: units.filter((unit) => unit.status === 'inactive').length,
  };

  return (
    <main>
      <nav className="nav">
        <Link href="/provider"><strong>myStay</strong></Link>
        <div>
          <Link href="/provider/listings">Listings</Link>
          <Link href="/provider/properties">Properties</Link>
          <Link href="/provider/inquiries">Inquiries</Link>
        </div>
      </nav>

      <section className="availabilityHero">
        <div>
          <span className="eyebrow">INVENTORY CONTROL</span>
          <h1>Know what is available before renters ask.</h1>
          <p>Manage unit status from one place and keep marketplace availability aligned with your real inventory.</p>
        </div>
        <div className="availabilityLegend">
          <span><i className="dot available" />Available</span>
          <span><i className="dot occupied" />Occupied</span>
          <span><i className="dot inactive" />Inactive</span>
        </div>
      </section>

      <section className="availabilityStats">
        <div><strong>{counts.total}</strong><span>Total units</span></div>
        <div><strong>{counts.available}</strong><span>Available now</span></div>
        <div><strong>{counts.occupied}</strong><span>Occupied</span></div>
        <div><strong>{counts.inactive}</strong><span>Inactive</span></div>
      </section>

      <section className="availabilityPanel">
        <header>
          <div>
            <span className="eyebrow">UNIT INVENTORY</span>
            <h2>Availability board</h2>
          </div>
          <button type="button" className="availabilityAction">+ Add unit</button>
        </header>

        <div className="unitList">
          {units.map((unit) => (
            <article className="unitRow" key={unit.unit}>
              <div className="unitIcon">{unit.type === '2BHK' ? '2B' : 'RM'}</div>
              <div className="unitIdentity">
                <span>{unit.property}</span>
                <h3>{unit.unit}</h3>
                <p>{unit.type}</p>
              </div>
              <div className="unitMetric">
                <span>Monthly rent</span>
                <strong>{unit.rent}</strong>
              </div>
              <div className="unitStatus">
                <span>Status</span>
                <PremiumDropdown
                  name={'status-' + unit.unit}
                  defaultValue={unit.status}
                  options={statusOptions}
                  variant="status"
                  ariaLabel={'Status for ' + unit.unit}
                />
              </div>
              <button type="button" className="unitMenu" aria-label={'More actions for ' + unit.unit}>•••</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
