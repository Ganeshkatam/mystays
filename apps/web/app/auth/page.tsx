import Link from "next/link";
import "./auth.css";

export default function AuthPage() {
  return (
    <main className="authPage">
      <section className="authBrand">
        <Link className="brand" href="/">
          myStay
        </Link>
        <div>
          <span className="eyebrow">LONG-TERM LIVING</span>
          <h1>Find a place that feels like yours.</h1>
          <p>
            Save your favourite stays, manage inquiries, and keep your rental
            journey in one place.
          </p>
        </div>
        <div className="authProof">
          <strong>Homes · PGs · Shared rooms</strong>
          <span>Built around monthly living.</span>
        </div>
      </section>
      <section className="authCard">
        <span className="eyebrow">WELCOME BACK</span>
        <h2>Sign in</h2>
        <p className="authSubtitle">Continue your myStay journey.</p>
        <form className="authForm">
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete="current-password"
              placeholder="At least 8 characters"
            />
          </label>
          <div className="authOptions">
            <label className="check">
              <input type="checkbox" name="remember" /> Remember me
            </label>
            <button type="button" className="textLink">
              Forgot password?
            </button>
          </div>
          <button className="authSubmit" type="submit">
            Sign in
          </button>
        </form>
        <div className="authDivider">
          <span>New to myStay?</span>
        </div>
        <Link className="secondaryAuth" href="/auth/signup">
          Create an account
        </Link>
        <Link className="backHome" href="/">
          ← Back to marketplace
        </Link>
      </section>
    </main>
  );
}
