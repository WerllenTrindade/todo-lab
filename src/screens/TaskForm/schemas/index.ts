import { PRIORITY } from "@/constants/priority";
import { z } from "zod";


export const PRIORITYS = [
  { label: "Baixa", value: PRIORITY.BAIXA },
  { label: "Média", value: PRIORITY.MEDIA },
  { label: "Alta", value: PRIORITY.ALTA },
];



type Property = typeof PRIORITYS[number]["value"];

const VALUES: [Property, ...Property[]] = [
  PRIORITYS[0].value,
  ...PRIORITYS.slice(1).map((p) => p.value)
];


export const taskSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().optional(),
  date: z.string().min(1, "Data obrigatória"),
  startTime: z.string().min(1, "Hora de início obrigatória"),
  endTime: z.string().min(1, "Hora de término obrigatória"),
  priority: z.enum(VALUES),
  alert: z.boolean(),
}).refine((data) => {
  const [sh, sm] = data.startTime.split(":").map(Number);
  const [eh, em] = data.endTime.split(":").map(Number);
  const startMinutes = sh * 60 + sm;
  const endMinutes = eh * 60 + em;
  return endMinutes > startMinutes;
}, {
  message: "O horário de término deve ser maior que o de início",
  path: ["endTime"],
});