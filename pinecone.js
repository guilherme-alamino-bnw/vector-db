import { Pinecone } from '@pinecone-database/pinecone';

// Credencial do pinecone
const pinecone = new Pinecone({ apiKey: '{{API_KEY}}' });

// Nome do Indice criado na plataforma do (Pinecone)
// Nome do Host criado automaticamente na plataforma do (Pinecone)
// Os modelos da (OPENAI) não fazem Incorporação integrada com o pinecone
const indexName = "majestic-lab";
const indexHost = "majestic-lab-q7vfmck.svc.aped-4627-b74a.pinecone.io";

// Como eu já crie o indice dentro da plataforma eu só precisei conectar
// Sugestão da documentação é que usamos o indexHost em ambientes de produção
const index = pinecone.index(indexName, indexHost);