import{r as t,j as s}from"./vendor-32aafa36.js";import{u as e,T as l}from"./TextBox-a0be71c7.js";import{m as r}from"./minifyHtml-a2eb1e00.js";import{O as o,C as a}from"./Output-9b00e251.js";import"./AppPage-368413d5.js";import"./main-24227a85.js";import"./kitslist-40de4f67.js";import"./useDocumentTitle-024d39fa.js";import"./minifyCss-615d637b.js";import"./CopyIcon-f1aba91b.js";function m(){const m=e(),i={inputV:m.get("inputV")},[n,u]=t.useState(i.inputV||"");let p="",c="";try{const t=n.trim();t.length&&(p=r(t))}catch(f){c=f.message}return s.jsxs("div",{className:"flex flex-col md:flex-row h-full w-full ",children:[s.jsx("div",{className:"form-control p-4 h-1/2 w-full md:h-full md:w-1/2",children:s.jsx(l,{value:n,onChange:t=>{const s=t.target.value||"";u(s),m.set(s,"inputV")},placeholder:"Paste your code"})}),s.jsx("div",{className:"form-control p-4 h-1/2 w-full md:h-full md:w-1/2",children:s.jsx(o,{value:p,error:c,prettify:!0,language:"xml",wrap:!0,actions:s.jsx(s.Fragment,{children:s.jsx(a,{value:p})})})})]})}export{m as default};