import Link from "next/link";

export default function FlutterDemoPage() {
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

      {/* Flutter Demo Content */}
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
            border: "1px solid var(--bb-border)",
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
            Flutter Web Demo
          </h1>
          
          <p
            style={{
              fontSize: "18px",
              marginBottom: "2rem",
              color: "var(--bb-text-primary)",
            }}
          >
            This demonstrates how the same Brook & Bone brand tokens can be used across both React and Flutter Web platforms.
          </p>

          {/* Demo Notice */}
          <div
            style={{
              backgroundColor: "var(--bb-foam)",
              padding: "1.5rem",
              borderRadius: "var(--bb-radius-input)",
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
              Flutter Implementation Note
            </h3>
            <p style={{ color: "var(--bb-brand-2)", marginBottom: "1rem" }}>
              In a full implementation, this page would either embed a Flutter Web build via iframe or link to a standalone Flutter Web app. 
              The Flutter app would use the same brand tokens from <code style={{ backgroundColor: "var(--bb-mist)", padding: "2px 4px", borderRadius: "4px" }}>brand_tokens.json</code>.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
                Launch Flutter Demo
              </button>
              <button
                style={{
                  backgroundColor: "var(--bb-accent)",
                  color: "var(--bb-brand-2)",
                  padding: "8px 16px",
                  borderRadius: "var(--bb-radius-input)",
                  border: "none",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                View Source Code
              </button>
            </div>
          </div>
        </div>

        {/* Brand Token Preview */}
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
            Shared Brand Tokens
          </h2>

          <p style={{ marginBottom: "2rem", color: "var(--bb-text-primary)" }}>
            These colors and design tokens are used consistently across both the React (Next.js) and Flutter Web implementations:
          </p>

          {/* Color Palette */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {[
              { name: "Brook", color: "var(--bb-brook)", desc: "Primary brand" },
              { name: "Ridge", color: "var(--bb-ridge)", desc: "Secondary brand" },
              { name: "Bone", color: "var(--bb-bone)", desc: "Accent" },
              { name: "Moss", color: "var(--bb-moss)", desc: "Success" },
              { name: "Ember", color: "var(--bb-ember)", desc: "Warning" },
              { name: "Foam", color: "var(--bb-foam)", desc: "Info background" },
              { name: "Mist", color: "var(--bb-mist)", desc: "Primary background" },
              { name: "Slate", color: "var(--bb-slate)", desc: "Border" },
            ].map((colorInfo) => (
              <div
                key={colorInfo.name}
                style={{
                  backgroundColor: "var(--bb-bg-surface)",
                  padding: "1rem",
                  borderRadius: "var(--bb-radius-input)",
                  border: "1px solid var(--bb-border)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    backgroundColor: colorInfo.color,
                    height: "60px",
                    borderRadius: "var(--bb-radius-input)",
                    marginBottom: "0.5rem",
                    border: "1px solid var(--bb-border)",
                  }}
                />
                <h4 style={{ fontWeight: 600, marginBottom: "0.25rem", color: "var(--bb-text-primary)" }}>
                  {colorInfo.name}
                </h4>
                <p style={{ fontSize: "14px", color: "var(--bb-text-primary)" }}>
                  {colorInfo.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Component Examples */}
          <h3
            style={{
              fontFamily: "var(--bb-font-heading)",
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "1rem",
              color: "var(--bb-text-primary)",
            }}
          >
            Component Examples
          </h3>
          
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
            {/* Primary Button */}
            <button
              style={{
                backgroundColor: "var(--bb-brand)",
                color: "var(--bb-text-on-brand)",
                padding: "12px 16px",
                borderRadius: "var(--bb-radius-card)",
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Primary Button
            </button>

            {/* Secondary Button */}
            <button
              style={{
                backgroundColor: "var(--bb-accent)",
                color: "var(--bb-brand-2)",
                padding: "12px 16px",
                borderRadius: "var(--bb-radius-card)",
                border: "none",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Secondary Button
            </button>

            {/* Input */}
            <input
              type="text"
              placeholder="Input example"
              style={{
                padding: "12px",
                borderRadius: "var(--bb-radius-input)",
                border: "1px solid var(--bb-border)",
                backgroundColor: "var(--bb-bg-surface)",
              }}
            />

            {/* Badge */}
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
              Success Badge
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}