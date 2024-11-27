import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useBuilder } from "@/hooks/use-builder";
import { toast } from "@/hooks/use-toast";
import { updateFormById } from "@/server/form";
import { Form } from "@/types/form";
import { Radio } from "lucide-react";
import { useRouter } from "next/navigation";

export function PublishAction() {
  const { form, elements } = useBuilder();
  const router = useRouter();

  const handlePublish = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const data = {
        ...form,
        json_content: JSON.stringify(elements),
        is_published: true,
      } as Form;
      const { _id, createdAt, updatedAt, ...dataWithoutId } = data;
      console.log("Publishing form", dataWithoutId);
      await updateFormById(_id as string, dataWithoutId)
        .then(() => {
          toast({
            title: "Form published",
            description: "Your form has been published successfully",
          });
          router.push(`/forms/submissions/${form.form_code}`);
        })
        .catch((error) => {
          console.error("Error publishing form", error);
          toast({
            title: "Error publishing form",
            description: error.message,
            variant: "destructive",
          });
        });
    } catch (error) {
      console.error("Error publishing form", error);
      toast({
        title: "Error publishing form",
        description: "An error occurred while publishing the form",
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Radio className="w-4 h-4 mr-0.5" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Once you publish this form will be
            available for everyone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={(event) => handlePublish(event)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
