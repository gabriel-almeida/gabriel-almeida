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
modified: 2024-11-17T22:00:00.000-03:00
---

Fontes:
[[Github](https://github.com/MinishLab/model2vec)]
[[Post original](https://minishlab.github.io/hf_blogpost/)]
[[Explicação em vídeo](https://www.youtube.com/watch?v=Ymn5RVaKQA0&pp=ygUJbW9kZWwydmVj)]

Esses caras criaram um embeddings de palavras, e não de frases, melhores e mais rápidos que as técnicas clássicas estilo GloVe, usando os embeddings de um LLM.

O processo consiste em gerar o vocabulário de interesse usando o tokenizador do LLM original, calcular o embedding com o LLM para cada palavra ou termo desse vocabulário (sem contexto nem nada) e rodar um PCA em cima deles para reduzir a dimensionalidade.

Na hora de representar uma sentença inteira, eles fazem uma soma ponderada dos embeddings individuais que compõe a sentença. A ideia é que uma stopword (ex: de, para, e, ou ...) deveria contribuir muito menos para a representação final da frase do que termos mais incomuns, algo que uma ponderação via TF-IDF normalmente faria, porém, não temos a contagem de palavras necessária para calcular o TF-IDF. A solução dada foi ponderar cada palavra por sua posição relativa no próprio tokenizador, que tipicamente salva elas em ordem de sua frequência, ou seja, sua palavra de número 1 deve ser a mais comum no corpus e, consequentemente, deveria ter a menor importância possível nessa soma ponderada. O cálculo é feito baseado na lei de Zipf, mas não entrei nesse nível de detalhe.

Obviamente a representação volta a ser um bag-of-words clássico, descartando a informação da posição de cada palavra na sentença, já que não se utiliza o mecanismo de atenção, somente uma soma dos vetores. Achei interessante como técnica custo-benefício, especialmente pela sua capacidade de gerar um vocabulário com os termos e jargões mais específicos de um domínio, como termos específicos de Medicina ou de Direito.

PS: Por algum motivo, esta postagem ficou logo no início da busca do Google para "model2vec", então decidi reescrever para deixar melhor explicado.
