import e from"postcss-value-parser";import t from"fs";import n from"path";var s=(t,n)=>{const s=e(t);return s.walk((e=>{if((e=>e&&"function"===e.type&&"env"===e.value)(e)){const[t]=e.nodes;"word"===t.type&&void 0!==n[t.value]&&(e.nodes=[],e.type="word",e.value=n[t.value])}})),s.toString()};function a(e){return Object.assign({},Object(e).environmentVariables||Object(e)["environment-variables"])}function o(e){return e.map((e=>{if(e instanceof Promise)return e;if(e instanceof Function)return e();const t=e===Object(e)?e:{from:String(e)};if(t.environmentVariables||t["environment-variables"])return t;const s=String(t.from||"");return{type:(t.type||n.extname(s).slice(1)).toLowerCase(),from:s}})).reduce((async(e,t)=>{const{type:s,from:o}=await t;return"js"===s||"cjs"===s?Object.assign(e,await async function(e){return a(await import(n.resolve(e)))}(o)):"json"===s?Object.assign(e,await async function(e){return a(await i(n.resolve(e)))}(o)):Object.assign(e,a(await t))}),{})}const i=async e=>JSON.parse(await(e=>new Promise(((n,s)=>{t.readFile(e,"utf8",((e,t)=>{e?s(e):n(t)}))})))(e));function r(e){const t=o([].concat(Object(e).importFrom||[])),n="disableDeprecationNotice"in Object(e)&&Boolean(e.disableDeprecationNotice);let a=!1;return{postcssPlugin:"postcss-env-fn",async AtRule(e,{result:o}){let i;try{i=s(e.params,await t)}catch(t){e.warn(o,`Failed to parse params '${e.params}' as an environment value. Leaving the original value intact.`)}void 0!==i&&i!==e.params&&(e.params=i,n||a||(a=!0,e.warn(o,"postcss-env-function is deprecated and will be removed.\nCheck the discussion on github for more details. https://github.com/csstools/postcss-plugins/discussions/192")))},async Declaration(e,{result:o}){let i;try{i=s(e.value,await t)}catch(t){e.warn(o,`Failed to parse value '${e.value}' as an environment value. Leaving the original value intact.`)}void 0!==i&&i!==e.value&&(e.value=i,n||a||(a=!0,e.warn(o,"postcss-env-function is deprecated and will be removed.\nWe are looking for insights and anecdotes on how these features are used so that we can design the best alternative.\nPlease let us know if our proposal will work for you.\nVisit the discussion on github for more details. https://github.com/csstools/postcss-plugins/discussions/192")))}}}r.postcss=!0;export{r as default};
