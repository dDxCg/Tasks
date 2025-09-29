import neo4j from "neo4j-driver";
import { Integer } from "neo4j-driver";

/**
 * Convert ISO 8601 string to Date object
 * @param isoString - e.g. "2025-09-29T17:30:00.000Z"
 */
export function isoToDate(isoString: string): Date {
  return new Date(isoString);
}

/**
 * Convert Date object to ISO 8601 string
 * Always returns UTC (with trailing Z)
 * @param date - JavaScript Date
 */
export function dateToIso(date: Date): string {
  return date.toISOString();
}

/**
 * Get current timestamp as ISO 8601 string
 */
export function nowIso(): string {
  return new Date().toISOString();
}

/**
 * Get current timestamp as ISO 8601 string
 */
export function formatISODate(
  isoString?: string,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!isoString) return "-"; // fallback for undefined/null

  try {
    const date = new Date(isoString);
    // Default formatting if no options provided
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString(undefined, options || defaultOptions);
  } catch (err) {
    console.error("Invalid ISO date:", isoString, err);
    return "-";
  }
}

/**
 * Convert number|string to neo4j.Integer
 * Example: toNeoInt("42") -> neo4j.Integer(42)
 */
export function toNeoInt(id: number | string): Integer {
  return neo4j.int(id);
}
