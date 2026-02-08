import { config } from "dotenv";
import { z } from "zod";

config({ quiet: true });

const envSchema = z.object({
    ANTHROPIC_API_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
