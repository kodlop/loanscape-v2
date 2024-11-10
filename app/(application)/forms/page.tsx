import { StatCard } from "@/components/custom/stats-card";
import { CreateFormCard } from "@/components/forms/create-form-card";
import { FormCard } from "@/components/forms/form-card";
import { getAllForms } from "@/server/form";
import { Form } from "@/types/form";

import { File, IndianRupee, Users } from "lucide-react";

export default async function FormsPage() {
  const forms: Form[] | undefined | null = await getAllForms();
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
          value="12"
          description="Total number of forms"
        />
        <StatCard
          title="Total Submissions"
          icon={Users}
          value="12"
          description="Total number of submissions"
        />
        <StatCard
          title="Total Value"
          icon={IndianRupee}
          value="12"
          description="Total value of all agreements"
        />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">History</h2>
      {!forms && <div>No form is added yet</div>}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
        {forms?.map((form) => (
          <FormCard key={form._id} form={form} />
        ))}
      </div>
    </div>
  );
}
