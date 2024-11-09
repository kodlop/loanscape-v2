import { StatCard } from "@/components/custom/stats-card";
import { CreateFormCard } from "@/components/forms/create-form-card";

import { File, IndianRupee, Users } from "lucide-react";

export default function FormsPage() {
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
    </div>
  );
}
