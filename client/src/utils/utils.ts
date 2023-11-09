/**
 * Converts an ISO date string to a formatted date string in the format 'YYYY/MM/DD'
 *
 * @param {string} isoDateString - ISO date string to be converted
 * @returns {string} - Returns a string date in the 'YYYY/MM/DD' format
 */
export const isoToFormattedDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${year}/${month}/${day}`;
};

/**
 * Capitalizes the first letter of a word and the rest to lowercase.
 *
 * @param {string} word - The input word to be capitalized
 * @returns {string} - Returns the word formatted
 */
export const capitalizeWord = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};
