import Link from "next/link";
import type { YardSummary } from "@/lib/types";

interface YardCardProps {
  yard: YardSummary;
  selectedYardId?: string | null;
}

export function YardCard({ yard, selectedYardId }: YardCardProps) {
  return (
    <Link
      href={`/listing/${yard.id}`}
      data-yard-card
      data-yard-id={yard.id}
      style={{
        backgroundColor: "var(--bb-bg-surface)",
        borderRadius: "var(--bb-radius-card)",
        boxShadow: "var(--bb-shadow-card)",
        overflow: "hidden",
        border: selectedYardId === yard.id ? "2px solid var(--bb-brand)" : "1px solid var(--bb-border)",
        transition: "all 0.2s ease",
        cursor: "pointer",
        display: "block",
        textDecoration: "none",
      }}
      aria-label={`View details for ${yard.name}. Price: $${yard.price} per hour. ${yard.fenced ? 'Fenced. ' : ''}${yard.water ? 'Water access available.' : ''}`}
    >
      <div
        style={{
          width: "100%",
          height: "160px", // Smaller image height for 3-column layout
          backgroundImage: `url(/api/placeholder/400/200)`,
          backgroundColor: "var(--bb-accent)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      />
      <div style={{ padding: "1rem" }}> {/* Reduced padding */}
        <h3
          style={{
            fontFamily: "var(--bb-font-heading)",
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--bb-text-primary)",
            margin: "0 0 0.5rem",
          }}
        >
          {yard.name}
        </h3>
        <p
          style={{
            color: "var(--bb-text-secondary)",
            fontSize: "14px",
            lineHeight: 1.5,
            margin: "0 0 1rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          Secure, serene space for your dog to play and explore.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
          <span style={{
            backgroundColor: "var(--bb-accent)",
            color: "var(--bb-brand-2)",
            padding: "4px 8px",
            borderRadius: "var(--bb-radius-input)",
            fontSize: "12px",
            fontWeight: 500,
          }}>
            {yard.acres} acre{yard.acres !== 1 ? 's' : ''}
          </span>
          {yard.fenced && (
            <span style={{
              backgroundColor: "var(--bb-foam)",
              color: "var(--bb-brand-2)",
              padding: "4px 8px",
              borderRadius: "var(--bb-radius-input)",
              fontSize: "12px",
              fontWeight: 500,
            }}>
              Fenced
            </span>
          )}
          {yard.water && (
            <span style={{
              backgroundColor: "var(--bb-accent)",
              color: "var(--bb-brand-2)",
              padding: "4px 8px",
              borderRadius: "var(--bb-radius-input)",
              fontSize: "12px",
              fontWeight: 500,
            }}>
              Water
            </span>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "var(--bb-brand)",
            }}
          >
            ${yard.price}/hour
          </span>
        </div>
      </div>
    </Link>
  );
}