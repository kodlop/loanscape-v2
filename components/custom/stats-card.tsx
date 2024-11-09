import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Circle, LucideIcon } from "lucide-react";

type StatCardType = {
  title: string;
  icon?: LucideIcon;
  iconColor?: string;
  value?: string;
  description?: string;
};

export function StatCard(props: StatCardType) {
  const Icon = props.icon ? props.icon : Circle;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
        {props.icon && <Icon className="h-4 w-4" color={props.iconColor} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{props.value}</div>
        <p className="text-xs text-muted-foreground">{props.description}</p>
      </CardContent>
    </Card>
  );
}
