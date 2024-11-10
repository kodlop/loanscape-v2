"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bank, bankSchema } from "@/types/bank";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { FormInput } from "../custom/form-input";
import { FormSelect } from "../custom/form-select";
import { BANK_INSTIUTION_TYPES } from "@/data/constants";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "../ui/separator";
import { FormTextarea } from "../custom/form-textarea";
import { addBank } from "@/server/bank";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const settingsSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

function GeneralForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof settingsSchema>>;
}) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="">
          <h2 className="text-lg font-semibold">General Details</h2>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormInput
            form={form}
            name="username"
            label="Username"
            disabled={true}
            className="sm:col-span-2"
          />
          <FormInput
            form={form}
            name="password"
            label="Password"
            disabled={true}
            className="sm:col-span-2"
          />
        </div>
      </div>
    </div>
  );
}

export function SettingsForm() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const router = useRouter();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      username: "info@loanscape.co.in",
      password: "loanscape1234",
    },
  });

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form className="space-y-8">
        {tab === "general" && <GeneralForm form={form} />}
      </form>
    </Form>
  );
}
