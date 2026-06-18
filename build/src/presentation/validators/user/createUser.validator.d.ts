import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    surname: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodString;
    username: z.ZodOptional<z.ZodString>;
    roleId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
