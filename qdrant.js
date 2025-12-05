import { QdrantClient } from "@qdrant/js-client-rest";
import OpenAI from "openai";

// Embeddings de um texto para usar o vetor gerado para armazenar ao Qdrant
const openai = new OpenAI({ apiKey: '{{API_KEY}}' });

const text = "Recipe for baking chocolate chip cookies";

const embedding = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: text,
    dimensions : 3072
});

const vector = embedding.data[0].embedding;

// Configurações do ambiente local abaixo:
// Distancia que foi configurada foi: Cosseno
// Tamanho dos vetores foi : 3072
const client = new QdrantClient({ 
    host: "localhost", 
    port: 6333
});
 
// Eu já criei uma collection e se chama "my-collection-majestic"
// Abaixo vamos usar a collection para armazenar um vetor + payload
// Lembre-se que a quantidade do "vector" precisa ser o mesmo configurado para a "Collection"
const operationInfo = await client.upsert("my-collection-majestic", {
  wait: true,
  points: [
    { 
        id: 7, 
        vector: vector, 
        payload: { 
            city: "London", 
            text: "Recipe for baking chocolate chip cookies" 
        } 
    }
  ],
});

console.log(operationInfo)
// Exemplo de resposta do operationInfo:
// { 
//     operation_id: 2, 
//     status: 'completed' 
// }
