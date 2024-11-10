"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Clipboard } from "lucide-react";

interface ShareFormLinkProps {
  formCode: string;
}

export function ShareFormLink({ formCode }: ShareFormLinkProps) {
  const shareLink = `${window.location.origin}/submit/${formCode}`;
  return (
    <div className="flex gap-x-3">
      <Input readOnly value={shareLink} />
      <Button
        onClick={(event) => {
          event.preventDefault();
          navigator.clipboard.writeText(shareLink);
          toast({
            title: "Link copied",
            description: "The form link has been copied to your clipboard",
          });
        }}
      >
        <Clipboard className="w-4 h-4 mr-0.5" />
        Copy Link
      </Button>
    </div>
  );
}
