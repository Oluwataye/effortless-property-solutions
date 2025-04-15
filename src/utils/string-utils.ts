
/**
 * Extracts initials from a name
 * @param name Full name
 * @returns First letter of first and last name
 */
export function getInitials(name: string): string {
  if (!name) return "?";
  
  const names = name.split(' ').filter(n => n.length > 0);
  if (names.length === 0) return "?";
  
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}
