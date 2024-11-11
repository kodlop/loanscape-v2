import { RenderFormFields } from "@/components/submit/render-form-fields";
import { Testimonials } from "@/components/submit/testimonials";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { getFormByFormCode, increaseVisitsCount } from "@/server/form";
import { Form } from "@/types/form";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function SubmitFormPage(props: {
  params: Promise<{ formCode: string }>;
}) {
  const { formCode } = await props.params;

  const form: Form | undefined = await getFormByFormCode(formCode);

  if (!form) {
    return <div>Form not found</div>;
  }

  // const data = await increaseVisitsCount(formCode);

  return (
    <div className="w-full h-full">
      <div className="h-full relative">
        <div className="lg:hidden relative w-full aspect-[4/3] overflow-hidden mb-8">
          <Image
            src="/mobile-bg.png"
            alt="Logo"
            layout="fill"
            className="overflow-hidden"
          />
          <div className="absolute top-0 w-full p-4 z-5">
            <div className="flex items-center justify-between">
              <Image
                src="/logo-light.png"
                alt="Logo"
                width={124}
                height={38}
                objectFit="contain"
              />
              <Link
                href="https://www.loanscape.co.in/"
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "font-medium text-white bg-slate-950 hover:bg-slate-800 hover:text-white"
                )}
              >
                Visit Website
                <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden h-screen w-2/3 fixed left-0 top-0 lg:block col-span-2 bg-red-100">
          <Image
            src="/desktop-bg.png"
            alt="Logo"
            layout="fill"
            className="overflow-hidden"
          />
          <div className="absolute top-0 w-full p-8 z-50">
            <div className="flex items-center justify-between">
              <Image
                src="/logo-light.png"
                alt="Logo"
                width={200}
                height={48}
                objectFit="contain"
              />
              <Link
                href="https://www.loanscape.co.in/"
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "default" }),
                  "font-medium text-white bg-slate-950 hover:bg-slate-800 hover:text-white"
                )}
              >
                Visit Website
                <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className="px-8 lg:ml-auto lg:w-1/3 lg:mt-8">
          <div className="space-y-4 text-secondary-foreground">
            <Image
              src="/logo-mark.png"
              alt="Logo"
              width={48}
              height={48}
              objectFit="contain"
              className="hidden lg:block"
            />
            <h1 className="text-2xl font-medium">Let&apos;s Get Started! 🚀</h1>
            <Separator />
            <p className="text-md font-medium">
              We wont&apos;t disclose 🤫 your data to any third application!
              Fill the form stress free 😇.
            </p>
          </div>
          <div className="mt-12">
            <RenderFormFields
              formCode={formCode}
              jsonContent={form.json_content}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// <div className="w-full h-screen">
//   <div className="relative hidden md:block">
//     <div className="fixed top-0 md:w-[300px] lg:w-[600px] h-full max-h-screen bg-primary">
//       <div className=" w-full h-full p-8 md:p-12 lg:p-16 flex flex-col justify-between">
//         <Image
//           src="/logo-light.png"
//           alt="Logo"
//           width={200}
//           height={38}
//           objectFit="contain"
//         />

//         <div className="flex flex-col gap-y-6 md:gap-y-8 lg:gap-y-12">
//           <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold text-primary-foreground text-balance">
//             Let&apos;s setup your operating agreement
//           </h1>
//           <div className="">
//             <Testimonials />
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className="md:ml-[300px] lg:ml-[600px] h-full p-8 md:p-12 lg:p-16">
//     <div className="block md:hidden pb-2">
//       <Image
//         src="/logo-mark.png"
//         alt="Logo"
//         width={48}
//         height={48}
//         objectFit="contain"
//       />
//     </div>
//     <h2 className="text-2xl md:text-4xl font-medium pb-8">
//       Let&apos;s get started!
//     </h2>
//     <div className="max-w-xl">
//       <RenderFormFields
//         formCode={formCode}
//         jsonContent={form.json_content}
//       />
//     </div>
//   </div>
// </div>;
