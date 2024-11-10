import { StatCard } from "@/components/custom/stats-card";
import { ElementInstance } from "@/components/forms/builder/elements";
import { ShareFormLink } from "@/components/forms/submissions/share-form-link";
import { SubmissionsTable } from "@/components/forms/submissions/submissions-table";
import { ViewFormAction } from "@/components/forms/submissions/view-form-actions";
import { ViewQRCode } from "@/components/forms/submissions/view-qr-code";
import { getFormByFormCode } from "@/server/form";
import { getAllSubmissions } from "@/server/submit";
import { Form } from "@/types/form";
import { Eye, IndianRupee, Users } from "lucide-react";

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
        <StatCard
          title="Total Views"
          icon={Eye}
          value="12"
          description="Total number of views"
        />
        <StatCard
          title="Total Submissions"
          icon={Users}
          value="12"
          description="Total number of submissions"
        />
        <StatCard
          title="Highesh Argrrement"
          icon={IndianRupee}
          value="12"
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
