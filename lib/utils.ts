import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumberInIndianAnnotation(number: number): string {
  const indianAnnotations: { [key: string]: number } = {
    Crore: 1e7,
    Lakh: 1e5,
    K: 1e3,
  };

  for (const [annotation, scale] of Object.entries(
    indianAnnotations
  ).reverse()) {
    if (number >= scale) {
      const formattedNumber = (number / scale).toFixed(2);
      return `${formattedNumber} ${annotation}`;
    }
  }

  return number.toString();
}

export function formatNumberToIndianReadable(number: number): string {
  return number.toLocaleString("en-IN");
}
