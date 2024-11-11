import type { Navlink } from "@/types/navlink";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

type CollapsedNavlinkProps = {
  navlink: Navlink;
  isLinkActive: boolean;
};

export function CollapsedNavlink({
  navlink,
  isLinkActive,
}: CollapsedNavlinkProps) {
  const variant = isLinkActive ? "secondary" : "ghost";

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={navlink.href}
          className={cn(
            buttonVariants({ variant: variant, size: "icon" }),
            "h-9 w-9",
            variant === "secondary" &&
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
          )}
        >
          <navlink.icon className="h-4 w-4" />
          <span className="sr-only">{navlink.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {navlink.title}
        {navlink.label && (
          <span className="ml-auto text-muted-foreground">{navlink.label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
