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

// As busca podem ser feitas em Textos puros e com vetores igualmente a outros serviços.
const searchResult = await collection.query({
  queryTexts: ["This is a document about ta"],
});

console.log(searchResult);
// QueryResult {
//   distances: [ [ 0, 0.6589594, 0.7905997, 0.96142495 ] ],
//   documents: [
//     [
//       'This is a document about ta',
//       'This is a document about t',
//       'This is a document about tu',
//       'This is a document about u'
//     ]
//   ],
//   embeddings: [],
//   ids: [ [ 'id7', 'id5', 'id8', 'id6' ] ],
//   include: [ 'metadatas', 'documents', 'distances' ],
//   metadatas: [ [ null, null, null, null ] ],
//   uris: []
// }
