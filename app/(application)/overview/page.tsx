import { StatCard } from "@/components/custom/stats-card";
import { BarGraph } from "@/components/overview/bar-graph";
import { VisitorsGraph } from "@/components/overview/visitors-graph";
import { getEntriesStatus, todaysEntries } from "@/server/entries";
import { Circle, CircleCheck, IndianRupee, Loader } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubmissionsTable } from "@/components/forms/submissions/submissions-table";
import { CreateFormCard } from "@/components/forms/create-form-card";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatNumberToIndianReadable } from "@/lib/utils";
import { formatNumberInIndianAnnotation } from "@/lib/utils";
import { getFormsStats } from "@/server/form";

export const dynamic = "force-dynamic";

async function getData() {
  return Promise.all([todaysEntries(), getEntriesStatus(), getFormsStats()])
    .then((values) => {
      return {
        data: values[0] ?? [],
        leads: values[1] ?? [],
        highest_agreement_value: values[2]?.highest_agreement_value ?? 0,
      };
    })
    .catch((error) => {
      console.error(error);
      return {
        data: [],
        leads: [],
        highest_agreement_value: 0,
      };
    });
}

export default async function OverviewPage() {
  const { data, leads, highest_agreement_value } = await getData();

  const newLeads =
    leads?.find((lead: any) => lead?.status === "NEW")?.count ?? 0;
  const inProgressLeads =
    leads?.find((lead: any) => lead?.status === "IN_PROGRESS")?.count ?? 0;
  const confirmedLeads =
    leads?.find((lead: any) => lead?.status === "CONFIRMED")?.count ?? 0;

  return (
    <div className="flex-1 space-y-8">
      <div className="w-full flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <CreateFormCard />
        <StatCard
          title="Highest Agreement Value"
          icon={IndianRupee}
          value={formatNumberToIndianReadable(highest_agreement_value ?? 0)}
          description="Highest agreement value"
        />
        <Card className="sm:col-span-2 overflow-hidden flex flex-col">
          <CardHeader>
            <CardTitle>Leads</CardTitle>
            <CardDescription>
              Total leads:{" "}
              {formatNumberToIndianReadable(
                newLeads + inProgressLeads + confirmedLeads
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress
              value={
                (confirmedLeads /
                  (newLeads + inProgressLeads + confirmedLeads)) *
                100
              }
            />
          </CardContent>
          <CardFooter className="mt-auto">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3">
              <dl className="">
                <dt className="text-muted-foreground text-sm font-medium">
                  New
                </dt>
                <dd className="text-lg font-semibold text-foreground">
                  {formatNumberInIndianAnnotation(newLeads)}
                </dd>
              </dl>
              <dl className="">
                <dt className="text-muted-foreground text-sm font-medium">
                  In Progress
                </dt>
                <dd className="text-lg font-semibold text-foreground">
                  {formatNumberInIndianAnnotation(inProgressLeads)}
                </dd>
              </dl>
              <dl className="">
                <dt className="text-muted-foreground text-sm font-medium">
                  Confirmed
                </dt>
                <dd className="text-lg font-semibold text-foreground">
                  {formatNumberInIndianAnnotation(confirmedLeads)}
                </dd>
              </dl>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="md:col-span-2 lg:col-span-3">
          <BarGraph />
        </div>
        <div className="md:col-span-1 lg:col-span-2">
          <VisitorsGraph />
        </div>
      </div>
      <div className="">
        {data && (
          <Tabs
            className="space-y-4"
            defaultValue={data[0]?.formDetails?.form_code}
          >
            <TabsList>
              {data.map((entry: any, index: number) => (
                <TabsTrigger key={index} value={entry?.formDetails?.form_code}>
                  {entry?.formDetails?.form_code}
                </TabsTrigger>
              ))}
            </TabsList>

            {data.map((entry: any, index: number) => (
              <TabsContent key={index} value={entry?.formDetails?.form_code}>
                <SubmissionsTable
                  formElements={JSON.parse(entry?.formDetails?.json_content)}
                  submissions={entry?.submission}
                />
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </div>
  );
}
