import { FieldValues, UseFormReturn, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type FormSelectProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  options: {
    label: string;
    value: string;
    icon?: LucideIcon;
  }[];
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string;
};

export function FormSelect<T extends FieldValues>({
  form,
  name,
  options,
  label,
  placeholder,
  description,
  disabled = false,
  className = "",
  defaultValue,
}: FormSelectProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        console.log("field", field);
        return (
          <FormItem className={cn(className)}>
            {label && <FormLabel>{label}</FormLabel>}
            <Select
              disabled={disabled}
              onValueChange={field.onChange}
              defaultValue={defaultValue || field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map(
                  (option: {
                    label: string;
                    value: string;
                    icon?: LucideIcon;
                  }) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
