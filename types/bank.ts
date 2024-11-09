import { BANK_INSTIUTION_TYPES } from "@/data/constants";
import { z } from "zod";

const INSTITUTION_TYPES_ENUM = BANK_INSTIUTION_TYPES.map((type) => type.value);

export const bankSchema = z.object({
  _id: z.string().optional(),
  name: z.string().trim(),
  code: z.string().trim(),
  institution_type: z.enum([
    INSTITUTION_TYPES_ENUM[0],
    ...INSTITUTION_TYPES_ENUM,
  ] as const),
  rate: z.string().trim(),
  rate_type: z.string().trim(),
  fees: z.string().trim().default("0"),
  valuation_charges: z.string().trim().default("0"),
  legal_charges: z.string().trim().default("0"),
  payment_plan: z.string().trim(),
  product: z.string().trim(),
  part_payment: z.string().trim(),
  minimum_down_payment: z.string().trim(),
  usp: z.string().trim(),
  loan_amount_formula: z.string().trim(),
});

export type Bank = z.infer<typeof bankSchema>;
