(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("ebnf",function(c){var b={slash:0,parenthesis:1};var e={comment:0,_string:1,characterClass:2};var d=null;if(c.bracesMode){d=a.getMode(c,c.bracesMode)}return{startState:function(){return{stringType:null,commentType:null,braced:0,lhs:true,localState:null,stack:[],inDefinition:false}},token:function(l,j){if(!l){return}if(j.stack.length===0){if((l.peek()=='"')||(l.peek()=="'")){j.stringType=l.peek();l.next();j.stack.unshift(e._string)}else{if(l.match(/^\/\*/)){j.stack.unshift(e.comment);j.commentType=b.slash}else{if(l.match(/^\(\*/)){j.stack.unshift(e.comment);j.commentType=b.parenthesis}}}}switch(j.stack[0]){case e._string:while(j.stack[0]===e._string&&!l.eol()){if(l.peek()===j.stringType){l.next();j.stack.shift()}else{if(l.peek()==="\\"){l.next();l.next()}else{l.match(/^.[^\\\"\']*/)}}}return j.lhs?"property string":"string";case e.comment:while(j.stack[0]===e.comment&&!l.eol()){if(j.commentType===b.slash&&l.match(/\*\//)){j.stack.shift();j.commentType=null}else{if(j.commentType===b.parenthesis&&l.match(/\*\)/)){j.stack.shift();j.commentType=null}else{l.match(/^.[^\*]*/)}}}return"comment";case e.characterClass:while(j.stack[0]===e.characterClass&&!l.eol()){if(!(l.match(/^[^\]\\]+/)||l.match(/^\\./))){j.stack.shift()}}return"operator"}var f=l.peek();if(d!==null&&(j.braced||f==="{")){if(j.localState===null){j.localState=a.startState(d)}var h=d.token(l,j.localState),k=l.current();if(!h){for(var g=0;g<k.length;g++){if(k[g]==="{"){if(j.braced===0){h="matchingbracket"}j.braced++}else{if(k[g]==="}"){j.braced--;if(j.braced===0){h="matchingbracket"}}}}}return h}switch(f){case"[":l.next();j.stack.unshift(e.characterClass);return"bracket";case":":case"|":case";":l.next();return"operator";case"%":if(l.match("%%")){return"header"}else{if(l.match(/[%][A-Za-z]+/)){return"keyword"}else{if(l.match(/[%][}]/)){return"matchingbracket"}}}break;case"/":if(l.match(/[\/][A-Za-z]+/)){return"keyword"}case"\\":if(l.match(/[\][a-z]+/)){return"string-2"}case".":if(l.match(".")){return"atom"}case"*":case"-":case"+":case"^":if(l.match(f)){return"atom"}case"$":if(l.match("$$")){return"builtin"}else{if(l.match(/[$][0-9]+/)){return"variable-3"}}case"<":if(l.match(/<<[a-zA-Z_]+>>/)){return"builtin"}}if(l.match(/^\/\//)){l.skipToEnd();return"comment"}else{if(l.match(/return/)){return"operator"}else{if(l.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)){if(l.match(/(?=[\(.])/)){return"variable"}else{if(l.match(/(?=[\s\n]*[:=])/)){return"def"}}return"variable-2"}else{if(["[","]","(",")"].indexOf(l.peek())!=-1){l.next();return"bracket"}else{if(!l.eatSpace()){l.next()}}}}}return null}}});a.defineMIME("text/x-ebnf","ebnf")});