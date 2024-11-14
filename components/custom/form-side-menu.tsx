"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePathname, useSearchParams } from "next/navigation";

interface FormSideMenuProps extends React.HTMLAttributes<HTMLElement> {
  sidemenu: {
    title: string;
    query: string;
  }[];
}

export function FormSideMenu({
  className,
  sidemenu,
  ...props
}: FormSideMenuProps) {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const tab = searchParams.get("tab");

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {sidemenu.map((item) => (
        <Link
          key={item.query}
          href={pathname + "?tab=" + item.query}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            tab === item.query
              ? "bg-card hover:bg-card"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
