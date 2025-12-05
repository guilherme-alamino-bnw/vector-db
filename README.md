# vector-db

# Vector DB – Pinecone

O Pinecone é um banco de dados vetorial, ao utilizá-lo e consumi-lo senti uma facilidade imensa tanto na documentação oficial quanto na integração via SDK para NodeJS.

Ele oferece alguns modelos de incorporação integrados — Significa que ao enviar um texto não precisamos tokenizar ele antes, isto ocorre de maneira automática.

Porém, não oferece incorporação automática para os modelos da "Open AI", dito isto é necessário tokenizar antes para enviar ao Pinecone.

---

# Dimensões

As dimensões servem para os índices e para cada modelo de incorporação temos as dimensões podendo ser:
```txt
Ex.: 384 | 768 | 1024...
```

Ela define o tamanho do vetor de embeddings:
```txt
O modelo tem 768 dimensões
Resposta: [0.12, -0.44, 0.88, ..., 0.03]  // 768 números
```

# Vetorização

O processo de vetorização acontece para alocar os "dados" em um espaço alocado no banco, dito isto, nós podemos vetorizar de duas formas e das seguintes maneiras "Denso" ou "Esparso".

O Vector denso representa uma série de números e esses números podem representar (textos, imagens e etc...) e os números de cada vetor correspondem a um ponto de espaço no banco.

```txt
Pergunta: "Por que o preço das ações da Nvidia subiu hoje ?"
Embedding denso: [ -0.12, 0.98, -0.33, 0.07 ]
```

O Vector esparso é representado em pesos sobre as palavras e somente algumas posições tem o valor diferente de 0.

```txt
Ex.: "Por que o Sol é Rosa ?"

Palavra    | Posição | Valor
-----------|---------|-------
por que    |    0    | 1
o          |    1    | 0.8
sol        |    2    | 1.3
é          |    3    | 1
rosa       |    4    | 1
heroi      |    5    | 0
```

```txt
- Se a palavra aparece no texto: ganha um peso.
- Se não aparece: a posição permanece 0.
```


# Quando usar o RAG vs Semantic Search

O pinecone oferece suporte a dois tipos de Buscas no Banco

## RAG
Você carrega informações no espaço do banco normalmente por documento PDF e você descreve um contexto personalizado para os documentos ao qual você quer interagir.

```txt
1) A pergunta realizada no chat é convertida em embeddings.
2) O Pinecone retorna os trechos mais relevantes dos documentos.
3) O Contexto personalizado gera a resposta com base no conteúdo relevante.
```

## Semantic Search
Você carrega informações no espaço do banco com palavras, e você interage fazendo perguntas.
Exemplo de Chat:
```txt
1) A pergunta realizada no chat é convertida em embeddings.
2) O Pinecone retorna os itens mais próximos das palavras ao qual foi feita.
3) A resposta é devolvida automaticamente.
```

# Armazenamento

O armazenamento oferece suporte para índices (densos e esparsos) conforme explicado acima.

Porém quando vamos armazenar algo precisamos definir qual o indice.
Dentro do indice temos a possibilidade de selecionar um namespace.

```txt
- Podemos ter 1 namespace para cada usuário dentro de um mesmo índice
- Podemos ter varios namespace para cada usuário.
```

# Modelagem de dados

A modelagem é necessária porque você não pode trazer de qualquer jeito os dados. e ela pode ser feita de duas maneiras enviando o contéudo em "texto puro" ou em "vetores":

Com o valor em Texto: ele será convertido automaticamente em vetores

Com o valor em Vetores: é obrigatório que os valores já foram convertidos.

A estrutura recomendada é:
### Texto:
```
{
    id:
    text:
    metadata:
}
```
### Vetores:
```
{
    id:
    vector:
    metadata:
}
```

# Limites do plano padrão

```
Limite de 2GB de armazenamento para índices no plano padrão (free)

Limite de 1 Milhão de Leitura (mensal), consulta, buscas e listagem no plano padrão (free)

Limite de 2 Milhões de escritas (mensal), inserções, atualizações e deletes
```

# Material de apoio:
* Tokenização para entender melhor: https://www.pinecone.io/learn/tokenization/

* Vetores densos e Vetores esparsos: https://www.pinecone.io/learn/sparse-retrieval/

