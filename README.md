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
