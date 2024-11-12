import { AddBankForm } from "@/components/banks/add-bank-form";
import { FormLayout } from "@/components/custom/form-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function BankDetailsPage() {
  return (
    <FormLayout
      heading="Bank Details"
      description="Add the details of the bank"
      sidemenu={[
        { title: "General", query: "general" },
        { title: "Config", query: "config" },
      ]}
    >
      <Suspense fallback={<Skeleton className="w-full h-24 rounded-md" />}>
        <AddBankForm />
      </Suspense>
    </FormLayout>
  );
}
