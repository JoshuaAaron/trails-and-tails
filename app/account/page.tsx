import Link from "next/link";

export default function AccountPage() {
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
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "24px",
                fontWeight: 700,
                color: "var(--bb-text-primary)",
              }}
            >
              Trails & Tails
            </span>
          </Link>
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
          </nav>
        </div>
      </header>

      {/* Account Content */}
      <main
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--bb-font-heading)",
            fontSize: "36px",
            fontWeight: 700,
            marginBottom: "2rem",
            color: "var(--bb-text-primary)",
          }}
        >
          Account Dashboard
        </h1>

        {/* Auth Stub Notice */}
        <div
          style={{
            backgroundColor: "var(--bb-foam)",
            padding: "1.5rem",
            borderRadius: "var(--bb-radius-card)",
            marginBottom: "2rem",
            border: "1px solid var(--bb-border)",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--bb-font-heading)",
              fontSize: "20px",
              fontWeight: 600,
              marginBottom: "0.5rem",
              color: "var(--bb-brand-2)",
            }}
          >
            Demo Mode
          </h3>
          <p style={{ color: "var(--bb-brand-2)", marginBottom: "1rem" }}>
            This is a demonstration account page. In a full implementation, this would include authentication, user profiles, and booking management.
          </p>
          <button
            style={{
              backgroundColor: "var(--bb-brand)",
              color: "var(--bb-text-on-brand)",
              padding: "8px 16px",
              borderRadius: "var(--bb-radius-input)",
              border: "none",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Sign In / Sign Up
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Bookings Section */}
          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              padding: "2rem",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              border: "1px solid var(--bb-border)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "1.5rem",
                color: "var(--bb-text-primary)",
              }}
            >
              My Bookings
            </h2>
            
            {/* Demo Booking */}
            <div
              style={{
                backgroundColor: "var(--bb-mist)",
                padding: "1rem",
                borderRadius: "var(--bb-radius-input)",
                marginBottom: "1rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <h4 style={{ fontWeight: 600, color: "var(--bb-text-primary)" }}>Ridge Creek Yard</h4>
                <span
                  style={{
                    backgroundColor: "var(--bb-moss)",
                    color: "var(--bb-text-on-brand)",
                    padding: "2px 8px",
                    borderRadius: "var(--bb-radius-pill)",
                    fontSize: "12px",
                    fontWeight: 500,
                  }}
                >
                  Confirmed
                </span>
              </div>
              <p style={{ fontSize: "14px", color: "var(--bb-text-primary)", marginBottom: "0.5rem" }}>
                November 15, 2025 • 10:00 AM - 12:00 PM
              </p>
              <p style={{ fontSize: "14px", color: "var(--bb-text-primary)" }}>
                Confirmation: BB-A1B2C3
              </p>
            </div>

            <Link
              href="/search"
              style={{
                display: "block",
                backgroundColor: "var(--bb-brand)",
                color: "var(--bb-text-on-brand)",
                padding: "12px",
                borderRadius: "var(--bb-radius-input)",
                textAlign: "center",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Book Another Yard
            </Link>
          </div>

          {/* Profile Section */}
          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              padding: "2rem",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              border: "1px solid var(--bb-border)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "1.5rem",
                color: "var(--bb-text-primary)",
              }}
            >
              Profile
            </h2>
            
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                  color: "var(--bb-text-primary)",
                }}
              >
                Name
              </label>
              <input
                type="text"
                value="Demo User"
                disabled
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "var(--bb-radius-input)",
                  border: "1px solid var(--bb-border)",
                  backgroundColor: "var(--bb-mist)",
                }}
              />
            </div>
            
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                  color: "var(--bb-text-primary)",
                }}
              >
                Email
              </label>
              <input
                type="email"
                value="demo@trailsandtails.com"
                disabled
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "var(--bb-radius-input)",
                  border: "1px solid var(--bb-border)",
                  backgroundColor: "var(--bb-mist)",
                }}
              />
            </div>

            <button
              style={{
                width: "100%",
                backgroundColor: "var(--bb-accent)",
                color: "var(--bb-brand-2)",
                padding: "12px",
                borderRadius: "var(--bb-radius-input)",
                border: "none",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Edit Profile
            </button>
          </div>

          {/* Host Section */}
          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              padding: "2rem",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              border: "1px solid var(--bb-border)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "1.5rem",
                color: "var(--bb-text-primary)",
              }}
            >
              Hosting
            </h2>
            
            <p style={{ marginBottom: "1.5rem", color: "var(--bb-text-primary)" }}>
              Share your yard with dog families and earn extra income.
            </p>
            
            <Link
              href="/host"
              style={{
                display: "block",
                backgroundColor: "var(--bb-brand)",
                color: "var(--bb-text-on-brand)",
                padding: "12px",
                borderRadius: "var(--bb-radius-input)",
                textAlign: "center",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Become a Host
            </Link>
          </div>

          {/* Settings */}
          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              padding: "2rem",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              border: "1px solid var(--bb-border)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "1.5rem",
                color: "var(--bb-text-primary)",
              }}
            >
              Settings
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "var(--bb-text-primary)",
                  padding: "8px 12px",
                  borderRadius: "var(--bb-radius-input)",
                  border: "1px solid var(--bb-border)",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                Notifications
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "var(--bb-text-primary)",
                  padding: "8px 12px",
                  borderRadius: "var(--bb-radius-input)",
                  border: "1px solid var(--bb-border)",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                Privacy
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "var(--bb-text-primary)",
                  padding: "8px 12px",
                  borderRadius: "var(--bb-radius-input)",
                  border: "1px solid var(--bb-border)",
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                Help & Support
              </button>
            </div>
          </div>

          {/* Flutter Demo Link */}
          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              padding: "2rem",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              border: "1px solid var(--bb-border)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "1.5rem",
                color: "var(--bb-text-primary)",
              }}
            >
              Demo Features
            </h2>
            
            <p style={{ marginBottom: "1.5rem", color: "var(--bb-text-primary)" }}>
              Explore our Flutter Web demo with the same brand tokens.
            </p>
            
            <Link
              href="/flutter-demo"
              style={{
                display: "block",
                backgroundColor: "var(--bb-accent)",
                color: "var(--bb-brand-2)",
                padding: "12px",
                borderRadius: "var(--bb-radius-input)",
                textAlign: "center",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              View Flutter Demo
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}