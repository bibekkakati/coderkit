import{r as e,j as t}from"./vendor-32aafa36.js";import{u as o,T as s}from"./TextBox-a0be71c7.js";import{O as l,C as n}from"./Output-9b00e251.js";import{S as a}from"./AppPage-368413d5.js";import"./CopyIcon-f1aba91b.js";import"./main-24227a85.js";import"./kitslist-40de4f67.js";import"./useDocumentTitle-024d39fa.js";const r=[{value:"encode",label:"Encode"},{value:"decode",label:"Decode"}];function i(){const i=o(),c={mode:i.get("mode"),inputV:i.get("inputV")},[d,m]=e.useState(c.mode||r[0].value),[u,p]=e.useState(c.inputV||"");let f="",j="";try{const e=u.trim();e.length&&(f="encode"==d?window.btoa(e):window.atob(e))}catch(h){j="encode"==d?"String is not valid for encoding":"String is not encoded correctly"}return t.jsxs("div",{className:"flex flex-col md:flex-row h-full w-full",children:[t.jsx("div",{className:"form-control p-4 h-1/2 w-full md:h-full md:w-1/2",children:t.jsx(s,{value:u,onChange:e=>{const t=e.target.value||"";p(t),i.set(t,"inputV")},placeholder:"Paste your string",actions:t.jsx(t.Fragment,{children:t.jsx(a,{value:d,onChange:e=>{const t=e.target.value;m(t),i.set(t,"mode")},options:r})})})}),t.jsx("div",{className:"form-control p-4 h-1/2 w-full md:h-full md:w-1/2",children:t.jsx(l,{value:f,error:j,prettify:!0,wrap:!0,actions:t.jsx(t.Fragment,{children:t.jsx(n,{value:f})})})})]})}export{i as default};