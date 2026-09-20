export type ClassValue = string | number | null | undefined | false;

/** Tiny className joiner (clsx-style, no deps): cn('a', cond && 'b', undefined) -> 'a b' */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ');
}
