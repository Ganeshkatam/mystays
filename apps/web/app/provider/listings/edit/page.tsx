import Link from "next/link";
import "../../forms.css";
export default function EditListingPage() {
  return (
    <main className="formPage">
      <Link href="/provider/listings">← Listings</Link>
      <div className="formHeader">
        <div>
          <span className="eyebrow">LISTING EDITOR</span>
          <h1>Refine your listing</h1>
          <p>Keep pricing, description, and stay details accurate.</p>
        </div>
      </div>
      <form className="editor">
        <section className="formSection">
          <h2>Basics</h2>
          <p>Information renters see first.</p>
          <div className="formGrid">
            <label>
              Title
              <input defaultValue="Sunlit 2BHK" maxLength={160} />
            </label>
            <label>
              Stay type
              <select defaultValue="home">
                <option value="home">Home</option>
                <option value="pg">PG</option>
                <option value="shared_room">Shared room</option>
              </select>
            </label>
            <label className="full">
              Description
              <textarea
                defaultValue="Comfortable long-term home close to everyday essentials."
                maxLength={5000}
              />
            </label>
          </div>
        </section>
        <section className="formSection">
          <h2>Monthly costs</h2>
          <p>Transparent costs build better inquiries.</p>
          <div className="formGrid">
            <label>
              Monthly rent
              <input defaultValue="28000" type="number" min="0" />
            </label>
            <label>
              Security deposit
              <input defaultValue="56000" type="number" min="0" />
            </label>
          </div>
        </section>
        <div className="formActions">
          <Link className="secondary" href="/provider/listings">
            Cancel
          </Link>
          <button type="submit">Save changes</button>
        </div>
      </form>
    </main>
  );
}
