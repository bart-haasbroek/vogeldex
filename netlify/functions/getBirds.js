import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Gebruik de service role key voor server-side access
);

export async function handler() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Fout bij ophalen van vogels", details: error }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  };
}
