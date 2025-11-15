interface SearchBarProps {
  location?: string;
  onLocationChange?: (location: string) => void;
  guests?: number;
  onGuestsChange?: (guests: number) => void;
}

export function SearchBar({ 
  location = "", 
  onLocationChange, 
  guests = 1, 
  onGuestsChange 
}: SearchBarProps) {
  return (
    <div style={{
      display: "flex",
      gap: "0.25rem",
      alignItems: "center",
      padding: "0.25rem",
      backgroundColor: "transparent",
      height: "32px", // Fixed compact height
      minHeight: "32px"
    }}>
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "0.25rem", 
        flex: 1,
        minWidth: 0
      }}>
        <span style={{ fontSize: "14px" }}>📍</span>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => onLocationChange?.(e.target.value)}
          style={{
            border: "none",
            backgroundColor: "transparent",
            fontSize: "12px",
            flex: 1,
            padding: "0.125rem",
            color: "var(--bb-text-primary)",
            outline: "none",
            minWidth: 0
          }}
        />
      </div>
      
      <div style={{ 
        height: "16px", 
        width: "1px", 
        backgroundColor: "var(--bb-border)" 
      }} />
      
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "0.125rem",
        minWidth: 0
      }}>
        <span style={{ 
          fontSize: "11px", 
          color: "var(--bb-text-secondary)",
          whiteSpace: "nowrap"
        }}>
          Any date
        </span>
      </div>
      
      <div style={{ 
        height: "16px", 
        width: "1px", 
        backgroundColor: "var(--bb-border)" 
      }} />
      
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "0.125rem",
        minWidth: 0
      }}>
        <span style={{ fontSize: "14px" }}>🐕</span>
        <input
          type="number"
          min="1"
          max="10"
          value={guests}
          onChange={(e) => onGuestsChange?.(parseInt(e.target.value) || 1)}
          style={{
            border: "none",
            backgroundColor: "transparent",
            fontSize: "12px",
            width: "1.5rem",
            textAlign: "center",
            color: "var(--bb-text-primary)",
            outline: "none",
            padding: "0"
          }}
        />
      </div>
      
      <button style={{
        backgroundColor: "var(--bb-brand)",
        color: "var(--bb-text-on-brand)",
        border: "none",
        borderRadius: "4px",
        padding: "0.25rem 0.5rem",
        fontSize: "11px",
        fontWeight: 500,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.125rem",
        height: "24px",
        lineHeight: 1
      }}>
        🔍
      </button>
    </div>
  );
}