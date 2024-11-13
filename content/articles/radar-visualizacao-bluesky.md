---
title: 'Radar: Visualizando os usuários do Bluesky'
description: Usando embeddings de grafo e UMAP para criar um mapa da rede social
author:
  name: Gabriel Almeida
  bio: Cientista da computação e //TODO bio
  img: gabriel-almeida.jpg
tags:
  - Visualização de dados
  - UMAP
  - Grafo
  - Rede social
published: 2024-11-13T11:00:00.000-03:00
modified: 2024-11-13T11:00:00.000-03:00
---

Fonte: [https://joelgustafson.com/posts/2024-11-12/vizualizing-13-million-bluesky-users]

Camarada fez uma visualização das conexões entre usuários do Bluesky. Ele precisou coletar dados por um tempo no próprio computador de casa e fazer até uma engine própria que desse conta de tantos valores. A ferramenta dele usa uma versão paralelizável do Force Atlas, um algoritmo clássico de visualização de grafos baseado em física (arestas se atraem e vértices se afastam) e é usado pelo Gephi.

O resultado da visualização com o Force Atlas não ficou boa para ver os grupos de usuários. Então, ele criou um embedding dos vértices/usuários da rede social com 32 dimensões usando o [nodevectors](https://github.com/VHRanger/nodevectors/), aplicou o [UMAP](https://umap-learn.readthedocs.io/en/latest/) para reduzir essa dimensionalidade para 2D e retornou o resultado para a ferramenta dele refinar a visualização. A coloração do gráfico foi feita usando um k-means em cima dos embeddings originais, onde cada cluster recebe uma cor no gráfico final (tem alguns detalhes sórdidos nesse processo).

Já vi várias visualizações com o UMAP, especialmente em conjunto com o HDBSCAN (que não foi usado aqui), então já conhecia o poder desse algoritmo, mas sempre acho fascinante (e meio psicodélico) o resultado final dele, apesar de não conseguir interpretar direito o significado. Particularmente acho até proveitoso, dependendo do uso, simplesmente colocar os elementos de cada cluster do UMAP+HDBSCAN em forma de lista mesmo: mais fácil de implementar e mais simples compreender.
