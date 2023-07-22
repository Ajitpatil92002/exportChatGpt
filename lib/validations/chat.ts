import * as z from "zod"

export const chatPatchSchema = z.object({
  title: z.string().min(3).max(128).optional(),
})
