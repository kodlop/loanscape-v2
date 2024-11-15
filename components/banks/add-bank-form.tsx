"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bank, bankSchema } from "@/types/bank";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import { FormInput } from "../custom/form-input";
import { FormSelect } from "../custom/form-select";
import { BANK_INSTIUTION_TYPES, BANKS } from "@/data/constants";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Separator } from "../ui/separator";
import { FormTextarea } from "../custom/form-textarea";
import { addBank } from "@/server/bank";
import { toast } from "@/hooks/use-toast";

function GeneralForm({ form }: { form: UseFormReturn<Bank> }) {
  useEffect(() => {
    if (!form.watch("name")) return;
    const bankName = form.watch("name");
    const bankCode = BANKS.find((bank) => bank.label === bankName)
      ?.value as string;
    form.setValue("code", bankCode);
  }, [form.watch("name")]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="">
          <h2 className="text-lg font-semibold">Primary Details</h2>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormSelect
            form={form}
            name="name"
            label="Bank Name"
            placeholder="Enter bank name"
            className="sm:col-span-2"
            options={BANKS.map((bank) => ({
              label: bank.label,
              value: bank.label,
            }))}
          />
          <FormInput
            form={form}
            name="code"
            label="Bank Code"
            placeholder="Enter bank code"
            className="sm:col-span-2"
            disabled={true}
          />
          <FormSelect
            form={form}
            name="institution_type"
            label="Institution Type"
            placeholder="Select institution type"
            className="sm:col-span-2"
            options={BANK_INSTIUTION_TYPES}
          />
        </div>
      </div>
      <div className="space-y-4">
        <div className="">
          <h2 className="text-lg font-semibold">Financial Details</h2>
        </div>
        <Separator />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FormInput
            form={form}
            name="rate"
            label="Rate"
            placeholder="Enter rate"
            className="sm:col-span-2"
          />
          <FormInput
            form={form}
            name="rate_type"
            label="Rate Type"
            placeholder="Enter rate type"
            className="sm:col-span-2"
          />
          <FormInput
            form={form}
            name="fees"
            label="Fees"
            placeholder="Enter fees"
            className="sm:col-span-2"
          />
          <FormInput
            form={form}
            name="valuation_charges"
            label="Valuation Charges"
            placeholder="Enter valuation charges"
            className="sm:col-span-2"
          />
          <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormInput
              form={form}
              name="legal_charges"
              label="Legal Charges"
              placeholder="Enter legal charges"
              className="sm:col-span-2"
            />
          </div>
          <FormInput
            form={form}
            name="payment_plan"
            label="Payment Plan"
            placeholder="Enter payment plan"
            className="sm:col-span-2"
          />
          <FormInput
            form={form}
            name="product"
            label="Product"
            placeholder="Enter product"
            className="sm:col-span-2"
          />
          <FormInput
            form={form}
            name="part_payment"
            label="Part Payment"
            placeholder="Enter part payment"
            className="sm:col-span-2"
          />
          <FormInput
            form={form}
            name="minimum_down_payment"
            label="Minimum Down Payment"
            placeholder="Enter minimum down payment"
            className="sm:col-span-2"
          />
        </div>
      </div>
      <FormTextarea
        form={form}
        name="usp"
        label="USP"
        placeholder="Enter Unique Selling Proposition"
        className="sm:col-span-2"
      />
    </div>
  );
}

function ConfigForm({ form }: { form: UseFormReturn<Bank> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <FormInput
        form={form}
        name="loan_amount_formula"
        label="Loan Amount Formula"
        placeholder="Enter loan amount formula"
        className="sm:col-span-4"
        description="For example: {{Agreement Value}}*0.75"
      />
    </div>
  );
}

export function AddBankForm() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const router = useRouter();

  const form = useForm<Bank>({
    resolver: zodResolver(bankSchema),
  });

  async function onSubmit(data: Bank) {
    await addBank(data)
      .then(() => {
        toast({
          title: "Bank added successfully",
          description: "Bank has been added successfully",
        });

        setTimeout(() => {
          router.push("/banks");
        }, 2000);
      })
      .catch((error) => {
        toast({
          title: "Failed to add bank",
          description: error?.message,
          variant: "destructive",
        });
      });
  }

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {tab === "general" && <GeneralForm form={form} />}
        {tab === "config" && <ConfigForm form={form} />}
        <Button type="submit" loading={false}>
          Save
        </Button>
      </form>
    </Form>
  );
}
