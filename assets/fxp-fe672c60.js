var t={},e={};!function(t){const e=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",n="["+e+"]["+(e+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040")+"]*",i=new RegExp("^"+n+"$");t.isExist=function(t){return void 0!==t},t.isEmptyObject=function(t){return 0===Object.keys(t).length},t.merge=function(t,e,n){if(e){const i=Object.keys(e),s=i.length;for(let r=0;r<s;r++)t[i[r]]="strict"===n?[e[i[r]]]:e[i[r]]}},t.getValue=function(e){return t.isExist(e)?e:""},t.isName=function(t){const e=i.exec(t);return!(null==e)},t.getAllMatches=function(t,e){const n=[];let i=e.exec(t);for(;i;){const s=[];s.startIndex=e.lastIndex-i[0].length;const r=i.length;for(let t=0;t<r;t++)s.push(i[t]);n.push(s),i=e.exec(t)}return n},t.nameRegexp=n}(e);const n=e,i={allowBooleanAttributes:!1,unpairedTags:[]};function s(t){return" "===t||"\t"===t||"\n"===t||"\r"===t}function r(t,e){const n=e;for(;e<t.length;e++)if("?"!=t[e]&&" "!=t[e]);else{const i=t.substr(n,e-n);if(e>5&&"xml"===i)return p("InvalidXml","XML declaration allowed only at the start of the document.",g(t,e));if("?"==t[e]&&">"==t[e+1]){e++;break}}return e}function o(t,e){if(t.length>e+5&&"-"===t[e+1]&&"-"===t[e+2]){for(e+=3;e<t.length;e++)if("-"===t[e]&&"-"===t[e+1]&&">"===t[e+2]){e+=2;break}}else if(t.length>e+8&&"D"===t[e+1]&&"O"===t[e+2]&&"C"===t[e+3]&&"T"===t[e+4]&&"Y"===t[e+5]&&"P"===t[e+6]&&"E"===t[e+7]){let n=1;for(e+=8;e<t.length;e++)if("<"===t[e])n++;else if(">"===t[e]&&(n--,0===n))break}else if(t.length>e+9&&"["===t[e+1]&&"C"===t[e+2]&&"D"===t[e+3]&&"A"===t[e+4]&&"T"===t[e+5]&&"A"===t[e+6]&&"["===t[e+7])for(e+=8;e<t.length;e++)if("]"===t[e]&&"]"===t[e+1]&&">"===t[e+2]){e+=2;break}return e}t.validate=function(t,e){e=Object.assign({},i,e);const a=[];let l=!1,h=!1;"\ufeff"===t[0]&&(t=t.substr(1));for(let i=0;i<t.length;i++)if("<"===t[i]&&"?"===t[i+1]){if(i+=2,i=r(t,i),i.err)return i}else{if("<"!==t[i]){if(s(t[i]))continue;return p("InvalidChar","char '"+t[i]+"' is not expected.",g(t,i))}{let m=i;if(i++,"!"===t[i]){i=o(t,i);continue}{let x=!1;"/"===t[i]&&(x=!0,i++);let N="";for(;i<t.length&&">"!==t[i]&&" "!==t[i]&&"\t"!==t[i]&&"\n"!==t[i]&&"\r"!==t[i];i++)N+=t[i];if(N=N.trim(),"/"===N[N.length-1]&&(N=N.substring(0,N.length-1),i--),f=N,!n.isName(f)){let e;return e=0===N.trim().length?"Invalid space after '<'.":"Tag '"+N+"' is an invalid name.",p("InvalidTag",e,g(t,i))}const b=u(t,i);if(!1===b)return p("InvalidAttr","Attributes for '"+N+"' have open quote.",g(t,i));let v=b.value;if(i=b.index,"/"===v[v.length-1]){const n=i-v.length;v=v.substring(0,v.length-1);const s=c(v,e);if(!0!==s)return p(s.err.code,s.err.msg,g(t,n+s.err.line));l=!0}else if(x){if(!b.tagClosed)return p("InvalidTag","Closing tag '"+N+"' doesn't have proper closing.",g(t,i));if(v.trim().length>0)return p("InvalidTag","Closing tag '"+N+"' can't have attributes or invalid starting.",g(t,m));{const e=a.pop();if(N!==e.tagName){let n=g(t,e.tagStartPos);return p("InvalidTag","Expected closing tag '"+e.tagName+"' (opened in line "+n.line+", col "+n.col+") instead of closing tag '"+N+"'.",g(t,m))}0==a.length&&(h=!0)}}else{const n=c(v,e);if(!0!==n)return p(n.err.code,n.err.msg,g(t,i-v.length+n.err.line));if(!0===h)return p("InvalidXml","Multiple possible root nodes found.",g(t,i));-1!==e.unpairedTags.indexOf(N)||a.push({tagName:N,tagStartPos:m}),l=!0}for(i++;i<t.length;i++)if("<"===t[i]){if("!"===t[i+1]){i++,i=o(t,i);continue}if("?"!==t[i+1])break;if(i=r(t,++i),i.err)return i}else if("&"===t[i]){const e=d(t,i);if(-1==e)return p("InvalidChar","char '&' is not expected.",g(t,i));i=e}else if(!0===h&&!s(t[i]))return p("InvalidXml","Extra text at the end",g(t,i));"<"===t[i]&&i--}}}var f;return l?1==a.length?p("InvalidTag","Unclosed tag '"+a[0].tagName+"'.",g(t,a[0].tagStartPos)):!(a.length>0)||p("InvalidXml","Invalid '"+JSON.stringify(a.map((t=>t.tagName)),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1}):p("InvalidXml","Start tag expected.",1)};const a='"',l="'";function u(t,e){let n="",i="",s=!1;for(;e<t.length;e++){if(t[e]===a||t[e]===l)""===i?i=t[e]:i!==t[e]||(i="");else if(">"===t[e]&&""===i){s=!0;break}n+=t[e]}return""===i&&{value:n,index:e,tagClosed:s}}const h=new RegExp("(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['\"])(([\\s\\S])*?)\\5)?","g");function c(t,e){const i=n.getAllMatches(t,h),s={};for(let n=0;n<i.length;n++){if(0===i[n][1].length)return p("InvalidAttr","Attribute '"+i[n][2]+"' has no space in starting.",m(i[n]));if(void 0!==i[n][3]&&void 0===i[n][4])return p("InvalidAttr","Attribute '"+i[n][2]+"' is without value.",m(i[n]));if(void 0===i[n][3]&&!e.allowBooleanAttributes)return p("InvalidAttr","boolean attribute '"+i[n][2]+"' is not allowed.",m(i[n]));const t=i[n][2];if(!f(t))return p("InvalidAttr","Attribute '"+t+"' is an invalid name.",m(i[n]));if(s.hasOwnProperty(t))return p("InvalidAttr","Attribute '"+t+"' is repeated.",m(i[n]));s[t]=1}return!0}function d(t,e){if(";"===t[++e])return-1;if("#"===t[e])return function(t,e){let n=/\d/;for("x"===t[e]&&(e++,n=/[\da-fA-F]/);e<t.length;e++){if(";"===t[e])return e;if(!t[e].match(n))break}return-1}(t,++e);let n=0;for(;e<t.length;e++,n++)if(!(t[e].match(/\w/)&&n<20)){if(";"===t[e])break;return-1}return e}function p(t,e,n){return{err:{code:t,msg:e,line:n.line||n,col:n.col}}}function f(t){return n.isName(t)}function g(t,e){const n=t.substring(0,e).split(/\r?\n/);return{line:n.length,col:n[n.length-1].length+1}}function m(t){return t.startIndex+t[1].length}var x={};const N={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(t,e,n){return t}};x.buildOptions=function(t){return Object.assign({},N,t)},x.defaultOptions=N;var b=class{constructor(t){this.tagname=t,this.child=[],this[":@"]={}}add(t,e){"__proto__"===t&&(t="#__proto__"),this.child.push({[t]:e})}addChild(t){"__proto__"===t.tagname&&(t.tagname="#__proto__"),t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child})}};const v=e;function E(t,e){let n="";for(;e<t.length&&"'"!==t[e]&&'"'!==t[e];e++)n+=t[e];if(n=n.trim(),-1!==n.indexOf(" "))throw new Error("External entites are not supported");const i=t[e++];let s="";for(;e<t.length&&t[e]!==i;e++)s+=t[e];return[n,s,e]}function T(t,e){return"!"===t[e+1]&&"-"===t[e+2]&&"-"===t[e+3]}function y(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"N"===t[e+3]&&"T"===t[e+4]&&"I"===t[e+5]&&"T"===t[e+6]&&"Y"===t[e+7]}function O(t,e){return"!"===t[e+1]&&"E"===t[e+2]&&"L"===t[e+3]&&"E"===t[e+4]&&"M"===t[e+5]&&"E"===t[e+6]&&"N"===t[e+7]&&"T"===t[e+8]}function w(t,e){return"!"===t[e+1]&&"A"===t[e+2]&&"T"===t[e+3]&&"T"===t[e+4]&&"L"===t[e+5]&&"I"===t[e+6]&&"S"===t[e+7]&&"T"===t[e+8]}function A(t,e){return"!"===t[e+1]&&"N"===t[e+2]&&"O"===t[e+3]&&"T"===t[e+4]&&"A"===t[e+5]&&"T"===t[e+6]&&"I"===t[e+7]&&"O"===t[e+8]&&"N"===t[e+9]}function P(t){if(v.isName(t))return t;throw new Error(`Invalid entity name ${t}`)}var I=function(t,e){const n={};if("O"!==t[e+3]||"C"!==t[e+4]||"T"!==t[e+5]||"Y"!==t[e+6]||"P"!==t[e+7]||"E"!==t[e+8])throw new Error("Invalid Tag instead of DOCTYPE");{e+=9;let i=1,s=!1,r=!1,o="";for(;e<t.length;e++)if("<"!==t[e]||r)if(">"===t[e]){if(r?"-"===t[e-1]&&"-"===t[e-2]&&(r=!1,i--):i--,0===i)break}else"["===t[e]?s=!0:o+=t[e];else{if(s&&y(t,e))e+=7,[entityName,val,e]=E(t,e+1),-1===val.indexOf("&")&&(n[P(entityName)]={regx:RegExp(`&${entityName};`,"g"),val:val});else if(s&&O(t,e))e+=8;else if(s&&w(t,e))e+=8;else if(s&&A(t,e))e+=9;else{if(!T)throw new Error("Invalid DOCTYPE");r=!0}i++,o=""}if(0!==i)throw new Error("Unclosed DOCTYPE")}return{entities:n,i:e}};const C=/^[-+]?0x[a-fA-F0-9]+$/,S=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt),!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);const V={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};const j=e,k=b,$=I,D=function(t,e={}){if(e=Object.assign({},V,e),!t||"string"!=typeof t)return t;let n=t.trim();if(void 0!==e.skipLike&&e.skipLike.test(n))return t;if(e.hex&&C.test(n))return Number.parseInt(n,16);{const i=S.exec(n);if(i){const s=i[1],r=i[2];let o=function(t){if(t&&-1!==t.indexOf("."))return"."===(t=t.replace(/0+$/,""))?t="0":"."===t[0]?t="0"+t:"."===t[t.length-1]&&(t=t.substr(0,t.length-1)),t;return t}(i[3]);const a=i[4]||i[6];if(!e.leadingZeros&&r.length>0&&s&&"."!==n[2])return t;if(!e.leadingZeros&&r.length>0&&!s&&"."!==n[1])return t;{const i=Number(n),l=""+i;return-1!==l.search(/[eE]/)||a?e.eNotation?i:t:-1!==n.indexOf(".")?"0"===l&&""===o||l===o||s&&l==="-"+o?i:t:r?o===l||s+o===l?i:t:n===l||n===s+l?i:t}}return t}};"<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g,j.nameRegexp);function F(t){const e=Object.keys(t);for(let n=0;n<e.length;n++){const i=e[n];this.lastEntities[i]={regex:new RegExp("&"+i+";","g"),val:t[i]}}}function _(t,e,n,i,s,r,o){if(void 0!==t&&(this.options.trimValues&&!i&&(t=t.trim()),t.length>0)){o||(t=this.replaceEntitiesValue(t));const i=this.options.tagValueProcessor(e,t,n,s,r);if(null==i)return t;if(typeof i!=typeof t||i!==t)return i;if(this.options.trimValues)return z(t,this.options.parseTagValue,this.options.numberParseOptions);return t.trim()===t?z(t,this.options.parseTagValue,this.options.numberParseOptions):t}}function L(t){if(this.options.removeNSPrefix){const e=t.split(":"),n="/"===t.charAt(0)?"/":"";if("xmlns"===e[0])return"";2===e.length&&(t=n+e[1])}return t}const M=new RegExp("([^\\s=]+)\\s*(=\\s*(['\"])([\\s\\S]*?)\\3)?","gm");function B(t,e,n){if(!this.options.ignoreAttributes&&"string"==typeof t){const n=j.getAllMatches(t,M),i=n.length,s={};for(let t=0;t<i;t++){const i=this.resolveNameSpace(n[t][1]);let r=n[t][4],o=this.options.attributeNamePrefix+i;if(i.length)if(this.options.transformAttributeName&&(o=this.options.transformAttributeName(o)),"__proto__"===o&&(o="#__proto__"),void 0!==r){this.options.trimValues&&(r=r.trim()),r=this.replaceEntitiesValue(r);const t=this.options.attributeValueProcessor(i,r,e);s[o]=null==t?r:typeof t!=typeof r||t!==r?t:z(r,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(s[o]=!0)}if(!Object.keys(s).length)return;if(this.options.attributesGroupName){const t={};return t[this.options.attributesGroupName]=s,t}return s}}const R=function(t){t=t.replace(/\r\n?/g,"\n");const e=new k("!xml");let n=e,i="",s="";for(let r=0;r<t.length;r++){if("<"===t[r])if("/"===t[r+1]){const e=Z(t,">",r,"Closing Tag is not closed.");let o=t.substring(r+2,e).trim();if(this.options.removeNSPrefix){const t=o.indexOf(":");-1!==t&&(o=o.substr(t+1))}this.options.transformTagName&&(o=this.options.transformTagName(o)),n&&(i=this.saveTextToParentTag(i,n,s));const a=s.substring(s.lastIndexOf(".")+1);if(o&&-1!==this.options.unpairedTags.indexOf(o))throw new Error(`Unpaired tag can not be used as closing tag: </${o}>`);let l=0;a&&-1!==this.options.unpairedTags.indexOf(a)?(l=s.lastIndexOf(".",s.lastIndexOf(".")-1),this.tagsNodeStack.pop()):l=s.lastIndexOf("."),s=s.substring(0,l),n=this.tagsNodeStack.pop(),i="",r=e}else if("?"===t[r+1]){let e=q(t,r,!1,"?>");if(!e)throw new Error("Pi Tag is not closed.");if(i=this.saveTextToParentTag(i,n,s),this.options.ignoreDeclaration&&"?xml"===e.tagName||this.options.ignorePiTags);else{const t=new k(e.tagName);t.add(this.options.textNodeName,""),e.tagName!==e.tagExp&&e.attrExpPresent&&(t[":@"]=this.buildAttributesMap(e.tagExp,s,e.tagName)),this.addChild(n,t,s)}r=e.closeIndex+1}else if("!--"===t.substr(r+1,3)){const e=Z(t,"--\x3e",r+4,"Comment is not closed.");if(this.options.commentPropName){const o=t.substring(r+4,e-2);i=this.saveTextToParentTag(i,n,s),n.add(this.options.commentPropName,[{[this.options.textNodeName]:o}])}r=e}else if("!D"===t.substr(r+1,2)){const e=$(t,r);this.docTypeEntities=e.entities,r=e.i}else if("!["===t.substr(r+1,2)){const e=Z(t,"]]>",r,"CDATA is not closed.")-2,o=t.substring(r+9,e);if(i=this.saveTextToParentTag(i,n,s),this.options.cdataPropName)n.add(this.options.cdataPropName,[{[this.options.textNodeName]:o}]);else{let t=this.parseTextData(o,n.tagname,s,!0,!1,!0);null==t&&(t=""),n.add(this.options.textNodeName,t)}r=e+2}else{let o=q(t,r,this.options.removeNSPrefix),a=o.tagName;const l=o.rawTagName;let u=o.tagExp,h=o.attrExpPresent,c=o.closeIndex;this.options.transformTagName&&(a=this.options.transformTagName(a)),n&&i&&"!xml"!==n.tagname&&(i=this.saveTextToParentTag(i,n,s,!1));const d=n;if(d&&-1!==this.options.unpairedTags.indexOf(d.tagname)&&(n=this.tagsNodeStack.pop(),s=s.substring(0,s.lastIndexOf("."))),a!==e.tagname&&(s+=s?"."+a:a),this.isItStopNode(this.options.stopNodes,s,a)){let e="";if(u.length>0&&u.lastIndexOf("/")===u.length-1)r=o.closeIndex;else if(-1!==this.options.unpairedTags.indexOf(a))r=o.closeIndex;else{const n=this.readStopNodeData(t,l,c+1);if(!n)throw new Error(`Unexpected end of ${l}`);r=n.i,e=n.tagContent}const i=new k(a);a!==u&&h&&(i[":@"]=this.buildAttributesMap(u,s,a)),e&&(e=this.parseTextData(e,a,s,!0,h,!0,!0)),s=s.substr(0,s.lastIndexOf(".")),i.add(this.options.textNodeName,e),this.addChild(n,i,s)}else{if(u.length>0&&u.lastIndexOf("/")===u.length-1){"/"===a[a.length-1]?(a=a.substr(0,a.length-1),s=s.substr(0,s.length-1),u=a):u=u.substr(0,u.length-1),this.options.transformTagName&&(a=this.options.transformTagName(a));const t=new k(a);a!==u&&h&&(t[":@"]=this.buildAttributesMap(u,s,a)),this.addChild(n,t,s),s=s.substr(0,s.lastIndexOf("."))}else{const t=new k(a);this.tagsNodeStack.push(n),a!==u&&h&&(t[":@"]=this.buildAttributesMap(u,s,a)),this.addChild(n,t,s),n=t}i="",r=c}}else i+=t[r]}return e.child};function X(t,e,n){const i=this.options.updateTag(e.tagname,n,e[":@"]);!1===i||("string"==typeof i?(e.tagname=i,t.addChild(e)):t.addChild(e))}const G=function(t){if(this.options.processEntities){for(let e in this.docTypeEntities){const n=this.docTypeEntities[e];t=t.replace(n.regx,n.val)}for(let e in this.lastEntities){const n=this.lastEntities[e];t=t.replace(n.regex,n.val)}if(this.options.htmlEntities)for(let e in this.htmlEntities){const n=this.htmlEntities[e];t=t.replace(n.regex,n.val)}t=t.replace(this.ampEntity.regex,this.ampEntity.val)}return t};function U(t,e,n,i){return t&&(void 0===i&&(i=0===Object.keys(e.child).length),void 0!==(t=this.parseTextData(t,e.tagname,n,!1,!!e[":@"]&&0!==Object.keys(e[":@"]).length,i))&&""!==t&&e.add(this.options.textNodeName,t),t=""),t}function Y(t,e,n){const i="*."+n;for(const s in t){const n=t[s];if(i===n||e===n)return!0}return!1}function Z(t,e,n,i){const s=t.indexOf(e,n);if(-1===s)throw new Error(i);return s+e.length-1}function q(t,e,n,i=">"){const s=function(t,e,n=">"){let i,s="";for(let r=e;r<t.length;r++){let e=t[r];if(i)e===i&&(i="");else if('"'===e||"'"===e)i=e;else if(e===n[0]){if(!n[1])return{data:s,index:r};if(t[r+1]===n[1])return{data:s,index:r}}else"\t"===e&&(e=" ");s+=e}}(t,e+1,i);if(!s)return;let r=s.data;const o=s.index,a=r.search(/\s/);let l=r,u=!0;-1!==a&&(l=r.substr(0,a).replace(/\s\s*$/,""),r=r.substr(a+1));const h=l;if(n){const t=l.indexOf(":");-1!==t&&(l=l.substr(t+1),u=l!==s.data.substr(t+1))}return{tagName:l,tagExp:r,closeIndex:o,attrExpPresent:u,rawTagName:h}}function W(t,e,n){const i=n;let s=1;for(;n<t.length;n++)if("<"===t[n])if("/"===t[n+1]){const r=Z(t,">",n,`${e} is not closed`);if(t.substring(n+2,r).trim()===e&&(s--,0===s))return{tagContent:t.substring(i,n),i:r};n=r}else if("?"===t[n+1]){n=Z(t,"?>",n+1,"StopNode is not closed.")}else if("!--"===t.substr(n+1,3)){n=Z(t,"--\x3e",n+3,"StopNode is not closed.")}else if("!["===t.substr(n+1,2)){n=Z(t,"]]>",n,"StopNode is not closed.")-2}else{const i=q(t,n,">");if(i){(i&&i.tagName)===e&&"/"!==i.tagExp[i.tagExp.length-1]&&s++,n=i.closeIndex}}}function z(t,e,n){if(e&&"string"==typeof t){const e=t.trim();return"true"===e||"false"!==e&&D(t,n)}return j.isExist(t)?t:""}var J=class{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"¢"},pound:{regex:/&(pound|#163);/g,val:"£"},yen:{regex:/&(yen|#165);/g,val:"¥"},euro:{regex:/&(euro|#8364);/g,val:"€"},copyright:{regex:/&(copy|#169);/g,val:"©"},reg:{regex:/&(reg|#174);/g,val:"®"},inr:{regex:/&(inr|#8377);/g,val:"₹"}},this.addExternalEntities=F,this.parseXml=R,this.parseTextData=_,this.resolveNameSpace=L,this.buildAttributesMap=B,this.isItStopNode=Y,this.replaceEntitiesValue=G,this.readStopNodeData=W,this.saveTextToParentTag=U,this.addChild=X}},H={};function K(t,e,n){let i;const s={};for(let r=0;r<t.length;r++){const o=t[r],a=Q(o);let l="";if(l=void 0===n?a:n+"."+a,a===e.textNodeName)void 0===i?i=o[a]:i+=""+o[a];else{if(void 0===a)continue;if(o[a]){let t=K(o[a],e,l);const n=et(t,e);o[":@"]?tt(t,o[":@"],l,e):1!==Object.keys(t).length||void 0===t[e.textNodeName]||e.alwaysCreateTextNode?0===Object.keys(t).length&&(e.alwaysCreateTextNode?t[e.textNodeName]="":t=""):t=t[e.textNodeName],void 0!==s[a]&&s.hasOwnProperty(a)?(Array.isArray(s[a])||(s[a]=[s[a]]),s[a].push(t)):e.isArray(a,l,n)?s[a]=[t]:s[a]=t}}}return"string"==typeof i?i.length>0&&(s[e.textNodeName]=i):void 0!==i&&(s[e.textNodeName]=i),s}function Q(t){const e=Object.keys(t);for(let n=0;n<e.length;n++){const t=e[n];if(":@"!==t)return t}}function tt(t,e,n,i){if(e){const s=Object.keys(e),r=s.length;for(let o=0;o<r;o++){const r=s[o];i.isArray(r,n+"."+r,!0,!0)?t[r]=[e[r]]:t[r]=e[r]}}}function et(t,e){const{textNodeName:n}=e,i=Object.keys(t).length;return 0===i||!(1!==i||!t[n]&&"boolean"!=typeof t[n]&&0!==t[n])}H.prettify=function(t,e){return K(t,e)};const{buildOptions:nt}=x,it=J,{prettify:st}=H,rt=t;var ot=class{constructor(t){this.externalEntities={},this.options=nt(t)}parse(t,e){if("string"==typeof t);else{if(!t.toString)throw new Error("XML data is accepted in String or Bytes[] form.");t=t.toString()}if(e){!0===e&&(e={});const n=rt.validate(t,e);if(!0!==n)throw Error(`${n.err.msg}:${n.err.line}:${n.err.col}`)}const n=new it(this.options);n.addExternalEntities(this.externalEntities);const i=n.parseXml(t);return this.options.preserveOrder||void 0===i?i:st(i,this.options)}addEntity(t,e){if(-1!==e.indexOf("&"))throw new Error("Entity value can't have '&'");if(-1!==t.indexOf("&")||-1!==t.indexOf(";"))throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if("&"===e)throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=e}};function at(t,e,n,i){let s="",r=!1;for(let o=0;o<t.length;o++){const a=t[o],l=lt(a);if(void 0===l)continue;let u="";if(u=0===n.length?l:`${n}.${l}`,l===e.textNodeName){let t=a[l];ht(u,e)||(t=e.tagValueProcessor(l,t),t=ct(t,e)),r&&(s+=i),s+=t,r=!1;continue}if(l===e.cdataPropName){r&&(s+=i),s+=`<![CDATA[${a[l][0][e.textNodeName]}]]>`,r=!1;continue}if(l===e.commentPropName){s+=i+`\x3c!--${a[l][0][e.textNodeName]}--\x3e`,r=!0;continue}if("?"===l[0]){const t=ut(a[":@"],e),n="?xml"===l?"":i;let o=a[l][0][e.textNodeName];o=0!==o.length?" "+o:"",s+=n+`<${l}${o}${t}?>`,r=!0;continue}let h=i;""!==h&&(h+=e.indentBy);const c=i+`<${l}${ut(a[":@"],e)}`,d=at(a[l],e,u,h);-1!==e.unpairedTags.indexOf(l)?e.suppressUnpairedNode?s+=c+">":s+=c+"/>":d&&0!==d.length||!e.suppressEmptyNode?d&&d.endsWith(">")?s+=c+`>${d}${i}</${l}>`:(s+=c+">",d&&""!==i&&(d.includes("/>")||d.includes("</"))?s+=i+e.indentBy+d+i:s+=d,s+=`</${l}>`):s+=c+"/>",r=!0}return s}function lt(t){const e=Object.keys(t);for(let n=0;n<e.length;n++){const i=e[n];if(t.hasOwnProperty(i)&&":@"!==i)return i}}function ut(t,e){let n="";if(t&&!e.ignoreAttributes)for(let i in t){if(!t.hasOwnProperty(i))continue;let s=e.attributeValueProcessor(i,t[i]);s=ct(s,e),!0===s&&e.suppressBooleanAttributes?n+=` ${i.substr(e.attributeNamePrefix.length)}`:n+=` ${i.substr(e.attributeNamePrefix.length)}="${s}"`}return n}function ht(t,e){let n=(t=t.substr(0,t.length-e.textNodeName.length-1)).substr(t.lastIndexOf(".")+1);for(let i in e.stopNodes)if(e.stopNodes[i]===t||e.stopNodes[i]==="*."+n)return!0;return!1}function ct(t,e){if(t&&t.length>0&&e.processEntities)for(let n=0;n<e.entities.length;n++){const i=e.entities[n];t=t.replace(i.regex,i.val)}return t}const dt=function(t,e){let n="";return e.format&&e.indentBy.length>0&&(n="\n"),at(t,e,"",n)},pt={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(t,e){return e},attributeValueProcessor:function(t,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function ft(t){this.options=Object.assign({},pt,t),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=xt),this.processTextOrObjNode=gt,this.options.format?(this.indentate=mt,this.tagEndChar=">\n",this.newLine="\n"):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}function gt(t,e,n){const i=this.j2x(t,n+1);return void 0!==t[this.options.textNodeName]&&1===Object.keys(t).length?this.buildTextValNode(t[this.options.textNodeName],e,i.attrStr,n):this.buildObjectNode(i.val,e,i.attrStr,n)}function mt(t){return this.options.indentBy.repeat(t)}function xt(t){return!(!t.startsWith(this.options.attributeNamePrefix)||t===this.options.textNodeName)&&t.substr(this.attrPrefixLen)}ft.prototype.build=function(t){return this.options.preserveOrder?dt(t,this.options):(Array.isArray(t)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(t={[this.options.arrayNodeName]:t}),this.j2x(t,0).val)},ft.prototype.j2x=function(t,e){let n="",i="";for(let s in t)if(Object.prototype.hasOwnProperty.call(t,s))if(void 0===t[s])this.isAttribute(s)&&(i+="");else if(null===t[s])this.isAttribute(s)?i+="":"?"===s[0]?i+=this.indentate(e)+"<"+s+"?"+this.tagEndChar:i+=this.indentate(e)+"<"+s+"/"+this.tagEndChar;else if(t[s]instanceof Date)i+=this.buildTextValNode(t[s],s,"",e);else if("object"!=typeof t[s]){const r=this.isAttribute(s);if(r)n+=this.buildAttrPairStr(r,""+t[s]);else if(s===this.options.textNodeName){let e=this.options.tagValueProcessor(s,""+t[s]);i+=this.replaceEntitiesValue(e)}else i+=this.buildTextValNode(t[s],s,"",e)}else if(Array.isArray(t[s])){const n=t[s].length;let r="";for(let o=0;o<n;o++){const n=t[s][o];void 0===n||(null===n?"?"===s[0]?i+=this.indentate(e)+"<"+s+"?"+this.tagEndChar:i+=this.indentate(e)+"<"+s+"/"+this.tagEndChar:"object"==typeof n?this.options.oneListGroup?r+=this.j2x(n,e+1).val:r+=this.processTextOrObjNode(n,s,e):r+=this.buildTextValNode(n,s,"",e))}this.options.oneListGroup&&(r=this.buildObjectNode(r,s,"",e)),i+=r}else if(this.options.attributesGroupName&&s===this.options.attributesGroupName){const e=Object.keys(t[s]),i=e.length;for(let r=0;r<i;r++)n+=this.buildAttrPairStr(e[r],""+t[s][e[r]])}else i+=this.processTextOrObjNode(t[s],s,e);return{attrStr:n,val:i}},ft.prototype.buildAttrPairStr=function(t,e){return e=this.options.attributeValueProcessor(t,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&"true"===e?" "+t:" "+t+'="'+e+'"'},ft.prototype.buildObjectNode=function(t,e,n,i){if(""===t)return"?"===e[0]?this.indentate(i)+"<"+e+n+"?"+this.tagEndChar:this.indentate(i)+"<"+e+n+this.closeTag(e)+this.tagEndChar;{let s="</"+e+this.tagEndChar,r="";return"?"===e[0]&&(r="?",s=""),!n&&""!==n||-1!==t.indexOf("<")?!1!==this.options.commentPropName&&e===this.options.commentPropName&&0===r.length?this.indentate(i)+`\x3c!--${t}--\x3e`+this.newLine:this.indentate(i)+"<"+e+n+r+this.tagEndChar+t+this.indentate(i)+s:this.indentate(i)+"<"+e+n+r+">"+t+s}},ft.prototype.closeTag=function(t){let e="";return-1!==this.options.unpairedTags.indexOf(t)?this.options.suppressUnpairedNode||(e="/"):e=this.options.suppressEmptyNode?"/":`></${t}`,e},ft.prototype.buildTextValNode=function(t,e,n,i){if(!1!==this.options.cdataPropName&&e===this.options.cdataPropName)return this.indentate(i)+`<![CDATA[${t}]]>`+this.newLine;if(!1!==this.options.commentPropName&&e===this.options.commentPropName)return this.indentate(i)+`\x3c!--${t}--\x3e`+this.newLine;if("?"===e[0])return this.indentate(i)+"<"+e+n+"?"+this.tagEndChar;{let s=this.options.tagValueProcessor(e,t);return s=this.replaceEntitiesValue(s),""===s?this.indentate(i)+"<"+e+n+this.closeTag(e)+this.tagEndChar:this.indentate(i)+"<"+e+n+">"+s+"</"+e+this.tagEndChar}},ft.prototype.replaceEntitiesValue=function(t){if(t&&t.length>0&&this.options.processEntities)for(let e=0;e<this.options.entities.length;e++){const n=this.options.entities[e];t=t.replace(n.regex,n.val)}return t};var Nt={XMLParser:ot,XMLValidator:t,XMLBuilder:ft};export{Nt as f};