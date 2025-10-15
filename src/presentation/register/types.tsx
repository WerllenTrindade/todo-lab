import { z } from "zod"
import { schema } from "./schemas"

export type types = z.infer<
  typeof schema
>
