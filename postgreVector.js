import { createClient } from "@supabase/supabase-js";

// Criando conexão com o banco de dados em nuvem.
const supabase = createClient(
    "https://vakwmpyvbqotfpwgoiot.supabase.co",
    "{{API_KEY}}"
);

// Você pode tanto ter uma função que faz o embedding de maneira implementada no código tradicionalmente ou conforme sujestão da documentação
// Deixar que o banco dispare um gatilho para a função funcionar mais perto do cliente no proprio ambiente de nuvem.
// Abaixo vou gerar um vetor ficticio de 10, porque foi configurado para o banco de dados na coluna embedding o "VECTOR(10)"
// const vectorExample = [0.12, 0.87, 0.45, 0.33, 0.91, 0.04, 0.68, 0.56, 0.29, 0.75];

// Inserindo na tabela os valores gerados
// const { error } = await supabase
//   .from("majestic_lab")
//   .insert({ id: 1, embedding: vectorExample, content: "Mordor" });
