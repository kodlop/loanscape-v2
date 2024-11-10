"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

interface ViewFormActionProps {
  formCode: string;
}

export function ViewFormAction({ formCode }: ViewFormActionProps) {
  const shareLink = `${window.location.origin}/submit/${formCode}`;

  return (
    <Link href={shareLink} target="_blank">
      <Button variant="secondary">
        <Eye className="w-4 h-4 mr-0.5" />
        View Form
      </Button>
    </Link>
  );
}
