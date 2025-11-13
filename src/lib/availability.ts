import { Yard, IsoDateTime } from './types';

/**
 * Checks if a given start/end time range falls within the yard's available slots
 * and follows the rules: start < end, duration 30-180 min, start/end on 30-min grid
 * @param yard The yard with availability slots
 * @param start ISO datetime string for booking start
 * @param end ISO datetime string for booking end
 * @returns true if the booking is valid, false otherwise
 */
export function isWithinSlots(yard: Yard, start: IsoDateTime, end: IsoDateTime): boolean {
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Basic validation: start < end
    if (startDate >= endDate) {
      return false;
    }

    // Duration validation: 30-180 minutes
    const durationMs = endDate.getTime() - startDate.getTime();
    const durationMin = durationMs / (1000 * 60);
    if (durationMin < 30 || durationMin > 180) {
      return false;
    }

    // Check if start/end are on 30-minute grid
    if (!isOnThirtyMinGrid(startDate) || !isOnThirtyMinGrid(endDate)) {
      return false;
    }

    // Check if the range falls within any available slot
    return yard.slots.some(slotTime => {
      try {
        const slotDate = new Date(slotTime);
        
        // Each slot represents a 2-hour window starting from the slot time
        const slotStart = new Date(slotDate);
        const slotEnd = new Date(slotDate.getTime() + 2 * 60 * 60 * 1000); // 2 hours later
        
        // Check if the booking falls entirely within this slot window
        return (startDate.getTime() >= slotStart.getTime()) && 
               (endDate.getTime() <= slotEnd.getTime());
      } catch (error) {
        console.error('Error validating slot:', error);
        return false;
      }
    });
  } catch (error) {
    console.error('Error in isWithinSlots:', error);
    return false;
  }
}

/**
 * Rounds a datetime to the nearest 30-minute grid
 * @param dt Date object to round
 * @param intervalMinutes Interval in minutes (default 30)
 * @returns New Date object rounded to nearest grid
 */
export function nearestGrid(dt: Date, intervalMinutes: number = 30): Date {
  const minutes = dt.getMinutes();
  const roundedMinutes = Math.round(minutes / intervalMinutes) * intervalMinutes;
  
  const rounded = new Date(dt);
  rounded.setMinutes(roundedMinutes, 0, 0); // Set seconds and milliseconds to 0
  
  // Handle rollover to next hour
  if (roundedMinutes >= 60) {
    rounded.setHours(rounded.getHours() + 1);
    rounded.setMinutes(roundedMinutes - 60);
  }
  
  return rounded;
}

/**
 * Checks if a date is exactly on a 30-minute grid (0 or 30 minutes)
 * @param dt Date to check
 * @returns true if on grid, false otherwise
 */
export function isOnThirtyMinGrid(dt: Date): boolean {
  const minutes = dt.getMinutes();
  return minutes === 0 || minutes === 30;
}

/**
 * Generates available time options for a given date within yard slots
 * @param yard The yard with availability
 * @param date The date to generate times for
 * @returns Array of time strings in "HH:MM AM/PM" format
 */
export function getAvailableTimes(yard: Yard, date: Date): string[] {
  const times: string[] = [];
  const dayStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Filter slots for the given date
  const daySlots = yard.slots.filter(slot => slot.startsWith(dayStr));
  
  if (daySlots.length === 0) {
    return times;
  }
  
  // For each slot, generate 30-minute intervals
  daySlots.forEach(slotTime => {
    const slotStart = new Date(slotTime);
    const slotEnd = new Date(slotStart.getTime() + 2 * 60 * 60 * 1000); // 2-hour slots
    
    let current = new Date(slotStart);
    while (current < slotEnd) {
      times.push(formatTime(current));
      current = new Date(current.getTime() + 30 * 60 * 1000); // Add 30 minutes
    }
  });
  
  // Remove duplicates and sort
  return [...new Set(times)].sort();
}

/**
 * Formats a Date object to "HH:MM AM/PM" string
 * @param date Date to format
 * @returns Formatted time string
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Calculates the price for a booking based on hourly rate and duration
 * @param hourlyRate Price per hour in USD
 * @param start Start datetime
 * @param end End datetime
 * @returns Total price rounded to nearest cent
 */
export function calculatePrice(hourlyRate: number, start: IsoDateTime, end: IsoDateTime): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const durationMs = endDate.getTime() - startDate.getTime();
  const durationHours = durationMs / (1000 * 60 * 60);
  
  return Math.round(hourlyRate * durationHours * 100) / 100; // Round to nearest cent
}