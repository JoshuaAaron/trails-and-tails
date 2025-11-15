export function ContentSections() {
  return (
    <div style={{ 
      backgroundColor: "var(--bb-bg-surface)",
      padding: "4rem 0" 
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 2rem"
      }}>
        {/* Why rent section */}
        <section style={{ marginBottom: "4rem" }}>
        <h2 style={{
          fontFamily: "var(--bb-font-heading)",
          fontSize: "32px",
          fontWeight: 700,
          color: "var(--bb-text-primary)",
          textAlign: "center",
          marginBottom: "3rem"
        }}>
          Why rent a private dog park?
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem"
        }}>
          {[
            { icon: "🏠", title: "Designed for private play", desc: "Only you and your dogs during your visit" },
            { icon: "⏰", title: "Rentable by the hour", desc: "Book exactly when you need it" },
            { icon: "🆓", title: "Off leash options", desc: "Let your dog run free safely" },
            { icon: "🏞️", title: "Large fenced options", desc: "Secure spaces of all sizes" }
          ].map((feature) => (
            <div key={feature.title} style={{
              backgroundColor: "var(--bb-bg-surface)",
              borderRadius: "var(--bb-radius-card)",
              padding: "2rem",
              border: "1px solid var(--bb-border)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "36px", marginBottom: "1rem" }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--bb-text-primary)",
                marginBottom: "0.5rem"
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: "var(--bb-text-secondary)",
                fontSize: "14px",
                lineHeight: 1.5,
                margin: 0
              }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works section */}
      <section style={{ marginBottom: "4rem" }}>
        <h2 style={{
          fontFamily: "var(--bb-font-heading)",
          fontSize: "32px",
          fontWeight: 700,
          color: "var(--bb-text-primary)",
          textAlign: "center",
          marginBottom: "3rem"
        }}>
          How do Trails & Tails private dog parks work?
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem"
        }}>
          {[
            { step: "1", title: "Browse & Book", desc: "Find the perfect yard for your dog and book by the hour" },
            { step: "2", title: "Arrive & Play", desc: "Show up at your scheduled time for private access" },
            { step: "3", title: "Review & Return", desc: "Leave a review and book your next adventure" }
          ].map((step) => (
            <div key={step.step} style={{
              backgroundColor: "var(--bb-bg-surface)",
              borderRadius: "var(--bb-radius-card)",
              padding: "2rem",
              border: "1px solid var(--bb-border)",
              textAlign: "center"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "var(--bb-brand)",
                color: "var(--bb-text-on-brand)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
                margin: "0 auto 1rem"
              }}>
                {step.step}
              </div>
              <h3 style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--bb-text-primary)",
                marginBottom: "0.5rem"
              }}>
                {step.title}
              </h3>
              <p style={{
                color: "var(--bb-text-secondary)",
                fontSize: "14px",
                lineHeight: 1.5,
                margin: 0
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}