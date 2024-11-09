import { Suspense } from "react";
import { ConfigAction } from "./config-action";
import { PreviewAction } from "./preview-action";
import { PublishAction } from "./publish-action";
import { SaveAction } from "./save-action";
import { Skeleton } from "@/components/ui/skeleton";

export function Actions() {
  return (
    <div className="flex gap-x-2">
      <PreviewAction />
      <SaveAction />
      <Suspense fallback={<Skeleton className="h-9 px-4 py-2 rounded-sm" />}>
        <ConfigAction />
      </Suspense>
      <PublishAction />
    </div>
  );
}
