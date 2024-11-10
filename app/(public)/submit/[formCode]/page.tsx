import { RenderFormFields } from "@/components/submit/render-form-fields";
import { Testimonials } from "@/components/submit/testimonials";
import { getFormByFormCode } from "@/server/form";
import { Form } from "@/types/form";
import Image from "next/image";

export default async function SubmitFormPage(props: {
  params: Promise<{ formCode: string }>;
}) {
  const { formCode } = await props.params;

  const form: Form | undefined = await getFormByFormCode(formCode);

  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <div className="w-full h-screen">
      <div className="relative hidden md:block">
        <div className="fixed top-0 md:w-[300px] lg:w-[600px] h-full max-h-screen bg-primary">
          <div className=" w-full h-full p-8 md:p-12 lg:p-16 flex flex-col justify-between">
            <Image
              src="/logo-light.png"
              alt="Logo"
              width={200}
              height={38}
              objectFit="contain"
            />

            <div className="flex flex-col gap-y-6 md:gap-y-8 lg:gap-y-12">
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold text-primary-foreground text-balance">
                Let&apos;s setup your operating agreement
              </h1>
              <div className="">
                <Testimonials />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:ml-[300px] lg:ml-[600px] h-full p-8 md:p-12 lg:p-16">
        <div className="block md:hidden pb-2">
          <Image
            src="/logo-mark.png"
            alt="Logo"
            width={48}
            height={48}
            objectFit="contain"
          />
        </div>
        <h2 className="text-2xl md:text-4xl font-medium pb-8">
          Let&apos;s get started!
        </h2>
        <div className="max-w-xl">
          <RenderFormFields
            formCode={formCode}
            jsonContent={form.json_content}
          />
        </div>
      </div>
    </div>
  );
}
