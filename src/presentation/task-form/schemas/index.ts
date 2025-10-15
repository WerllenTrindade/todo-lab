import { PRIORITY_VALUES } from "@/shared/constants/priorities";
import { isToday, nowInMinutes, timeToMinutes } from "@/shared/utils/time";
import { z } from "zod";

export const taskSchema = z.object({
  id: z.union([z.number(), z.string().transform(Number)]).optional(),
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().optional(),
  date: z.string().min(1, "Data obrigatória"),
  startTime: z.string().min(1, "Hora de início obrigatória"),
  endTime: z.string().min(1, "Hora de término obrigatória"),
  priority: z.enum(PRIORITY_VALUES),
  alert: z.boolean(),
})
.refine((data) => {
  if (!data.startTime || !data.endTime) return true;
  return timeToMinutes(data.endTime) > timeToMinutes(data.startTime);
}, {
  message: "Hora final deve ser maior que a inicial",
  path: ["endTime"],
})
.refine((data) => {
  if (!data.date || !data.endTime) return true;
  if (!isToday(data.date)) return true;
  return timeToMinutes(data.endTime) >= nowInMinutes();
}, {
  message: "Hora final não pode ser menor que a hora atual",
  path: ["endTime"],
});
