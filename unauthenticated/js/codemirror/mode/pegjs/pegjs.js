!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../javascript/javascript")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../javascript/javascript"],e):e(CodeMirror)}(function(e){"use strict";e.defineMode("pegjs",function(t){var r=e.getMode(t,"javascript");return{startState:function(){return{inString:!1,stringType:null,inComment:!1,inCharacterClass:!1,braced:0,lhs:!0,localState:null}},token:function(t,n){if(n.inString||n.inComment||'"'!=t.peek()&&"'"!=t.peek()||(n.stringType=t.peek(),t.next(),n.inString=!0),n.inString||n.inComment||!t.match("/*")||(n.inComment=!0),n.inString){for(;n.inString&&!t.eol();)t.peek()===n.stringType?(t.next(),n.inString=!1):"\\"===t.peek()?(t.next(),t.next()):t.match(/^.[^\\\"\']*/);return n.lhs?"property string":"string"}if(n.inComment){for(;n.inComment&&!t.eol();)t.match("*/")?n.inComment=!1:t.match(/^.[^\*]*/);return"comment"}if(n.inCharacterClass)for(;n.inCharacterClass&&!t.eol();)t.match(/^[^\]\\]+/)||t.match(/^\\./)||(n.inCharacterClass=!1);else{if("["===t.peek())return t.next(),n.inCharacterClass=!0,"bracket";if(t.match("//"))return t.skipToEnd(),"comment";if(n.braced||"{"===t.peek()){null===n.localState&&(n.localState=e.startState(r));var i=r.token(t,n.localState),a=t.current();if(!i)for(var o=0;o<a.length;o++)"{"===a[o]?n.braced++:"}"===a[o]&&n.braced--;return i}if(t.match(/^[a-zA-Z_][a-zA-Z0-9_]*/))return":"===t.peek()?"variable":"variable-2";if(-1!=["[","]","(",")"].indexOf(t.peek()))return t.next(),"bracket";t.eatSpace()||t.next()}return null}}},"javascript")});