(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed"),require("../ruby/ruby"))}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror","../htmlmixed/htmlmixed","../ruby/ruby"],a)}else{a(CodeMirror)}}})(function(a){a.defineMode("slim",function(M){var g=a.getMode(M,{name:"htmlmixed"});var Q=a.getMode(M,"ruby");var Y={html:g,ruby:Q};var E={ruby:"ruby",javascript:"javascript",css:"text/css",sass:"text/x-sass",scss:"text/x-scss",less:"text/x-less",styl:"text/x-styl",coffee:"coffeescript",asciidoc:"text/x-asciidoc",markdown:"text/x-markdown",textile:"text/x-textile",creole:"text/x-creole",wiki:"text/x-wiki",mediawiki:"text/x-mediawiki",rdoc:"text/x-rdoc",builder:"text/x-builder",nokogiri:"text/x-nokogiri",erb:"application/x-erb"};var v=function(ad){var ab=[];for(var ac in ad){ab.push(ac)}return new RegExp("^("+ab.join("|")+"):")}(E);var T={commentLine:"comment",slimSwitch:"operator special",slimTag:"tag",slimId:"attribute def",slimClass:"attribute qualifier",slimAttribute:"attribute",slimSubmode:"keyword special",closeAttributeTag:null,slimDoctype:null,lineContinuation:null};var L={"{":"}","[":"]","(":")"};var r="_a-zA-Z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD";var c=r+"\\-0-9\xB7\u0300-\u036F\u203F-\u2040";var S=new RegExp("^[:"+r+"](?::["+c+"]|["+c+"]*)");var q=new RegExp("^[:"+r+"][:\\."+c+"]*(?=\\s*=)");var j=new RegExp("^[:"+r+"][:\\."+c+"]*");var P=/^\.-?[_a-zA-Z]+[\w\-]*/;var N=/^#[_a-zA-Z]+[\w\-]*/;function U(ae,ad,ac){var ab=function(ag,af){af.tokenize=ad;if(ag.pos<ae){ag.pos=ae;return ac}return af.tokenize(ag,af)};return function(ag,af){af.tokenize=ab;return ad(ag,af)}}function I(ah,ae,ac,ag,ad){var af=ah.current();var ab=af.search(ac);if(ab>-1){ae.tokenize=U(ah.pos,ae.tokenize,ad);ah.backUp(af.length-ab-ag)}return ad}function t(ac,ab){ac.stack={parent:ac.stack,style:"continuation",indented:ab,tokenize:ac.line};ac.line=ac.tokenize}function X(ab){if(ab.line==ab.tokenize){ab.line=ab.stack.tokenize;ab.stack=ab.stack.parent}}function G(ab,ac){return function(af,ae){X(ae);if(af.match(/^\\$/)){t(ae,ab);return"lineContinuation"}var ad=ac(af,ae);if(af.eol()&&af.current().match(/(?:^|[^\\])(?:\\\\)*\\$/)){af.backUp(1)}return ad}}function H(ab,ac){return function(af,ae){X(ae);var ad=ac(af,ae);if(af.eol()&&af.current().match(/,$/)){t(ae,ab)}return ad}}function s(ab,ac){return function(af,ae){var ad=af.peek();if(ad==ab&&ae.rubyState.tokenize.length==1){af.next();ae.tokenize=ac;return"closeAttributeTag"}else{return aa(af,ae)}}}function V(ad){var ab;var ac=function(af,ae){if(ae.rubyState.tokenize.length==1&&!ae.rubyState.context.prev){af.backUp(1);if(af.eatSpace()){ae.rubyState=ab;ae.tokenize=ad;return ad(af,ae)}af.next()}return aa(af,ae)};return function(af,ae){ab=ae.rubyState;ae.rubyState=a.startState(Q);ae.tokenize=ac;return aa(af,ae)}}function aa(ac,ab){return Q.token(ac,ab.rubyState)}function k(ac,ab){if(ac.match(/^\\$/)){return"lineContinuation"}return B(ac,ab)}function B(ac,ab){if(ac.match(/^#\{/)){ab.tokenize=s("}",ab.tokenize);return null}return I(ac,ab,/[^\\]#\{/,1,g.token(ac,ab.htmlState))}function o(ab){return function(ae,ad){var ac=k(ae,ad);if(ae.eol()){ad.tokenize=ab}return ac}}function l(ad,ab,ac){ab.stack={parent:ab.stack,style:"html",indented:ad.column()+ac,tokenize:ab.line};ab.line=ab.tokenize=B;return null}function J(ac,ab){ac.skipToEnd();return ab.stack.style}function D(ac,ab){ab.stack={parent:ab.stack,style:"comment",indented:ab.indented+1,tokenize:ab.line};ab.line=J;return J(ac,ab)}function b(ac,ab){if(ac.eat(ab.stack.endQuote)){ab.line=ab.stack.line;ab.tokenize=ab.stack.tokenize;ab.stack=ab.stack.parent;return null}if(ac.match(j)){ab.tokenize=C;return"slimAttribute"}ac.next();return null}function C(ac,ab){if(ac.match(/^==?/)){ab.tokenize=f;return null}return b(ac,ab)}function f(ad,ac){var ab=ad.peek();if(ab=='"'||ab=="'"){ac.tokenize=w(ab,"string",true,false,b);ad.next();return ac.tokenize(ad,ac)}if(ab=="["){return V(b)(ad,ac)}if(ad.match(/^(true|false|nil)\b/)){ac.tokenize=b;return"keyword"}return V(b)(ad,ac)}function R(ac,ab,ad){ac.stack={parent:ac.stack,style:"wrapper",indented:ac.indented+1,tokenize:ad,line:ac.line,endQuote:ab};ac.line=ac.tokenize=b;return null}function x(ae,ad){if(ae.match(/^#\{/)){ad.tokenize=s("}",ad.tokenize);return null}var ac=new a.StringStream(ae.string.slice(ad.stack.indented),ae.tabSize);ac.pos=ae.pos-ad.stack.indented;ac.start=ae.start-ad.stack.indented;ac.lastColumnPos=ae.lastColumnPos-ad.stack.indented;ac.lastColumnValue=ae.lastColumnValue-ad.stack.indented;var ab=ad.subMode.token(ac,ad.subState);ae.pos=ac.pos+ad.stack.indented;return ab}function u(ac,ab){ab.stack.indented=ac.column();ab.line=ab.tokenize=x;return ab.tokenize(ac,ab)}function A(ae){var ad=E[ae];var ac=a.mimeModes[ad];if(ac){return a.getMode(M,ac)}var ab=a.modes[ad];if(ab){return ab(M,{name:ad})}return a.getMode(M,"null")}function K(ab){if(!Y.hasOwnProperty(ab)){return Y[ab]=A(ab)}return Y[ab]}function n(ae,ad){var ab=K(ae);var ac=a.startState(ab);ad.subMode=ab;ad.subState=ac;ad.stack={parent:ad.stack,style:"sub",indented:ad.indented+1,tokenize:ad.line};ad.line=ad.tokenize=u;return"slimSubmode"}function z(ac,ab){ac.skipToEnd();return"slimDoctype"}function y(ae,ad){var ac=ae.peek();if(ac=="<"){return(ad.tokenize=o(ad.tokenize))(ae,ad)}if(ae.match(/^[|']/)){return l(ae,ad,1)}if(ae.match(/^\/(!|\[\w+])?/)){return D(ae,ad)}if(ae.match(/^(-|==?[<>]?)/)){ad.tokenize=G(ae.column(),H(ae.column(),aa));return"slimSwitch"}if(ae.match(/^doctype\b/)){ad.tokenize=z;return"keyword"}var ab=ae.match(v);if(ab){return n(ab[1],ad)}return F(ae,ad)}function p(ac,ab){if(ab.startOfLine){return y(ac,ab)}return F(ac,ab)}function F(ac,ab){if(ac.eat("*")){ab.tokenize=V(m);return null}if(ac.match(S)){ab.tokenize=m;return"slimTag"}return W(ac,ab)}function m(ac,ab){if(ac.match(/^(<>?|><?)/)){ab.tokenize=W;return null}return W(ac,ab)}function W(ac,ab){if(ac.match(N)){ab.tokenize=W;return"slimId"}if(ac.match(P)){ab.tokenize=W;return"slimClass"}return i(ac,ab)}function i(ac,ab){if(ac.match(/^([\[\{\(])/)){return R(ab,L[RegExp.$1],i)}if(ac.match(q)){ab.tokenize=Z;return"slimAttribute"}if(ac.peek()=="*"){ac.next();ab.tokenize=V(d);return null}return d(ac,ab)}function Z(ac,ab){if(ac.match(/^==?/)){ab.tokenize=O;return null}return i(ac,ab)}function O(ad,ac){var ab=ad.peek();if(ab=='"'||ab=="'"){ac.tokenize=w(ab,"string",true,false,i);ad.next();return ac.tokenize(ad,ac)}if(ab=="["){return V(i)(ad,ac)}if(ab==":"){return V(e)(ad,ac)}if(ad.match(/^(true|false|nil)\b/)){ac.tokenize=i;return"keyword"}return V(i)(ad,ac)}function e(ac,ab){ac.backUp(1);if(ac.match(/^[^\s],(?=:)/)){ab.tokenize=V(e);return null}ac.next();return i(ac,ab)}function w(ab,ad,af,ae,ac){return function(ak,ai){X(ai);var ag=ak.current().length==0;if(ak.match(/^\\$/,ag)){if(!ag){return ad}t(ai,ai.indented);return"lineContinuation"}if(ak.match(/^#\{/,ag)){if(!ag){return ad}ai.tokenize=s("}",ai.tokenize);return null}var aj=false,ah;while((ah=ak.next())!=null){if(ah==ab&&(ae||!aj)){ai.tokenize=ac;break}if(af&&ah=="#"&&!aj){if(ak.eat("{")){ak.backUp(2);break}}aj=!aj&&ah=="\\"}if(ak.eol()&&aj){ak.backUp(1)}return ad}}function d(ac,ab){if(ac.match(/^==?/)){ab.tokenize=aa;return"slimSwitch"}if(ac.match(/^\/$/)){ab.tokenize=p;return null}if(ac.match(/^:/)){ab.tokenize=F;return"slimSwitch"}l(ac,ab,0);return ab.tokenize(ac,ab)}var h={startState:function(){var ab=a.startState(g);var ac=a.startState(Q);return{htmlState:ab,rubyState:ac,stack:null,last:null,tokenize:p,line:p,indented:0}},copyState:function(ab){return{htmlState:a.copyState(g,ab.htmlState),rubyState:a.copyState(Q,ab.rubyState),subMode:ab.subMode,subState:ab.subMode&&a.copyState(ab.subMode,ab.subState),stack:ab.stack,last:ab.last,tokenize:ab.tokenize,line:ab.line}},token:function(ad,ac){if(ad.sol()){ac.indented=ad.indentation();ac.startOfLine=true;ac.tokenize=ac.line;while(ac.stack&&ac.stack.indented>ac.indented&&ac.last!="slimSubmode"){ac.line=ac.tokenize=ac.stack.tokenize;ac.stack=ac.stack.parent;ac.subMode=null;ac.subState=null}}if(ad.eatSpace()){return null}var ab=ac.tokenize(ad,ac);ac.startOfLine=false;if(ab){ac.last=ab}return T.hasOwnProperty(ab)?T[ab]:ab},blankLine:function(ab){if(ab.subMode&&ab.subMode.blankLine){return ab.subMode.blankLine(ab.subState)}},innerMode:function(ab){if(ab.subMode){return{state:ab.subState,mode:ab.subMode}}return{state:ab,mode:h}}};return h},"htmlmixed","ruby");a.defineMIME("text/x-slim","slim");a.defineMIME("application/x-slim","slim")});