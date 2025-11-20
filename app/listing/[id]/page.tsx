"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { isYardId, getYard } from "@/lib/mockData";
import { BookingRequest, Yard, Amenity } from "@/lib/types";
import { isWithinSlots, calculatePrice } from "@/lib/availability";
import { Stepper } from "@/components/booking/Stepper";
import { StepSelectTime } from "@/components/booking/StepSelectTime";
import { StepGuestInfo } from "@/components/booking/StepGuestInfo";
import { StepReview } from "@/components/booking/StepReview";

const STEPS = ["Select Time", "Guest Info", "Review", "Confirm"];

// Helper function to convert 12-hour time to 24-hour format for ISO strings
function convertTo24Hour(time12h: string): string {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  
  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }
  
  return `${hours.padStart(2, '0')}:${minutes}:00`;
}

export default function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // ALL STATE HOOKS MUST BE CALLED AT THE TOP - NEVER CONDITIONALLY
  const [yardId, setYardId] = useState<string>("");
  const [yard, setYard] = useState<Yard | null>(null);
  
  // State management for booking flow
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Booking form state
  const [selectedDate, setSelectedDate] = useState(searchParams.get("date") || "");
  const [selectedStartTime, setSelectedStartTime] = useState(searchParams.get("start") || "");
  const [selectedEndTime, setSelectedEndTime] = useState(searchParams.get("end") || "");
  const [guestNotes, setGuestNotes] = useState("");
  const [guests, setGuests] = useState(1);
  const [dogNames, setDogNames] = useState<string[]>([]);
  
  // ALL USEEFFECT HOOKS MUST BE AT THE TOP TOO
  // Unwrap params and check if yard exists
  useEffect(() => {
    params.then(({ id }) => {
      setYardId(id);
      if (!isYardId(id)) {
        // Yard not found - we'll handle this in the render
        return;
      }
      setYard(getYard(id));
    });
  }, [params]);

  // Update URL when booking details change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedDate) params.set("date", selectedDate);
    if (selectedStartTime) params.set("start", selectedStartTime);
    if (selectedEndTime) params.set("end", selectedEndTime);
    
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""}`;
    window.history.replaceState(null, "", newUrl);
  }, [selectedDate, selectedStartTime, selectedEndTime]);
  
  // Handle loading and error states with conditional rendering instead of early returns
  if (!yardId) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>Loading...</div>
      </div>
    );
  }
  
  if (!isYardId(yardId)) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", marginBottom: "1rem" }}>Yard Not Found</h1>
          <Link href="/search" style={{ color: "var(--bb-brand)" }}>← Back to search</Link>
        </div>
      </div>
    );
  }

  if (!yard) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div>Loading...</div>
      </div>
    );
  }

  const validateCurrentStep = (): boolean => {
    setError("");
    
    switch (currentStep) {
      case 0: // Select Time
        // Validate date is not in the past FIRST (before checking if times are selected)
        if (selectedDate) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const selected = new Date(selectedDate);
          if (selected < today) {
            setError("Date must be in the future. Please select today or a future date.");
            return false;
          }
        }
        
        if (!selectedDate || !selectedStartTime || !selectedEndTime) {
          setError("Please select a date, start time, and end time.");
          return false;
        }
        
        // Validate end time is after start time
        const startDateTime = `${selectedDate}T${convertTo24Hour(selectedStartTime)}`;
        const endDateTime = `${selectedDate}T${convertTo24Hour(selectedEndTime)}`;
        const startTime = new Date(startDateTime);
        const endTime = new Date(endDateTime);
        
        if (endTime <= startTime) {
          setError("End time must be after start time.");
          return false;
        }
        
        if (!isWithinSlots(yard, startDateTime, endDateTime)) {
          setError("Selected time is not available or doesn't meet our booking requirements (30-180 minutes, on 30-minute intervals).");
          return false;
        }
        
        return true;
      
      case 1: // Guest Info
        if (guests < 1) {
          setError("Please select at least 1 dog.");
          return false;
        }
        return true;
      
      case 2: // Review
        // Re-validate all required fields without recursion
        if (!selectedDate || !selectedStartTime || !selectedEndTime) {
          setError("Please select a date, start time, and end time.");
          return false;
        }
        
        if (guests < 1) {
          setError("Please select at least 1 dog.");
          return false;
        }
        
        // Validate date is not in the past
        const reviewToday = new Date();
        reviewToday.setHours(0, 0, 0, 0);
        const reviewSelected = new Date(selectedDate);
        if (reviewSelected < reviewToday) {
          setError("Date must be in the future. Please select today or a future date.");
          return false;
        }
        
        // Validate end time is after start time
        const reviewStartDateTime = `${selectedDate}T${convertTo24Hour(selectedStartTime)}`;
        const reviewEndDateTime = `${selectedDate}T${convertTo24Hour(selectedEndTime)}`;
        const reviewStartTime = new Date(reviewStartDateTime);
        const reviewEndTime = new Date(reviewEndDateTime);
        
        if (reviewEndTime <= reviewStartTime) {
          setError("End time must be after start time.");
          return false;
        }
        
        if (!isWithinSlots(yard, reviewStartDateTime, reviewEndDateTime)) {
          setError("Selected time is not available or doesn't meet our booking requirements (30-180 minutes, on 30-minute intervals).");
          return false;
        }
        
        return true;
      
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const handleBack = () => {
    setError("");
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmitBooking = async () => {
    if (!validateCurrentStep()) return;
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const startDateTime = `${selectedDate}T${convertTo24Hour(selectedStartTime)}`;
      const endDateTime = `${selectedDate}T${convertTo24Hour(selectedEndTime)}`;
      
      const bookingData: BookingRequest = {
        yardId: yard.id,
        start: startDateTime,
        end: endDateTime,
        guestNotes: guestNotes.trim() || undefined,
        guests,
        dogNames: dogNames.length > 0 ? dogNames : undefined,
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      
      if (response.ok && result.ok) {
        // Store confirmation details in localStorage for the confirmation page
        localStorage.setItem("lastBooking", JSON.stringify({
          ...bookingData,
          confirmationId: result.confirmationId,
          yardName: yard.name,
          totalPrice: calculatePrice(yard.price, startDateTime, endDateTime),
        }));
        router.push("/booking/confirm");
      } else {
        setError(result.error || "Failed to create booking. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Trails & Tails
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
                {yard.name}
              </h1>
              
              <p style={{ fontSize: "18px", marginBottom: "2rem", color: "var(--bb-text-primary)" }}>
                {yard.desc}
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
                {yard.amenities.map((amenity: Amenity) => (
                  <span
                    key={amenity}
                    style={{
                      backgroundColor: "var(--bb-moss)",
                      color: "var(--bb-text-on-brand)",
                      padding: "4px 12px",
                      borderRadius: "var(--bb-radius-pill)",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              {/* Host Notes */}
              {yard.hostNotes && (
                <>
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
                    {yard.hostNotes}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Multi-Step Booking */}
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
              ${yard.price}/hour
            </div>

            {/* Step Progress */}
            <Stepper steps={STEPS} currentStep={currentStep} />

            {/* Step Content */}
            {currentStep === 0 && (
              <StepSelectTime
                yard={yard}
                selectedDate={selectedDate}
                selectedStartTime={selectedStartTime}
                selectedEndTime={selectedEndTime}
                onDateChange={setSelectedDate}
                onStartTimeChange={setSelectedStartTime}
                onEndTimeChange={setSelectedEndTime}
                error={error}
              />
            )}

            {currentStep === 1 && (
              <StepGuestInfo
                guestNotes={guestNotes}
                guests={guests}
                dogNames={dogNames}
                onGuestNotesChange={setGuestNotes}
                onGuestsChange={setGuests}
                onDogNamesChange={setDogNames}
                error={error}
              />
            )}

            {currentStep === 2 && (
              <StepReview
                yard={yard}
                selectedDate={selectedDate}
                selectedStartTime={selectedStartTime}
                selectedEndTime={selectedEndTime}
                guestNotes={guestNotes}
                guests={guests}
                dogNames={dogNames}
                error={error}
              />
            )}

            {/* Navigation Buttons */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "2rem",
                justifyContent: currentStep === 0 ? "flex-end" : "space-between",
              }}
            >
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  type="button"
                  style={{
                    backgroundColor: "var(--bb-bg-surface)",
                    color: "var(--bb-text-primary)",
                    border: "1px solid var(--bb-border)",
                    padding: "12px 24px",
                    borderRadius: "var(--bb-radius-card)",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 160ms cubic-bezier(0.2,0.8,0.2,1)",
                  }}
                >
                  Back
                </button>
              )}

              {currentStep < 2 && (
                <button
                  onClick={handleNext}
                  type="button"
                  style={{
                    backgroundColor: "var(--bb-brand)",
                    color: "var(--bb-text-on-brand)",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "var(--bb-radius-card)",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 160ms cubic-bezier(0.2,0.8,0.2,1)",
                  }}
                >
                  Next
                </button>
              )}

              {currentStep === 2 && (
                <button
                  onClick={handleSubmitBooking}
                  disabled={isSubmitting}
                  type="button"
                  style={{
                    backgroundColor: isSubmitting ? "var(--bb-border)" : "var(--bb-brand)",
                    color: "var(--bb-text-on-brand)",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "var(--bb-radius-card)",
                    fontWeight: 600,
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "all 160ms cubic-bezier(0.2,0.8,0.2,1)",
                  }}
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </button>
              )}
            </div>

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