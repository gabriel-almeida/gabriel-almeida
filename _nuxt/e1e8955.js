(window.webpackJsonp=window.webpackJsonp||[]).push([[19,5,12,13,14,15],{254:function(t,e,r){var map={"./gabriel-almeida.jpg":255,"./old-map.jpg":256};function n(t){var e=l(t);return r(e)}function l(t){if(!r.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}n.keys=function(){return Object.keys(map)},n.resolve=l,t.exports=n,n.id=254},255:function(t,e,r){t.exports=r.p+"img/gabriel-almeida.05924f7.jpg"},256:function(t,e,r){t.exports=r.p+"img/old-map.e57e13b.jpg"},257:function(t,e,r){"use strict";r.r(e);var n=r(51),component=Object(n.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("nav",{staticClass:"bg-gray-900 p-4 mt-0 w-full"},[r("div",{staticClass:"container mx-auto flex items-center"},[r("div",{staticClass:"flex text-white font-extrabold"},[r("NuxtLink",{staticClass:"flex text-white text-base no-underline hover:text-white hover:no-underline",attrs:{to:"/"}},[r("span",{staticClass:"hidden w-0 md:w-auto md:block pl-1"},[t._v("Gabriel Almeida")])])],1),t._v(" "),r("div",{staticClass:"flex pl-4 text-sm"},[r("ul",{staticClass:"list-reset flex justify-between flex-1 md:flex-none items-center"},[r("li",{staticClass:"mr-2"},[r("NuxtLink",{staticClass:"inline-block py-2 px-2 text-white no-underline",attrs:{to:"/"}},[t._v("\n                        Home\n                    ")]),t._v(" "),r("NuxtLink",{staticClass:"inline-block py-2 px-2 text-white no-underline",attrs:{to:"/summarizer"}},[t._v("\n                        Summarizer\n                    ")]),t._v(" "),r("NuxtLink",{staticClass:"inline-block py-2 px-2 text-white no-underline",attrs:{to:"/qa"}},[t._v("\n                        QA\n                    ")])],1)])])])])}),[],!1,null,null,null);e.default=component.exports},259:function(t,e,r){"use strict";r.r(e);var n=r(51),component=Object(n.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("footer",{staticClass:"bg-gray-900"},[r("div",{staticClass:"container max-w-6xl mx-auto flex items-center px-2 py-8"},[r("div",{staticClass:"w-full mx-auto flex flex-wrap items-center"},[r("div",{staticClass:"flex w-full md:w-1/2 justify-center md:justify-start text-white font-extrabold"},[r("NuxtLink",{staticClass:"text-gray-900 no-underline hover:text-gray-900 hover:no-underline",attrs:{to:"/"}},[r("span",{staticClass:"text-base text-gray-200"},[t._v("Gabriel Almeida - 2022")])])],1)])])])}),[],!1,null,null,null);e.default=component.exports},264:function(t,e,r){"use strict";var n=r(79);r(28),r(42),r(104),r(40);e.a={metatags:function(meta){var t=meta||{},title=t.title,e=t.description,r=t.author,l={title:title=title||"Gabriel Almeida | Blog",meta:[{hid:"description",name:"description",content:e=e||"Discutindo tecnologia em profundidade"},{hid:"author",name:"author",content:r=r||"Gabriel Almeida"},{hid:"og:title",property:"og:title",content:title},{hid:"og:description",property:"og:description",content:e},{hid:"og:type",property:"og:type",content:"website"},{hid:"twitter:title",name:"twitter:title",content:title},{hid:"twitter:description",name:"twitter:description",content:e}]};if(meta&&meta.tags){var o;l.meta.push({hid:"keywords",property:"keywords",content:meta.tags.join(", ")});var c=meta.tags.map((function(t,e){return{hid:"article:tag-".concat(e),property:"article:tag",content:t}}));(o=l.meta).push.apply(o,Object(n.a)(c))}return meta&&meta.canonical&&l.meta.push({hid:"canonical",property:"canonical",content:meta.canonical}),meta&&meta.published&&l.meta.push({hid:"article:published_time",property:"article:published_time",content:meta.published}),meta&&meta.modified&&l.meta.push({hid:"article:modified_time",property:"article:modified_time",content:meta.modified}),meta&&meta.image&&(l.meta.push({hid:"og:image",property:"og:image",content:meta.image}),l.meta.push({hid:"twitter:image:src",property:"twitter:image:src",content:meta.image})),l},blogPosting:function(meta){var t=this.metatags(meta),e=meta||{},title=e.title,r=e.description,n=e.author,l=e.canonical,o=e.published,c=e.image,image=void 0===c?null:c,d=e.modified,m=void 0===d?null:d,f=e.tags,x={"@context":"http://schema.org","@type":"BlogPosting",url:l,name:title,headline:title,description:r,image:image,datePublished:o,dateCreated:o,author:{"@type":"Person",name:n,url:"https://gabrielalmeida.dev"},keywords:void 0===f?[]:f};return m&&(x.dateModified=m),t.script=[{type:"application/ld+json",json:x}],t}}},265:function(t,e,r){"use strict";r.r(e);var n={props:{article:{type:Object,required:!0}}},l=r(51),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"w-full md:w-1/2 p-6 flex flex-col flex-grow flex-shrink"},[n("div",{staticClass:"flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow-lg"},[n("img",{staticClass:"h-96 object-cover w-full rounded-t pb-6",attrs:{src:r(254)("./"+t.article.img),alt:t.article.alt}}),t._v(" "),n("p",{staticClass:"w-full text-gray-600 text-xs md:text-sm px-6"},[t._v(t._s(t.article.serie))]),t._v(" "),n("div",{staticClass:"w-full font-bold text-xl text-gray-900 px-6"},[n("NuxtLink",{attrs:{to:{name:"blog-slug",params:{slug:t.article.slug}}}},[t._v(" "+t._s(t.article.title)+". ")])],1),t._v(" "),n("p",{staticClass:"text-gray-800 font-serif text-base px-6 mb-5"},[t._v("\n            "+t._s(t.article.description)+"\n        ")])]),t._v(" "),n("div",{staticClass:"flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow-lg p-6"},[n("div",{staticClass:"flex items-center justify-between"},[n("img",{staticClass:"w-8 h-8 rounded-full mr-4 avatar",attrs:{src:r(254)("./"+t.article.author.img),alt:t.article.author.name}})])])])}),[],!1,null,null,null);e.default=component.exports},268:function(t,e,r){"use strict";r.r(e);var n=r(51),component=Object(n.a)({},(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container font-sans bg-green-100 rounded mt-8 p-4 md:p-24 text-center"},[r("h2",{staticClass:"font-bold break-normal text-2xl md:text-4xl"},[t._v("Subscribe to Ghostwind CSS")]),t._v(" "),r("h3",{staticClass:"font-bold break-normal font-normal text-gray-600 text-base md:text-xl"},[t._v("Get the latest posts delivered right to your inbox")]),t._v(" "),r("div",{staticClass:"w-full text-center pt-4"},[r("form",{attrs:{action:"#"}},[r("div",{staticClass:"max-w-sm mx-auto p-1 pr-0 flex flex-wrap items-center"},[r("input",{staticClass:"flex-1 appearance-none rounded shadow p-3 text-gray-600 mr-2 focus:outline-none",attrs:{type:"email",placeholder:"youremail@example.com"}}),t._v(" "),r("button",{staticClass:"flex-1 mt-4 md:mt-0 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-green-400",attrs:{type:"submit"}},[t._v("Subscribe")])])])])])}],!1,null,null,null);e.default=component.exports},280:function(t,e,r){var content=r(291);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(85).default)("1e6e0710",content,!0,{sourceMap:!1})},286:function(t,e,r){"use strict";r.r(e);var n=r(51),component=Object(n.a)({},(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("TheHeader"),t._v(" "),t._m(0)],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"w-full m-0 p-0 bg-cover bg-bottom  bg-gradient-to-tr from-blue-900 via-gray-900 to-gray-900",staticStyle:{height:"60vh","max-height":"460px"}},[r("div",{staticClass:"container max-w-4xl mx-auto pt-16 md:pt-32 text-center break-normal"},[r("p",{staticClass:"text-white font-extrabold text-3xl md:text-5xl"},[t._v("\n                  Gabriel Almeida\n              ")])])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{TheHeader:r(257).default})},290:function(t,e,r){"use strict";r(280)},291:function(t,e,r){var n=r(84)((function(i){return i[1]}));n.push([t.i,"/*purgecss start ignore*/\n.article-card,.article-card a{\n  border-radius:8px\n}\n.article-card a{\n  background-color:#fff\n}\n.article-card img div{\n  border-radius:8px 0 0 8px\n}\n\n/*purgecss end ignore*/",""]),n.locals={},t.exports=n},309:function(t,e,r){"use strict";r.r(e);var n=r(7),l=(r(31),{asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$content,t.params,e.next=3,r("articles").only(["title","description","img","slug","author"]).sortBy("createdAt","desc").fetch();case 3:return n=e.sent,e.next=6,r("tags").only(["name","description","img","slug"]).sortBy("createdAt","asc").fetch();case 6:return l=e.sent,e.abrupt("return",{articles:n,tags:l});case 8:case"end":return e.stop()}}),e)})))()},head:r(264).a.metatags()}),o=(r(290),r(51)),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("TheMainHeader"),t._v(" "),r("div",{staticClass:"container px-4 md:px-0 max-w-6xl mx-auto -mt-32"},[r("div",{staticClass:"flex flex-wrap justify-between pt-12 -mx-6"},t._l(t.articles,(function(article){return r("ArticleCard",{key:article.slug,attrs:{article:article}})})),1),t._v(" "),t._e()],1),t._v(" "),r("TheFooter")],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{TheMainHeader:r(286).default,ArticleCard:r(265).default,Subscribe:r(268).default,TheFooter:r(259).default})}}]);