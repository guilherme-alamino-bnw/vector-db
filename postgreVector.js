import { createClient } from "@supabase/supabase-js";

// Criando conexão com o banco de dados em nuvem.
const supabase = createClient(
    "https://vakwmpyvbqotfpwgoiot.supabase.co",
    "{{API_KEY}}"
);


