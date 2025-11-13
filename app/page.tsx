import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bb-bg-primary)" }}>
      {/* Header */}
      <header
        style={{
          backgroundColor: "var(--bb-bg-surface)",
          borderBottom: "1px solid var(--bb-border)",
          padding: "1rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1144px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Image src="/wordmark.svg" alt="Trails & Tails" width={120} height={32} />
          </div>
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <Link
              href="/search"
              style={{
                color: "var(--bb-text-primary)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Find a yard
            </Link>
            <Link
              href="/host"
              style={{
                color: "var(--bb-text-primary)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Become a Host
            </Link>
            <Link
              href="/account"
              style={{
                backgroundColor: "var(--bb-brand)",
                color: "var(--bb-text-on-brand)",
                padding: "12px 16px",
                borderRadius: "var(--bb-radius-card)",
                textDecoration: "none",
                fontWeight: 500,
                transition: "background-color 160ms cubic-bezier(0.2,0.8,0.2,1)",
              }}
            >
              Account
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main
        style={{
          maxWidth: "1144px",
          margin: "0 auto",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "var(--bb-font-heading)",
              fontSize: "48px",
              lineHeight: 1.2,
              fontWeight: 700,
              color: "var(--bb-text-primary)",
              marginBottom: "1.5rem",
            }}
          >
            Private yards. Big adventures.
          </h1>
          <h2
            style={{
              fontSize: "24px",
              lineHeight: 1.6,
              color: "var(--bb-text-primary)",
              marginBottom: "3rem",
              fontWeight: 400,
            }}
          >
            Book secure, serene spaces by the hour—fenced, shaded, host-verified.
          </h2>
          
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/search"
              style={{
                backgroundColor: "var(--bb-brand)",
                color: "var(--bb-text-on-brand)",
                padding: "12px 24px",
                borderRadius: "var(--bb-radius-card)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "18px",
                transition: "all 160ms cubic-bezier(0.2,0.8,0.2,1)",
                display: "inline-block",
              }}
            >
              Find a yard
            </Link>
            <Link
              href="/host"
              style={{
                backgroundColor: "var(--bb-accent)",
                color: "var(--bb-brand-2)",
                padding: "12px 24px",
                borderRadius: "var(--bb-radius-card)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "18px",
                transition: "all 160ms cubic-bezier(0.2,0.8,0.2,1)",
                display: "inline-block",
              }}
            >
              Become a Host
            </Link>
          </div>
        </div>

        {/* Hero Features */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            marginTop: "4rem",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              padding: "2rem",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              border: "1px solid var(--bb-border)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "1rem",
                color: "var(--bb-text-primary)",
              }}
            >
              Secure & Fenced
            </h3>
            <p style={{ color: "var(--bb-text-primary)", lineHeight: 1.6 }}>
              "Secure fencing and shade by the creek."
            </p>
          </div>
          
          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              padding: "2rem",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              border: "1px solid var(--bb-border)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "1rem",
                color: "var(--bb-text-primary)",
              }}
            >
              Quick Response
            </h3>
            <p style={{ color: "var(--bb-text-primary)", lineHeight: 1.6 }}>
              "Hosts typically reply within 2 hours."
            </p>
          </div>
          
          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              padding: "2rem",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              border: "1px solid var(--bb-border)",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "1rem",
                color: "var(--bb-text-primary)",
              }}
            >
            Flexible Booking
            </h3>
            <p style={{ color: "var(--bb-text-primary)", lineHeight: 1.6 }}>
              "Free cancellation up to 24 hours before your booking."
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
