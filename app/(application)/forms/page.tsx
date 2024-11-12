import { StatCard } from "@/components/custom/stats-card";
import { CreateFormCard } from "@/components/forms/create-form-card";
import { FormCard } from "@/components/forms/form-card";
import { formatAmount } from "@/lib/formatAmount";
import { getAllForms, getFormsStats } from "@/server/form";
import { Form } from "@/types/form";

import { File, IndianRupee, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function FormsPage() {
  const forms: Form[] | undefined | null = await getAllForms();

  const { total_forms, total_submissions, highest_agreement_value } =
    await getFormsStats();

  return (
    <div className="flex-1 space-y-8">
      <div className="w-full flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Forms</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CreateFormCard />
        <StatCard
          title="Total Forms"
          icon={File}
          value={formatAmount(total_forms) || "0"}
          description="Total number of forms"
        />
        <StatCard
          title="Total Submissions"
          icon={Users}
          value={formatAmount(total_submissions) || "0"}
          description="Total number of submissions"
        />
        <StatCard
          title="Highest Agreement Value"
          icon={IndianRupee}
          value={"Rs." + formatAmount(highest_agreement_value) || "0"}
          description="Highest value of all agreements"
        />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">History</h2>
      {!forms && <div>No form is added yet</div>}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
        {forms?.map((form) => (
          <FormCard key={form._id} form={form} />
        ))}
      </div>
    </div>
  );
}
