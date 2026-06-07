import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import isEmail from "validator/lib/isEmail";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidEmail(value?: string | null): boolean {
  return isEmail(value ?? "");
}

export const generateSlug = (title: string) =>
  title
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/\s+/g, "-")
    .toLocaleLowerCase();

export const getReadTime = (content: string) => {
  const wordsPerMinute = 200;
  const wordCount = content.split(" ").length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readTime} min read`;
};
