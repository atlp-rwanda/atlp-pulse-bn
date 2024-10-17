export const capitalizeStrings = (str: string): string => {
    if (!str) return '';
    if (str === 'ttl') {
      return 'TTL';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };