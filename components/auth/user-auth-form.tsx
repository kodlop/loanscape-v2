"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { FormInput } from "../custom/form-input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const authSchema = z.object({
  username: z.string(),
  password: z.string().min(8),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof authSchema>) {
    setIsLoading(true);
    const { username, password } = values;

    try {
      if (username === "info@loanscape.co.in" && password === "loanscape1234") {
        router.push("/overview");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <FormInput
            form={form}
            label="Username"
            name="username"
            type="text"
            placeholder="Username"
          />
          <FormInput
            form={form}
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit" size="lg" loading={isLoading}>
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
