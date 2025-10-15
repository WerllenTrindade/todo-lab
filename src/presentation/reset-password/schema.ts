import { z } from "zod";

export const recoverEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Insira um e-mail')
    .email('Insira um e-mail válido'),
});
