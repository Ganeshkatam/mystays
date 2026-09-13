import Link from 'next/link';
import '../provider.css';
import '../table.css';
import { PremiumDropdown, type DropdownOption } from '../../../components/premium-dropdown';

const availabilityOptions: DropdownOption[] = [
  { value: 'available', label: 'Available', statusColor: 'available', description: 'Ready for new renter move-in' },
  { value: 'occupied', label: 'Occupied', statusColor: 'occupied', description: 'Currently leased' },
  { value: 'inactive', label: 'Inactive', statusColor: 'inactive', description: 'Under maintenance or unlisted' },
];

export default function AvailabilityPage() {
  return (
    <main>
      <nav className="nav">
        <Link href="/provider">
          <strong>myStay</strong>
        </Link>
        <div>
          <a href="/provider/listings">Listings</a>
          <a href="/provider/inquiries">Inquiries</a>
        </div>
      </nav>
      <section className="providerHero">
        <span className="eyebrow">AVAILABILITY</span>
        <h1>Inventory status</h1>
        <p>Keep each rental unit accurate so renters only see places that can be occupied.</p>
      </section>
      <section className="tableCard">
        <div className="propertyCard">
          <h2>Room 204</h2>
          <p>Green View Residence · ₹12,500 / month</p>
          <div style={{ maxWidth: 220, marginTop: 12 }}>
            <PremiumDropdown
              name="status"
              defaultValue="available"
              options={availabilityOptions}
              variant="status"
              ariaLabel="Update room status"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
