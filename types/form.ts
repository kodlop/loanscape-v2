import { z } from "zod";

const stampDuesSchema = z.object({
  stamp_duty: z.number().default(0),
  notice_of_initimation: z.number().default(0),
  advocate_fees: z.number().default(0),
});

export const bankFormulaSchema = z.object({
  bank_id: z.string(),
  formula: z.string(),
});

export const configSchema = z.object({
  gst_amount: z.number().default(0),
  maintainece_amount: z.number().default(0),
  stamp_duty_amount: z.number().default(0),
  additional_amount: z.number().default(0),
  statutory_dues: stampDuesSchema,
  bank_formula: z.array(bankFormulaSchema).default([]),
  // tnc: z.string().default(""),
});

export const formSchema = z.object({
  _id: z.string().optional(),
  form_name: z.string(),
  form_code: z.string(),
  json_content: z.string().default("[]"),
  is_published: z.boolean().default(false).optional(),
  config: configSchema.optional(),
  visit_count: z.number().default(0).optional(),
  total_submissions: z.number().default(0).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type Form = z.infer<typeof formSchema>;
