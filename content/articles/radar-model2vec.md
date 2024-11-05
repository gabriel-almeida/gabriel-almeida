---
title: 'Radar: Model2Vec'
description: Embeddings old-school na era dos LLMs
img: radar.svg
author:
  name: Gabriel Almeida
  bio: Cientista da computação e //TODO bio
  img: gabriel-almeida.jpg
tags:
  - NLP
  - Machine Learning
  - Bibliotecas
  - ML custo-benefício
published: 2024-11-04T00:00:00.000-03:00
modified: 2024-11-04T00:00:00.000-03:00
---

Vi num vídeo do [Vincent](https://www.youtube.com/watch?v=Ymn5RVaKQA0&pp=ygUJbW9kZWwydmVj) sobre essa técnica, os caras criam embeddings de palavras melhores e mais rápidos que as técnicas clássicas do Glove e afins, e que é até capaz de ter um vocabulário específico (ex: com termos técnicos de medicina), só com um PCA em cima do embedding estático (sem incluir informação de contexto) de um LLM e um esquema de ponderamento dos vetores baseado na frequência dos tokens. Obviamente a representação volta a ser um bag-of-words clássico, porque eles são obrigados a só somar os vetores sem o mecanismo de atenção, mas achei interessante como técnica custo-benefício.

[https://github.com/MinishLab/model2vec]
