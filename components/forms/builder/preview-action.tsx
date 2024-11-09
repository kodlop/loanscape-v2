import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBuilder } from "@/hooks/use-builder";
import { Elements } from "./elements";

export function PreviewAction() {
  const { elements } = useBuilder();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Eye className="w-4 h-4 mr-0.5" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full p-6 flex flex-col gap-y-6">
        <DialogHeader className="h-fit">
          <DialogTitle>Form Preview</DialogTitle>
          <DialogDescription>
            Here is a preview of your form. Please make sure to click the save
            button to save your changes.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex flex-col gap-y-6">
          {elements.map((element) => {
            const FormComponent = Elements[element.type].formComponent;
            return <FormComponent key={element.id} elementInstance={element} />;
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
