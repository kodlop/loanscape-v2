"use client";

import { useIsLinkActive } from "@/hooks/use-is-link-active";
import type { Navlink } from "@/types/navlink";
import { CollapsedNavlink } from "./collapsed-navlink";
import { ExpandedNavlink } from "./expanded-navlink";

type NavlinkProps = {
  navlink: Navlink;
  isCollapsed: boolean;
};

export function Navlink({ navlink, isCollapsed }: NavlinkProps) {
  const isLinkActive = useIsLinkActive(navlink.href);

  return isCollapsed ? (
    <CollapsedNavlink navlink={navlink} isLinkActive={isLinkActive} />
  ) : (
    <ExpandedNavlink navlink={navlink} isLinkActive={isLinkActive} />
  );
}
