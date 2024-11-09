import {
  FieldValues,
  UseFormReturn,
  FieldPath,
  ControllerRenderProps,
  Path,
} from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";

type FormInputProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  type?: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};

export function FormInput<T extends FieldValues>({
  form,
  name,
  type = "text",
  label,
  placeholder,
  description,
  disabled = false,
  className = "",
}: FormInputProps<T>) {
  function onChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, Path<T>>
  ) {
    if (e.target.type === "number") {
      field.onChange(Number(e.target.value) * 1);
    } else {
      field.onChange(e.target.value);
    }
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              onChange={(e) => onChange(e, field)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.currentTarget.blur();
                }
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
