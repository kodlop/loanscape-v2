import type { Navlink } from "@/types/navlink";
import { File, Landmark, LayoutDashboard, Settings } from "lucide-react";

export const PRIMARY_NAVLINKS: Navlink[] = [
  {
    title: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Forms",
    href: "/forms",
    icon: File,
  },
  {
    title: "Banks",
    href: "/banks",
    icon: Landmark,
  },
];

export const SECONDARY_NAVLINKS: Navlink[] = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
