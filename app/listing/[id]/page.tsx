import Link from "next/link";

export default function ListingPage({ params }: { params: { id: string } }) {
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
              }}
            >
              Account
            </Link>
          </nav>
        </div>
      </header>

      {/* Listing Content */}
      <main
        style={{
          maxWidth: "1144px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        {/* Breadcrumb */}
        <nav style={{ marginBottom: "2rem" }}>
          <Link
            href="/search"
            style={{
              color: "var(--bb-brand)",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            ← Back to search
          </Link>
        </nav>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left Column - Photos and Details */}
          <div>
            {/* Photo Gallery */}
            <div
              style={{
                backgroundColor: "var(--bb-foam)",
                height: "400px",
                borderRadius: "var(--bb-radius-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--bb-brand-2)",
                marginBottom: "2rem",
                fontSize: "18px",
              }}
            >
              Photo Gallery
            </div>

            {/* Details */}
            <div
              style={{
                backgroundColor: "var(--bb-bg-surface)",
                padding: "2rem",
                borderRadius: "var(--bb-radius-card)",
                boxShadow: "var(--bb-shadow-card)",
                border: "1px solid var(--bb-border)",
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
                {params.id === "ridge-creek" ? "Ridge Creek Yard" : "Meadow Shade Acre"}
              </h1>
              
              <p style={{ fontSize: "18px", marginBottom: "2rem", color: "var(--bb-text-primary)" }}>
                {params.id === "ridge-creek" 
                  ? "Secure fencing and shade by the creek."
                  : "Open meadow with trees and privacy fence."
                }
              </p>

              {/* Amenities */}
              <h3
                style={{
                  fontFamily: "var(--bb-font-heading)",
                  fontSize: "24px",
                  fontWeight: 600,
                  marginBottom: "1rem",
                  color: "var(--bb-text-primary)",
                }}
              >
                Amenities
              </h3>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                <span
                  style={{
                    backgroundColor: "var(--bb-moss)",
                    color: "var(--bb-text-on-brand)",
                    padding: "4px 12px",
                    borderRadius: "var(--bb-radius-pill)",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Fenced
                </span>
                <span
                  style={{
                    backgroundColor: "var(--bb-moss)",
                    color: "var(--bb-text-on-brand)",
                    padding: "4px 12px",
                    borderRadius: "var(--bb-radius-pill)",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  Shade
                </span>
                {params.id === "ridge-creek" && (
                  <span
                    style={{
                      backgroundColor: "var(--bb-moss)",
                      color: "var(--bb-text-on-brand)",
                      padding: "4px 12px",
                      borderRadius: "var(--bb-radius-pill)",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Water
                  </span>
                )}
              </div>

              {/* Host Notes */}
              <h3
                style={{
                  fontFamily: "var(--bb-font-heading)",
                  fontSize: "20px",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                  color: "var(--bb-text-primary)",
                }}
              >
                Host Notes
              </h3>
              <p style={{ color: "var(--bb-text-primary)" }}>
                {params.id === "ridge-creek" 
                  ? "Please keep the gate latched."
                  : "Park in the gravel area by the barn."
                }
              </p>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div
            style={{
              backgroundColor: "var(--bb-bg-surface)",
              padding: "2rem",
              borderRadius: "var(--bb-radius-card)",
              boxShadow: "var(--bb-shadow-card)",
              border: "1px solid var(--bb-border)",
              position: "sticky",
              top: "2rem",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "var(--bb-brand)",
                marginBottom: "1.5rem",
              }}
            >
              ${params.id === "ridge-creek" ? "18" : "15"}/hour
            </div>

            {/* Booking Form */}
            <form>
              <div style={{ marginBottom: "1rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                    color: "var(--bb-text-primary)",
                  }}
                >
                  Date
                </label>
                <input
                  type="date"
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
                    Start Time
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "var(--bb-radius-input)",
                      border: "1px solid var(--bb-border)",
                      backgroundColor: "var(--bb-bg-surface)",
                    }}
                  >
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                  </select>
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
                    End Time
                  </label>
                  <select
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "var(--bb-radius-input)",
                      border: "1px solid var(--bb-border)",
                      backgroundColor: "var(--bb-bg-surface)",
                    }}
                  >
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>1:00 PM</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: 500,
                    color: "var(--bb-text-primary)",
                  }}
                >
                  Guest Notes (optional)
                </label>
                <textarea
                  placeholder="Any special requests or notes for the host..."
                  rows={3}
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

              <Link
                href="/booking/confirm"
                style={{
                  display: "block",
                  backgroundColor: "var(--bb-brand)",
                  color: "var(--bb-text-on-brand)",
                  padding: "16px",
                  borderRadius: "var(--bb-radius-card)",
                  textAlign: "center",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "16px",
                  transition: "all 160ms cubic-bezier(0.2,0.8,0.2,1)",
                }}
              >
                Book Now
              </Link>
            </form>

            <p
              style={{
                fontSize: "14px",
                color: "var(--bb-text-primary)",
                marginTop: "1rem",
                textAlign: "center",
              }}
            >
              Free cancellation up to 24 hours before your booking.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}