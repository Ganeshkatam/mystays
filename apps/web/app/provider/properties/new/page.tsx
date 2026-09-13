import Link from 'next/link';
import '../../forms.css';
import { PremiumDropdown, type DropdownOption } from '../../../../components/premium-dropdown';

const propertyTypeOptions: DropdownOption[] = [
  { value: 'residential', label: 'Residential Apartment', description: 'Gated society, villa, or independent building', badge: 'Home' },
  { value: 'pg', label: 'Paying Guest / Hostel', description: 'Managed accommodation with shared amenities', badge: 'PG' },
  { value: 'shared', label: 'Shared Flat / Co-living', description: 'Multi-room flat leased out per room/bed', badge: 'Shared' },
];

export default function NewPropertyPage() {
  return (
    <main className="formPage">
      <Link href="/provider/properties">← Properties</Link>
      <h1>Add property</h1>
      <form className="editor">
        <label>
          Name
          <input required maxLength={160} />
        </label>
        <label>
          Address
          <input required maxLength={300} />
        </label>
        <label>
          City
          <input required maxLength={100} />
        </label>
        <div>
          <span style={{ display: 'block', marginBottom: 8, fontWeight: 700 }}>Property type</span>
          <PremiumDropdown
            name="type"
            defaultValue="residential"
            options={propertyTypeOptions}
            variant="form"
            ariaLabel="Select property type"
          />
        </div>
        <button>Create property</button>
      </form>
    </main>
  );
}
