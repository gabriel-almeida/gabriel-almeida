---
title: 'Radar: Unificando bases de dados geográficos com embeddings e similaridade de Strings'
description: Identificando coisas iguais com nomes diferentes
img: radar.svg
author:
  name: Gabriel Almeida
  bio: Cientista da computação e //TODO bio
  img: gabriel-almeida.jpg
tags:
  - NLP
  - Machine Learning
  - ML old-school
  - Dados geográficos
  - Similaridade de Strings
  - Pareamento de dados
published: 2024-11-07T22:30:00.000-03:00
modified: 2024-11-07T22:30:00.000-03:00
---

Fonte: [https://www.dbreunig.com/2024/09/27/conflating-overture-points-of-interests-with-duckdb-ollama-and-more.html]

Essa postagem fala de algumas abordagens para se fundir dados geográficos (isso se chama "conflating" nesse contexto). Achei interessante porque já fiz um projeto de pareamento de cadastros com algumas técnicas similares, mas nunca mexi com dados geográficos.

O autor quer juntar dados abertos de inspeções da vigilância sanitária de um condado americano com as localizações de negócios de um conjunto de dados chamado "Overture Places" (não conhecia). Ele usou bastante o DuckDB (interesse ver como esse banco é versátil) e um pré-processamento de coordenadas geográficas chamado [H3 tiling](https://h3geo.org/), usado como triagem para só comparar locais próximos (o método gera uma string para um dado par de coordenadas lat long).

Como método de pareamento ele tentou três abordagens: comparação exata do nome do estabelecimento, comparação via distância de strings (Jaro-Wrinkler) e comparação via embeddings usando o modelo [mixedbread-ai/mxbai-embed-large-v1](https://huggingface.co/mixedbread-ai/mxbai-embed-large-v1/tree/main) (já me perdi nesses modelos).

A comparação exata pelo nome do estabelecimento tem, obviamente, um problema de recall, quando acontece qualquer diferença mínima no nome, e de precisão, como em situações de ter vários restaurantes de uma franquia num espaço curto (aproximadamente 5Km no caso dele).

Usar a "distância" de Jaro-Wrinkler (entre aspas porque não é matematicamente uma distância, prefiro chamar de similaridade) ajudou no caso dos nomes parecidos, que ele expande também para endereços. A característica do Jaro-Wrinkler é dar mais importância para erros no início do texto, o que é bem razoável para comparar nomes de estabelecimentos e logradouros. Essa técnica, porém, começa a ficar problemática conforme se afrouxa a nota de corte para aumentar o recall: perde-se precisão que precisa ser corrigida com várias heurísticas (ele dá um exemplo de que se um endereço que bate perfeitamente, então é razoável dizer que é um pareamento).

Por fim, usando simplesmente os embeddings do nome do estabelecimento concatenado como endereço completo, ele consegue uns 70% de aproveitamento sem erros, e sem precisar se desdobrar em heurísticas (o que rendeu 68% de recall). Essa abordagem paga o preço de calcular os embeddings no primeiro momento, o que pode ser demorado num dataset grande e sem GPU. A abordagem final foi uma combinação das técnicas: começa com a similaridade de string com heurísticas e usa embeddings nos casos que não foram resolvidos.

Acho que se o dataset dele fosse maior, valeria treinar um classificador tipo Gradient Tree Boosting ou uma singela regressão logística para combinar essas técnicas todas, sem precisar ficar sofrendo para definir as notas de corte, e até para ter algum dataset de validação (eu entendi que ele avaliou no olho mesmo, o que é válido pro caso de uso dele que só está interessado em resolver os 2000 locais e não em montar uma ferramenta genérica). Uma vez com pares de locais candidatos em mãos, é capaz de um LLM ajudar a gerar bem as respostas finais.
