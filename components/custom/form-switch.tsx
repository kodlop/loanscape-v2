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
import { Switch } from "@/components/ui/switch";

type FormSwitchProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  type?: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};

export function FormSwitch<T extends FieldValues>({
  form,
  name,
  label,
  description,
  disabled = false,
  className = "",
}: FormSwitchProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <div className="flex items-center justify-between gap-x-2">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
