import '../../forms.css';
export default function EditListingPage() {
  return (
    <main className="formPage">
      <a href="/provider/listings">← Listings</a>
      <h1>Edit listing</h1>
      <p>Draft listings can be edited before publication.</p>
      <form className="editor">
        <label>
          Title
          <input defaultValue="Sunlit 2BHK" maxLength={160} />
        </label>
        <label>
          Description
          <textarea defaultValue="Comfortable long-term home." maxLength={5000} />
        </label>
        <label>
          Monthly rent
          <input defaultValue="28000" type="number" min="0" />
        </label>
        <label>
          Deposit
          <input defaultValue="56000" type="number" min="0" />
        </label>
        <button>Save changes</button>
      </form>
    </main>
  );
}
