"use client";

import { LetterText, Type } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { FormSlider } from "@/components/custom/form-slider";

const type: ElementsType = "TEXTAREAFIELD";

const extraAttributes = {
  label: "Textarea Field",
  helperText: "This is a textarea field",
  required: false,
  placeHolder: "Enter text here",
  rows: 4,
};

export const TextareaField: Element = {
  type,
  construct: (id: string) => {
    return {
      id,
      type,
      extraAttributes,
    };
  },
  designerButton: {
    icon: LetterText,
    label: "Text Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (element: ElementInstance, currentValue: string) => {
    const formElement = element as CustomInstance;
    if (formElement.extraAttributes.required) {
      return currentValue.trim().length > 0;
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
  const { label, helperText, required, placeHolder, rows } =
    element.extraAttributes;

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <Label>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <Textarea rows={rows} readOnly disabled placeholder={placeHolder} />
        {helperText && <CardDescription>{helperText}</CardDescription>}
      </CardContent>
    </Card>
  );
}

const propertiesSchema = z.object({
  label: z.string(),
  helperText: z.string(),
  required: z.boolean().default(false),
  placeHolder: z.string(),
  rows: z.number().default(4),
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
          <FormInput form={form} name="placeHolder" label="Placeholder" />
          <FormInput form={form} name="helperText" label="Helper Text" />
          <FormSwitch form={form} name="required" label="Required" />
          <FormSlider
            form={form}
            name="rows"
            label="Rows"
            min={1}
            max={10}
            step={1}
          />
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

  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeHolder, rows } = element.extraAttributes;

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  const onBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!valueChange) return;
    const valid = TextareaField.validate(element, event.target.value);
    setError(!valid);
    if (!valid) return;
    valueChange(element.id, event.target.value);
  };

  return (
    <div className="space-y-2 py-2">
      {/* <Label
        className={cn("text-base font-medium", error && "text-destructive")}
      >
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label> */}
      <Textarea
        rows={rows}
        className={cn(
          "bg-primary/15 text-primary placeholder:text-primary text-base placeholder:text-base font-medium",
          error && "text-destructive border-destructive"
        )}
        placeholder={placeHolder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </div>
  );
}
