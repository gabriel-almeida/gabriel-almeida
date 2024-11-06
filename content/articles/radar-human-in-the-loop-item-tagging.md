---
title: 'Radar: Construindo um sistema de tageamento automático com centenas de classes'
description: Como os antigos incas faziam projetos de ML sem LLMs usando classificadores, taxonomias e "human-in-the-loop"
img: radar.svg
author:
  name: Gabriel Almeida
  bio: Cientista da computação e //TODO bio
  img: gabriel-almeida.jpg
tags:
  - NLP
  - Machine Learning
  - ML old-school
published: 2024-11-06T00:00:00.000-03:00
modified: 2024-11-06T00:00:00.000-03:00
---

Postagem antiga, de 2020, do primeiro ano da pandemia e antes das LLMs ganharem força, e que por algum motivo, está com um problema de encoding. O pessoal do Doordash descreve aqui uma estratégia que eles usaram para categorizar, usando aprendizado de máquina, o catálogo de comida deles com mais de 300 categorias de forma incremental. Achei interessante por ser um trabalho complexo e na qual vejo bastante utilidade, apesar de que realmente algumas coisas poderiam ser simplificadas com as LLMs hoje, como a classificação inicial dos dados. Eles focaram no problema de "cold start" para construir os classificadores, mas eu to mais interessado no processo de coleta de dados.

Começaram construindo uma taxonomia para organizar a tarefa e dão algumas dicas pra isso:

- Evitar ao máximo sobreposições nas classes e manter elas bem objetivas;
- Particionar o primeiro nível da árvore por atributos (estilo de cozinha, ingredientes, ...), o que permite paralelizar o trabalho;
- Ter sempre uma classe residual "Outros" (ex: em vez de um nível de "alcoólico vs não alcoólico", usam "alcoólico vs outros"), o que permite ir aumentando o nível de granularidade aos poucos.

As anotações das classes seguem a taxonomia desenvolvida, o que vira naturalmente uma tarefa simples de verdadeiro/falso ou multiclasse usando as partições da taxonomia. Eles permitem o anotador pular a tarefa também, dando alguma noção dos itens mais difíceis.

A modelagem inicial usou vários modelos multiclasse baseado nas classes mutualmente exclusivas da taxonomia. O modelo foi um LSTM de uma camada com embeddings do FastText (Parece algo muito defasado, mas isso só tem 4 anos...), que depois foram substituídos por modelos multi tarefa.

Na segunda metade, eles falam sobre como construíram o sistema de human-in-the-loop para manter esses dados. Não entendi bem a primeira etapa de seleção de dados iniciais (por que não usar o banco inteiro logo?), mas em seguida eles falam sobre aumento de dados (data augmentation) com pertubações nos textos (tirar frases, cometer erros de digitação...), heurísticas manuais e self-training (nunca fui com a cara dessa técnica) para ter alguns itens etiquetados e balanceados pelas classes e ter algum modelo inicial. Eles usam esses modelos para mandar pros anotadores baseados em duas estratégias: ou visando aumentar a precisão do modelo (quando ele discorda de um humano) ou a abrangência/recall (itens sem anotação humana e baixa confiança do modelo). A validação disso foi problemática, já que eles precisaram fazer um dataset novo, selecionado aleatoriamente. Avaliaram usando macro F1 (média simples da métrica entre as classes), o que faz sentido num caso desbalanceado como esse. Eles mencionam também algumas coisas de como se trabalha com "crowd" e de medida de seguranças "hard-coded" para casos problemáticos como bebidas, nada muito interessante.

[https://careersatdoordash.com/blog/overcome-the-cold-start-problem-in-menu-item-tagging/]
