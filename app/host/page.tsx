import Link from "next/link";

export default function HostPage() {
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
              href="/account"
              style={{
                backgroundColor: "var(--bb-brand)",
                color: "var(--bb-text-on-brand)",
                padding: "12px 16px",
                borderRadius: "var(--bb-radius-card)",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Account
            </Link>
          </nav>
        </div>
      </header>

      {/* Host Content */}
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        {/* Hero Section */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontFamily: "var(--bb-font-heading)",
              fontSize: "48px",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "var(--bb-text-primary)",
            }}
          >
            Become a Host
          </h1>
          <p
            style={{
              fontSize: "20px",
              color: "var(--bb-text-primary)",
              marginBottom: "2rem",
            }}
          >
            Share your yard with dog families and earn extra income while helping create safe spaces for happy dogs.
          </p>
        </div>

        {/* Benefits */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              padding: "2rem",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              border: "1px solid var(--bb-border)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                marginBottom: "1rem",
              }}
            >
              💰
            </div>
            <h3
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "var(--bb-text-primary)",
              }}
            >
              Earn Extra Income
            </h3>
            <p style={{ color: "var(--bb-text-primary)" }}>
              Set your own rates and availability. Hosts earn an average of $200-400 per month.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              padding: "2rem",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              border: "1px solid var(--bb-border)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                marginBottom: "1rem",
              }}
            >
              🛡️
            </div>
            <h3
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "var(--bb-text-primary)",
              }}
            >
              Protected & Insured
            </h3>
            <p style={{ color: "var(--bb-text-primary)" }}>
              Every booking is covered by our comprehensive host protection plan.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              padding: "2rem",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              border: "1px solid var(--bb-border)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                marginBottom: "1rem",
              }}
            >
              🤝
            </div>
            <h3
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "0.5rem",
                color: "var(--bb-text-primary)",
              }}
            >
              Build Community
            </h3>
            <p style={{ color: "var(--bb-text-primary)" }}>
              Connect with dog families in your neighborhood and make a positive impact.
            </p>
          </div>
        </div>

        {/* Application Form */}
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
              fontSize: "28px",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: "var(--bb-text-primary)",
            }}
          >
            Apply to Host
          </h2>

          <form>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                    color: "var(--bb-text-primary)",
                  }}
                >
                  Name *
                </label>
                <input
                  type="text"
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "var(--bb-radius-input)",
                    border: "1px solid var(--bb-border)",
                    backgroundColor: "var(--bb-bg-surface)",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                    color: "var(--bb-text-primary)",
                  }}
                >
                  Email *
                </label>
                <input
                  type="email"
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "var(--bb-radius-input)",
                    border: "1px solid var(--bb-border)",
                    backgroundColor: "var(--bb-bg-surface)",
                  }}
                />
              </div>
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
                Phone
              </label>
              <input
                type="tel"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "var(--bb-radius-input)",
                  border: "1px solid var(--bb-border)",
                  backgroundColor: "var(--bb-bg-surface)",
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
                Property Address
              </label>
              <input
                type="text"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "var(--bb-radius-input)",
                  border: "1px solid var(--bb-border)",
                  backgroundColor: "var(--bb-bg-surface)",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                    color: "var(--bb-text-primary)",
                  }}
                >
                  Yard Size (sq ft)
                </label>
                <input
                  type="number"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "var(--bb-radius-input)",
                    border: "1px solid var(--bb-border)",
                    backgroundColor: "var(--bb-bg-surface)",
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                    color: "var(--bb-text-primary)",
                  }}
                >
                  Features
                </label>
                <div style={{ display: "flex", gap: "1rem", paddingTop: "12px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input type="checkbox" />
                    <span>Fenced</span>
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <input type="checkbox" />
                    <span>Water</span>
                  </label>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "2rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                  color: "var(--bb-text-primary)",
                }}
              >
                Additional Notes
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your yard, any special features, access instructions, or other relevant details..."
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "var(--bb-radius-input)",
                  border: "1px solid var(--bb-border)",
                  backgroundColor: "var(--bb-bg-surface)",
                  resize: "vertical",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "var(--bb-brand)",
                color: "var(--bb-text-on-brand)",
                padding: "16px",
                borderRadius: "var(--bb-radius-card)",
                border: "none",
                fontWeight: 600,
                fontSize: "16px",
                cursor: "pointer",
                transition: "all 160ms cubic-bezier(0.2,0.8,0.2,1)",
              }}
            >
              Submit Application
            </button>
          </form>

          <p
            style={{
              fontSize: "14px",
              color: "var(--bb-text-primary)",
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            We'll review your application and get back to you within 2-3 business days.
          </p>
        </div>
      </main>
    </div>
  );
}