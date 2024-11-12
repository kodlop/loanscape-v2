import { z } from "zod";

const stampDuesSchema = z.object({
  mod_percent: z.number().min(0).max(100),
  notice_of_initimation: z.number().default(0),
  advocate_fees: z.number().default(0),
});

export const bankFormulaSchema = z.object({
  bank_id: z.string(),
  formula: z.string(),
});

export const configSchema = z.object({
  gst_percent: z.number().min(0).max(100).default(0),
  stamp_duty_percent: z.number().min(0).max(100).default(0),
  additional_percent: z.number().min(0).max(100).default(0),
  maintenance_amount: z.number().default(0),
  statutory_dues: stampDuesSchema,
  bank_formula: z.array(bankFormulaSchema).default([]),
  tnc: z.string().default(""),
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
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Form = z.infer<typeof formSchema>;
