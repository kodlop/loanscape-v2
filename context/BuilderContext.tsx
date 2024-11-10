"use client";

import React, { createContext } from "react";
import { Form } from "@/types/form";
import { ElementInstance } from "@/components/forms/builder/elements";

type BuilderContextType = {
  form: Form;
  setForm: React.Dispatch<React.SetStateAction<Form>>;
  elements: ElementInstance[];
  setElements: React.Dispatch<React.SetStateAction<ElementInstance[]>>;
  addElement: (index: number, element: ElementInstance) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, element: ElementInstance) => void;

  selectedElement: ElementInstance | null;
  setSelectedElement: React.Dispatch<
    React.SetStateAction<ElementInstance | null>
  >;
};

export const BuilderContext = createContext<BuilderContextType | null>(null);

export default function BuilderProvider({
  children,
  defaultForm,
}: {
  children: React.ReactNode;
  defaultForm: Form;
}) {
  const [form, setForm] = React.useState<Form>(defaultForm);

  const [elements, setElements] = React.useState<ElementInstance[]>([]);

  const [selectedElement, setSelectedElement] =
    React.useState<ElementInstance | null>(null);

  const addElement = (index: number, formElement: ElementInstance) => {
    const newFormElements = [...elements];
    newFormElements.splice(index, 0, formElement);
    console.log("Added element", index);
    setElements(newFormElements);
  };

  const removeElement = (id: string) => {
    const newFormElements = elements.filter(
      (formElement) => formElement.id !== id
    );
    setElements(newFormElements);
    console.log("Removed element", id);
  };

  const updateElement = (id: string, formElement: ElementInstance) => {
    const newFormElements = elements.map((element) =>
      element.id === id ? formElement : element
    );
    setElements(newFormElements);
  };

  return (
    <BuilderContext.Provider
      value={{
        form,
        setForm,
        elements,
        setElements,
        addElement,
        removeElement,
        updateElement,

        selectedElement,
        setSelectedElement,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
