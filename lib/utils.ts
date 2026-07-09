import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function randomNumbers(count: number) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 9) + 1);
}

export function formatNumbers(numbers: number[]) {
  return numbers.join(" · ");
}
