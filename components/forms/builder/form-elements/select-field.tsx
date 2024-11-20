"use client";

import { ListCheck, MinusCircle, PlusCircle, Type } from "lucide-react";
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
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FormInput } from "@/components/custom/form-input";
import { FormSwitch } from "@/components/custom/form-switch";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

const type: ElementsType = "SELECTFIELD";

const extraAttributes = {
  label: "Select Field",
  helperText: "This is a select field",
  required: false,
  placeHolder: "Enter select here",
  options: [],
};

export const SelectField: Element = {
  type,
  construct: (id: string) => {
    return {
      id,
      type,
      extraAttributes,
    };
  },
  designerButton: {
    icon: ListCheck,
    label: "Select Field",
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
  const { label, helperText, required, placeHolder } = element.extraAttributes;

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <Label>
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        <Select disabled>
          <SelectTrigger>
            <SelectValue placeholder={placeHolder} />
          </SelectTrigger>
        </Select>
        {helperText && <CardDescription>{helperText}</CardDescription>}
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
  placeHolder: z.string(),
  options: z.array(z.string()).default([]),
});

type Properties = z.infer<typeof propertiesSchema>;

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: ElementInstance;
}) {
  const { updateElement, setSelectedElement } = useBuilder();

  const element = elementInstance as CustomInstance;

  const form = useForm<Properties>({
    resolver: zodResolver(propertiesSchema),
    mode: "onSubmit",
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

    toast({
      title: "Element updated",
      description: "Select field updated successfully",
    });
    setSelectedElement(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(applyChanges)}>
        <div className="space-y-6">
          <FormInput form={form} name="label" label="Label" />
          <FormInput form={form} name="placeHolder" label="Placeholder" />
          <FormInput form={form} name="helperText" label="Helper Text" />
          <FormSwitch form={form} name="required" label="Required" />
          <FormField
            control={form.control}
            name="options"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Options</FormLabel>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={(event) => {
                      event.preventDefault();
                      form.setValue(
                        "options",
                        field.value.concat("New Option")
                      );
                    }}
                  >
                    <PlusCircle size={16} />
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  {form.watch("options").map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-1"
                    >
                      <Input
                        placeholder=""
                        value={option}
                        onChange={(event) => {
                          field.value[index] = event.target.value;
                          field.onChange(field.value);
                        }}
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(event) => {
                          event.preventDefault();
                          const newOptions = [...field.value];
                          newOptions.splice(index, 1);
                          field.onChange(newOptions);
                        }}
                      >
                        <MinusCircle size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </FormItem>
            )}
          ></FormField>
          <Separator />
          <Button type="submit" className="w-full">
            Save
          </Button>
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

  const { label, required, placeHolder, options } = element.extraAttributes;

  return (
    <div className="space-y-2 py-2">
      {/* <Label
        className={cn("text-base font-medium", error && "text-destructive")}
      >
        {label} {required && <span className="text-destructive">*</span>}
      </Label> */}
      <Select
        defaultValue={value as string}
        onValueChange={(value) => {
          setValue(value);
          if (!valueChange) return;
          const valid = SelectField.validate(element, value);
          setError(!valid);
          valueChange(element.id, value);
        }}
      >
        <SelectTrigger
          className={cn(
            "h-12 bg-primary/15 text-primary placeholder:text-primary text-base placeholder:text-base font-medium",
            error && "text-destructive border-destructive"
          )}
        >
          <SelectValue placeholder={label + (required ? " *" : "")} />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
