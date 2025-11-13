"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface BookingDetails {
  confirmationId: string;
  yardName: string;
  start: string;
  end: string;
  totalPrice: number;
  guests?: number;
  dogNames?: string[];
  guestNotes?: string;
}

export default function BookingConfirmPage() {
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  useEffect(() => {
    // Read booking details from localStorage
    const storedBooking = localStorage.getItem("lastBooking");
    if (storedBooking) {
      try {
        const bookingData = JSON.parse(storedBooking);
        setBooking(bookingData);
        // Clear the stored booking data
        localStorage.removeItem("lastBooking");
      } catch (error) {
        console.error("Failed to parse booking data:", error);
      }
    }
  }, []);

  // Format dates for display
  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
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

      {/* Confirmation Content */}
      <main
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "3rem 2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "var(--bb-bg-surface)",
            padding: "3rem 2rem",
            borderRadius: "var(--bb-radius-card)",
            boxShadow: "var(--bb-shadow-card)",
            border: "1px solid var(--bb-border)",
          }}
        >
          {/* Success Icon */}
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "var(--bb-moss)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 2rem",
              color: "var(--bb-text-on-brand)",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            ✓
          </div>

          <h1
            style={{
              fontFamily: "var(--bb-font-heading)",
              fontSize: "36px",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "var(--bb-text-primary)",
            }}
          >
            Booking Confirmed!
          </h1>

          <p
            style={{
              fontSize: "18px",
              marginBottom: "2rem",
              color: "var(--bb-text-primary)",
            }}
          >
            Your yard reservation has been confirmed. You'll receive an email with all the details shortly.
          </p>

          {/* Booking Details */}
          <div
            style={{
              backgroundColor: "var(--bb-foam)",
              padding: "1.5rem",
              borderRadius: "var(--bb-radius-input)",
              marginBottom: "2rem",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "1rem",
                color: "var(--bb-text-primary)",
              }}
            >
              Booking Details
            </h3>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {booking ? (
                <>
                  <div>
                    <strong>Confirmation ID:</strong> {booking.confirmationId}
                  </div>
                  <div>
                    <strong>Yard:</strong> {booking.yardName}
                  </div>
                  <div>
                    <strong>Date:</strong> {formatDateTime(booking.start).date}
                  </div>
                  <div>
                    <strong>Time:</strong> {formatDateTime(booking.start).time} - {formatDateTime(booking.end).time}
                  </div>
                  {booking.guests && booking.guests > 1 && (
                    <div>
                      <strong>Dogs:</strong> {booking.guests} {booking.guests === 1 ? 'dog' : 'dogs'}
                      {booking.dogNames && booking.dogNames.length > 0 && (
                        <span> ({booking.dogNames.join(', ')})</span>
                      )}
                    </div>
                  )}
                  <div>
                    <strong>Total:</strong> ${booking.totalPrice.toFixed(2)}
                  </div>
                </>
              ) : (
                <div>Loading booking details...</div>
              )}
            </div>
          </div>

          {/* Next Steps */}
          <div
            style={{
              backgroundColor: "var(--bb-mist)",
              padding: "1.5rem",
              borderRadius: "var(--bb-radius-input)",
              marginBottom: "2rem",
              textAlign: "left",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--bb-font-heading)",
                fontSize: "20px",
                fontWeight: 600,
                marginBottom: "1rem",
                color: "var(--bb-text-primary)",
              }}
            >
              What's Next?
            </h3>
            <ul style={{ paddingLeft: "1.5rem", color: "var(--bb-text-primary)" }}>
              <li>You'll receive directions and access instructions via email</li>
              <li>The host will contact you within 2 hours to confirm details</li>
              <li>Arrive at your scheduled time and enjoy your yard time!</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/search"
              style={{
                backgroundColor: "var(--bb-brand)",
                color: "var(--bb-text-on-brand)",
                padding: "12px 24px",
                borderRadius: "var(--bb-radius-card)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Book Another Yard
            </Link>
            <Link
              href="/account"
              style={{
                backgroundColor: "var(--bb-accent)",
                color: "var(--bb-brand-2)",
                padding: "12px 24px",
                borderRadius: "var(--bb-radius-card)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              View My Bookings
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}