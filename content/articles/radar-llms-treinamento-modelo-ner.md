---
title: 'Radar: Usando LLMs para treinar modelos de reconhecimento de entidade nomeada - NER'
description: Reconciliando LLMs e NLP clássica
author:
  name: Gabriel Almeida
  bio: Cientista da computação e //TODO bio
  img: gabriel-almeida.jpg
tags:
  - NLP
  - LLMs
  - NER
published: 2024-11-10T19:10:00.000-03:00
modified: 2024-11-10T19:10:00.000-03:00
---

Fonte: [https://explosion.ai/blog/sp-global-commodities]

Estudo de caso do pessoal que faz o [Spacy](https://spacy.io/) de como aproveitar LLMs para treinar modelos clássicos de NLP. O problema deles envolve parsear um texto curto (chamam de "heard") que resume informações sobre alguma coisa no contexto de commodities. Eles têm requisitos de baixa latência (< 15 ms - achei até exageradamente baixo, já que uns 50ms de latência em rede nem dá pra sentir) e alta acurácia (F-Score, no caso), apesar de não ter tantas classificações para fazer em um dia (8k diários).

Parece que cada tipo de mercado tem necessidades próprias e um conjunto de atributos de interesse. Então eles começam desenvolvendo uma taxonomia ([outra postagem que menciona isso](radar-human-in-the-loop-item-tagging)) daquele mercado e definem o que pode ser feito via regras (coisas com um conjunto limitado de possibilidades) e o que precisa de um modelo de reconhecimento de entidade nomeada (NER).

Inicialmente, eles estavam anotando dados usando uma interface de "marcação de texto", mas perceberam estarem tendo mais trabalho do que simplesmente treinar um modelo provisório com os dados que eles já tinham e simples perguntar se o usuário concorda ou não com aquela resposta para um tipo de dado específico. O problema se mantém de "sequence tagging/NER", mas a coleta de dados humanos passa a ser só um verdadeiro ou falso. Mesmo tendo que fazer várias passadas no dataset (uma para cada tipo de atributo), a coleta foi bem mais rápida.

Seguindo nessa lógica, o próximo passo foi usar um LLM para dar o pontapé inicial no modelo provisório para as categorias e mercados que eles não tinham dados. Ainda seria necessário anotar alguns dados completamente na mão para montar um conjunto de validação, mas o interessante é que o grosso do trabalho poderia ser simplificado com essa estratégia. Os modelos finais, treinados no Spacy, tem só 6 MB, com 95+% de F-Score e fazem cerca de 15k tokens por segundo: muito mais performático e econômico do que depender de uma LLM na predição.

A postagem obviamente é um grande marketing para a ferramenta de anotação deles, o Prodigy, mas tem coisas interessantes aqui. Eu já notei que as ferramentas de anotação para NER open source existem, mas sempre tinham um detalhe que não gostava nelas (sempre pode ser só implicância infundada minha) e essa pode ser uma abordagem alternativa que evita ter que fazer a anotação na mão. Diria que o processo final seria:

- Coletar os dados não anotados e montar a taxonomia (no fundo, isso é a definição do problema);
- Pedir para o LLM responder, de alguma forma, só a parte que deveria ser marcada para um dado texto e atributo da taxonomia, descartando a resposta se nenhum trecho for exatamente aquilo (o que vai exigir alguma engenharia de prompt, e não sei também o que faria no caso do trecho respondido ocorrer em mais de um lugar);
- Pedir o feedback binário do usuário;
- Repetir a coleta até ter X anotações aceitas pelo usuário e então treinar o modelo de NER (a avaliação da capacidade de generalização do modelo corre o risco de ficar enviesada, já que você está descartando vários dados, ai não sei se teria como fugir de fazer alguns exemplos na mão).

Daria para fazer algumas coisas extras interessantes, por exemplo, um teste A/B entre o modelo preliminar (treinado periodicamente) e o LLM para saber quando parar de usar a LLM. Outro extra seria realizar uma busca semântica para dar exemplos de casos já aceitos e parecidos com o atual, dentro de uma margem de similaridade, para a LLM, efetivamente transformando num problema de "few-shot learning", o que supostamente aumentaria a qualidade da coleta e, consequentemente, sua velocidade.
