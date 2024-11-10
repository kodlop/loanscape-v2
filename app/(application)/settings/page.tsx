import { FormLayout } from "@/components/custom/form-layout";
import { SettingsForm } from "@/components/settings/settings-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function BankDetailsPage() {
  return (
    <FormLayout
      heading="Settings"
      description="Credentials and settings"
      sidemenu={[{ title: "General", query: "general" }]}
    >
      <Suspense fallback={<Skeleton className="w-full h-24 rounded-md" />}>
        <SettingsForm />
      </Suspense>
    </FormLayout>
  );
}
