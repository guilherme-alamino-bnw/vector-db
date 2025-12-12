// Para cada caso de uso, você precisa usar a interface correspondente.
// Mas os conceitos de uso são os mesmos para ambos
import { ChromaClient } from "chromadb";
import { CloudClient } from "chromadb";

// Credenciais de configuração iniciais
// Interessante aqui por que declaramos o tenant na collection
// Acredito que isso seja diferente das anteriores ao qual eu já testei. 
const client = new CloudClient({
    apiKey: '{{API_KEY}}',
    tenant: 'ae4c5127-f37a-4b79-b018-fc21f9c424c0',
    database: 'majestic-lab'
});

// Pega ou Cria a Collection para armazenar dados
const collection = await client.getOrCreateCollection({
    name: "my-collection"
});

// Inserção dos dados com um identificador (id)
// Aqui a incorporação integrada já acontence com os textos
// Se você tentar adicionar duas vezes os mesmos "id" com os "documents" ele não aceita a mudança de estado.
await collection.add({
  ids: ["id7", "id8"],
  documents: [
    "This is a document about ta",
    "This is a document about tu",
  ],
});
