import { Button } from "@/components/ui/button";
import { useBuilder } from "@/hooks/use-builder";
import { toast } from "@/hooks/use-toast";
import { updateFormById } from "@/server/form";
import { Form } from "@/types/form";
import { Save } from "lucide-react";

export function SaveAction() {
  const { form, elements } = useBuilder();

  const onSave = async () => {
    try {
      const data = {
        ...form,
        json_content: JSON.stringify(elements),
      } as Form;
      console.log("Saving form", data);
      const { _id, ...dataWithoutId } = data;
      await updateFormById(_id as string, dataWithoutId)
        .then(() => {
          toast({
            title: "Form saved",
            description: "Your form has been saved successfully",
          });
        })
        .catch((error) => {
          console.error("Error saving form", error);
          toast({
            title: "Error saving form",
            description: error.message,
            variant: "destructive",
          });
        });
    } catch (error) {
      console.error("Error saving form", error);
      toast({
        title: "Error saving form",
        description: "An error occurred while saving the form",
        variant: "destructive",
      });
    }
  };

  return (
    <Button variant="secondary" onClick={onSave}>
      <Save className="w-4 h-4 mr-0.5" />
      Save
    </Button>
  );
}
