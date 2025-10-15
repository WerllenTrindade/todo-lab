import { z } from "zod";

export const schema = z.object({
    email: z
    .string()
    .trim()
    .min(1, "O e-mail é obrigatório")
    .max(50, "O e-mail deve ter no máximo 50 caracteres")
    .email("Formato de e-mail inválido"),
  password: z.string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(20, "A senha deve ter no máximo 20 caracteres")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter pelo menos um caractere especial"),
  confirm_password: z.string()
}).refine(data => data.password === data.confirm_password, {
  message: "As senhas não coincidem",
  path: ["confirm_password"]
});