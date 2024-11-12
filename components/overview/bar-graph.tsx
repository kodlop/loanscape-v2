"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  new: {
    label: "New",
    color: "hsl(var(--chart-1))",
  },
  confirmed: {
    label: "Confirmed",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const getPercentageChange = (chartData: any[]) => {
  if (chartData.length < 2) return 0;
  const current = chartData[chartData.length - 1];
  const previous = chartData[chartData.length - 2];
  return ((current.new - previous.new) / previous.new) * 100;
};
export function BarGraph({ graph }: { graph: any[] }) {
  const chartData = graph?.map((data: any) => {
    return {
      month: data?.month,
      new: data?.total_new_leads,
      confirmed: data?.total_completed_leads,
    };
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-96" config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="new" fill="var(--color-new)" radius={4} />
            <Bar dataKey="confirmed" fill="var(--color-confirmed)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending by {getPercentageChange(chartData)}% this month{" "}
          {/* <TrendingUp className="h-4 w-4" /> */}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total leads for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
