import { useState, useEffect } from "react";
import { Yard } from "@/lib/types";
import { getAvailableTimes, formatTime } from "@/lib/availability";

interface StepSelectTimeProps {
  yard: Yard;
  selectedDate: string;
  selectedStartTime: string;
  selectedEndTime: string;
  onDateChange: (date: string) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  error?: string;
}

export function StepSelectTime({
  yard,
  selectedDate,
  selectedStartTime,
  selectedEndTime,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
  error,
}: StepSelectTimeProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      const times = getAvailableTimes(yard, date);
      setAvailableTimes(times);
      
      // Reset times if they're no longer available
      if (selectedStartTime && !times.includes(selectedStartTime)) {
        onStartTimeChange("");
      }
      if (selectedEndTime && !times.includes(selectedEndTime)) {
        onEndTimeChange("");
      }
    }
  }, [selectedDate, yard, selectedStartTime, selectedEndTime, onStartTimeChange, onEndTimeChange]);

  // Generate end time options based on start time
  const endTimeOptions = availableTimes.filter(time => {
    if (!selectedStartTime || selectedStartTime === time) return false;
    
    try {
      // Find the index of start time and current time in available times
      const startIndex = availableTimes.indexOf(selectedStartTime);
      const endIndex = availableTimes.indexOf(time);
      
      // End time must be after start time
      if (endIndex <= startIndex) return false;
      
      // Calculate duration based on 30-minute intervals
      const intervalCount = endIndex - startIndex;
      const durationMin = intervalCount * 30; // Each interval is 30 minutes
      
      return durationMin >= 30 && durationMin <= 180;
    } catch (error) {
      console.error('Error parsing times:', error);
      return false;
    }
  });

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

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
        Select Date & Time
      </h2>

      <div style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="booking-date"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 500,
            color: "var(--bb-text-primary)",
          }}
        >
          Date
        </label>
        <input
          id="booking-date"
          type="date"
          value={selectedDate}
          min={today}
          onChange={(e) => onDateChange(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "var(--bb-radius-input)",
            border: error ? "2px solid var(--bb-ember)" : "1px solid var(--bb-border)",
            backgroundColor: "var(--bb-bg-surface)",
            fontSize: "16px",
          }}
          aria-describedby={error ? "date-error" : undefined}
          aria-invalid={error ? "true" : "false"}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <label
            htmlFor="booking-start-time"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 500,
              color: "var(--bb-text-primary)",
            }}
          >
            Start Time
          </label>
          <select
            id="booking-start-time"
            value={selectedStartTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            disabled={!selectedDate || availableTimes.length === 0}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "var(--bb-radius-input)",
              border: error ? "2px solid var(--bb-ember)" : "1px solid var(--bb-border)",
              backgroundColor: "var(--bb-bg-surface)",
              fontSize: "16px",
              cursor: !selectedDate || availableTimes.length === 0 ? "not-allowed" : "pointer",
              opacity: !selectedDate || availableTimes.length === 0 ? 0.6 : 1,
            }}
            aria-describedby={error ? "time-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          >
            <option value="">Select start time</option>
            {availableTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="booking-end-time"
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: 500,
              color: "var(--bb-text-primary)",
            }}
          >
            End Time
          </label>
          <select
            id="booking-end-time"
            value={selectedEndTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            disabled={!selectedStartTime || endTimeOptions.length === 0}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "var(--bb-radius-input)",
              border: error ? "2px solid var(--bb-ember)" : "1px solid var(--bb-border)",
              backgroundColor: "var(--bb-bg-surface)",
              fontSize: "16px",
              cursor: !selectedStartTime || endTimeOptions.length === 0 ? "not-allowed" : "pointer",
              opacity: !selectedStartTime || endTimeOptions.length === 0 ? 0.6 : 1,
            }}
            aria-describedby={error ? "time-error" : undefined}
            aria-invalid={error ? "true" : "false"}
          >
            <option value="">Select end time</option>
            {endTimeOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div
          id="time-error"
          className="error"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      {!selectedDate && (
        <p
          style={{
            fontSize: "14px",
            color: "var(--bb-text-primary)",
            opacity: 0.7,
            marginTop: "1rem",
          }}
        >
          Please select a date to see available times.
        </p>
      )}

      {selectedDate && availableTimes.length === 0 && (
        <p
          style={{
            fontSize: "14px",
            color: "var(--bb-ember)",
            marginTop: "1rem",
          }}
          role="status"
        >
          No available times for this date. Please try another date.
        </p>
      )}
    </div>
  );
}