"use client";

import { useState, useEffect } from "react";
import { Map } from "@/components/map/Map";
import { YardSummary } from "@/lib/types";
import { mockYards } from "@/lib/mockData";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterPills } from "@/components/search/FilterPills";
import { SearchFilters, SearchFiltersState } from "@/components/search/SearchFilters";
import { YardCard } from "@/components/search/YardCard";
import { ContentSections } from "@/components/search/ContentSections";
import { ParkTypes } from "@/components/search/ParkTypes";
import { FilterModal, FilterModalState } from "@/components/search/FilterModal";

export default function SearchPage() {
  const [yards, setYards] = useState<YardSummary[]>([]);
  const [selectedYardId, setSelectedYardId] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [filters, setFilters] = useState<SearchFiltersState>({});
  const [activeFilterPills, setActiveFilterPills] = useState<string[]>([]);
  const [modalFilters, setModalFilters] = useState<FilterModalState | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setYards([...mockYards]);
  }, []);

  // Apply all filters: pill filters and modal filters (no sidebar price filters like SniffSpot)
  const filteredYards = yards.filter(yard => {
    // Apply price filters from modal only
    if (modalFilters?.minPrice && yard.price < modalFilters.minPrice) return false;
    if (modalFilters?.maxPrice && yard.price > modalFilters.maxPrice) return false;
    
    // Apply pill filters
    if (activeFilterPills.includes("Fully fenced") && !yard.fenced) return false;
    if (activeFilterPills.includes("Water parks") && !yard.water) return false;
    
    // Apply modal size filters
    if (modalFilters?.size) {
      if (modalFilters.size === "0.25+ acres" && yard.acres < 0.25) return false;
      if (modalFilters.size === "0.5+ acres" && yard.acres < 0.5) return false;
      if (modalFilters.size === "1+ acre" && yard.acres < 1) return false;
      if (modalFilters.size === "2+ acres" && yard.acres < 2) return false;
      if (modalFilters.size === "5+ acres" && yard.acres < 5) return false;
      if (modalFilters.size === "10+ acres" && yard.acres < 10) return false;
    }
    
    // Apply amenity filters from modal
    if (modalFilters) {
      const amenities = yard.amenities || [];
      
      if (modalFilters.allWaterParks && !yard.water) return false;
      if (modalFilters.beachSpace && !amenities.includes('Beach')) return false;
      if (modalFilters.swimmingPool && !amenities.includes('Pool')) return false;
      if (modalFilters.lakeOrPond && !amenities.includes('Lake')) return false;
      if (modalFilters.hikingTrails && !amenities.includes('HikingTrails')) return false;
      if (modalFilters.indoorPlaySpace && !amenities.includes('Indoor')) return false;
      if (modalFilters.dogAgilityEquipment && !amenities.includes('Agility')) return false;
      if (modalFilters.smallDogFriendly && !amenities.includes('SmallDogFriendly')) return false;
      if (modalFilters.restroom && !amenities.includes('Restroom')) return false;
    }
    
    return true;
  });

  const handleYardSelect = (yardId: string) => {
    setSelectedYardId(selectedYardId === yardId ? null : yardId);
  };

  const handleFilterChange = (key: keyof SearchFiltersState, value: number | undefined) => {
    // No longer used since we removed sidebar price filters to match SniffSpot
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleFilterPillClick = (filterKey: string, isActive: boolean) => {
    if (filterKey === "more") {
      setIsModalOpen(true);
      return;
    }
    
    setActiveFilterPills(prev => {
      if (isActive) {
        return [...prev, filterKey];
      } else {
        return prev.filter(f => f !== filterKey);
      }
    });
  };

  const handleModalFiltersApply = (newModalFilters: FilterModalState) => {
    setModalFilters(newModalFilters);
  };

  const handleSearch = () => {
    console.log("Searching...", { location, guestCount, filters });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bb-bg-page)" }}>
      <main>
        {/* Header section with title only */}
        <div style={{
          backgroundColor: "var(--bb-bg-surface)",
          padding: "3rem 0",
          textAlign: "center",
          borderBottom: "1px solid var(--bb-border)"
        }}>
          <div style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0 2rem"
          }}>
            <h1 style={{
              fontFamily: "var(--bb-font-heading)",
              fontSize: "48px",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "var(--bb-text-primary)",
              lineHeight: "1.1"
            }}>
              Your dog adventures await
            </h1>
            
            <p style={{ 
              marginBottom: "0", 
              color: "var(--bb-text-secondary)",
              fontSize: "18px",
              lineHeight: "1.6",
              maxWidth: "600px",
              margin: "0 auto"
            }}>
              Trails & Tails turns local yards, fields, and trails into bookable adventures.
              Just you, your dog, and endless sniffing rights.
            </p>
          </div>
        </div>

        {/* Main content area with side-by-side layout */}
        <div style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 320px", // Cards on left, search+map on right (smaller)
          gap: "1.5rem",
          alignItems: "start"
        }}>
          {/* Left column: Filters and Cards */}
          <div style={{ width: "100%", minWidth: 0 }}>
            {/* Filters positioned above cards like SniffSpot */}
            <div style={{ marginBottom: "1.5rem" }}>
              <FilterPills
                onFilterClick={handleFilterPillClick}
              />
            </div>

            <p style={{
              color: "var(--bb-text-secondary)",
              fontSize: "16px",
              margin: "0 0 1.5rem 0"
            }}>
              {filteredYards.length} spots found
            </p>
            
            <div 
              className="yard-cards-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)", // Always show exactly 3 columns
                gap: "1rem",
                width: "100%",
                minHeight: "calc(100vh - 200px)" // Ensure minimum height so map can stick properly
              }}
            >
              {filteredYards.map((yard: YardSummary) => (
                <YardCard
                  key={yard.id}
                  yard={yard}
                  selectedYardId={selectedYardId}
                  onYardSelect={handleYardSelect}
                />
              ))}
            </div>
          </div>

          {/* Right column: Search + Map */}
          <div style={{
            position: "sticky",
            top: "1rem",
            height: "fit-content",
            width: "320px",
            maxHeight: "calc(100vh - 2rem)", // Ensure it never exceeds viewport height
            overflow: "hidden",
            zIndex: 10 // Ensure it stays above other content when sticky
          }}>
            {/* Search bar positioned above map - compact */}
            <div style={{
              backgroundColor: "var(--bb-bg-surface)",
              borderRadius: "var(--bb-radius-card)",
              border: "1px solid var(--bb-border)",
              padding: "0.375rem",
              marginBottom: "0.75rem",
              boxShadow: "var(--bb-shadow-card)",
              height: "fit-content"
            }}>
              <SearchBar
                location={location}
                onLocationChange={setLocation}
                guests={guestCount}
                onGuestsChange={setGuestCount}
              />
            </div>

            {/* Map positioned beside the cards - taller for better visibility */}
            <div style={{
              backgroundColor: "var(--bb-bg-surface)",
              borderRadius: "var(--bb-radius-card)",
              border: "1px solid var(--bb-border)",
              boxShadow: "var(--bb-shadow-card)",
              overflow: "hidden",
              width: "320px",
              height: "calc(100vh - 140px)" // Make map taller like Sniffspot to fill viewport
            }}>
              <Map
                yards={filteredYards}
                selectedYardId={selectedYardId || undefined}
                onYardSelect={handleYardSelect}
                className="search-map"
              />
            </div>
          </div>
        </div>

        <ParkTypes />
        <ContentSections />
      </main>

      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApplyFilters={handleModalFiltersApply}
      />
    </div>
  );
}
