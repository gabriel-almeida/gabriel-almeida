---
title: Criando meu blog com Nuxt, Tailwind e Github Pages
description: Um relato da minha sinuosa jornada até o momento
img: old-map.jpg
author: 
  name: Gabriel Almeida
  bio: Cientista da computação e //TODO bio
  img: gabriel-almeida.jpg
tags: 
  - Blog
  - Nuxt JS
  - Vue JS
  - Github
  - Javascript
  - Tailwind CSS
  - Desenvolvimento de Software
published: 2021-11-14T00:00:00.000-03:00
modified: 2021-11-17T08:30:00.000-03:00
---

## Isso não é um tutorial

Para começar, preciso ser honesto: este post *não* é um tutorial. Estou tentando contar aqui os altos e baixos, até o momento, de como foi minha experiência de criar um blog do zero, na ordem em que as coisas aconteceram e, especialmente, explicar a racionalidade por trás das decisões.

Eu não vou descrever um passo a passo de como fiz as coisas, até porque não sei se conseguiria reproduzir tudo. Esse formato pode ser menos apelativo mas ainda serve como uma lição dos possíveis problemas que alguém pode enfrentar se seguir num caminho similar ao que eu fiz. No fim, a principal lição que a gente tira é que a felicidade do programador sempre é dizer:

> AÊ!!! MUDOU O ERRO, PO**A !!1!

## Porque eu decidi fazer um blog pessoal?

Essa ideia de ter um blog já é antiga, mas nunca pus pra frente, agora que decidi andar com isso. Vou listar alguns dos meus motivos:

**Ter alguma presença virtual**: atualmente a minha presença é virtualmente zero, ela se resume a só ver as coisas que os outros fazem.

**Trocar ideia**: Eu curto discutir uma nerdice mais técnica e com a pandemia e minha ausência em redes sociais, isso ficou meio de lado.

**Ajuda com a carreira**: apesar de ter um emprego estável, eu queria ampliar minhas possibilidades profissionais e financeiras. Isso aqui talvez me ajude nessa parte.

**Uma casa para minhas experimentações**: eu gosto (ou gostava) de me inventar um projetinho de fim de semana pra fazer, geralmente de coisas de ciência de dados. Alguns davam mais certos, outros menos, mas todos invariavelmente só ficavam pra mim. Agora consigo me forçar a expor eles aqui.

**Tentar algo novo**: Isso aqui é uma experiência completamente nova pra mim em vários aspectos, e sempre dá pra aprender bastante nessas horas e compartilhar um pouco do percurso.

## Minha meta inicial

Pra começar este blog, eu não poderia simplesmente chegar sem uma meta muito bem definida, para evitar ficar postergando com algo mirabolante e não fazer nada.

Então me propus até o fim de semana tentar desenvolver alguma ferramenta, colocar isso disponível em algum lugar e explicar todo o processo.

O que eu não antecipei foi que criar o blog em si seria muito mais difícil do que o esperado. E que esse processo seria tão interessante quanto.

## Por que não usar o Medium de uma vez?

O Medium é uma ferramenta interessante, ele gerencia conteúdo e comentários, faz um SEO muito bom, distribui o conteúdo para possíveis leitores... Por que que eu não estou usando diretamente ele?

Resumidamente, porque eu não sou dono de fato das coisas que eu coloco nele e não tenho qualquer capacidade de interferir nas decisões deles. Digamos que a coisa dê certo e as pessoas começam a gostar do que eu faço. Imagina então que, do nada, ele deixa de existir. Eu simplesmente tenho que voltar ao zero: todo o público e iterações anteriores estão exclusivamente lá.

Eu sei que ele não vai sumir assim, mas é um exercício para entender a dependência dele. O mesmo argumento vale para outros serviços similares: redes sociais, Substack, ... Um problema secundário é que eu simplesmente não teria liberdade para colocar coisas aleatórias nele, tipo algum projetinho secundário que exija algum código personalizado rodando, o que é um dos meus objetivos.

> Mas tu não tá usando o Github Pages?

Pois é, eu sei que eu não sou dono do Github também e ele tem algumas limitações, tipo eu não controlo o servidor Web e meu conteúdo só pode ir até 1GB. Mas eu sou dono de uma outra coisa, nesse caso: meu domínio.

O domínio acaba funcionando como uma camada de indireção e o Github vira só um detalhe de implementação. Se ele deixar de existir, eu troco a hospedagem e posso manter o conteúdo e o domínio, não preciso voltar do zero.

## Sobre a escolha tecnológica

Eu tinha dois grandes critérios para a escolha das tecnologias: eu quero ser o dono do meu próprio conteúdo, como já expliquei, e ter uma customização mais aprofundada. E, se possível, não gastar muito de início.

Então pensei em basicamente duas alternativas: ou eu uso um CMS robusto tipo um WordPress ou eu uso um SSG (gerador de sites estáticos), como o Jekyll. Em qualquer escolha que eu fizesse, eu teria uma curva de aprendizado, eu nunca mexi aprofundadamente com nenhuma dessas ferramentas. 

