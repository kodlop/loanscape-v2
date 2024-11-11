"use client";

import { Heading1, Heading2, Space, TableRowsSplit, Type } from "lucide-react";
import {
  ElementsType,
  Element,
  ElementInstance,
  ValueChangeFunction,
} from "../elements";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const type: ElementsType = "SPACEFIELD";

export const SpaceField: Element = {
  type,
  construct: (id: string) => {
    return {
      id,
      type,
    };
  },
  designerButton: {
    icon: Space,
    label: "Space Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: ElementInstance;
}) {
  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <Label>Space</Label>
        <div className="w-full h-4"></div>
      </CardContent>
    </Card>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: ElementInstance;
}) {
  return <p className="text-sm">No properties for this element</p>;
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: ElementInstance;
}) {
  return <div className="w-full h-4"></div>;
}
