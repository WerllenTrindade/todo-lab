import { z } from "zod";
import { taskSchema } from "../schemas";

export type taskTypes = z.infer<typeof taskSchema>;