* Vector DB: https://www.pinecone.io/learn/vector-database/

---
# Vector DB – Qdrant

O Qdrant é um banco de dados vetorial open-source e oferece muito suporte para rodar em cloud propria e das seguintes maneiras:
- rodar **localmente**
    - No Ambiente local é disponibilizado as seguintes interfaces:
    - REST API: localhost:6333
    - Web UI: localhost:6333/dashboard
    - GRPC API: localhost:6334
- rodar em **servidores próprios**
- rodar em **clusters dedicados**
- usar o **Qdrant Cloud**, se quiser

Ao utiliza-lo não senti tanta facilidade igual o "Pinecone", ele oferece muitas maneiras de criar uma collection para armazenar informações:

- Oferecendo ampla variações para "vetorização esparsa", por oferecer tantas opções achei bastante confuso inicialmente.
- Você pode usa-la para armazenar collections sem precisar vetorizar, sendo as opções de uma collection tracional (chave e valor) ou em vetores.
- Não contem "incorporação integrada" no plano inicial (padrão), eles chamam de "inferência" é necessario contratar um plano com servidor dedicado para "incorporação integrada"(não foi testado) apartir de $31 dolar.
- Dificil achar exemplos que usam a vetorização automatica. 
    - O que achei de positivo é que oferece um "Dashboard" para configurações.
    - O que achei de negativo primordialmente é que são muitas configurações, e a documentação não é tão intuitiva igual a "Pinecone".

---

## Dimensões

As dimensões das "Collections" precisam ser iguais com os modelos de incorporação da OpenAI como por exemplo:

```txt
Ex.: 512 | 1536 | 3072...
```

Aqui estou usando um modelo da openAI para fazer a incorporação dos textos:

```js
const text = "Recipe for baking chocolate chip";

const embedding = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: text,
    dimensions : 3072
});

const vector = embedding.data[0].embedding;

```
- Não podemos ter uma dimensão 3072 de incorporação da OpenAI, e nossa "Collection" for configurada para 512.


## Vetorização

O Qdrant **não faz o embeddings sozinho** no plano padrão. eles chamam esse recurso de **inferência**, e está apenas disponível em planos com servidor dedicados.

Testei a vetorização densa dessa maneira:
- ✔ Gerando embeddings antes  
- ✔ Enviando ao Qdrant com os vetores já prontos

Uma maneira simples de inserir os dados + vetores:
```js
const operationInfo = await client.upsert("{collection_name}", {
  wait: true,
  points: [
    { 
        id: 5, 
        vector: vector, 
        payload: { 
            city: "London", 
            text: "Recipe for baking chocolate chip" 
        } 
    }
  ],
});
```

## Armazenamento 
Quando uma instancia é compartilhada para varios usuário eles sugerem que você use da seguinte maneira:
- Crie uma chave com um nome exemplo essa está como "group_id" é um identificador para conseguir filtrar posteriormente, mas você pode escolher um nome melhor.. 
- Quando quiser armazenar para um usuário especifico só passar dessa maneira:
```js
client.upsert("{collection_name}", {
    points: [
        {
            id: 1,
            payload: { group_id: "user_1" },
            vector: [0.9, 0.1, 0.1],
        },
        {
            id: 2,
            payload: { group_id: "user_1" },
            vector: [0.1, 0.9, 0.1],
        },
        {
            id: 3,
            payload: { group_id: "user_2" },
            vector: [0.1, 0.1, 0.9],
        },
    ]
})
```

Uma sugestão é que devemos usar o parametro "is_tenant" para evitar a degradação de desempenho e instabilidades no cluster e alto custos, entre outras tecnicas de sharding.
```js
 client.createPayloadIndex("{collection_name}", {
    field_name: "group_id",
    field_schema: {
        type: "keyword",
        is_tenant: true,
    },
});
```

# Limites do plano padrão

```
Provider : AWS (eu-west-2)

RAM: 1 GiB

vCPUs (Processamento virutal): 0,5 vCPU

DISK (Espaço em disco): 4 GiB

```

# Material de apoio:
* Inferência: https://qdrant.tech/documentation/concepts/inference/

* Operações multi-tenant: https://qdrant.tech/documentation/concepts/indexing/#tenant-index

* Vetores do DB: https://qdrant.tech/documentation/concepts/vectors/