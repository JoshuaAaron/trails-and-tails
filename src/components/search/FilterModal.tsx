import { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterModalState) => void;
}

export interface FilterModalState {
  // Fully fenced
  fenceHeight?: string;
  
  // Distance away
  distance?: string;
  
  // Size
  size?: string;
  
  // Distractions
  fewerDogs: boolean;
  fewerAnimals: boolean;
  fewerPeople: boolean;
  
  // Review Rating
  reviewRating?: string;
  
  // Availability
  openNow: boolean;
  dateRange?: { start: string; end: string };
  timeOfDay?: string;
  advanceNotice?: string;
  
  // Quick filters
  topSpots: boolean;
  newSpots: boolean;
  cleanerSpots: boolean;
  sniffpassDiscount: boolean;
  
  // Amenities
  allWaterParks: boolean;
  beachSpace: boolean;
  swimmingPool: boolean;
  lakeOrPond: boolean;
  riverStreamCreek: boolean;
  hikingTrails: boolean;
  indoorPlaySpace: boolean;
  dogAgilityEquipment: boolean;
  smallDogFriendly: boolean;
  fieldSpace: boolean;
  accessible: boolean;
  litAtNight: boolean;
  restroom: boolean;
  fertilizerFree: boolean;
  pesticideFree: boolean;
  rainShelterSunShade: boolean;
  snow: boolean;
  
  // Price
  minPrice?: number;
  maxPrice?: number;
  
  // Sort
  sortBy?: string;
}

const fenceHeightOptions = ["Any height", "3+ ft", "4+ ft", "5+ ft", "6+ ft"];
const distanceOptions = ["Less than 0.5 mi", "Less than 1 mi", "Less than 5 mi", "Less than 10 mi", "Less than 20 mi", "Less than 50 mi"];
const sizeOptions = ["0.25+ acres", "0.5+ acres", "1+ acre", "2+ acres", "5+ acres", "10+ acres"];
const reviewRatingOptions = ["Any rating", "4.0+", "4.5+", "4.8+"];
const timesOfDay = ["Before 12pm", "12pm - 5pm", "After 5pm"];
const advanceNoticeOptions = ["6 hours or less", "2 hours or less", "None"];
const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Distance", "Rating"];

