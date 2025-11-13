interface StepperProps {
  steps: string[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <nav aria-label="Booking progress" style={{ marginBottom: "2rem" }}>
      <ol
        style={{
          display: "flex",
          listStyle: "none",
          padding: 0,
          margin: 0,
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <li
              key={step}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flex: 1,
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  backgroundColor: isCompleted || isCurrent
                    ? "var(--bb-brand)"
                    : "var(--bb-bg-surface)",
                  color: isCompleted || isCurrent
                    ? "var(--bb-text-on-brand)"
                    : "var(--bb-text-primary)",
                  border: isCompleted || isCurrent
                    ? "2px solid var(--bb-brand)"
                    : "2px solid var(--bb-border)",
                }}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: isCurrent ? "600" : "400",
                  color: isCurrent
                    ? "var(--bb-text-primary)"
                    : "var(--bb-text-primary)",
                  opacity: isCompleted || isCurrent ? 1 : 0.6,
                }}
              >
                {step}
              </span>
              {index < steps.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "2px",
                    backgroundColor: isCompleted
                      ? "var(--bb-brand)"
                      : "var(--bb-border)",
                    marginLeft: "0.5rem",
                  }}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}