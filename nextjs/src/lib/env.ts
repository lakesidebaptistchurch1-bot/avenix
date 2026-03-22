import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  BASE_URL: z.string().url().optional(),

  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20),

  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).refine(
    (val) =>
      // Allow new opaque format: sb_secret_...
      val.startsWith("sb_secret_") ||
      // OR allow legacy JWT format (still used in some older/self-hosted setups)
      val.startsWith("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."),
    {
      message:
        "SUPABASE_SERVICE_ROLE_KEY must start with 'sb_secret_' (new format) or 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' (legacy JWT)",
    }
  ),

  PAYSTACK_PUBLIC_KEY: z.string().optional().default(""),
  PAYSTACK_SECRET_KEY: z.string().optional().default(""),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  BASE_URL: process.env.BASE_URL,

  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

  PAYSTACK_PUBLIC_KEY: process.env.PAYSTACK_PUBLIC_KEY,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
});