export function FilterModal({ isOpen, onClose, onApplyFilters }: FilterModalProps) {
  const [filters, setFilters] = useState<FilterModalState>({
    fewerDogs: false,
    fewerAnimals: false,
    fewerPeople: false,
    openNow: false,
    topSpots: false,
    newSpots: false,
    cleanerSpots: false,
    sniffpassDiscount: false,
    allWaterParks: false,
    beachSpace: false,
    swimmingPool: false,
    lakeOrPond: false,
    riverStreamCreek: false,
    hikingTrails: false,
    indoorPlaySpace: false,
    dogAgilityEquipment: false,
    smallDogFriendly: false,
    fieldSpace: false,
    accessible: false,
    litAtNight: false,
    restroom: false,
    fertilizerFree: false,
    pesticideFree: false,
    rainShelterSunShade: false,
    snow: false,
  });

  const [showMoreAmenities, setShowMoreAmenities] = useState(false);

  if (!isOpen) return null;

  const handleChipClick = (category: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category as keyof FilterModalState] === value ? undefined : value
    }));
  };

  const handleToggle = (key: keyof FilterModalState) => {
    setFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleInputChange = (key: keyof FilterModalState, value: string | number | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      fewerDogs: false,
      fewerAnimals: false,
      fewerPeople: false,
      openNow: false,
      topSpots: false,
      newSpots: false,
      cleanerSpots: false,
      sniffpassDiscount: false,
      allWaterParks: false,
      beachSpace: false,
      swimmingPool: false,
      lakeOrPond: false,
      riverStreamCreek: false,
      hikingTrails: false,
      indoorPlaySpace: false,
      dogAgilityEquipment: false,
      smallDogFriendly: false,
      fieldSpace: false,
      accessible: false,
      litAtNight: false,
      restroom: false,
      fertilizerFree: false,
      pesticideFree: false,
      rainShelterSunShade: false,
      snow: false,
    });
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: "1rem"
    }}>
      <div style={{
        backgroundColor: "white",
        borderRadius: "var(--bb-radius-card)",
        width: "100%",
        maxWidth: "500px",
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem",
          borderBottom: "1px solid var(--bb-border)"
        }}>
          <h2 style={{
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--bb-text-primary)",
            margin: 0
          }}>
            Filter search
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={handleReset}
              style={{
                background: "none",
                border: "none",
                color: "var(--bb-brand)",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer"
              }}
            >
              Reset all
            </button>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                padding: 0,
                color: "var(--bb-text-secondary)"
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "1.5rem"
        }}>
          {/* Fully fenced */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--bb-text-primary)",
              marginBottom: "1rem"
            }}>
              Fully fenced
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {fenceHeightOptions.map(option => (
                <button
                  key={option}
                  onClick={() => handleChipClick('fenceHeight', option)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "1px solid var(--bb-border)",
                    backgroundColor: filters.fenceHeight === option ? "var(--bb-brand)" : "white",
                    color: filters.fenceHeight === option ? "white" : "var(--bb-text-primary)",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Distance away */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--bb-text-primary)",
              marginBottom: "0.5rem"
            }}>
              Distance away
            </h3>
            <p style={{
              fontSize: "14px",
              color: "var(--bb-text-secondary)",
              marginBottom: "1rem"
            }}>
              Distance based on search location
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {distanceOptions.map(option => (
                <button
                  key={option}
                  onClick={() => handleChipClick('distance', option)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "1px solid var(--bb-border)",
                    backgroundColor: filters.distance === option ? "var(--bb-brand)" : "white",
                    color: filters.distance === option ? "white" : "var(--bb-text-primary)",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--bb-text-primary)",
              marginBottom: "1rem"
            }}>
              Size
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {sizeOptions.map(option => (
                <button
                  key={option}
                  onClick={() => handleChipClick('size', option)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "20px",
                    border: "1px solid var(--bb-border)",
                    backgroundColor: filters.size === option ? "var(--bb-brand)" : "white",
                    color: filters.size === option ? "white" : "var(--bb-text-primary)",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Distractions */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--bb-text-primary)",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              Distractions
              <span style={{ fontSize: "14px", color: "var(--bb-text-secondary)" }}>ℹ</span>
            </h3>
            
            {[
              { key: 'fewerDogs', label: 'Fewer other dogs seen/heard from the spot.' },
              { key: 'fewerAnimals', label: 'Fewer other domestic animals seen/heard from the spot.' },
              { key: 'fewerPeople', label: 'Fewer other people seen/heard from the spot.' }
            ].map(({ key, label }) => (
              <div key={key} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
                padding: "0.5rem 0"
              }}>
                <span style={{ fontSize: "14px", color: "var(--bb-text-primary)" }}>
                  {label}
                </span>
                <input
                  type="checkbox"
                  checked={filters[key as keyof FilterModalState] as boolean}
                  onChange={() => handleToggle(key as keyof FilterModalState)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
          </div>

          {/* Quick filters */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--bb-text-primary)",
              marginBottom: "1rem"
            }}>
              Quick filters
            </h3>
            
            {[
              { key: 'topSpots', label: 'Top spots', desc: "Spots with a 'top spot' badge" },
              { key: 'newSpots', label: 'New spots', desc: 'Spots that have been published recently' },
              { key: 'cleanerSpots', label: 'Cleaner spots', desc: 'Spots with higher cleaning ratings' },
              { key: 'sniffpassDiscount', label: 'Sniffpass discount', desc: 'Spots offering discounts for Sniffpass subscribers' }
            ].map(({ key, label, desc }) => (
              <div key={key} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
                padding: "0.5rem 0"
              }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--bb-text-primary)" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--bb-text-secondary)" }}>
                    {desc}
                  </div>
                </div>
                <label style={{
                  position: "relative",
                  display: "inline-block",
                  width: "44px",
                  height: "24px",
                  cursor: "pointer"
                }}>
                  <input
                    type="checkbox"
                    checked={filters[key as keyof FilterModalState] as boolean}
                    onChange={() => handleToggle(key as keyof FilterModalState)}
                    style={{ display: "none" }}
                  />
                  <span style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: (filters[key as keyof FilterModalState] as boolean) ? "var(--bb-brand)" : "#ccc",
                    borderRadius: "12px",
                    transition: "0.2s",
                  }}>
                    <span style={{
                      position: "absolute",
                      height: "18px",
                      width: "18px",
                      left: (filters[key as keyof FilterModalState] as boolean) ? "23px" : "3px",
                      bottom: "3px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      transition: "0.2s"
                    }} />
                  </span>
                </label>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--bb-text-primary)",
              marginBottom: "1rem"
            }}>
              Amenities
            </h3>
            
            {[
              { key: 'allWaterParks', label: 'All water parks' },
              { key: 'beachSpace', label: 'Beach space' },
              { key: 'swimmingPool', label: 'Swimming pool' },
              { key: 'lakeOrPond', label: 'Lake or pond' },
              { key: 'riverStreamCreek', label: 'River, stream or creek' },
              { key: 'hikingTrails', label: 'Hiking trails' },
              { key: 'indoorPlaySpace', label: 'Indoor play space' },
              { key: 'dogAgilityEquipment', label: 'Dog agility equipment' },
              { key: 'smallDogFriendly', label: 'Small dog friendly' },
              { key: 'fieldSpace', label: 'Field space' },
              ...(showMoreAmenities ? [
                { key: 'accessible', label: 'Accessible' },
                { key: 'litAtNight', label: 'Lit at night' },
                { key: 'restroom', label: 'Restroom' },
                { key: 'fertilizerFree', label: 'Fertilizer-free' },
                { key: 'pesticideFree', label: 'Pesticide-free' },
                { key: 'rainShelterSunShade', label: 'Rain shelter / sun shade' },
                { key: 'snow', label: 'Snow' }
              ] : [])
            ].map(({ key, label }) => (
              <div key={key} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "0.75rem",
                padding: "0.5rem 0"
              }}>
                <span style={{ fontSize: "14px", color: "var(--bb-text-primary)" }}>
                  {label}
                </span>
                <input
                  type="checkbox"
                  checked={filters[key as keyof FilterModalState] as boolean}
                  onChange={() => handleToggle(key as keyof FilterModalState)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            ))}
            
            <button
              onClick={() => setShowMoreAmenities(!showMoreAmenities)}
              style={{
                background: "none",
                border: "none",
                color: "var(--bb-brand)",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                textDecoration: "underline",
                padding: "0.5rem 0"
              }}
            >
              {showMoreAmenities ? 'Show less' : 'Show more'}
            </button>
          </div>

          {/* Price */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--bb-text-primary)",
              marginBottom: "1rem"
            }}>
              Price
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              gap: "1rem",
              alignItems: "center"
            }}>
              <div>
                <label style={{
                  fontSize: "14px",
                  color: "var(--bb-text-secondary)",
                  display: "block",
                  marginBottom: "0.5rem"
                }}>
                  Minimum
                </label>
                <input
                  type="number"
                  placeholder="Any"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleInputChange('minPrice', parseInt(e.target.value) || undefined)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid var(--bb-border)",
                    borderRadius: "var(--bb-radius-input)",
                    fontSize: "14px"
                  }}
                />
              </div>
              <span style={{ color: "var(--bb-text-secondary)", marginTop: "1.5rem" }}>—</span>
              <div>
                <label style={{
                  fontSize: "14px",
                  color: "var(--bb-text-secondary)",
                  display: "block",
                  marginBottom: "0.5rem"
                }}>
                  Maximum
                </label>
                <input
                  type="number"
                  placeholder="Any"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleInputChange('maxPrice', parseInt(e.target.value) || undefined)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: "1px solid var(--bb-border)",
                    borderRadius: "var(--bb-radius-input)",
                    fontSize: "14px"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "1.5rem",
          borderTop: "1px solid var(--bb-border)",
          display: "flex",
          gap: "1rem"
        }}>
          <button
            onClick={handleApply}
            style={{
              flex: 1,
              padding: "12px 24px",
              backgroundColor: "var(--bb-brand)",
              color: "white",
              border: "none",
              borderRadius: "var(--bb-radius-input)",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            See results
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "12px 24px",
              backgroundColor: "transparent",
              color: "var(--bb-brand)",
              border: "2px solid var(--bb-brand)",
              borderRadius: "var(--bb-radius-input)",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}