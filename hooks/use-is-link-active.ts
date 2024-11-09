import { usePathname, useSearchParams } from "next/navigation";

export function useIsLinkActive(href: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.toString();
  const url = `${pathname}?${query}`;

  if (url === "/") return href === url;

  return url.includes(href);
}
