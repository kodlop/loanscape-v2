import { StatCard } from "@/components/custom/stats-card";
import { BarGraph } from "@/components/overview/bar-graph";
import { VisitorsGraph } from "@/components/overview/visitors-graph";
import { todaysEntries } from "@/server/entries";
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

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const data = await todaysEntries();

  return (
    <div className="flex-1 space-y-8">
      <div className="w-full flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CreateFormCard />
        <StatCard
          title="Highest Agreement Value"
          icon={IndianRupee}
          value="12"
          description="Total value of highest agreement"
        />
        <Card className="sm:col-span-2 overflow-hidden flex flex-col">
          <CardHeader>
            <CardTitle>Leads</CardTitle>
            <CardDescription>
              Total leads
              {formatNumberToIndianReadable(2005)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(200 / 2005) * 100} />
          </CardContent>
          <CardFooter className="mt-auto">
            <div className="w-full grid grid-cols-1 sm:grid-cols-3">
              <dl className="">
                <dt className="text-muted-foreground text-sm font-medium">
                  New
                </dt>
                <dd className="text-lg font-semibold text-foreground">
                  {formatNumberInIndianAnnotation(1000)}
                </dd>
              </dl>
              <dl className="">
                <dt className="text-muted-foreground text-sm font-medium">
                  In Progress
                </dt>
                <dd className="text-lg font-semibold text-foreground">
                  {formatNumberInIndianAnnotation(200)}
                </dd>
              </dl>
              <dl className="">
                <dt className="text-muted-foreground text-sm font-medium">
                  Confirmed
                </dt>
                <dd className="text-lg font-semibold text-foreground">
                  {formatNumberInIndianAnnotation(500)}
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
            <div className="">
              <h2 className="text-lg lg:text-2xl font-bold">
                Todays Submissions
              </h2>
            </div>
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
