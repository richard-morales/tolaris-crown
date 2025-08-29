/**
 * Small utility to merge class names safely.
 * - tailwind-merge prevents conflicting utility duplicates.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
