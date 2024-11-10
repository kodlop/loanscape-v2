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
import { cn } from "@/lib/utils";
import { Slider } from "../ui/slider";

type FormSliderProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  min: number;
  max: number;
  step: number;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function FormSlider<T extends FieldValues>({
  form,
  name,
  min,
  max,
  step,
  label,
  disabled = false,
  className = "",
}: FormSliderProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        console.log("field", field.value);
        return (
          <FormItem className={cn(className)}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Slider
                defaultValue={[field.value]}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                onValueChange={(value) => field.onChange(value[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
