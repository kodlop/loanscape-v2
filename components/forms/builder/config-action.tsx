"use client";

import { FormInput } from "@/components/custom/form-input";
import { FormLayout } from "@/components/custom/form-layout";
import { FormSelect } from "@/components/custom/form-select";
import { FormTextarea } from "@/components/custom/form-textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useBuilder } from "@/hooks/use-builder";
import { toast } from "@/hooks/use-toast";
import { getAllBanks } from "@/server/bank";
import { Bank } from "@/types/bank";
import { configSchema } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings2, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

function GeneralForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof configSchema>>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <FormInput
        form={form}
        name="gst_percent"
        label="GST Percent"
        placeholder="Enter gst percent"
        className="sm:col-span-2"
        type="number"
      />
      <FormInput
        form={form}
        name="maintenance_amount"
        label="Maintenance Amount"
        placeholder="Enter maintenance amount"
        className="sm:col-span-2"
        type="number"
      />
      <FormInput
        form={form}
        name="stamp_duty_percent"
        label="Stamp Duty Percent"
        placeholder="Enter stamp duty percent"
        className="sm:col-span-2"
        type="number"
      />
      <FormInput
        form={form}
        name="additional_percent"
        label="Additional Amount Percent"
        placeholder="Enter additional amount percent"
        className="sm:col-span-2"
        type="number"
      />
      <FormTextarea
        form={form}
        name="tnc"
        label="Terms & Conditions"
        placeholder="Enter terms & conditions"
        className="md:col-span-4"
      />
    </div>
  );
}

function StampDuesForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof configSchema>>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <FormInput
        form={form}
        name="statutory_dues.mod_percent"
        label="MOD Percent"
        placeholder="Enter mod percent"
        className="sm:col-span-2"
        type="number"
      />
      <FormInput
        form={form}
        name="statutory_dues.notice_of_initimation"
        label="Notice of Intimation"
        placeholder="Enter notice of intimation"
        className="sm:col-span-2"
        type="number"
      />
      <FormInput
        form={form}
        name="statutory_dues.advocate_fees"
        label="Advocate Fees"
        placeholder="Enter advocate fees"
        className="sm:col-span-2"
        type="number"
      />
    </div>
  );
}

function BankFormulasForm({
  form,
}: {
  form: UseFormReturn<z.infer<typeof configSchema>>;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "bank_formula",
  });

  const [banks, setBanks] = useState<Bank[]>([]);

  useEffect(() => {
    const fetchBanks = async () => {
      await getAllBanks()
        .then((data) => {
          if (data === null) return;
          setBanks(data);
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        });
    };

    fetchBanks();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4">
      {fields.map((field, index) => (
        <div key={index} className="grid grid-cols-12 gap-2">
          <FormSelect
            form={form}
            name={`bank_formula.${index}.bank_id`}
            label="Bank"
            placeholder="Select bank"
            options={banks.map((bank) => ({
              label: bank.name,
              value: bank?._id as string,
            }))}
            className="col-span-3"
            defaultValue={field.bank_id}
          />
          <FormInput
            form={form}
            name={`bank_formula.${index}.formula`}
            label="Formula"
            placeholder="Enter formula"
            className="col-span-8"
            description="For example: ({{Agreement Value}}+{{GST}}+{{Maintenance}}+{{Additional Valuation}})*0.75"
          />
          <Button
            size="icon"
            variant="destructive"
            onClick={() => remove(index)}
            className="mt-auto mb-11"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        onClick={() => {
          append({ bank_id: "", formula: "" });
        }}
        className=""
      >
        Add Bank Formula
      </Button>
    </div>
  );
}

export function ConfigAction() {
  const { form: formData, setForm } = useBuilder();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const router = useRouter();

  const configForm = useForm<z.infer<typeof configSchema>>({
    resolver: zodResolver(configSchema),
  });

  useEffect(() => {
    if (!formData || formData.config === null) return;
    configForm.reset(formData.config);
  }, [formData]);

  const handleSaveConfig = () => {
    setForm((prev) => ({
      ...prev,
      config: configForm.getValues(),
    }));
    toast({
      title: "⚠️ Attention",
      description: "Please save the complete form to apply the changes",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          onClick={() => {
            // Add a query parameter to the URL without refreshing the page
            router.push("?tab=general");
          }}
        >
          <Settings2 className="w-4 h-4 mr-0.5" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full p-6 flex flex-col gap-y-6">
        <FormLayout
          heading="Form Configuration"
          description="Configure your form settings here"
          sidemenu={[
            {
              title: "General",
              query: "general",
            },
            {
              title: "Stamp Dues",
              query: "stamp-dues",
            },
            {
              title: "Bank Formula",
              query: "bank-formula",
            },
          ]}
        >
          <Form {...configForm}>
            {tab === "general" && <GeneralForm form={configForm} />}
            {tab === "stamp-dues" && <StampDuesForm form={configForm} />}
            {tab === "bank-formula" && <BankFormulasForm form={configForm} />}

            <Button className="mt-8" type="button" onClick={handleSaveConfig}>
              Save Config
            </Button>
          </Form>
        </FormLayout>
      </DialogContent>
    </Dialog>
  );
}
