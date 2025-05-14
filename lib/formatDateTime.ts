// lib/formatDateTime.ts
export function formatDateTime(isoString: string): string {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    // Example format: Aug 27, 2025. Adjust as needed.
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    console.error("Error formatting date:", error, "Input:", isoString);
    return isoString; // Fallback to original string if formatting fails
  }
}