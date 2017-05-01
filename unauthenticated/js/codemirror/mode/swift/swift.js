(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)}else{a(CodeMirror)}}})(function(s){function n(y){var z={};for(var x=0;x<y.length;x++){z[y[x]]=true}return z}var l=n(["_","var","let","class","enum","extension","import","protocol","struct","func","typealias","associatedtype","open","public","internal","fileprivate","private","deinit","init","new","override","self","subscript","super","convenience","dynamic","final","indirect","lazy","required","static","unowned","unowned(safe)","unowned(unsafe)","weak","as","is","break","case","continue","default","else","fallthrough","for","guard","if","in","repeat","switch","where","while","defer","return","inout","mutating","nonmutating","catch","do","rethrows","throw","throws","try","didSet","get","set","willSet","assignment","associativity","infix","left","none","operator","postfix","precedence","precedencegroup","prefix","right","Any","AnyObject","Type","dynamicType","Self","Protocol","__COLUMN__","__FILE__","__FUNCTION__","__LINE__"]);var i=n(["var","let","class","enum","extension","import","protocol","struct","func","typealias","associatedtype","for"]);var g=n(["true","false","nil","self","super","_"]);var m=n(["Array","Bool","Character","Dictionary","Double","Float","Int","Int8","Int16","Int32","Int64","Never","Optional","Set","String","UInt8","UInt16","UInt32","UInt64","Void"]);var r="+-/*%=|&<>~^?!";var t=":;,.(){}[]";var a=/^\-?0b[01][01_]*/;var d=/^\-?0o[0-7][0-7_]*/;var c=/^\-?0x[\dA-Fa-f][\dA-Fa-f_]*(?:(?:\.[\dA-Fa-f][\dA-Fa-f_]*)?[Pp]\-?\d[\d_]*)?/;var f=/^\-?\d[\d_]*(?:\.\d[\d_]*)?(?:[Ee]\-?\d[\d_]*)?/;var e=/^\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1/;var j=/^\.(?:\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1)/;var v=/^\#[A-Za-z]+/;var o=/^@(?:\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1)/;function w(C,A,y){if(C.sol()){A.indented=C.indentation()}if(C.eatSpace()){return null}var x=C.peek();if(x=="/"){if(C.match("//")){C.skipToEnd();return"comment"}if(C.match("/*")){A.tokenize.push(p);return p(C,A)}}if(C.match(v)){return"builtin"}if(C.match(o)){return"attribute"}if(C.match(a)){return"number"}if(C.match(d)){return"number"}if(C.match(c)){return"number"}if(C.match(f)){return"number"}if(C.match(j)){return"property"}if(r.indexOf(x)>-1){C.next();return"operator"}if(t.indexOf(x)>-1){C.next();C.match("..");return"punctuation"}if(x=='"'||x=="'"){C.next();var B=k(x);A.tokenize.push(B);return B(C,A)}if(C.match(e)){var z=C.current();if(m.hasOwnProperty(z)){return"variable-2"}if(g.hasOwnProperty(z)){return"atom"}if(l.hasOwnProperty(z)){if(i.hasOwnProperty(z)){A.prev="define"}return"keyword"}if(y=="define"){return"def"}return"variable"}C.next();return null}function b(){var x=0;return function(B,A,z){var y=w(B,A,z);if(y=="punctuation"){if(B.current()=="("){++x}else{if(B.current()==")"){if(x==0){B.backUp(1);A.tokenize.pop();return A.tokenize[A.tokenize.length-1](B,A)}else{--x}}}}return y}}function k(x){return function(B,z){var y,A=false;while(y=B.next()){if(A){if(y=="("){z.tokenize.push(b());return"string"}A=false}else{if(y==x){break}else{A=y=="\\"}}}z.tokenize.pop();return"string"}}function p(y,x){y.match(/^(?:[^*]|\*(?!\/))*/);if(y.match("*/")){x.tokenize.pop()}return"comment"}function q(x,z,y){this.prev=x;this.align=z;this.indented=y}function h(x,y){var z=y.match(/^\s*($|\/[\/\*])/,false)?null:y.column()+1;x.context=new q(x.context,z,x.indented)}function u(x){if(x.context){x.indented=x.context.indented;x.context=x.context.prev}}s.defineMode("swift",function(x){return{startState:function(){return{prev:null,context:null,indented:0,tokenize:[]}},token:function(D,A){var z=A.prev;A.prev=null;var C=A.tokenize[A.tokenize.length-1]||w;var y=C(D,A,z);if(!y||y=="comment"){A.prev=z}else{if(!A.prev){A.prev=y}}if(y=="punctuation"){var B=/[\(\[\{]|([\]\)\}])/.exec(D.current());if(B){(B[1]?u:h)(A,D)}}return y},indent:function(B,z){var y=B.context;if(!y){return 0}var A=/^[\]\}\)]/.test(z);if(y.align!=null){return y.align-(A?1:0)}return y.indented+(A?0:x.indentUnit)},electricInput:/^\s*[\)\}\]]$/,lineComment:"//",blockCommentStart:"/*",blockCommentEnd:"*/",fold:"brace",closeBrackets:"()[]{}''\"\"``"}});s.defineMIME("text/x-swift","swift")});