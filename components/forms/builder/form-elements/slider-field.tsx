"use client";

import { Binary, SlidersHorizontal, Type } from "lucide-react";
import {
  ElementsType,
  Element,
  ElementInstance,
  ValueChangeFunction,
} from "../elements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useBuilder } from "@/hooks/use-builder";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/custom/form-input";
import { FormSwitch } from "@/components/custom/form-switch";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const type: ElementsType = "SLIDERFIELD";

const extraAttributes = {
  label: "Slider Field",
  helperText: "This is a range field",
  required: false,
  min: 0,
  max: 100,
  step: 1,
};

export const SliderField: Element = {
  type,
  construct: (id: string) => {
    return {
      id,
      type,
      extraAttributes,
    };
  },
  designerButton: {
    icon: SlidersHorizontal,
    label: "Slider Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (element: ElementInstance, currentValue: string) => {
    const formElement = element as CustomInstance;
    if (formElement.extraAttributes.required) {
      return true;
    }
    return true;
  },
};

type CustomInstance = ElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: ElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, required, placeHolder } = element.extraAttributes;

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <Label>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <Slider disabled={true} defaultValue={[0]} min={1} max={100} step={2} />
      </CardContent>
    </Card>
    // <div className="space-y-3 px-3 py-1.5">
    //   <Label>
    //     {label}
    //     {required && <span className="">*</span>}
    //   </Label>
    //   <Input readOnly disabled placeholder={placeHolder} />
    //   {helperText && (
    //     <p className="text-xs text-muted-foreground">{helperText}</p>
    //   )}
    // </div>
  );
}

const propertiesSchema = z.object({
  label: z.string(),
  helperText: z.string(),
  required: z.boolean().default(false),
  min: z.number().default(0),
  max: z.number().default(100),
  step: z.number().default(1),
});

type Properties = z.infer<typeof propertiesSchema>;

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: ElementInstance;
}) {
  const { updateElement } = useBuilder();

  const element = elementInstance as CustomInstance;

  const form = useForm<Properties>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: element.extraAttributes,
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: Properties) {
    updateElement(element.id, {
      ...element,
      extraAttributes: values,
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="space-y-6">
          <FormInput form={form} name="label" label="Label" />
          <FormInput form={form} name="helperText" label="Helper Text" />
          <FormSwitch form={form} name="required" label="Required" />
          <FormInput form={form} name="min" label="Min" type="number" />
          <FormInput form={form} name="max" label="Max" type="number" />
          <FormInput form={form} name="step" label="Step" type="number" />
        </div>
      </form>
    </Form>
  );
}

function FormComponent({
  elementInstance,
  valueChange,
  isInvalid,
  defaultValue,
}: {
  elementInstance: ElementInstance;
  valueChange?: ValueChangeFunction;
  isInvalid?: boolean;
  defaultValue?: number | string;
}) {
  const element = elementInstance as CustomInstance;

  const [value, setValue] = useState((defaultValue as number) || 0);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, helperText, min, max, step } =
    element.extraAttributes;

  const onValueChange = (values: number[]) => {
    setValue(values[0]);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = Number(event.target.value);
    if (currentValue === 0) {
      setValue(0);
      return;
    }
    if (currentValue <= min) {
      setValue(min);
      return;
    } else if (currentValue > max) {
      setValue(max);
      return;
    } else {
      setValue(currentValue);
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!valueChange) return;
    const valid = SliderField.validate(element, value.toString());
    setError(!valid);
    if (!valid) return;
    valueChange(element.id, value.toString());
  };

  return (
    <div className="space-y-4 py-2">
      <div className="flex justify-between items-center">
        <Label className="text-base font-medium">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <Input
          type="number"
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          className="w-fit border-0 text-right border-b-muted border-b-2 rounded-none focus-visible:ring-0 text-base placeholder:text-base font-medium"
        />
      </div>

      <Slider
        defaultValue={[value]}
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={onValueChange}
        onBlur={onBlur}
      />
    </div>
  );
}
