import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useTheme } from 'next-themes';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover';

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

export const IconPicker = ({
  onChange,
  children,
  asChild,
}: IconPickerProps) => {
  const { resolvedTheme } = useTheme();
  const currentTheme = (resolvedTheme || 'light') as keyof typeof themeMap;

  const themeMap = {
    dark: Theme.DARK,
    light: Theme.LIGHT,
  };

  const theme = themeMap[currentTheme];

  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-full border-none shadow-none z-[99999]">
        <EmojiPicker
          height={500}
          theme={theme}
          onEmojiClick={(data) => onChange(data.emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};
