import { FieldValues, UseFormReturn, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type FormRadioGroupProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  options: {
    label: string;
    value: string;
  }[];
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
};

export function FormRadioGroup<T extends FieldValues>({
  form,
  name,
  options,
  label,
  description,
  disabled = false,
  className = "",
}: FormRadioGroupProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-4", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              disabled={disabled}
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {options.map((option: { label: string; value: string }) => (
                <FormItem
                  key={option.label}
                  className="flex items-center space-x-2 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
