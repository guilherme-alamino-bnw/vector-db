import { QdrantClient } from "@qdrant/js-client-rest";

// Configurações do ambiente local abaixo:
// Distancia que foi configurada foi: Cosseno
// Tamanho dos vetores foi : 3072
const client = new QdrantClient({ 
    host: "localhost", 
    port: 6333
});
