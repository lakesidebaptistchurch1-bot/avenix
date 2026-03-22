import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  BASE_URL: z.string().url().optional(),

  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),

  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),

  PAYSTACK_PUBLIC_KEY: z.string().optional().default(""),
  PAYSTACK_SECRET_KEY: z.string().optional().default(""),

  AUTH_SECRET: z.string().min(10),
});

const parsed = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  BASE_URL: process.env.BASE_URL,

  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

  PAYSTACK_PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,

  AUTH_SECRET: process.env.AUTH_SECRET,
});

if (!parsed.success) {
  console.error("❌ ENV VALIDATION ERROR:", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;