import { FieldValues, UseFormReturn, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type FormTextareaProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  type?: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};

export function FormTextarea<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  description,
  disabled = false,
  className = "",
}: FormTextareaProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
