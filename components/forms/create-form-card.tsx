"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { ArrowRight, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

import { Form as FormSchema, formSchema } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { FormInput } from "../custom/form-input";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createForm } from "@/server/form";

export function CreateFormCard() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (!form.watch("form_name")) {
      form.setValue("form_code", "");
      return;
    }
    const formCode = form.watch("form_name").replace(/\s/g, "-").toLowerCase();
    form.setValue("form_code", formCode);
  }, [form.watch("form_name")]);

  const onSubmit = async (values: FormSchema) => {
    await createForm(values)
      .then(() => {
        toast({
          title: "Form Created",
          description: "The form has been successfully created.",
        });
        setTimeout(() => {
          router.push(`/forms/builder/${values.form_code}`);
        }, 2000);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      });
  };

  return (
    <Dialog>
      <Card className="bg-accent flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle>Create Form 🚀</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Create a new form to collect data from your users.
          </CardDescription>
        </CardContent>
        <CardFooter className="mt-auto">
          <DialogTrigger asChild>
            <Button>
              Create New Form
              <ArrowRight className="ml-1" />
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <DialogHeader>
            <DialogHeader>Create Form</DialogHeader>
            <DialogDescription>
              Fill out the form below to create a new form.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormInput
                form={form}
                label="Form Name"
                name="form_name"
                placeholder="Enter the form name"
              />
              <FormInput
                form={form}
                label="Form Code"
                name="form_code"
                placeholder="Enter the form code"
                disabled
              />
              <div className="pt-3 flex justify-end">
                <Button type="submit">Create</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function CreateFormButton() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (!form.watch("form_name")) {
      form.setValue("form_code", "");
      return;
    }
    const formCode = form.watch("form_name").replace(/\s/g, "-").toLowerCase();
    form.setValue("form_code", formCode);
  }, [form.watch("form_name")]);

  const onSubmit = async (values: FormSchema) => {
    await createForm(values)
      .then(() => {
        toast({
          title: "Form Created",
          description: "The form has been successfully created.",
        });
        setTimeout(() => {
          router.push(`/forms/builder/${values.form_code}`);
        }, 2000);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="" />
          Create Form
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <DialogHeader>
            <DialogHeader>Create Form</DialogHeader>
            <DialogDescription>
              Fill out the form below to create a new form.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormInput
                form={form}
                label="Form Name"
                name="form_name"
                placeholder="Enter the form name"
              />
              <FormInput
                form={form}
                label="Form Code"
                name="form_code"
                placeholder="Enter the form code"
                disabled
              />
              <div className="pt-3 flex justify-end">
                <Button type="submit">Create</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
