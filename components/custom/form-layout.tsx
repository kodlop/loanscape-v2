import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { FormSideMenu } from "./form-side-menu";

type FormLayoutProps = {
  children: React.ReactNode;
  heading: string;
  description?: string;
  sidemenu: {
    title: string;
    query: string;
  }[];
};

export function FormLayout({
  children,
  heading,
  description,
  sidemenu = [],
}: FormLayoutProps) {
  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <Suspense fallback={<div>Loading...</div>}>
            <FormSideMenu sidemenu={sidemenu} />
          </Suspense>
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
