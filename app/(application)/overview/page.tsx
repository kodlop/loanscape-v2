import { StatCard } from "@/components/custom/stats-card";
import { BarGraph } from "@/components/overview/bar-graph";
import { VisitorsGraph } from "@/components/overview/visitors-graph";
import { Circle, CircleCheck, IndianRupee, Loader } from "lucide-react";

export default function OverviewPage() {
  return (
    <div className="flex-1 space-y-8">
      <div className="w-full flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="New"
          icon={Circle}
          value="12"
          description="Total number of new leads"
        />
        <StatCard
          title="Confirmed"
          icon={CircleCheck}
          value="12"
          description="Total number of confirmed leads"
        />
        <StatCard
          title="In Progress "
          icon={Loader}
          value="12"
          description="Total number of leads in progress"
        />
        <StatCard
          title="Highest Agreement Value"
          icon={IndianRupee}
          value="12"
          description="Total value of highest agreement"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="md:col-span-2 lg:col-span-3"></div>
        <div className="md:col-span-1 lg:col-span-2">
          <VisitorsGraph />
        </div>
      </div>
      <div className="">
        <BarGraph />
      </div>
    </div>
  );
}
