import { LucideIcon } from "lucide-react";
import { TextField } from "./form-elements/text-field";

export type ElementsType = "TEXTFIELD";

export type ValueChangeFunction = (key: string, value: string) => void;

export type ElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes: Record<string, any>;
};

export type Element = {
  type: ElementsType;

  construct: (id: string) => ElementInstance;

  designerButton: {
    icon: LucideIcon;
    label: string;
  };
  designerComponent: React.FC<{
    elementInstance: ElementInstance;
  }>;
  formComponent: React.FC<{
    elementInstance: ElementInstance;
    valueChange?: (key: string, value: string) => void;
    isInvalid?: boolean;
    defaultValue?: string;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: ElementInstance;
  }>;

  validate: (formElement: ElementInstance, currentValue: string) => boolean;
};

export type Elements = {
  [key in ElementsType]: Element;
};

export const Elements: Elements = {
  TEXTFIELD: TextField,
};
