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
 
// Estrutura sugerida pela documentação para inserção no indice
// Temos autonomia para definir o nome que usamos na descrição "text" ela pode ser configurada na plataforma 
const records = [
    {
      _id: "rec1",
      text: "As Crônicas de Nárnia descrevem um mundo onde crianças comuns descobrem coragem, amizade e magia ao atravessar um simples guarda-roupa.",
      category: "fantasia"
    },
    {
      _id: "rec2",
      text: "Em O Senhor dos Anéis, a jornada pelo Anel demonstra como até o menor dos seres pode mudar o destino de todo um mundo.",
      category: "fantasia épica"
    },
    {
      _id: "rec3",
      text: "O universo de Avatar destaca a conexão dos Na'vi com a natureza, onde cada ser vivo participa de um grande ciclo espiritual.",
      category: "ficção científica"
    },
    {
      _id: "rec4",
      text: "Os Vingadores mostram que grandes poderes só fazem sentido quando usados para proteger quem não pode lutar sozinho.",
      category: "super-heróis"
    },
    {
      _id: "rec6",
      text: "Reinos élficos costumam ser retratados como sociedades elegantes e imortais, guiadas por conhecimento ancestral e profundo senso de harmonia.",
      category: "cultura fantástica"
    },
    {
      _id: "rec7",
      text: "Artefatos mágicos geralmente carregam histórias antigas, e seu verdadeiro poder só se revela para quem demonstra coragem e propósito.",
      category: "magia"
    }
];

// Definindo namespace por exemplo: aqui poderiamos definir um namespace para cada (tenant) 
// E assim escalar nosso banco para multi-tenant pois na documentação temos suporte a isso.
const namespaceIndex = index.namespace("teste-1");

// Persistindo meus dados
// await namespaceIndex.upsertRecords(records);

// Aguardar esse tempo é recomendado pela documentação para os dados serem inseridos no indice
// E conseguirmos busca-los atualizados
await new Promise(resolve => setTimeout(resolve, 10000));

// Informações sobre nosso indice
const stats = await namespaceIndex.describeIndexStats();

// Ex.: Response do stats
// {
//   namespaces: { 'teste-1': { recordCount: 6 } },
//   dimension: 1024,
//   indexFullness: 0,
//   totalRecordCount: 6
// }
