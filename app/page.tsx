import Image from "next/image";
import Link from "next/link";
import HeroButton from "@/components/HeroButton";

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

      {/* Hero Section with Image */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "700px",
          overflow: "hidden",
        }}
      >
        {/* Hero Image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          <Image
            src="/hero-dogs-new.jpg"
            alt="Dogs playing in a natural outdoor setting"
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center center",
            }}
            priority
            quality={90}
          />
          {/* Overlay for better text readability */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1144px",
            margin: "0 auto",
            padding: "0 2rem",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--bb-font-heading)",
              fontSize: "56px",
              lineHeight: 1.2,
              fontWeight: 700,
              color: "#FFFFFF",
              marginBottom: "2rem",
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              maxWidth: "900px",
            }}
          >
            Private Yards. Big Adventures.
          </h1>
          
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <HeroButton href="/search">
              Explore spots near me
            </HeroButton>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main
        style={{
          maxWidth: "1144px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2
            style={{
              fontFamily: "var(--bb-font-heading)",
              fontSize: "32px",
              lineHeight: 1.3,
              fontWeight: 700,
              color: "var(--bb-text-primary)",
              marginBottom: "1rem",
            }}
          >
            Trails & Tails hosts open their spaces so your dog can run wild, not run into strangers.
          </h2>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.6,
              color: "var(--bb-text-primary)",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            Only the people and dogs in your booking are allowed in the spot during your visit.
          </p>
        </div>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
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
              Safe, fully-fenced spaces perfect for off-leash play and training.
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
              Private & Peaceful
            </h3>
            <p style={{ color: "var(--bb-text-primary)", lineHeight: 1.6 }}>
              No other dogs or people during your visit - just you and your pup.
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
              Book by the hour with free cancellation up to 24 hours before.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
