---
title: 'Radar: Quantização e binarização de embeddings'
description: Reduzindo o tamanho dos bancos de vetores
author:
  name: Gabriel Almeida
  bio: Cientista da computação e //TODO bio
  img: gabriel-almeida.jpg
tags:
  - NLP
  - Machine Learning
  - ML custo-beneficio
published: 2024-11-11T23:30:00.000-03:00
modified: 2024-11-11T23:30:00.000-03:00
---

Fonte: [https://huggingface.co/blog/embedding-quantization]

Nessa postagem, o pessoal do Hugging Face e de outro grupo, Mixed Bread, fazem algumas demonstrações de como otimizar o armazenamento e uso de embeddings de texto. Acho um assunto bem relevante porque é a espinha dorsal de vários outros métodos, desde buscas semânticas, usadas comumente em aplicações de LLMs via RAG (Retrieval Augmented Generation), até clusterização de textos, geração de features para classificadores, etc.

Eles falam de vários métodos para reduzir o espaço consumido por um corpus de texto após a transformação em vetores de embeddings: se eu consigo uma forma de reduzir o tamanho dessa representação vetorial sem perder muita qualidade, então eu consigo economizar em memória e armazenamento, além de processar mais rápido uma consulta no meu banco de vetores, já que vou fazer menos contas para comparar eles. Ainda preciso usar normalmente os modelos para gerar os embeddings da consulta e dos próprios documentos, o que foi tratado na postagem é posterior a esse passo.

Supondo que um modelo gere um vetor com 1024 floats para cada texto de meu corpus, então eu armazenaria aproximadamente 260 mil documentos por cada gigabyte (1 GB/4 KB). A técnica que mais me chamou atenção, e que vai ser meu foco aqui, foi simplesmente "binarizar" todas as dimensões dos vetores: ela passa a ser 1 se a dimensão em questão tiver valor positivo e 0 se for negativo. Logo, cada dimensão passa o ocupar um bit em vez dos 4 bytes para cada float de antes, isso daria 128 bytes por documento ou aproximadamente 8,3 milhões de documentos por gigabyte (1 GB/128 B). Isso obviamente exige uma mudança em como os vetores são comparados para se ter um ganho efetivo de velocidade (ex: trocar a similaridade dos cossenos pela distância de Hamming) e controlar a perda de desempenho, dependendo do modelo de embedding, mas que incrivelmente ficou na casa dos 90% do desempenho original em vários modelos para esse tanto de economia. As outras técnicas apresentadas foram a quantização (transformar float em int) e o embedding inspirado na boneca russa matriosca: as dimensões mais importantes ficariam no início do vetor, então eu poderia ir removendo arbitrariamente as dimensões mais do final para economizar espaço, o que seria ir abrindo a boneca e ficar só com as mais internas e menores, segundo a analogia (o que me lembra a lógica do PCA).

Tem duas intuições que quero registrar. Primeiro, não se precisa ter uma busca perfeita em vários casos: as ferramentas de busca de vetorial têm métodos de busca aproximadas justamente com o propósito de otimizar o armazenamento e a própria busca, e se usam até mecanismos de busca clássicos como uma forma de suprir os [problemas da busca de vetores](https://www.assembled.com/blog/better-rag-results-with-reciprocal-rank-fusion-and-hybrid-search). Segundo, a binarização faz bastante sentido como uma aproximação matemática grosseira quando você lembra que esses vetores são comparados usando a similaridade dos cossenos/produto escalar: multiplicam-se as dimensões iguais e soma esses valores. Se as dimensões comparadas têm sinais iguais, a multiplicação vai dar um número positivo, contribuindo para aumentar o valor final da similaridade durante a soma, enquanto dimensões com sinais diferentes vão dar negativo e, consequentemente, reduzir a similaridade. No caso binário, usando a distância de Hamming, eu só contaria quantas vezes o sinal foi igual em ambos os vetores, o que é uma simplificação enorme de toda essa conta, mas que aparente e experimentalmente funciona em vários modelos. Eles inclusive apresentam uma técnica para diminuir as perdas da binarização que consiste em simplesmente pegar documentos a mais do que o solicitado e ordenar pela similaridade calculada normalmente em cima do vetor da consulta normal, com os 1024 floats originais, e o vetor binário dos documentos em questão. Ou seja, eu simplifiquei o processo de comparação só até a metade, após ter descartado os casos perdidos. Por fim, imagino que essa perda de desempenho, que foi bem discrepante entre os modelos, seja relacionada com a função usada para treinar os embeddings: a intuição da simplificação da conta da similaridade faz mais sentido para similaridade dos cossenos e menos para distância euclidiana e afins.
