import { Yard } from "@/lib/types";
import { calculatePrice } from "@/lib/availability";

interface StepReviewProps {
  yard: Yard;
  selectedDate: string;
  selectedStartTime: string;
  selectedEndTime: string;
  guestNotes: string;
  guests: number;
  dogNames: string[];
  error?: string;
}

export function StepReview({
  yard,
  selectedDate,
  selectedStartTime,
  selectedEndTime,
  guestNotes,
  guests,
  dogNames,
  error,
}: StepReviewProps) {
  // Calculate total price
  const startDateTime = `${selectedDate}T${convertTo24Hour(selectedStartTime)}`;
  const endDateTime = `${selectedDate}T${convertTo24Hour(selectedEndTime)}`;
  const totalPrice = calculatePrice(yard.price, startDateTime, endDateTime);

  // Format date for display - avoid timezone issues by parsing manually
  const [year, month, day] = selectedDate.split('-');
  const displayDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate duration
  const start = new Date(`${selectedDate} ${selectedStartTime}`);
  const end = new Date(`${selectedDate} ${selectedEndTime}`);
  const durationMin = (end.getTime() - start.getTime()) / (1000 * 60);
  const durationText = durationMin >= 60 
    ? `${Math.floor(durationMin / 60)}h ${durationMin % 60 > 0 ? `${durationMin % 60}min` : ''}`.trim()
    : `${durationMin}min`;

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--bb-font-heading)",
          fontSize: "24px",
          fontWeight: 600,
          marginBottom: "1.5rem",
          color: "var(--bb-text-primary)",
        }}
      >
        Review Your Booking
      </h2>

      {/* Yard Summary */}
      <div
        style={{
          backgroundColor: "var(--bb-bg-surface)",
          border: "1px solid var(--bb-border)",
          borderRadius: "var(--bb-radius-card)",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--bb-font-heading)",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "1rem",
            color: "var(--bb-text-primary)",
          }}
        >
          {yard.name}
        </h3>
        <p style={{ color: "var(--bb-text-primary)", marginBottom: "1rem" }}>
          {yard.desc}
        </p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {yard.amenities.map((amenity) => (
            <span
              key={amenity}
              style={{
                backgroundColor: "var(--bb-moss)",
                color: "var(--bb-text-on-brand)",
                padding: "4px 8px",
                borderRadius: "var(--bb-radius-pill)",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Booking Details */}
      <div
        style={{
          backgroundColor: "var(--bb-foam)",
          border: "1px solid var(--bb-border)",
          borderRadius: "var(--bb-radius-card)",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--bb-font-heading)",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "1rem",
            color: "var(--bb-text-primary)",
          }}
        >
          Booking Details
        </h3>

        <div style={{ display: "grid", gap: "0.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 500, color: "var(--bb-text-primary)" }}>Date:</span>
            <span style={{ color: "var(--bb-text-primary)" }}>{displayDate}</span>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 500, color: "var(--bb-text-primary)" }}>Time:</span>
            <span style={{ color: "var(--bb-text-primary)" }}>
              {selectedStartTime} - {selectedEndTime} ({durationText})
            </span>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 500, color: "var(--bb-text-primary)" }}>Number of Dogs:</span>
            <span style={{ color: "var(--bb-text-primary)" }}>
              {guests} {guests === 1 ? 'dog' : 'dogs'}
            </span>
          </div>

          {dogNames.length > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontWeight: 500, color: "var(--bb-text-primary)" }}>Dog Names:</span>
              <span style={{ color: "var(--bb-text-primary)", textAlign: "right" }}>
                {dogNames.join(', ')}
              </span>
            </div>
          )}

          {guestNotes.trim() && (
            <div>
              <span style={{ fontWeight: 500, color: "var(--bb-text-primary)", display: "block", marginBottom: "0.25rem" }}>
                Special Requests:
              </span>
              <p style={{ 
                color: "var(--bb-text-primary)", 
                fontSize: "14px", 
                backgroundColor: "var(--bb-bg-surface)",
                padding: "0.75rem",
                borderRadius: "var(--bb-radius-input)",
                margin: 0
              }}>
                {guestNotes}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Price Breakdown */}
      <div
        style={{
          backgroundColor: "var(--bb-bg-surface)",
          border: "2px solid var(--bb-brand)",
          borderRadius: "var(--bb-radius-card)",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--bb-font-heading)",
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "1rem",
            color: "var(--bb-text-primary)",
          }}
        >
          Price Breakdown
        </h3>

        <div style={{ display: "grid", gap: "0.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "var(--bb-text-primary)" }}>
              ${yard.price}/hour × {durationText}
            </span>
            <span style={{ color: "var(--bb-text-primary)" }}>
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          
          <hr style={{ border: "none", borderTop: "1px solid var(--bb-border)", margin: "0.5rem 0" }} />
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: "18px", color: "var(--bb-text-primary)" }}>
              Total:
            </span>
            <span style={{ fontWeight: 600, fontSize: "18px", color: "var(--bb-brand)" }}>
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div
          className="error"
          role="alert"
          aria-live="assertive"
          style={{ marginBottom: "1rem" }}
        >
          {error}
        </div>
      )}

      {/* Terms */}
      <div
        style={{
          fontSize: "14px",
          color: "var(--bb-text-primary)",
          opacity: 0.8,
          lineHeight: 1.5,
        }}
      >
        <p style={{ margin: "0 0 0.5rem 0" }}>
          By completing this booking, you agree to Trails & Tails' terms of service and cancellation policy.
        </p>
        <p style={{ margin: 0 }}>
          <strong>Cancellation:</strong> Free cancellation up to 24 hours before your booking.
        </p>
      </div>
    </div>
  );
}

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