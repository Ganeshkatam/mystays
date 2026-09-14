import Link from "next/link";
import "../provider.css";
import "./inquiries.css";

const inquiries = [
  {
    id: "inq-01",
    initials: "AR",
    name: "Aarav R.",
    listing: "Sunlit 2BHK",
    location: "Indiranagar, Bengaluru",
    status: "New",
    time: "12 min ago",
    message:
      "Could you share more details about availability and the move-in process?",
  },
  {
    id: "inq-02",
    initials: "NS",
    name: "Nisha S.",
    listing: "Green View PG",
    location: "Kothrud, Pune",
    status: "Awaiting reply",
    time: "2 hours ago",
    message: "Is the room available from the beginning of next month?",
  },
  {
    id: "inq-03",
    initials: "VK",
    name: "Vikram K.",
    listing: "City Shared Room",
    location: "HSR Layout, Bengaluru",
    status: "Replied",
    time: "Yesterday",
    message: "I would like to understand the house rules and deposit terms.",
  },
];

export default function ProviderInquiriesPage() {
  return (
    <main>
      <nav className="nav">
        <Link href="/provider">
          <strong>myStay</strong>
        </Link>
        <div>
          <Link href="/provider/listings">Listings</Link>
          <Link href="/provider/properties">Properties</Link>
          <Link href="/notifications">Notifications</Link>
        </div>
      </nav>

      <section className="inquiryHero">
        <div>
          <span className="eyebrow">RENTER INBOX</span>
          <h1>Good conversations become good tenancies.</h1>
          <p>
            Stay on top of renter interest, answer questions, and keep every
            inquiry attached to the right listing.
          </p>
        </div>
        <div className="inquiryCount">
          <strong>2</strong>
          <span>need your attention</span>
        </div>
      </section>

      <section className="inquiryToolbar">
        <div>
          <strong>Inbox</strong>
          <span>3 conversations</span>
        </div>
        <div className="inquiryFilters">
          <button className="active">All</button>
          <button>New</button>
          <button>Awaiting reply</button>
        </div>
      </section>

      <section className="inquiryList">
        {inquiries.map((inquiry) => (
          <article className="inquiryCard" key={inquiry.id}>
            <div className="avatar">{inquiry.initials}</div>
            <div className="inquiryMain">
              <div className="inquiryTop">
                <div>
                  <span className="inquiryListing">
                    {inquiry.listing} · {inquiry.location}
                  </span>
                  <h2>{inquiry.name}</h2>
                </div>
                <time>{inquiry.time}</time>
              </div>
              <p>{inquiry.message}</p>
              <div className="inquiryBottom">
                <span
                  className={
                    "inquiryStatus status" + inquiry.status.replace(/\s/g, "")
                  }
                >
                  {inquiry.status}
                </span>
                <div>
                  <button className="textButton">View conversation</button>
                  {inquiry.status !== "Replied" && (
                    <button className="replyButton">Reply</button>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
