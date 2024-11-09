import { EditBankForm } from "@/components/banks/edit-bank-form";
import { FormLayout } from "@/components/custom/form-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Bank } from "@/types/bank";
import { Suspense } from "react";

export default async function EditBankPage(props: {
  params: Promise<{ bankId: string }>;
}) {
  const { bankId } = await props.params;

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
        <EditBankForm data={{} as Bank} />
      </Suspense>
    </FormLayout>
  );
}
