import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Confetti } from "@/components/forms/submissions/confetti";

export default async function ThankYouPage() {
  return (
    <>
      <Confetti />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              🎉 Congratulations 🎉
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Your submission has been received. We will be in touch shortly.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#"
                className={cn(buttonVariants({ variant: "link" }))}
              >
                {" "}
                Contact us &#129058;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
