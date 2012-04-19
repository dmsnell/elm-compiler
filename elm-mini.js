var Guid=function(){var c=0;return{guid:function(){return c+=1}}}(),Value=function(){var c=function(a){if("boolean"===typeof a)return a?"True":"False";if("number"!==typeof a&&a[0]){if("Tuple"===a[0].substring(0,5)){for(var d="",b=a.length;--b;)d=","+c(a[b])+d;","===d[0]&&(d=d.substring(1));return"("+d+")"}if("Cons"===a[0])for(var b="string"===typeof a[1]?'"':"]",e="string"===typeof a[1]?"":",",d=("string"===typeof a[1]?'"':"[")+c(a[1]),a=a[2];;)if("Cons"===a[0])d+=e+c(a[1]),a=a[2];else return d+b;
else{if("Nil"===a[0])return"[]";d="";for(b=a.length;--b;)d=" "+c(a[b])+d;d=a[0]+d;return 1<a.length?"("+d+")":d}}return a+""};return{show:function(a){return Text.monospace(String.properEscape(c(a)))},Tuple:function(){var a=arguments.length,d=Array(a+1);for(d[0]="Tuple"+arguments.length;a--;)d[a+1]=arguments[a];return d},append:function(a,d){if("string"===typeof a&&"string"===typeof d)return a.concat(d);if("Nil"===a[0])return d;for(var b=["Cons",a[1],["Nil"]],c=b,a=a[2];"Cons"===a[0];)c[2]=["Cons",
a[1],["Nil"]],a=a[2],c=c[2];c[2]=d;return b}}}(),String=function(){return{toText:function(c){for(var a=[];"Cons"===c[0];)a.push(c[1]),c=c[2];return String.properEscape(a.join(""))},properEscape:function(c){c.replace('"',"&#34;");c.replace("&","&#38;");c.replace("'","&#39;");c.replace("<","&#60;");c.replace(">","&#62;");return c}}}(),Color=function(){var c=function(a,d,b,c){return{r:Math.round(255*a),g:Math.round(255*d),b:Math.round(255*b),a:c}};return{black:c(0,0,0,1),white:c(1,1,1,1),red:c(1,0,0,
1),green:c(0,1,0,1),blue:c(0,0,1,1),rgba:function(a){return function(d){return function(b){return function(e){return c(a,d,b,e)}}}},rgb:function(a){return function(d){return function(b){return c(a,d,b,1)}}},Internal:{extract:function(a){return 1===a.a?"rgb("+a.r+","+a.g+","+a.b+")":"rgba("+a.r+","+a.g+","+a.b+","+a.a+")"}}}}(),Element=function(){var c=function(b){b=document.createElement(b);b.id=Guid.guid();return b},a=function(b){var a=c("div");a.appendChild(b);return a},d=function(b){return function(a){return function(d){var e=
c("div");e.isElmText=!0;e.innerHTML=d;e.style.textAlign=a;0<b&&(e.style.width=b+"px");e.isElmLeaf=!0;e.style.visibility="hidden";e.style.styleFloat="left";e.style.cssFloat="left";document.body.appendChild(e);d=window.getComputedStyle(e);0>=b&&(e.style.width=d.getPropertyValue("width"));e.style.height=d.getPropertyValue("height");document.body.removeChild(e);e.style.visibility="visible";e.style.styleFloat="none";e.style.cssFloat="none";return e}}},b=d(0)("left"),e=d(0)("justify"),f=d(0)("center"),
g=function(b){return"DIV"===b.tagName?b:a(b)},h=function(b){b.style.styleFloat="left";b.style.cssFloat="left";return b},k=function(b){b.style.position="absolute";return b},i=function(b,a,d){for(var e=c("div"),f=d.length;f--;){var h=a(d[f]);e.appendChild(h)}e.elmFlowDirection=b;return e},j=function(b){return function(a){for(var d=[];"Cons"===a[0];)d.push(a[1]),a=a[2];3<=b&&d.reverse();a=b%3;if(0==a)return i("Y",g,d);if(1==a)return i("X",h,d);if(2==a)return i("Z",k,d)}},l=function(b){return function(a){if("A"===
a.tagName)return l(b)(a.firstChild),a;if(a.hasOwnProperty("isElmText")){var e=d(b)(a.style.textAlign)(a.innerHTML);a.style.height=e.style.height}a.style.width=b+"px";return a}};return{text:b,image:function(b){var a=c("img");a.isElmLeaf=!0;a.onload=function(){""===a.style.width&&0<this.width&&(a.style.width=a.width=this.width+"px");""===a.style.height&&0<this.height&&(a.style.height=a.height=this.height+"px");Dispatcher.adjust()};a.src=String.toText(b);a.name=a.src;return a},video:function(a){var a=
String.toText(a),b=c("video");b.controls="controls";var d=c("source");d.src=a;d.type="video/"+a.substring(a.length-3,a.length);b.appendChild(d);b.isElmLeaf=!0;return b},audio:function(a){var a=String.toString(a),b=c("video");b.controls="controls";var d=c("source");d.src=a;d.type="audio/"+a.substring(a.length-3,a.length);b.appendChild(d);b.isElmLeaf=!0;return b},collage:function(a){return function(b){return function(d){var e=c("canvas");e.style.width=a+"px";e.style.height=b+"px";e.width=a;e.height=
b;if(e.getContext){var f=e.getContext("2d");for(f.clearRect(0,0,e.width,e.height);"Cons"===d[0];)f=d[1](f),d=d[2];return e}e.innerHTML="Your browser does not support the canvas element.";e.isElmLeaf=!0;return e}}},flow:j,layers:j(2),beside:function(a){return function(b){return j(1)(["Cons",a,["Cons",b,["Nil"]]])}},above:function(a){return function(b){return j(0)(["Cons",a,["Cons",b,["Nil"]]])}},below:function(a){return function(b){return j(3)(["Cons",a,["Cons",b,["Nil"]]])}},box:function(a){return function(b){b.style.position=
"absolute";b.style.margin="auto";var d=(a-1)%3,e=(a-1)/3;2>d&&(b.style.left=0);0<d&&(b.style.right=0);2>e&&(b.style.top=0);0<e&&(b.style.bottom=0);d=c("div");d.style.position="relative";d.appendChild(b);return d}},width:l,height:function(a){return function(b){("A"===b.tagName?b.firstChild:b).style.height=a+"px";return b}},size:function(b){return function(a){return function(d){var e="A"===d.tagName?d.firstChild:d;e.style.width=b+"px";e.style.height=a+"px";return d}}},color:function(b){return function(a){a.style.backgroundColor=
Color.Internal.extract(b);return a}},opacity:function(a){return function(b){b.style.opacity=a;return b}},link:function(b){return function(d){var e=c("a");e.href=Text.fromString(b);e.appendChild(d);return a(e)}},asText:function(b){return d(0)("left")(Value.show(b))},plainText:function(b){return d(0)("left")(String.toText(b))},justifiedText:e,centeredText:f,up:0,left:1,inward:2,down:3,right:4,outward:5}}(),Text=function(){var c=function(b){for(var a=[];"Cons"===b[0];)a.push(b[1]),b=b[2];return String.properEscape(a.join(""))},
a=function(b){return function(a){return"<"+b+">"+a+"</"+b+">"}},d=function(b,a){return function(d){return"<span style='"+b+":"+a+"'>"+d+"</span>"}},b=a("h1"),e=d("font-style","italic"),a=a("b"),f=d("text-decoration","underline"),g=d("text-decoration","overline"),h=d("text-decoration","line-through");return{fromString:c,toText:c,header:b,height:function(b){return d("font-size",b+"em")},italic:e,bold:a,underline:f,overline:g,strikeThrough:h,monospace:d("font-family","monospace"),color:function(b){return d("color",
Color.Internal.extract(b))},link:function(b){return function(a){return"<a href='"+c(b)+"'>"+a+"</a>"}}}}(),Shape=function(){var c=function(a,b,e,c){return{center:a,points:b,theta:e,scale:c}},a=function(a){return function(b){return function(e){return function(c){c.save();c.translate(e.center[0],e.center[1]);c.rotate(e.theta);c.scale(e.scale,e.scale);c.beginPath();var g=e.points;c.moveTo(g[0][0],g[0][1]);for(var h=g.length;h--;)c.lineTo(g[h][0],g[h][1]);c.closePath();a?(c.fillStyle=Color.Internal.extract(b),
c.fill()):(c.strokeStyle=Color.Internal.extract(b),c.stroke());c.restore();return c}}}};return{polygon:function(a){return function(b){for(var e=[];"Cons"===a[0];)e.push([a[1][1],a[1][2]]),a=a[2];b=[b[1],b[2]];return c(b,e,0,1)}},ngon:function(a){return function(b){return function(e){for(var f=[],g=a;g--;)f.push([b*Math.cos(2*Math.PI*g/a),b*Math.sin(2*Math.PI*g/a)]);e=[e[1],e[2]];return c(e,f,0,1)}}},rect:function(a){return function(b){return function(e){var f=[[-a/2,-b/2],[a/2,-b/2],[a/2,b/2],[-a/
2,b/2]],e=[e[1],e[2]];return c(e,f,0,1)}}},oval:function(a){return function(b){return function(e){for(var f=[],g=2*Math.PI;0<g;g-=Math.PI/50)f.push([a/2*Math.cos(g),b/2*Math.sin(g)]);e=[e[1],e[2]];return c(e,f,0,1)}}},move:function(a){return function(b){return function(e){return c([a+e.center[0],b+e.center[1]],e.points,e.theta,e.scale)}}},rotate:function(a){return function(b){return c(b.center,b.points,b.theta+2*Math.PI*a,b.scale)}},scale:function(a){return function(b){return c(b.center,b.points,
b.theta,b.scale*a)}},filled:a(!0),outlined:a(!1),customOutline:function(a){return function(b){return function(e){e.points.push(e.points[0]);return Line.customLine(a)(b)(e)}}}}}(),Line=function(){var c=function(a){return function(c){return function(b){if("string"===typeof a[0]){for(var e=[];"Cons"===a[0];)e.push(a[1]),a=a[2];a=e}0===a.length&&(a=[8,4]);return function(e){e.save();e.beginPath();e.translate(b.center[0],b.center[1]);e.rotate(b.theta);e.scale(b.scale,b.scale);var g=a,h=b.points,k=h.length-
1,i=h[k][0],j=h[k][1],l=0,m=0,n=0,o=0,p=0,r=0,t=g.length,s=!0,q=g[0];for(e.moveTo(i,j);k--;){l=h[k][0];m=h[k][1];n=l-i;o=m-j;for(p=Math.sqrt(n*n+o*o);q<=p;)i+=n*q/p,j+=o*q/p,e[s?"lineTo":"moveTo"](i,j),n=l-i,o=m-j,p=Math.sqrt(n*n+o*o),s=!s,r=(r+1)%t,q=g[r];0<p&&(e[s?"lineTo":"moveTo"](l,m),q-=p);i=l;j=m}e.strokeStyle=Color.Internal.extract(c);e.stroke();e.restore();return e}}}};return{line:function(a){for(var c=[];"Cons"===a[0];)c.push([a[1][1],a[1][2]]),a=a[2];return{center:[0,0],points:c,theta:0,
scale:1}},customLine:c,solid:function(a){return function(c){return function(b){b.save();b.beginPath();b.translate(c.center[0],c.center[1]);b.rotate(c.theta);b.scale(c.scale,c.scale);var e=c.points,f=e.length;for(b.moveTo(e[f-1][0],e[f-1][1]);f--;)b.lineTo(e[f][0],e[f][1]);b.strokeStyle=Color.Internal.extract(a);b.stroke();b.restore();return b}}},dashed:c([8,4]),dotted:c([3,3])}}(),Elm=function(){var c=function(a){this.id=Guid.guid();this.value=a;this.step=function(a,b){var c=a===this.id;c&&(this.value=
b);return c}},a=function(a,e){this.id=Guid.guid();this.value=null;e.reverse();this.recalc=function(){for(var c=a,d=e.length;d--;)c=c(e[d].value);this.value=c};this.recalc();this.step=function(a,b){if(this.hasOwnProperty(a))return!1;for(var c=!1,d=e.length;d--;)c=c||e[d].step(a,b);c?this.recalc():this[a]=!0;return c}},d=function(a,c,d){this.id=Guid.guid();this.value=c;this.step=function(c,e){if(this.hasOwnProperty(c))return!1;var k=d.step(c,e);k?this.value=a(d.value)(this.value):this[c]=!0;return k}};
return{Input:function(a){return new c(a)},Lift:function(b,c){return new a(b,c)},Fold:function(a,c,f){return new d(a,c,f)}}}(),Dispatcher=function(){var c=null,a=function(b,c,d){d.style&&c.style&&(d.style.width=c.style.width,d.style.height=c.style.height);if(c.hasOwnProperty("isElmLeaf")&&d.hasOwnProperty("isElmLeaf"))c.id=d.id,c.isEqualNode(d)||b.replaceChild(c,d);else if("CANVAS"===c.nodeName)b.replaceChild(c,d);else{var g=c.childNodes,h=d.childNodes;if(g.length!==h.length)b.replaceChild(c,d);else for(b=
g.length;b--;)a(d,g[b],h[b])}},d=function(a){var c=a.childNodes,f=c.length;if(a.hasOwnProperty("isElmLeaf")){var c=""===a.style.width?0:a.style.width.slice(0,-2)-0,g=""===a.style.height?0:a.style.height.slice(0,-2)-0;return[c,g]}if(1===f){var h=d(c[0]);""!==a.style.width&&(h[0]=a.style.width.slice(0,-2)-0);""!==a.style.height&&(h[1]=a.style.height.slice(0,-2)-0);0!==h[0]&&(a.style.width=h[0]+"px");0!==h[1]&&(a.style.height=h[1]+"px");return h}for(var k=0,i=g=0,j=0,l=!0,m=!0;f--;)h=d(c[f]),k=Math.max(k,
h[0]),g=Math.max(g,h[1]),i+=h[0],j+=h[1],l=l&&0<h[0],m=m&&0<h[1];c=k;f=a.elmFlowDirection;"X"===f&&(c=l?i:0);"Y"===f&&(g=m?j:0);0<c&&(a.style.width=c+"px");0<g&&(a.style.height=g+"px");return[c,g]};return{initialize:function(){c=main();c.hasOwnProperty("step")||(c=Elm.Input(c));var a=document.getElementById("content");a.appendChild(c.value);d(a);a=document.getElementById("widthChecker").offsetWidth;a!==window.innerWidth&&Dispatcher.notify(Window.dimensions.id,Value.Tuple(a,window.innerHeight))},notify:function(b,
e){if(c.step(b,e)){var f=document.getElementById("content");a(f,c.value,f.children[0]);d(f)}},adjust:function(){var a=document.getElementById("content");d(a)}}}(),Signal=function(){var c=function(){return document.addEventListener?function(a,b,c){a.addEventListener(b,c,!1)}:function(a,b,c){a.attachEvent("on"+b,c)}}(),a=function(){function a(b){var c=0,d=0;b||(b=window.event);if(b.pageX||b.pageY)c=b.pageX,d=b.pageY;else if(b.clientX||b.clientY)c=b.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,
d=b.clientY+document.body.scrollTop+document.documentElement.scrollTop;return Value.Tuple(c,d)}var b=Elm.Input(Value.Tuple(0,0)),d=Elm.Input(!1),e=Elm.Input(!1);c(document,"click",function(){Dispatcher.notify(e.id,!0);Dispatcher.notify(e.id,!1)});c(document,"mousedown",function(){Dispatcher.notify(d.id,!0)});c(document,"mouseup",function(){Dispatcher.notify(d.id,!1)});c(document,"mousemove",function(c){Dispatcher.notify(b.id,a(c))});return{position:b,x:Elm.Lift(function(a){return a[1]},[b]),y:Elm.Lift(function(a){return a[2]},
[b]),isClicked:e,isDown:d}}(),d=function(){return{every:function(a){var a=1E3*a,b=Elm.Input(0),c=0;setInterval(function(){c+=a;Dispatcher.notify(b.id,c/1E3)},a);return b},after:function(a){var a=1E3*a,b=Elm.Input(!1);setTimeout(function(){Dispatcher.notify(b.id,!0)},a);return b},before:function(a){var a=1E3*a,b=Elm.Input(!0);setTimeout(function(){Dispatcher.notify(b.id,!1)},a);return b}}}(),b=function(){var a=Elm.Input(Value.Tuple(window.innerWidth,window.innerHeight));c(window,"resize",function(){var b=
document.getElementById("widthChecker").offsetWidth;Dispatcher.notify(a.id,Value.Tuple(b,window.innerHeight))});return{dimensions:a,width:Elm.Lift(function(a){return a[1]},[a]),height:Elm.Lift(function(a){return a[2]},[a])}}(),e=function(){var a=function(a){return function(b){var c=Elm.Input("Requesting Data...");window.XMLHttpRequest?request=new XMLHttpRequest:window.ActiveXObject&&(request=new ActiveXObject("Microsoft.XMLHTTP"));request.onreadystatechange=function(){var a="",a=4===request.readyState?
200===request.status?request.responseText:request.statusText:"Request Failed";Dispatcher.notify(c.id,a)};request.open(a,String.toText(b),!0);request.send(null);return c}};return{get:a("GET"),post:a("POST")}}(),f=function(){return{inRange:function(a){return function(b){return Elm.Input(Math.floor(Math.random()*(b-a+1))+a)}},randomize:function(a){return function(b){return function(c){return Elm.Lift(function(){return Math.floor(Math.random()*(b-a+1))+a},[c])}}}}}(),g=function(){function a(b){for(var c=
["Nil"],d=b.length;d--;)c=["Cons",b[d],c];return c}var b=function(b){b.isElmLeaf=!0;var d=Elm.Input(["Nil"]);c(b,"keyup",function(){Dispatcher.notify(d.id,a(b.value));b.focus()});return Value.Tuple(b,d)},d=function(a){a=document.createElement(a);a.id=Guid.guid();return a},e=function(a){for(var b=d("select"),e=[];"Cons"===a[0];){var f=d("option"),g=Text.toText(a[1][1]);f.value=g;f.innerHTML=g;b.appendChild(f);e.push(a[1][2]);a=a[2]}var h=Elm.Input(e[0]);c(b,"change",function(){Dispatcher.notify(h.id,
e[b.selectedIndex])});return Value.Tuple(b,h)};return{textArea:function(a){return function(c){var e=d("textarea");e.rows=c;e.cols=a;return b(e,"")}},textField:function(a){var c=d("input");c.type="text";return b(c,a)},password:function(a){var c=d("input");c.type="password";return b(c,a)},checkbox:function(a){var b=d("input");b.type="checkbox";b.checked=a;var e=Elm.Input(a);console.log(a,b);c(b,"change",function(){Dispatcher.notify(e.id,b.checked)});return Value.Tuple(b,e)},dropDown:e,stringDropDown:function(a){return e(List.map(function(a){return Value.Tuple(a,
a)})(a))}}}();return{Mouse:a,Time:d,Window:b,HTTP:e,Random:f,Input:g}}(),List=function(){function c(a){return function(b){if("Nil"===b[0])return b;"Cons"!==b[0]&&i();for(var c=["Cons",a(b[1]),["Nil"]],d=c,b=b[2];"Cons"===b[0];)d[2]=["Cons",a(b[1]),["Nil"]],b=b[2],d=d[2];return c}}function a(a){return function(b){return function(c){var d=b;if("Nil"===c[0])return d;for("Cons"!==c[0]&&i();"Cons"===c[0];)d=a(c[1])(d),c=c[2];return d}}}function d(a){return function(b){return function(c){var d=b;if("Nil"===
c[0])return d;"Cons"!==c[0]&&i();for(var e=[];"Cons"===c[0];)e.push(c[1]),c=c[2];for(c=e.length;c--;)d=a(e[c])(d);return d}}}function b(b){return function(c){var d;"Cons"!==c[0]?d=void 0:(d=c[1],c=c[2],d=a(b)(d)(c));return d}}function e(a){return function(b){return function(c){if("Nil"===c[0])return["Cons",b,["Nil"]];"Cons"!==c[0]&&i();for(var d=[b];"Cons"===c[0];)b=a(c[1])(b),d.push(b),c=c[2];for(var c=["Nil"],e=d.length;e--;)c=["Cons",d[e],c];return c}}}function f(a){return function(b){return function(){for(var c=
[function(a){return"Nil"!==a[0]?void 0:["Tuple2",["Nil"],["Nil"]]},function(b){if("Cons"===b[0]){var c=b[1],b=b[2];var d=f(a)(b);"Tuple2"!==d[0]?c=void 0:(b=d[1],d=d[2],c=a(c)?["Tuple2",["Cons",c,b],d]:["Tuple2",b,["Cons",c,d]]);return c}}],d=c.length;d--;){var e=c[d](b);if(void 0!==e)return e}}()}}function g(a){return function(){for(var b=[function(a){return"Nil"!==a[0]?void 0:["Tuple2",["Nil"],["Nil"]]},function(a){if("Cons"!==a[0])a=void 0;else if(a=["Tuple2",a[1],g(a[2])],"Tuple2"!==a[0]||"Tuple2"!==
a[1][0])a=void 0;else var b=a[1][1],c=a[1][2],a="Tuple2"!==a[2][0]?void 0:["Tuple2",["Cons",b,a[2][1]],["Cons",c,a[2][2]]];return a}],c=b.length;c--;){var d=b[c](a);if(void 0!==d)return d}}()}function h(a){return function(b){return function(){for(var c=[function(a){return"Nil"!==a[0]?void 0:["Nil"]},function(a){if("Cons"===a[0]){var b=a[1];return"Nil"!==a[2][0]?void 0:["Cons",b,["Nil"]]}},function(b){if("Cons"===b[0]){var c=b[1];if("Cons"===b[2][0]){var d=b[2][1],b=b[2][2];return["Cons",c,["Cons",
a,h(a)(["Cons",d,b])]]}}}],d=c.length;d--;){var e=c[d](b);if(void 0!==e)return e}}()}}function k(a){return function(b){return function(){for(var c=[function(a){return"Nil"!==a[0]?void 0:["Nil"]},function(a){if("Cons"===a[0]){var b=a[1];return"Nil"!==a[2][0]?void 0:b}},function(b){if("Cons"===b[0]){var c=b[1];if("Cons"===b[2][0]){var d=b[2][1],b=b[2][2];return Value.append(c,Value.append(a,k(a)(["Cons",d,b])))}}}],d=c.length;d--;){var e=c[d](b);if(void 0!==e)return e}}()}}var i=function(){throw"Function expecting a list!";
},j=a(function(a){return function(b){return["Cons",a,b]}})(["Nil"]),l=d(function(a){return function(b){return Value.append(a,b)}})(["Nil"]),m=a(function(a){return function(b){return a&&b}})(!0),n=a(function(a){return function(b){return a||b}})(!1),o=a(function(a){return function(b){return a+b}})(0),p=a(function(a){return function(b){return a*b}})(1),r=b(function(a){return function(b){return Math.max(a,b)}}),t=b(function(a){return function(b){return Math.min(a,b)}});return{head:function(a){if("Cons"!==
a[0])throw"Error: 'head' only accepts lists of length greater than one.";return a[1]},tail:function(a){if("Cons"!==a[0])throw"Error: 'tail' only accepts lists of length greater than one.";return a[2]},map:c,foldl:a,foldr:d,foldl1:b,foldr1:function(a){return function(b){var c;"Cons"!==b[0]?c=void 0:(c=b[1],b=b[2],c=d(a)(c)(b));return c}},scanl:e,scanl1:function(a){return function(b){if("Cons"!==b[0])throw"Error: 'scanl1' requires a list of at least length 1.";return e(a)(b[1])(b[2])}},filter:function(a){return function(b){if("Nil"===
b[0])return b;"Cons"!==b[0]&&i();for(var c=[];"Cons"===b[0];)a(b[1])&&c.push(b[1]),b=b[2];for(var b=["Nil"],d=c.length;d--;)b=["Cons",c[d],b];return b}},length:function(a){for(var b=0;"Cons"===a[0];)b+=1,a=a[2];return b},reverse:j,concat:l,concatMap:function(a){return function(b){return l(c(a)(b))}},and:m,or:n,forall:function(b){return a(function(a){return function(c){return c&&b(a)}})(!0)},exists:function(b){return a(function(a){return function(c){return c||b(a)}})(!1)},sum:o,product:p,maximum:r,
minimum:t,partition:f,zipWith:function(a){return function(b){return function(c){if("Nil"===b[0]||"Nil"===c[0])return b;("Cons"!==b[0]||"Cons"!==c[0])&&i();for(var d=[];"Cons"===b[0]&&"Cons"===c[0];)d.push(a(b[1])(c[1])),b=b[2],c=c[2];for(var c=["Nil"],e=d.length;e--;)c=["Cons",d[e],c];return c}}},zip:function(a){return function(b){if("Nil"===a[0]||"Nil"===b[0])return a;("Cons"!==a[0]||"Cons"!==b[0])&&i();for(var c=[];"Cons"===a[0]&&"Cons"===b[0];)c.push(["Tuple2",a[1],b[1]]),a=a[2],b=b[2];for(var b=
["Nil"],d=c.length;d--;)b=["Cons",c[d],b];return b}},unzip:g,intersperse:h,intercalate:k,sort:function(a){if("Nil"===a[0])return a;"Cons"!==a[0]&&i();for(var b=[];"Cons"===a[0];)b.push(a[1]),a=a[2];b.sort(function(a,b){return a-b});for(var a=["Nil"],c=b.length;c--;)a=["Cons",b[c],a];return a}}}(),id=function(c){return c},not=function(c){return!c},sqrt=function(c){return Math.sqrt(c)},mod=function(c){return function(a){return c%a}},abs=function(c){return Math.abs(c)},logBase=function(c){return function(a){return Math.log(a)/
Math.log(c)}},min=function(c){return function(a){return Math.min(c,a)}},max=function(c){return function(a){return Math.max(c,a)}},clamp=function(c){return function(a){return function(d){return Math.min(a,Math.max(c,d))}}},sin=Math.sin,cos=Math.cos,tan=Math.tan,asin=Math.asin,acos=Math.acos,atan=Math.atan,flip=function(c){return function(a){return function(d){return c(d)(a)}}};function constant(c){return Elm.Input(c)}function lift(c){return function(a){return Elm.Lift(c,[a])}}
function lift2(c){return function(a){return function(d){return Elm.Lift(c,[a,d])}}}function lift3(c){return function(a){return function(d){return function(b){return Elm.Lift(c,[a,d,b])}}}}function lift4(c){return function(a){return function(d){return function(b){return function(e){return Elm.Lift(c,[a,d,b,e])}}}}}function foldp(c){return function(a){return function(d){return Elm.Fold(c,a,d)}}}var includeGlobal=this;
(function(){var c=function(a){for(var b in a)if("Internal"!==b)try{includeGlobal[b]=a[b]}catch(c){"length"===b&&(includeGlobal.execScript("var length;"),length=a[b])}},a=function(a){return function(b){includeGlobal[a]=includeGlobal[a]||{};for(var c in b)"Internal"!==c&&(includeGlobal[a][c]=b[c])}};c(Element);c(Text);color=Element.color;height=Element.height;show=Value.show;a("Time")(Signal.Time);a("Mouse")(Signal.Mouse);a("Window")(Signal.Window);a("HTTP")(Signal.HTTP);a("Input")(Signal.Input);a("Random")(Signal.Random);
c(Color);c(Shape);c(Line)})();