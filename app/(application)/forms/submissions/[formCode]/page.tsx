import { StatCard } from "@/components/custom/stats-card";
import { ElementInstance } from "@/components/forms/builder/elements";
import { ShareFormLink } from "@/components/forms/submissions/share-form-link";
import { SubmissionsTable } from "@/components/forms/submissions/submissions-table";
import { ViewFormAction } from "@/components/forms/submissions/view-form-actions";
import { ViewQRCode } from "@/components/forms/submissions/view-qr-code";
import { getFormByFormCode } from "@/server/form";
import { getAllSubmissions } from "@/server/submit";
import { Form } from "@/types/form";
import {
  Circle,
  CircleCheck,
  CircleDot,
  Eye,
  IndianRupee,
  LucideIcon,
  User,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatNumberToIndianReadable } from "@/lib/utils";
export const dynamic = "force-dynamic";

const getStyle = (type: "VIEWS" | "SUBMISSIONS" | "AGREEMENT_VALUE") => {
  switch (type) {
    case "VIEWS":
      return { icon: Eye, color: "bg-blue-500" };
    case "SUBMISSIONS":
      return { icon: User, color: "bg-yellow-500" };
    case "AGREEMENT_VALUE":
      return { icon: IndianRupee, color: "bg-green-500" };
    default:
      return { icon: Circle, color: "bg-blue-500" };
  }
};

function LeadStatCard({
  label,
  value,
  description,
  type,
}: {
  icon?: LucideIcon;
  label: string;
  value: number;
  description: string;
  type: "VIEWS" | "SUBMISSIONS" | "AGREEMENT_VALUE";
}) {
  const { icon: Icon, color } = getStyle(type);

  return (
    <Card className="overflow-hidden flex flex-col">
      <CardHeader className="flex flex-row items-center space-y-0">
        <div className={cn("p-3 rounded-md", color)}>
          <Icon className={cn("w-5 h-5 text-white")} strokeWidth={2} />
        </div>
        <div className="ml-4 space-y-1">
          <CardDescription>{label}</CardDescription>
          <CardTitle>₹{formatNumberToIndianReadable(value)}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      {/* <CardFooter className="bg-muted/50 py-3 mt-auto">
        <CardDescription className="hover:underline cursor-pointer">
          View Details
        </CardDescription>
      </CardFooter> */}
    </Card>
  );
}

export default async function FormSubmissionPage(props: {
  params: Promise<{ formCode: string }>;
}) {
  const { formCode } = await props.params;

  const form: Form | undefined = await getFormByFormCode(formCode);

  if (!form) {
    return <div>Form not found</div>;
  }

  const submissions = await getAllSubmissions(formCode);

  const formElements = JSON.parse(form.json_content) as ElementInstance[];

  return (
    <div className="flex-1 space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Dummy Form</h2>
        <div className="flex items-center space-x-2">
          <ViewQRCode formCode={formCode} />
          <ViewFormAction formCode={formCode} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <LeadStatCard
          type="VIEWS"
          label="Total Views"
          value={2000}
          description="Total number of views"
        />
        <LeadStatCard
          type="SUBMISSIONS"
          label="Total Submissions"
          value={2000}
          description="Total number of submissions"
        />
        <LeadStatCard
          type="AGREEMENT_VALUE"
          label="Highest Agreement Value"
          value={2000}
          description="Highest value of all agreements"
        />
      </div>
      <ShareFormLink formCode={formCode} />
      <div className="space-y-4">
        <div className="">
          <h2 className="text-lg lg:text-2xl font-bold">Submission</h2>
        </div>
        <SubmissionsTable
          formElements={formElements}
          submissions={submissions}
        />
      </div>
    </div>
  );
}
