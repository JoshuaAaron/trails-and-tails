import { useState, useEffect, useRef } from "react";

interface StepGuestInfoProps {
  guestNotes: string;
  guests: number;
  dogNames: string[];
  onGuestNotesChange: (notes: string) => void;
  onGuestsChange: (count: number) => void;
  onDogNamesChange: (names: string[]) => void;
  error?: string;
}

export function StepGuestInfo({
  guestNotes,
  guests,
  dogNames,
  onGuestNotesChange,
  onGuestsChange,
  onDogNamesChange,
  error,
}: StepGuestInfoProps) {
  const guestCountRef = useRef<HTMLSelectElement>(null);
  const [dogNameInputs, setDogNameInputs] = useState<string[]>(() => {
    // Initialize with existing dog names or empty strings based on guest count
    const names = [...dogNames];
    while (names.length < guests) {
      names.push("");
    }
    return names.slice(0, guests);
  });

  // Auto-focus first input when component mounts
  useEffect(() => {
    guestCountRef.current?.focus();
  }, []);

  const handleGuestCountChange = (count: number) => {
    onGuestsChange(count);
    
    // Update dog name inputs to match guest count
    const newInputs = [...dogNameInputs];
    if (count > newInputs.length) {
      // Add empty strings for new guests
      while (newInputs.length < count) {
        newInputs.push("");
      }
    } else {
      // Remove excess inputs
      newInputs.splice(count);
    }
    setDogNameInputs(newInputs);
    
    // Update the actual dog names (filter out empty strings)
    const filteredNames = newInputs.filter(name => name.trim() !== "");
    onDogNamesChange(filteredNames);
  };

  const handleDogNameChange = (index: number, name: string) => {
    const newInputs = [...dogNameInputs];
    newInputs[index] = name;
    setDogNameInputs(newInputs);
    
    // Update the actual dog names (filter out empty strings)
    const filteredNames = newInputs.filter(name => name.trim() !== "");
    onDogNamesChange(filteredNames);
  };

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
        Guest Information
      </h2>

      <div style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="guest-count"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 500,
            color: "var(--bb-text-primary)",
          }}
        >
          Number of Dogs
        </label>
        <select
          ref={guestCountRef}
          id="guest-count"
          value={guests}
          onChange={(e) => handleGuestCountChange(parseInt(e.target.value))}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "var(--bb-radius-input)",
            border: error ? "2px solid var(--bb-ember)" : "1px solid var(--bb-border)",
            backgroundColor: "var(--bb-bg-surface)",
            fontSize: "16px",
          }}
          aria-describedby={error ? "guest-info-error" : undefined}
          aria-invalid={error ? "true" : "false"}
        >
          <option value={1}>1 dog</option>
          <option value={2}>2 dogs</option>
          <option value={3}>3 dogs</option>
          <option value={4}>4 dogs</option>
          <option value={5}>5 dogs</option>
        </select>
      </div>

      {guests > 0 && (
        <fieldset
          style={{
            border: "none",
            padding: 0,
            margin: 0,
            marginBottom: "1.5rem",
          }}
        >
          <legend
            style={{
              fontWeight: 500,
              color: "var(--bb-text-primary)",
              marginBottom: "0.5rem",
              padding: 0,
            }}
          >
            Dog Names (Optional)
          </legend>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {dogNameInputs.map((name, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Dog ${index + 1} name`}
                value={name}
                onChange={(e) => handleDogNameChange(index, e.target.value)}
                style={{
                  padding: "12px",
                  borderRadius: "var(--bb-radius-input)",
                  border: "1px solid var(--bb-border)",
                  backgroundColor: "var(--bb-bg-surface)",
                  fontSize: "16px",
                }}
                aria-label={`Dog ${index + 1} name`}
              />
            ))}
          </div>
        </fieldset>
      )}

      <div style={{ marginBottom: "1.5rem" }}>
        <label
          htmlFor="guest-notes"
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: 500,
            color: "var(--bb-text-primary)",
          }}
        >
          Special Requests or Notes (Optional)
        </label>
        <textarea
          id="guest-notes"
          placeholder="Any special requests, dietary needs, or other notes for the host..."
          rows={4}
          value={guestNotes}
          onChange={(e) => onGuestNotesChange(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "var(--bb-radius-input)",
            border: error ? "2px solid var(--bb-ember)" : "1px solid var(--bb-border)",
            backgroundColor: "var(--bb-bg-surface)",
            fontSize: "16px",
            resize: "vertical",
          }}
          aria-describedby={error ? "guest-info-error" : undefined}
          aria-invalid={error ? "true" : "false"}
        />
      </div>

      {error && (
        <div
          id="guest-info-error"
          className="error"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      <div
        style={{
          backgroundColor: "var(--bb-foam)",
          padding: "1rem",
          borderRadius: "var(--bb-radius-input)",
          fontSize: "14px",
          color: "var(--bb-text-primary)",
        }}
      >
        <strong>Please note:</strong> All dogs must be current on vaccinations and well-socialized. 
        The host reserves the right to end the session early if dogs are aggressive or destructive.
      </div>
    </div>
  );
}