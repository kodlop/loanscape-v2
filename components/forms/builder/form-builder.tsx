"use client";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useBuilder } from "@/hooks/use-builder";
import { Actions } from "./actions";
import { Separator } from "@/components/ui/separator";
import { DragOverlayWrapper } from "./drag-overlay-wrapper";
import { FormDesigner } from "./form-designer";
import { ElementInstance } from "./elements";
import { idGenerator } from "@/lib/idGenerator";

const MANDATORY_FIELDS: ElementInstance[] = [
  {
    id: idGenerator(),
    type: "EMAILFIELD",
    extraAttributes: {
      label: "Email",
      placeHolder: "Enter your email address",
      required: true,
      helperText: "We'll never share your email with anyone else.",
    },
  },
  {
    id: idGenerator(),
    type: "MOBILENUMBERFIELD",
    extraAttributes: {
      label: "Mobile Number",
      placeHolder: "Enter your mobile number",
      required: true,
      helperText: "We'll never share your mobile number with anyone else.",
    },
  },
  {
    id: idGenerator(),
    type: "SLIDERFIELD",
    extraAttributes: {
      label: "Agreement Value",
      placeHolder: "Enter your agreement value",
      required: true,
      helperText: "Enter amount (inr) of loan you want to take.",
    },
  },
];

export function FormBuilder() {
  const { form, setElements } = useBuilder();
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    console.log("Form json content", form.json_content);
    if (
      !form.json_content ||
      form.json_content === "" ||
      form.json_content === "[]"
    ) {
      setElements(MANDATORY_FIELDS);
      setIsReady(true);
      return;
    }

    try {
      const jsonContent = JSON.parse(form.json_content);
      setElements(jsonContent);
    } catch (error) {
      console.log("Error parsing form json content", error);
    }

    const readyTimeout = setTimeout(() => setIsReady(true), 500);

    return () => {
      clearTimeout(readyTimeout);
    };
  }, [form.json_content, isReady, setElements]);

  if (!isReady) {
    return null;
  }

  return (
    <DndContext sensors={sensors}>
      <div className="w-full h-full space-y-4">
        {/* <AlertBanner /> */}
        <div className="w-full flex justify-between">
          <h3 className="text-lg lg:text-2xl font-bold">Dummy Form</h3>
          <Actions />
        </div>
        <Separator />
        <div className="flex w-full h-full flex-grow items-center justify-center relative bg-accent rounded-lg">
          <FormDesigner />
        </div>
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
}
