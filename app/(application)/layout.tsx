import { ApplicationLayout } from "@/components/layout/application-layout";
import { ThemeProvider } from "@/components/ui/theme-provider";

export default function ApplicationRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="w-screen h-screen">
        <ApplicationLayout>{children}</ApplicationLayout>
      </main>
    </ThemeProvider>
  );
}
