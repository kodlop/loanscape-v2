import { Form } from "@/types/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Eye, FilePenLine } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface FormCardProps {
  form: Form;
}

export function FormCard({ form }: FormCardProps) {
  return (
    <Card className="aspect-[3/4] flex flex-col spcae-y-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">{form.form_name}</span>
          {form.is_published && <Badge>Published</Badge>}
          {!form.is_published && <Badge variant="destructive">Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {form.is_published && (
            <span className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span>0</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className=""></CardContent>
      <CardFooter className="mt-auto">
        {form.is_published && (
          <Link
            className="w-full"
            href={`/forms/submissions/${form.form_code}`}
          >
            <Button variant="secondary" className="w-full">
              Submissions
            </Button>
          </Link>
        )}
        {!form.is_published && (
          <Link className="w-full" href={`/forms/builder/${form.form_code}`}>
            <Button variant="secondary" className="w-full">
              Build Form
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
