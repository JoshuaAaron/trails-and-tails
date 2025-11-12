import Link from "next/link";

export default function SearchPage() {
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
              Brook & Bone
            </span>
          </Link>
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
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
              }}
            >
              Account
            </Link>
          </nav>
        </div>
      </header>

      {/* Search Content */}
      <main
        style={{
          maxWidth: "1144px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--bb-bg-surface)",
            padding: "2rem",
            borderRadius: "var(--bb-radius-card)",
            boxShadow: "var(--bb-shadow-card)",
            marginBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--bb-font-heading)",
              fontSize: "36px",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "var(--bb-text-primary)",
            }}
          >
            Find Your Perfect Yard
          </h1>
          
          {/* Search Filters */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" />
              <span>Fenced</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" />
              <span>Water Access</span>
            </label>
            <input
              type="number"
              placeholder="Min Price ($)"
              style={{
                padding: "8px 12px",
                borderRadius: "var(--bb-radius-input)",
                border: "1px solid var(--bb-border)",
                backgroundColor: "var(--bb-bg-surface)",
              }}
            />
            <input
              type="number"
              placeholder="Max Price ($)"
              style={{
                padding: "8px 12px",
                borderRadius: "var(--bb-radius-input)",
                border: "1px solid var(--bb-border)",
                backgroundColor: "var(--bb-bg-surface)",
              }}
            />
          </div>
          
          {/* Toggle between List and Map */}
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              style={{
                backgroundColor: "var(--bb-brand)",
                color: "var(--bb-text-on-brand)",
                padding: "8px 16px",
                borderRadius: "var(--bb-radius-input)",
                border: "none",
                cursor: "pointer",
              }}
            >
              List View
            </button>
            <button
              style={{
                backgroundColor: "var(--bb-accent)",
                color: "var(--bb-brand-2)",
                padding: "8px 16px",
                borderRadius: "var(--bb-radius-input)",
                border: "none",
                cursor: "pointer",
              }}
            >
              Map View
            </button>
          </div>
        </div>

        {/* Results Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Demo Yard Cards */}
          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              overflow: "hidden",
              border: "1px solid var(--bb-border)",
            }}
          >
            <div
              style={{
                height: "200px",
                backgroundColor: "var(--bb-foam)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--bb-brand-2)",
              }}
            >
              Photo
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3
                style={{
                  fontFamily: "var(--bb-font-heading)",
                  fontSize: "20px",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                Ridge Creek Yard
              </h3>
              <p style={{ marginBottom: "1rem", color: "var(--bb-text-primary)" }}>
                Secure fencing and shade by the creek.
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "var(--bb-brand)",
                  }}
                >
                  $18/hour
                </span>
                <Link
                  href="/listing/ridge-creek"
                  style={{
                    backgroundColor: "var(--bb-brand)",
                    color: "var(--bb-text-on-brand)",
                    padding: "8px 16px",
                    borderRadius: "var(--bb-radius-input)",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              overflow: "hidden",
              border: "1px solid var(--bb-border)",
            }}
          >
            <div
              style={{
                height: "200px",
                backgroundColor: "var(--bb-foam)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--bb-brand-2)",
              }}
            >
              Photo
            </div>
            <div style={{ padding: "1.5rem" }}>
              <h3
                style={{
                  fontFamily: "var(--bb-font-heading)",
                  fontSize: "20px",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                Meadow Shade Acre
              </h3>
              <p style={{ marginBottom: "1rem", color: "var(--bb-text-primary)" }}>
                Open meadow with trees and privacy fence.
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "var(--bb-brand)",
                  }}
                >
                  $15/hour
                </span>
                <Link
                  href="/listing/meadow-shade"
                  style={{
                    backgroundColor: "var(--bb-brand)",
                    color: "var(--bb-text-on-brand)",
                    padding: "8px 16px",
                    borderRadius: "var(--bb-radius-input)",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}