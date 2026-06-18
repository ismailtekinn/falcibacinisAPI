import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(1, "Phone is required"),
  username: z.string().optional(),
  roleId: z.number().int().positive().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
