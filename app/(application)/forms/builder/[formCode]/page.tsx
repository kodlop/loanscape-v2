import { FormBuilder } from "@/components/forms/builder/form-builder";
import BuilderProvider from "@/context/BuilderContext";
import { Form } from "@/types/form";

export default async function FormBuilderPage(props: {
  params: Promise<{ formCode: string }>;
}) {
  const { formCode } = await props.params;
  console.log(formCode);
  // const form: Form | undefined = await getFormByFormCode(formCode);
  const form = undefined;

  // if (!form) {
  //   return <div>Form not found</div>;
  // }

  return (
    <BuilderProvider defaultForm={{} as Form}>
      <FormBuilder />
    </BuilderProvider>
  );
}
