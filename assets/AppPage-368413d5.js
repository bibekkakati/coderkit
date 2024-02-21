import{S as e,_ as s}from"./main-24227a85.js";import{g as n,j as t,L as i,u as r,d as a,N as o,r as l}from"./vendor-32aafa36.js";import{K as c}from"./kitslist-40de4f67.js";import{u as d}from"./useDocumentTitle-024d39fa.js";var h={exports:{}};function p(){}function u(){}u.resetWarningCache=p;h.exports=function(){function e(e,s,n,t,i,r){if("SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"!==r){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function s(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:s,element:e,elementType:e,instanceOf:s,node:e,objectOf:s,oneOf:s,oneOfType:s,shape:s,exact:s,checkPropTypes:u,resetWarningCache:p};return n.PropTypes=n,n}();const x=n(h.exports);function m({onChange:e,value:s,options:n}){return t.jsx("select",{className:"select select-xs rounded",onChange:e,value:s,children:n.map((({value:e,label:s},n)=>t.jsx("option",{value:e,children:s},n)))})}function f({showLogoText:e=!0}){return t.jsx("div",{className:"w-fit indicator ml-3",children:t.jsx(i,{to:"/","aria-label":"Home",children:t.jsxs("div",{className:"inline-flex items-center",children:[t.jsx("img",{src:"/android-chrome-192x192.png",className:"h-[32px] w-[32px]",alt:"Logo"}),e?t.jsx("span",{className:"ml-2 text-lg font-bold",children:"CoderKit"}):null]})})})}function j({kitname:e,showLogoText:s}){const n=r(),i=[];for(let t=0;t<c.length;t++){const e=c[t];i.push({value:e.link,label:e.label})}return t.jsxs("div",{className:"navbar",children:[t.jsx("div",{className:"flex-1",children:t.jsx(f,{showLogoText:s})}),t.jsx("div",{className:"flex-none h-[20px]",children:t.jsx(m,{value:e,onChange:e=>{n(`/app/${e.target.value}`)},options:i})})]})}m.propTypes={onChange:x.func,value:x.oneOfType([x.string,x.number]),options:x.arrayOf(x.shape({value:x.oneOfType([x.string,x.number]),label:x.string}))},f.propTypes={showLogoText:x.bool},j.propTypes={kitname:x.string,showLogoText:x.bool};const g=l.lazy((()=>s((()=>import("./KitView-dc4cd8fe.js")),["assets/KitView-dc4cd8fe.js","assets/main-24227a85.js","assets/vendor-32aafa36.js","assets/index-081cc633.css","assets/dynamic-import-helper-5f2de6aa.js","assets/kitslist-40de4f67.js","assets/useDocumentTitle-024d39fa.js"]))),w=l.lazy((()=>s((()=>import("./Sidebar-8230020b.js")),["assets/Sidebar-8230020b.js","assets/main-24227a85.js","assets/vendor-32aafa36.js","assets/index-081cc633.css","assets/dynamic-import-helper-5f2de6aa.js","assets/kitslist-40de4f67.js","assets/useDocumentTitle-024d39fa.js"]))),v=l.lazy((()=>s((()=>import("./ErrorPage-d228c290.js")),["assets/ErrorPage-d228c290.js","assets/vendor-32aafa36.js","assets/useDocumentTitle-024d39fa.js"])));const y=({kitdata:s})=>{const{label:n,link:i,short_desc:r,meta_desc:a}=s;d(`${n} - ${r}`,a);const o=l.useRef(null),[c,h]=l.useState({width:window.innerWidth,height:window.innerHeight}),[p,u]=l.useState({width:0,height:0});return l.useEffect((()=>{if(o.current){const e=o.current.clientWidth,s=o.current.clientHeight,n=c.width,t=c.height;u({width:100-e/n*100,height:100-s/t*100})}}),[c]),l.useEffect((()=>{const e=()=>{h({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",e),()=>{window.removeEventListener("resize",e)}}),[]),c.width<1024?t.jsxs("div",{className:"flex flex-col divide-y divide-ck-primary w-screen h-screen",children:[t.jsx("div",{ref:o,children:t.jsx(l.Suspense,{children:t.jsx(j,{kitname:i,showLogoText:c.width>380})})}),p.height?t.jsx("div",{className:"w-full",style:{height:p.height+"%"},children:t.jsx(l.Suspense,{fallback:t.jsx(e,{}),children:t.jsx(g,{kitname:i})})}):null]}):t.jsxs("div",{className:"flex flex-row",children:[t.jsx("div",{ref:o,className:"w-fit",children:t.jsx(l.Suspense,{children:t.jsx(w,{kitname:i})})}),p.width?t.jsx("div",{className:"h-screen",style:{width:p.width+"%"},children:t.jsx(l.Suspense,{fallback:t.jsx(e,{}),children:t.jsx(g,{kitname:i})})}):null]})};y.propTypes={kitdata:x.object};const _=Object.freeze(Object.defineProperty({__proto__:null,default:function(){const s=a().kitname;if(!s){const{link:e}=c[0];return t.jsx(o,{to:`/app/${e}`,replace:!0})}const n=c.find((e=>e.link===s&&e.active));return n?t.jsx(y,{kitdata:n}):t.jsx(l.Suspense,{fallback:t.jsx(e,{}),children:t.jsx(v,{})})}},Symbol.toStringTag,{value:"Module"}));export{_ as A,f as L,x as P,m as S};
