import { useState } from "react";

interface FilterPillsProps {
  onFilterClick?: (filter: string, isActive: boolean) => void;
}

const filterPills = [
  "Fully fenced",
  "Water parks", 
  "Fewer dogs seen/heard",
  "< 50 miles away",
  "0.5+ acres",
  "Top spots",
  "Hiking trails",
  "Indoor play space"
];

export function FilterPills({ onFilterClick }: FilterPillsProps) {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const handleFilterClick = (filter: string) => {
    const newActiveFilters = new Set(activeFilters);
    const isActive = !activeFilters.has(filter);
    
    if (isActive) {
      newActiveFilters.add(filter);
    } else {
      newActiveFilters.delete(filter);
    }
    
    setActiveFilters(newActiveFilters);
    onFilterClick?.(filter, isActive);
  };
  

  return (
          <div
        className="filter-pills-container"
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "2rem",
          overflowX: "auto",
          flexWrap: "nowrap",
          padding: "4px 0"
        }}
      >
      {filterPills.map((filter, index) => {
        const isActive = activeFilters.has(filter);
        return (
          <button
            key={filter}
            onClick={() => handleFilterClick(filter)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "6px 16px",
              borderRadius: "var(--bb-radius-pill)",
              border: isActive ? "1px solid var(--bb-brand)" : "1px solid var(--bb-border)",
              backgroundColor: isActive ? "var(--bb-brand)" : "var(--bb-bg-surface)",
              color: isActive ? "white" : "var(--bb-text-primary)",
              fontSize: "14px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap"
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "var(--bb-accent)";
                e.currentTarget.style.borderColor = "var(--bb-brand)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = "var(--bb-bg-surface)";
                e.currentTarget.style.borderColor = "var(--bb-border)";
              }
            }}
          >
            {filter}
          </button>
        );
      })}
      <button
        onClick={() => onFilterClick?.("more", false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "6px 16px",
          borderRadius: "var(--bb-radius-pill)",
          border: "1px solid var(--bb-border)",
          backgroundColor: "var(--bb-bg-surface)",
          color: "var(--bb-text-primary)",
          fontSize: "14px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--bb-accent)";
          e.currentTarget.style.borderColor = "var(--bb-brand)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "var(--bb-bg-surface)";
          e.currentTarget.style.borderColor = "var(--bb-border)";
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M10.501 18.75a3.016 3.016 0 0 1-2.902-2.25H5.251a.75.75 0 0 1 0-1.5H7.6a3.014 3.014 0 0 1 2.9-2.25c1.371 0 2.565.947 2.903 2.25h5.348a.75.75 0 0 1 0 1.5h-5.348a3.016 3.016 0 0 1-2.902 2.25Zm-.001-4.5a1.501 1.501 0 0 0 .001 3c.827 0 1.5-.673 1.5-1.5s-.673-1.5-1.501-1.5v-.375.375ZM16.5 11.25A3.017 3.017 0 0 1 13.6 9H5.251a.75.75 0 0 1 0-1.5h8.348a3.016 3.016 0 0 1 2.902-2.25c1.654 0 3 1.346 3 3a3.005 3.005 0 0 1-3.001 3Zm.001-4.5c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5Z" fill="currentColor"/>
        </svg>
        More...
      </button>
    </div>
  );
}