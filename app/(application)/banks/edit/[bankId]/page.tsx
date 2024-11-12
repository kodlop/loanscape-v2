import { EditBankForm } from "@/components/banks/edit-bank-form";
import { FormLayout } from "@/components/custom/form-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { getBankById } from "@/server/bank";
import { Bank } from "@/types/bank";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function EditBankPage(props: {
  params: Promise<{ bankId: string }>;
}) {
  const { bankId } = await props.params;

  const bank: Bank | undefined = await getBankById(bankId);

  if (!bank) {
    return <div>Bank not found</div>;
  }

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
        <EditBankForm data={bank} />
      </Suspense>
    </FormLayout>
  );
}
