"use client";

import { Heading1, Heading2, Type } from "lucide-react";
import {
  ElementsType,
  Element,
  ElementInstance,
  ValueChangeFunction,
} from "../elements";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useBuilder } from "@/hooks/use-builder";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/custom/form-input";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

const type: ElementsType = "SUBTITLEFIELD";

const extraAttributes = {
  subTitle: "SubTitle field",
};

export const SubTitleField: Element = {
  type,
  construct: (id: string) => {
    return {
      id,
      type,
      extraAttributes,
    };
  },
  designerButton: {
    icon: Heading2,
    label: "SubTitle Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
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
  const { subTitle } = element.extraAttributes;

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <Label>SubTitle Field</Label>
        <p className="text-lg">{subTitle}</p>
      </CardContent>
    </Card>
  );
}

const propertiesSchema = z.object({
  subTitle: z.string().min(2).max(50),
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
          <FormInput form={form} name="subTitle" label="SubTitle" />
        </div>
      </form>
    </Form>
  );
}

function FormComponent({
  elementInstance,
  valueChange,
}: {
  elementInstance: ElementInstance;
  valueChange?: ValueChangeFunction;
}) {
  const element = elementInstance as CustomInstance;

  const { subTitle } = element.extraAttributes;

  return (
    <h4 className="text-base lg:text-lg text-muted-foreground">{subTitle}</h4>
  );
}
