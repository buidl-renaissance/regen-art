import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const captureEmail = async (email: string, formId: string) => {
  const response = await fetch('/api/capture-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, formId }),
  });
  // store response in local storage
  localStorage.setItem(`${formId}-response`, JSON.stringify(response));
  localStorage.setItem(`email`, email);
  const result = await response.json()
  return result;
};

export const getEmail = () => {
  return typeof window !== 'undefined' ? localStorage.getItem('email') || "" : "";
}
