import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSaveDate(inputDate: any): string {
  var date = new Date(parseInt(inputDate));

  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  };
  return date?.toLocaleString('en-US', options);
}

export const copy = (link: string) => {
  navigator.clipboard.writeText(`${window.location.origin}/shared/${link}`);

  toast('Copied to clipboard', {
    description: `${window.location.origin}/shared/${link}`,
  });

  return true;
};

export function generateStrongToken(length: number = 64): string {
  const alphabet: string =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token: string = '';
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * alphabet.length);
    token += alphabet.charAt(randomIndex);
  }
  return token;
}