No fim, eu optei pelo [Nuxt](https://nuxtjs.org/), que é baseado em Vue JS, algo que eu já tenho alguma familiaridade. Sei que não é um React, ou algo da moda, mas eu gosto do Vue como framework. A escolha do [Tailwind](https://tailwindcss.com) foi muito menos glamourosa:  eu ouvi uns comentários bons sobre ele e eu simplesmente não quis fugir muito do tutorial do Nuxt.

Curiosamente eu comecei fazendo isso aqui com [Hugo](https://gohugo.io/), outra ferramenta de SSG e até cheguei mais longe do que o que eu tenho atualmente. Só que eu comecei a esbarrar em alguns problemas durante a customização do layout e do conteúdo. No fim, cheguei à conclusão que não conseguiria me abstrair de certas coisas e que teria uma curva de aprendizado grande de qualquer forma se eu quisesse ter todo esse controle fino. Então eu fui pelo caminho de menor fricção: em vez de aprender Go + Hugo ou Next + React, preferi ir pelo Nuxt + Vue e pagar o preço de ter que programar algumas coisas. 

Talvez todas essas decisões voltem pra me morder? Elas já voltaram pra me morder, sim, mas é o que ta pronto hoje...

## Tutorial de blog do Nuxt 

> Nada se cria, tudo se copia.

Como já admiti, eu segui o [tutorial de blog do Nuxt](https://nuxtjs.org/tutorials/creating-blog-with-nuxt-content/), que é surpreendentemente completo: você sai com uma página inicial que tem a listagem de postagens, a página da postagem em si, uma página para o autor e uma para as tags. Tudo isso saindo automaticamente das postagens em Markdown com alguns metadados.

A única coisa que não me agradou muito foi o layout do tutorial, então optei por trocar ele, só que eu não sou lá um bom frontend. Então vou eu procurar layout de blog grátis usando Tailwind na internet. No fim, achei um que me agradou: o [Ghostwind](https://github.com/tailwindtoolbox/Ghostwind). Tive que adaptar bastante coisa para usar e ele só tem basicamente a página inicial e a página da postagem, teria que refazer depois as páginas de autor e tags mas para o meu MVP de blog, tá ótimo.

Ainda tinha uma coisa me incomodando: eu continuava com o ícone padrão do Nuxt. E lá vou eu de novo procurar coisas de graça na internet. Encontrei o [favicon.io](https://favicon.io/favicon-generator/), que tem um gerador ícones a partir de um texto. A maioria dos sites usa as iniciais dos nomes como favicon, porque eu não posso? Só fiz umas configurações na ferramenta deles e baixei o resultado final. Uma vergonha a menos.

A próxima dor de cabeça que tive foi, curiosamente, configurando o Google Analytics. Obviamente, quero ter uma noção de como esse blog está indo e se está chegando nas pessoas, então fui usar a ferramenta óbvia, mesmo sabendo dos problemas de privacidade. Eu achei rápido um [plugin para Nuxt](https://google-analytics.nuxtjs.org/) que resolveria isso, fiz a minha chave no Analytics, botei nas configurações do plugin, vi que tinha coisa no HTML gerado mas… ele simplesmente não estava funcionando. Será que precisaria fazer botar o blog no ar para conseguir testar isso? No fim, eu fiz o processo de deploy inteiro (próximo tópico) só pra testar e descobrir que não funcionava mesmo assim. De volta ao [StackOverflow](https://stackoverflow.com/questions/64612031/setup-google-analytics-4-in-nuxt-js), aprendi que o plugin só funciona com o Analytics 3, e eu peguei a chave do Analytics 4. Eu poderia até colocar isso no braço na aplicação ou trocar o plugin, mas dessa vez fui pelo caminho fácil e fiz um downgrade do Analytics.

## Hora do deploy

Eu tinha duas alternativas agora: ou usava o GitHub Actions ou mandava diretamente o HTML compilado pro Git. Queria testar o Analytics, mas precisaria fazer o deploy de qualquer forma, então fui resolver isso direito logo. Fui atrás de como configurar o GitHub Actions e, para a minha surpresa, estava quase tudo pronto pelo Nuxt, bastava o detalhe principal: configurar o domínio. Nesse caso, segui as [instruções oficiais do GitHub](https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain), mexendo basicamente na interface deles.

O domínio funcionou sem grandes problemas depois de uns minutos, então eu consegui testar o Analytics e descobrir esse problema de versão. Quando eu mando a chave correta, para minha surpresa, o site inteiro para de funcionar inexplicavelmente. Um dos piores tipo de erro: nada deu obviamente errado, mas as coisas simplesmente pararam de funcionar...

Depois de fuçar um pouco, notei que o blog funcionava quando acessava via github.io e a configuração do domínio no GitHub estava vazia. Relendo a [documentação de deploy do Nuxt](https://nuxtjs.org/deployments/github-pages/), percebi que esqueci de um detalhe: o Github usa um arquivo CNAME na raiz do site para saber o domínio daquele projeto. Olhando o histórico de modificações, deu pra ver que quando o deploy foi feito, ele apagou o CNAME e tudo parou de funcionar no domínio personalizado. Bastou colocar ele na parte de arquivo estáticos para tudo voltar a funcionar, junto com o Analytics.

## Conclusão

É... Deu bastante trabalho e dor de cabeça isso aqui, inclusive esta postagem, é muito detalhe pra relatar. Agora só escolher uma imagem bem bonita no [Unsplash](https://unsplash.com/), colocar os links e finalizar. Oops, a postagem ficou estranha porque o Tailwind tira um bocado de estilo, [vou ter que corrigir isso](https://tailwindcss.com/docs/plugins#typography) antes de subir...

Mas tá aí, espero que tenha gostado desse rolê desnecessariamente complicado. Tenho muita coisinha pra resolver ainda, tipo seção de comentários, o índice no início da postagem, menu na versão mobile, SEO, tags e, claro, a própria postagem da ferramenta de sumarização que fiz como prova de conceito.

Se você quiser fazer um comentário ou qualquer coisa, por enquanto, vou pedir pra me mandar um [email](mailto:blog@gabrielalmeida.dev). Até a próxima.
