(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"),require("../xml/xml"),require("../javascript/javascript"),require("../css/css"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror","../xml/xml","../javascript/javascript","../css/css"],a)}else{a(CodeMirror)}}})(function(d){var g={script:[["lang",/(javascript|babel)/i,"javascript"],["type",/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i,"javascript"],["type",/./,"text/plain"],[null,null,"javascript"]],style:[["lang",/^css$/i,"css"],["type",/^(text\/)?(x-)?(stylesheet|css)$/i,"css"],["type",/./,"text/plain"],[null,null,"css"]]};function f(n,j,k){var m=n.current(),l=m.search(j);if(l>-1){n.backUp(m.length-l)}else{if(m.match(/<\/?$/)){n.backUp(m.length);if(!n.match(j,false)){n.match(m)}}}return k}var e={};function c(j){var k=e[j];if(k){return k}return e[j]=new RegExp("\\s+"+j+"\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*")}function a(l,j){var k=l.match(c(j));return k?/^\s*(.*?)\s*$/.exec(k[2])[1]:""}function i(k,j){return new RegExp((j?"^":"")+"</s*"+k+"s*>","i")}function h(o,n){for(var j in o){var k=n[j]||(n[j]=[]);var m=o[j];for(var l=m.length-1;l>=0;l--){k.unshift(m[l])}}}function b(l,m){for(var k=0;k<l.length;k++){var j=l[k];if(!j[0]||j[1].test(a(m,j[0]))){return j[2]}}}d.defineMode("htmlmixed",function(k,o){var q=d.getMode(k,{name:"xml",htmlMode:true,multilineTagIndentFactor:o.multilineTagIndentFactor,multilineTagIndentPastTag:o.multilineTagIndentPastTag});var j={};var p=o&&o.tags,n=o&&o.scriptTypes;h(g,j);if(p){h(p,j)}if(n){for(var m=n.length-1;m>=0;m--){j.script.unshift(["type",n[m].matches,n[m].mode])}}function l(z,r){var s=q.token(z,r.htmlState),A=/\btag\b/.test(s),u;if(A&&!/[<>\s\/]/.test(z.current())&&(u=r.htmlState.tagName&&r.htmlState.tagName.toLowerCase())&&j.hasOwnProperty(u)){r.inTag=u+" "}else{if(r.inTag&&A&&/>$/.test(z.current())){var t=/^([\S]+) (.*)/.exec(r.inTag);r.inTag=null;var y=z.current()==">"&&b(j[t[1]],t[2]);var x=d.getMode(k,y);var w=i(t[1],true),v=i(t[1],false);r.token=function(C,B){if(C.match(w,false)){B.token=l;B.localState=B.localMode=null;return null}return f(C,v,B.localMode.token(C,B.localState))};r.localMode=x;r.localState=d.startState(x,q.indent(r.htmlState,""))}else{if(r.inTag){r.inTag+=z.current();if(z.eol()){r.inTag+=" "}}}}return s}return{startState:function(){var r=d.startState(q);return{token:l,inTag:null,localMode:null,localState:null,htmlState:r}},copyState:function(s){var r;if(s.localState){r=d.copyState(s.localMode,s.localState)}return{token:s.token,inTag:s.inTag,localMode:s.localMode,localState:r,htmlState:d.copyState(q,s.htmlState)}},token:function(s,r){return r.token(s,r)},indent:function(s,r){if(!s.localMode||/^\s*<\//.test(r)){return q.indent(s.htmlState,r)}else{if(s.localMode.indent){return s.localMode.indent(s.localState,r)}else{return d.Pass}}},innerMode:function(r){return{state:r.localState||r.htmlState,mode:r.localMode||q}}}},"xml","javascript","css");d.defineMIME("text/html","htmlmixed")});