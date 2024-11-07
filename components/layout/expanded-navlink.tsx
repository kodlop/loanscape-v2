import type { Navlink } from "@/types/navlink";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

type ExpandedNavlinkProps = {
  navlink: Navlink;
  isLinkActive: boolean;
};

export function ExpandedNavlink({
  navlink,
  isLinkActive,
}: ExpandedNavlinkProps) {
  const variant = isLinkActive ? "default" : "ghost";

  return (
    <Link
      href={navlink.href}
      className={cn(
        buttonVariants({ variant }),
        // variant === "secondary" &&
        // "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
        "justify-start"
      )}
    >
      <navlink.icon className="mr-2 h-4 w-4" />
      {navlink.title}
      {navlink.label && (
        <span
          className={cn(
            "ml-auto"
            // variant === "secondary" && "text-background dark:text-white"
          )}
        >
          {navlink.label}
        </span>
      )}
    </Link>
  );
}
