import { z } from "zod";
import { recoverEmailSchema } from "./schema";

export type recoverEmailType = z.infer<typeof recoverEmailSchema>