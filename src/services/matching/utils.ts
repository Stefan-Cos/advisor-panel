
/**
 * Website normalization function for matching
 */
export function normalizeWebsite(website: string | null | undefined): string {
  if (!website) return '';
  
  let normalized = website.toLowerCase().trim();
  
  // Remove protocol
  normalized = normalized.replace(/^https?:\/\//, '');
  
  // Remove www prefix
  normalized = normalized.replace(/^www\./, '');
  
  // Remove trailing slash and path
  normalized = normalized.split('/')[0];
  
  // Remove common subdomains that might vary
  normalized = normalized.replace(/^(app|admin|portal|dashboard)\./, '');
  
  return normalized;
}

/**
 * Helper function to parse match score from Total III - preserving actual values
 */
export const parseMatchScore = (scoreStr: string | undefined): number => {
  if (!scoreStr) return 0;
  
  // Remove commas and parse as number
  const cleanedScore = scoreStr.toString().replace(/,/g, '');
  const parsed = parseFloat(cleanedScore);
  
  if (isNaN(parsed)) return 0;
  
  // Return the actual score without converting to percentage
  return parsed;
};
