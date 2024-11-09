"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useCollapsed } from "@/hooks/use-collapsed";
import Image from "next/image";
import { Navbar } from "./navbar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { PRIMARY_NAVLINKS, SECONDARY_NAVLINKS } from "@/data/navlinks";
import { useTheme } from "next-themes";

type ApplicationLayoutProps = {
  children: React.ReactNode;
};

export function ApplicationLayout({ children }: ApplicationLayoutProps) {
  const isCollapsed = useCollapsed();
  const { theme } = useTheme();

  return (
    <TooltipProvider delayDuration={0}>
      <div className="relative flex flex-row h-full max-h-screen items-stretch overflow-hidden">
        <div
          className={cn(
            "h-screen flex flex-col transition-all duration-300 ease-in-out border-e",
            isCollapsed
              ? "min-w-[52px] max-w-[52px]"
              : "min-w-[260px] max-w-[260px]"
          )}
        >
          <div
            className={cn(
              isCollapsed
                ? "flex h-[52px] items-center justify-center"
                : "px-2 flex h-[52px] items-center"
            )}
          >
            {isCollapsed ? (
              <Image
                src="/logo-mark.png"
                alt="Loanscape"
                width={32}
                height={32}
              />
            ) : (
              <Image
                src={theme === "dark" ? "/logo-light.png" : "/logo-dark.png"}
                alt="Loanscape"
                width={172}
                height={32}
                className="pl-4"
              />
            )}
          </div>
          <Separator />
          <Navbar navlinks={PRIMARY_NAVLINKS} isCollapsed={isCollapsed} />
          <Separator />
          <Navbar navlinks={SECONDARY_NAVLINKS} isCollapsed={isCollapsed} />
          {/* {!isCollapsed && <UpgradeCard className="mx-2 mt-auto mb-8" />} */}
        </div>
        <div className="flex-1 h-screen">
          <div className="flex items-center px-4 py-2">
            {isCollapsed && <h1 className="text-xl font-bold">LOANSCAPE</h1>}
            <div className="ml-auto flex items-center space-x-3">
              <ModeToggle />
              <Button variant="ghost" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Separator />
          <ScrollArea className="h-full">
            <div className="px-4 py-8 h-full">
              {children}
              <div className="w-full p-8"></div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </TooltipProvider>
  );
}
