import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString?: string): string => {
  if (!dateString) return "Date not available";
  try {
    // Ensure the date string is valid before attempting to format
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // console.error("Invalid date string provided to formatDate:", dateString);
      return "Invalid Date"; // Or return dateString or a specific placeholder
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (e) {
    // TODO: Replace with structured error logging (e.g., Sentry.captureException, logger.error)
    console.error("Error formatting date in formatDate utility:", dateString, e);
    return dateString; // Fallback to original string if formatting fails
  }
};
