/**
 * Generates prefixed query keys for a specific page.
 * @param pagePrefix - The prefix for the page (e.g., 'home', 'dashboard').
 * @param keys - An array of key identifiers (e.g., ['SEARCH', 'DETAILS']).
 * @returns An object mapping each key identifier to its prefixed string.
 */
export const createQueryKeys = <T extends string>(pagePrefix: string, keys: T[]) => {
  const prefixedKeys = {} as Record<T, `${string}_${string}`>;
  keys.forEach((key) => {
    prefixedKeys[key] = `${pagePrefix.toLowerCase()}_${key.toLowerCase()}` as `${string}_${string}`;
  });
  return prefixedKeys;
};
