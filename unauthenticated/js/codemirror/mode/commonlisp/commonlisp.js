(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("commonlisp",function(c){var h=/^(block|let*|return-from|catch|load-time-value|setq|eval-when|locally|symbol-macrolet|flet|macrolet|tagbody|function|multiple-value-call|the|go|multiple-value-prog1|throw|if|progn|unwind-protect|labels|progv|let|quote)$/;var k=/^with|^def|^do|^prog|case$|^cond$|bind$|when$|unless$/;var g=/^(?:[+\-]?(?:\d+|\d*\.\d+)(?:[efd][+\-]?\d+)?|[+\-]?\d+(?:\/[+\-]?\d+)?|#b[+\-]?[01]+|#o[+\-]?[0-7]+|#x[+\-]?[\da-f]+)/;var d=/[^\s'`,@()\[\]";]/;var i;function f(m){var l;while(l=m.next()){if(l=="\\"){m.next()}else{if(!d.test(l)){m.backUp(1);break}}}return m.current()}function b(o,n){if(o.eatSpace()){i="ws";return null}if(o.match(g)){return"number"}var m=o.next();if(m=="\\"){m=o.next()}if(m=='"'){return(n.tokenize=e)(o,n)}else{if(m=="("){i="open";return"bracket"}else{if(m==")"||m=="]"){i="close";return"bracket"}else{if(m==";"){o.skipToEnd();i="ws";return"comment"}else{if(/['`,@]/.test(m)){return null}else{if(m=="|"){if(o.skipTo("|")){o.next();return"symbol"}else{o.skipToEnd();return"error"}}else{if(m=="#"){var m=o.next();if(m=="("){i="open";return"bracket"}else{if(/[+\-=\.']/.test(m)){return null}else{if(/\d/.test(m)&&o.match(/^\d*#/)){return null}else{if(m=="|"){return(n.tokenize=j)(o,n)}else{if(m==":"){f(o);return"meta"}else{if(m=="\\"){o.next();f(o);return"string-2"}else{return"error"}}}}}}}else{var l=f(o);if(l=="."){return null}i="symbol";if(l=="nil"||l=="t"||l.charAt(0)==":"){return"atom"}if(n.lastType=="open"&&(h.test(l)||k.test(l))){return"keyword"}if(l.charAt(0)=="&"){return"variable-2"}return"variable"}}}}}}}}function e(o,m){var n=false,l;while(l=o.next()){if(l=='"'&&!n){m.tokenize=b;break}n=!n&&l=="\\"}return"string"}function j(o,n){var l,m;while(l=o.next()){if(l=="#"&&m=="|"){n.tokenize=b;break}m=l}i="ws";return"comment"}return{startState:function(){return{ctx:{prev:null,start:0,indentTo:0},lastType:null,tokenize:b}},token:function(n,m){if(n.sol()&&typeof m.ctx.indentTo!="number"){m.ctx.indentTo=m.ctx.start+1}i=null;var l=m.tokenize(n,m);if(i!="ws"){if(m.ctx.indentTo==null){if(i=="symbol"&&k.test(n.current())){m.ctx.indentTo=m.ctx.start+c.indentUnit}else{m.ctx.indentTo="next"}}else{if(m.ctx.indentTo=="next"){m.ctx.indentTo=n.column()}}m.lastType=i}if(i=="open"){m.ctx={prev:m.ctx,start:n.column(),indentTo:null}}else{if(i=="close"){m.ctx=m.ctx.prev||m.ctx}}return l},indent:function(n,l){var m=n.ctx.indentTo;return typeof m=="number"?m:n.ctx.start+1},closeBrackets:{pairs:'()[]{}""'},lineComment:";;",blockCommentStart:"#|",blockCommentEnd:"|#"}});a.defineMIME("text/x-common-lisp","commonlisp")});