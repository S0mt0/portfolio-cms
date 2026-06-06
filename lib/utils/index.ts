import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import isEmail from "validator/lib/isEmail";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidEmail(value?: string | null): boolean {
  return isEmail(value ?? "");
}
