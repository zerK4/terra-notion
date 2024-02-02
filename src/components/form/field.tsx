import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from '../ui/form';
import { Input } from '../ui/input';

export const Field = ({
  form,
  name,
  label,
  description,
  placeholder,
}: {
  form: any;
  name: string;
  label: string;
  description: string;
  placeholder: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className="focus-visible:ring-0 focus-visible:ring-offset-0 border focus:border-foreground/50"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
