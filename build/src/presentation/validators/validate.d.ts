import { ZodSchema } from "zod";
import { RequestHandler } from "express";
type RequestSource = "body" | "params" | "query";
export declare const validate: <T>(schema: ZodSchema<T>, source?: RequestSource) => RequestHandler;
export {};
