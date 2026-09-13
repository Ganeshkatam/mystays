import '../../forms.css';
export default function NewListingPage() {
  return (
    <main className="formPage">
      <a href="/provider/listings">← Listings</a>
      <h1>Create listing</h1>
      <p>Start with the core long-term rental information.</p>
      <form className="editor">
        <label>
          Title
          <input name="title" required maxLength={160} />
        </label>
        <label>
          Description
          <textarea name="description" required maxLength={5000} />
        </label>
        <label>
          Monthly rent
          <input name="monthlyRent" type="number" min="0" required />
        </label>
        <label>
          Deposit
          <input name="deposit" type="number" min="0" required />
        </label>
        <button>Create draft</button>
      </form>
    </main>
  );
}
