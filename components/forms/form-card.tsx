"use client";

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
import { ArrowRight, EllipsisVertical, Eye, FilePenLine } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { deletdFormById } from "@/server/form";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface FormCardProps {
  form: Form;
}

const bgImages = ["/bg-1.jpg", "/bg-2.jpg", "/bg-3.jpg", "/bg-4.jpg"];

function getRandomImage() {
  return bgImages[Math.floor(Math.random() * bgImages.length)];
}

export function FormCard({ form }: FormCardProps) {
  const router = useRouter();
  const [bgImage, setBgImage] = useState<string>("");
  useEffect(() => {
    setBgImage(getRandomImage());
  }, [form]);

  const handleDelete = async () => {
    if (form._id) {
      await deletdFormById(form._id)
        .then(() => {
          toast({
            title: "Form Deleted",
            description: "Form has been deleted successfully",
          });
          setTimeout(() => {
            router.refresh();
          }, 500);
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        });
    }
  };

  return (
    <Card className="aspect-[1/1.414] flex flex-col spcae-y-0 rounded-sm">
      <CardHeader className="relative p-4 space-y-0">
        <CardTitle className="flex items-center gap-2 justify-between z-10 text-white">
          <span className="truncate font-semibold text-balance">
            {form.form_name}
          </span>
        </CardTitle>
        {form.is_published && (
          <div className="z-10 mt-0 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex-none rounded-full p-1 text-green-500 bg-green-500/10 animate-pulse">
            <div className="h-2 w-2 rounded-full bg-current"></div>
          </div>
        )}
        {!form.is_published && (
          <div className="z-10 mt-0 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 flex-none rounded-full p-1 text-destructive bg-destructive-400/10 animate-pulse">
            <div className="h-2 w-2 rounded-full bg-current"></div>
          </div>
        )}
        <div className="absolute inset-0 rounded-tl-sm rounded-tr-sm overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 z-1 bg-slate-900/15"></div>
            <img
              src={bgImage}
              className="w-full h-full object-cover"
              alt="background"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="divide-y">
          <div className="pb-2 flex items-center justify-between">
            <CardDescription className="font-medium text-sm">
              Visits
            </CardDescription>
            <CardDescription className="font-medium text-sm text-right text-secondary-foreground">
              {form.visit_count}
            </CardDescription>
          </div>
          <div className="pt-2 flex items-center justify-between">
            <CardDescription className="font-medium text-sm">
              Submission
            </CardDescription>
            <CardDescription className="font-medium text-sm text-right text-secondary-foreground">
              {form.total_submissions}
            </CardDescription>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto pr-0 mr-0">
            <EllipsisVertical className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {form.is_published && (
              <Link href={`/forms/submission/${form.form_code}`}>
                <DropdownMenuItem>Submission</DropdownMenuItem>
              </Link>
            )}
            <Link href={`/forms/builder/${form.form_code}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
