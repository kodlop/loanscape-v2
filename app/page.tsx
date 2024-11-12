import { UserAuthForm } from "@/components/auth/user-auth-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
export const dynamic = "force-dynamic";
export default function LoginPage() {
  return (
    <>
      <div className="relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0">
            <Image
              src="/bg.png"
              alt="Background"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image
              src="/logo-mark.png"
              alt="LOANSCAPE"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="font-semibold text-xl">LOANSCAPE</span>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Explicabo, quisquam dolorum! Numquam, corrupti consequatur illo
                quasi mollitia laudantium, harum natus voluptate eveniet odio
                reprehenderit facere.&rdquo;
              </p>
              <footer className="text-sm">John Doe</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password to access your account.
              </p>
            </div>
            <UserAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              If you need any assistance, please contact our support team at{" "}
              <Link href="mailto:dev.kodlop@gmail.com" className="underline">
                here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
