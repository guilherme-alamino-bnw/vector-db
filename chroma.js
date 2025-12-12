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
