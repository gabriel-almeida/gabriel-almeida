(window.webpackJsonp=window.webpackJsonp||[]).push([[6,7],{254:function(t,e,n){var map={"./gabriel-almeida.jpg":255,"./old-map.jpg":256};function r(t){var e=l(t);return n(e)}function l(t){if(!n.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}r.keys=function(){return Object.keys(map)},r.resolve=l,t.exports=r,r.id=254},255:function(t,e,n){t.exports=n.p+"img/gabriel-almeida.05924f7.jpg"},256:function(t,e,n){t.exports=n.p+"img/old-map.e57e13b.jpg"},266:function(t,e,n){"use strict";n.r(e);var r={props:{author:{type:Object,required:!0}}},l=n(51),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"flex w-full items-center font-sans p-8 md:p-24"},[r("img",{staticClass:"w-20 h-20 rounded-full mr-4",attrs:{src:n(254)("./"+t.author.img),alt:t.author.name}}),t._v(" "),r("div",{staticClass:"flex-1"},[r("p",{staticClass:"text-base font-bold md:text-xl leading-none"},[t._v("\n              "+t._s(t.author.name)+"\n          ")]),t._v(" "),r("p",{staticClass:"text-gray-600 text-xs md:text-base"},[t._v(t._s(t.author.bio))])])])}),[],!1,null,null,null);e.default=component.exports},277:function(t,e,n){"use strict";n.r(e);var r={props:{article:{type:Object,default:function(){return null}}},computed:{publishDate:function(){return new Date(this.article.createdAt).toLocaleDateString("pt",{year:"numeric",month:"long",day:"numeric"})}}},l=n(51),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"text-center pt-16 md:pt-32"},[r("p",{staticClass:"text-sm md:text-base text-indigo-900 font-bold uppercase"},[t._v("\n      "+t._s(t.publishDate)+"\n      "),t.article.serie?r("span",[r("span",{staticClass:"text-gray-900"},[t._v(" / ")]),t._v("\n        "+t._s(t.article.serie)+"\n      ")]):t._e()]),t._v(" "),r("h1",{staticClass:"font-bold break-normal text-3xl md:text-5xl"},[t._v("\n      "+t._s(t.article.title)+"\n    ")]),t._v(" "),r("p",{staticClass:"pt-5 text-gray-600 font-semibold text-xl"},[t._v(" "+t._s(t.article.description))])]),t._v(" "),r("div",{staticClass:"container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded",style:{backgroundImage:"url("+n(254)("./"+t.article.img)+")",height:"75vh"}}),t._v(" "),r("div",{staticClass:"container max-w-5xl mx-auto -mt-32"},[r("div",{staticClass:"mx-0 sm:mx-6"},[r("div",{staticClass:"\n          bg-white\n          w-full\n          p-8\n          md:p-24\n          text-xl\n          md:text-2xl\n          text-gray-800\n          leading-normal\n        ",staticStyle:{"font-family":"Georgia, serif"}},[r("nuxt-content",{staticClass:"prose prose-xl",attrs:{document:t.article,tag:"article"}})],1),t._v(" "),r("Author",{attrs:{author:t.article.author}})],1)])])}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Author:n(266).default})}}]);