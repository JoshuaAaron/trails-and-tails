export interface SearchFiltersState {
  // No price filters - SniffSpot doesn't have price range inputs in sidebar
}

interface SearchFiltersProps {
  filters: SearchFiltersState;
  onFilterChange: (key: keyof SearchFiltersState, value: number | undefined) => void;
}

export function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  // SniffSpot doesn't have sidebar filters, only search bar and filter pills
  // This component is now just a placeholder for potential future filters
  return null;
}