import{r as e}from"./vendor-32aafa36.js";function t(t,c,n=!1){const o=e.useRef(document.title);e.useEffect((()=>{document.title=t}),[t]),e.useEffect((()=>{c&&document.querySelector('meta[name="description"]').setAttribute("content",c)}),[c]),e.useEffect((()=>()=>{n||(document.title=o.current)}),[n])}export{t as u};