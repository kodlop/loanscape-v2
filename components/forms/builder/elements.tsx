import { LucideIcon } from "lucide-react";
import { TextField } from "./form-elements/text-field";
import { TitleField } from "./form-elements/title-field";
import { SubTitleField } from "./form-elements/sub-title-field";
import { ParagraphField } from "./form-elements/paragraph-field";
import { SeparatorField } from "./form-elements/separator-field";
import { NumberField } from "./form-elements/number-field";
import { TextareaField } from "./form-elements/textarea-field";
import { SpaceField } from "./form-elements/space-field";
import { SliderField } from "./form-elements/slider-field";
import { EmailField } from "./form-elements/email-field";
import { MobileNumberField } from "./form-elements/mobile-number-field";

export type ElementsType =
  | "TEXTFIELD"
  | "TITLEFIELD"
  | "SUBTITLEFIELD"
  | "PARAGRAPHFIELD"
  | "SEPARATORFIELD"
  | "NUMBERFIELD"
  | "TEXTAREAFIELD"
  | "SPACEFIELD"
  | "SLIDERFIELD"
  | "EMAILFIELD"
  | "MOBILENUMBERFIELD";

export type ValueChangeFunction = (key: string, value: string) => void;

export type ElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
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
    defaultValue?: string | number;
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
  TITLEFIELD: TitleField,
  SUBTITLEFIELD: SubTitleField,
  PARAGRAPHFIELD: ParagraphField,
  SEPARATORFIELD: SeparatorField,
  NUMBERFIELD: NumberField,
  TEXTAREAFIELD: TextareaField,
  SPACEFIELD: SpaceField,
  SLIDERFIELD: SliderField,
  EMAILFIELD: EmailField,
  MOBILENUMBERFIELD: MobileNumberField,
};
