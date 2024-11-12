import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Circle, LucideIcon } from "lucide-react";

type StatCardType = {
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  value?: string | number;
  description?: string;
};

export function StatCard(props: StatCardType) {
  const Icon = props.icon ? props.icon : Circle;

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
        {props.icon && <Icon className="h-4 w-4" color={props.iconColor} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.value}</div>
      </CardContent>
      <CardFooter className="mt-auto">
        <p className="text-sm text-muted-foreground">{props.description}</p>
      </CardFooter>
    </Card>
  );
}
