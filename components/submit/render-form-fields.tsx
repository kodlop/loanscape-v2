"use client";

import { useRef, useState } from "react";
import { ElementInstance, Elements } from "../forms/builder/elements";
import { toast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { createSubmission } from "@/server/submit";
import { useRouter } from "next/navigation";

interface RenderFormFieldsProps {
  formCode: string;
  jsonContent: string;
}

export function RenderFormFields({
  formCode,
  jsonContent,
}: RenderFormFieldsProps) {
  const elements: ElementInstance[] = JSON.parse(jsonContent);

  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});

  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    for (const fields of elements) {
      const actualValue = formValues.current[fields.id] || "";
      const valid = Elements[fields.type].validate(fields, actualValue);

      if (!valid) {
        formErrors.current[fields.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  };

  const valueChange = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const submitForm = async () => {
    formErrors.current = {};
    const validForm = validateForm();

    if (!validForm) {
      setRenderKey(new Date().getTime());
      toast({
        title: "Form validation failed",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    const data = {
      submission: JSON.stringify(formValues.current),
    };
    setLoading(true);
    await createSubmission(formCode, data)
      .then(() => {
        setLoading(false);
        toast({
          title: "Form submitted",
          description: "Your form has been submitted successfully",
        });
        router.push("/thank-you");
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: "Form submission failed",
          description: "There was an error submitting your form",
          variant: "destructive",
        });
      });
  };

  return (
    <div key={renderKey} className="flex flex-col gap-y-2">
      {elements.map((element) => {
        const FormElement = Elements[element.type].formComponent;
        return (
          <div key={element.id} className="">
            <FormElement
              elementInstance={element}
              valueChange={valueChange}
              isInvalid={formErrors.current[element.id]}
              defaultValue={formValues.current[element.id]}
            />
          </div>
        );
      })}
      <Button
        onClick={() => submitForm()}
        className="mt-8 font-semibold self-end mb-8 md:mb-12 lg:mb-16"
        size="lg"
        loading={loading}
      >
        Submit
      </Button>
    </div>
  );
}
