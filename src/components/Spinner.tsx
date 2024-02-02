import { Loader } from 'lucide-react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/lib/utils';

const spinnerVariants = cva('animate-spin', {
  variants: {
    color: {
      default: 'text-white/70',
      black: 'text-black dark:text-white',
      blackB: 'dark:text-black text-white',
    },
    size: {
      default: 'h-4 w-4',
      sm: 'h-2 w-2',
      lg: 'h-6 w-6',
      xl: 'h-10 w-10',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'default',
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export const Spinner = ({ size, color }: SpinnerProps) => {
  return <Loader className={cn(spinnerVariants({ size, color }))} />;
};
