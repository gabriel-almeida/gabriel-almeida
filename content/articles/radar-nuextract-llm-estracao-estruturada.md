---
title: 'Radar: Extração de informação estruturada com NuExtract'
description: Estruturando dados textuais nativamente com LLMs
author:
  name: Gabriel Almeida
  bio: Cientista da computação e //TODO bio
  img: gabriel-almeida.jpg
tags:
  - NLP
  - LLM
  - Extração de informação
  - ML custo-benefício
published: 2024-11-19T15:30:00.000-03:00
modified: 2024-11-19T15:30:00.000-03:00
---

Fontes:
[[Demonstração](https://huggingface.co/spaces/numind/NuExtract)]
[[Post Original](https://numind.ai/blog/nuextract-a-foundation-model-for-structured-extraction)]
[[Post da segunda versão](https://numind.ai/blog/nuextract-1-5---multilingual-infinite-context-still-small-and-better-than-gpt-4o)]

## Introdução

Ótima aplicação de LLMs. Esse NuExtract é um modelo relativamente pequeno que é capaz de receber um texto bruto e gerar dados estruturados em JSON segundo um esquema de dados simplificado. O mais interessante é que ele não precisa de exemplos novos quando está sendo usado (regime de zero-shot). Eu usei um pouco o demo disponibilizado e resultado é bastante bom. Esse tipo de modelo é útil para criar bancos de dados a partir de informações que naturalmente chegam num formato textual, por exemplo, valores e beneficiários em contratos, número de afetados por uma guerra noticiada em textos jornalísticos, ou medicamentos e dosagens prescritas num prontuário eletrônico.

O esquema de dados usado foi uma espécie de JSON vazio, que só aceita texto, objetos e vetores (realmente sem nulos, números ou booleanos). Na demonstração, eles deram esse exemplo:

Esquema de dados:

```json
{
  "Model": {
    "Name": "",
    "Number of parameters": "",
    "Number of token": ""
  },
  "Usage": {
    "Use case": []
  }
}
```

Texto para extrair:

```
We introduce NuExtract-v1.5 -- a fine-tuning of Phi-3.5-mini-instruct, which is a 3.8B parameter language model. It is trained on a private high-quality dataset for structured information extraction. It supports long documents (up to 128k token context) and several languages (English, French, Spanish, German, Portuguese, and Italian). To use the model, provide an input text and a JSON template describing the information you need to extract.
```

Dado extraído:

```json
{
  "Model": {
    "Name": "NuExtract-v1.5",
    "Number of parameters": "3.8B",
    "Number of token": "128k"
  },
  "Usage": {
    "Use case": ["structured information extraction"]
  }
}
```

## Criação do conjunto de treinamento do modelo

Achei interessante o processo de criação do dataset para treinar esse modelo. Eles pegaram um corpus de texto baseado no Common Crawl (textos aleatórios coletados da internet) e pediram para um Llama 3.1 de 70B parâmetros para gerar, dado um texto desse corpus, um esquema de dados que pode ser extraído dali, mantendo a temática do texto. Com o esquema em mãos, eles pediram ao mesmo Llama para gerar o próprio dado estruturado em si, porém com instruções claras para nunca tentar parafrasear o texto, somente copiar explicitamente. Na postagem original, eles detalham mais algumas coisas, como técnicas usadas para evitar alucinações, e até dão os prompts usados.

Esse processo obviamente não é perfeito, especialmente usando resposta de LLM em cima LLM, mas eles ganham no volume. Eles fizeram esse procedimento em cima de 300 mil textos e descartarem os casos em que as extrações que não seguiram a risca o esquema proposto na primeira etapa, o que resultou em 50 mil exemplos válidos. O pior que achei até pouco, pensando nos números astronômicos que essa galera está acostumada.

## Modelos e avaliação

Na segunda postagem, eles liberam modelos multilíngues, na qual o esquema é feito sempre em inglês e o texto extraído é metade em inglês, e a outra metade distribuída entre português, espanhol, italiano, francês e alemão. O menor modelo disponibilizado só funciona em inglês (parece que não deu certo treinar ele com várias línguas) sendo baseado no Qwen 2.5 de 0.5B parâmetros e o maior, multilíngue, é baseado no Phi-3.5-mini de 3,8B de parâmetros. Apesar de ter somente as principais línguas da Europa, esse funcionamento é interessante para se reusar o esquema proposto em textos dessas línguas ou em textos que misturam elas, como a minha própria postagem, que tem vários termos em inglês.

Outra característica interessante dessa segunda postagem foi a técnica usada para aplicar o modelo em contextos arbitrariamente longos, que eu entendi como uma espécie de janela deslizante sobre o texto em conjunto com um acumulador do dado estruturado. Mais detalhes na segunda postagem.

Eles fizeram alguns testes com um benchmark próprio, usando uma medida F1 adaptada para o contexto de extração da informação. No caso em que testam o modelo sozinho com o texto em inglês e sem exemplos extras (zero-shot), o NuExtract final ficou 1% melhor que o GPT-4o, que é ordens de grandeza maior do que ele (supostamente com 1,8T parâmetros), e 2% superior ao Llama 3.1 de 70B, o modelo usado para gerar o próprio conjunto de dados. O modelo menor deles é bem pior, com 57% contra 68% do NuExtract maior. Quando eles fizeram um ajuste fino do modelo com 45 exemplos para cada temática, o resultado do modelo maior salta de 68% para 82% (+14%), enquanto o modelo menor vai de 57% para 74% (+17%). O GPT-4o, como não permite ajuste fino, recebeu os exemplos no próprio prompt (in-context learning) e ficou um pouco superior ao NuExtract, com 84% (+17%).

Ao traduzir o benchmark para as outras línguas, o modelo deles bate 74% enquanto o GPT-4o fica acima com 77%. Não mencionaram se foi depois do ajuste fino, mas imagino que sim, devido aos valores, o que daria uma redução de 5% em relação ao inglês (lembrando que o modelo pequeno não é multilíngue).

## Minhas Considerações

Usei uma matéria do [G1](https://g1.globo.com/rj/rio-de-janeiro/g20/noticia/2024/11/19/veja-quem-e-quem-na-foto-dos-lideres-do-g20-marcada-pela-ausencia-de-biden.ghtml) para fazer um teste em português. Ela fala de uma foto com autoridades mundiais no contexto do G20, que está acontecendo no Rio de Janeiro, no dia em que escrevo. Pedi para o modelo extrair as pessoas junto sua função (role), os eventos com algumas informações extras e as localidades mencionadas. Basicamente entrei no modo de leitura do Firefox e copiei o texto até com as legendas das imagens.

Esquema:

```json
{
  "Mentioned People": [
    {
      "Name": "",
      "Role": ""
    }
  ],
  "Mentioned Events": [
    {
      "Name": "",
      "Date": "",
      "Location": ""
    }
  ],
  "Mentioned Locations": []
}
```

Resultado:

```json
{
  "Mentioned People": [
    {
      "Name": "Joe Biden",
      "Role": "presidente dos Estados Unidos"
    },
    {
      "Name": "Justin Trudeau",
      "Role": "primeiro-ministro do Canadá"
    },
    {
      "Name": "Giorgia Meloni",
      "Role": "primeira-ministra da Itália"
    },
    {
      "Name": "Vladimir Putin",
      "Role": "presidente russo"
    },
    {
      "Name": "Sergey Lavrov",
      "Role": "ministro de Relações Exteriores"
    }
  ],
  "Mentioned Events": [
    {
      "Name": "G20",
      "Date": "",
      "Location": "Rio de Janeiro"
    }
  ],
  "Mentioned Locations": [
    "Roma",
    "Bali",
    "Nova Deli",
    "Rio de Janeiro",
    "Burle Marx",
    "Marina da Glória",
    "Pão de Açúcar"
  ]
}
```

O resultado é bem razoável, inclusive remove a necessidade de ter um reconhecedor de entidades nomeadas (NER). Interessantemente, quando retiro o campo de "Role" do esquema, ele trás também o nome dos especialistas consultados, mas não retorna o nome dos fotógrafos e nem da jornalista em "Blog da Julia Duailibi". Parece que existe alguma "engenharia de prompt" para ser feita aqui, mas os resultados me impressionaram positivamente.

O fato desse modelo ser treinado para somente copiar o texto na íntegra é algo que julgo positivo, mas deve ser ponderado. Por um lado, reduz muito as chances do modelo alucinar alguma coisa, por outro atrapalha situações que queremos simplificar ou inferir alguma informação. Por exemplo, digamos que quero identificar menções a uma lei para futuramente montar alguma estatística das menções ou buscar por elas de forma simplificada. Ai, dentro no texto encontro os termos "LAI", "12.527/2011" e "Lei de Acesso à Informação". Todos eles se referem à mesma coisa, mas com escritas complemente diferentes, eu precisaria converter essas menções para um formato canônico a fim realizar a tarefa. Um modelo como o NuExtract não conseguiria me ajudar nesse caso, eu precisaria de outro passo para unificar as entidades (processo chamado de Entity Linking).

Por fim, esse modelo consome cerca de 8GB de armazenamento com um pouco menos de 4B parâmetros. Eu tenho um Llamafile na minha máquina de 6GB do Llamma 3.2 com 3B parâmetros quantizado, que roda razoavelmente bem em CPU, consumindo uns 4 GB de memória (tenho que usar mais para ver esse consumo com o uso). Com essa comparação, eu quero dizer que me parece bem factível rodar o NuExtract localmente, uma vez que ele seja quantizado. Rodar num Raspberry Pi não deve funcionar, mas num PC gamer com memória e CPU decentes deve. Essa capacidade pode ser útil para processar casos mais sigilosos, como contratos, documentos de interesse jornalísticos e afins, basta uma interface adequada para os usuários finais. Outra alternativa ainda é gerar um modelo mais especializado, treinando um NER do Spacy, por exemplo, usando o NuExtract como ponto de partida para gerar os dados de treinamento.
