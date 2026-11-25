/* ===== LÓGICA ===== */
var $=function(s){return document.querySelector(s)};
var fm=function(n){return "$"+n.toLocaleString("es-AR")};
var cart=[];try{cart=JSON.parse(localStorage.getItem("cart")||"[]")}catch(e){}
function save(){try{localStorage.setItem("cart",JSON.stringify(cart))}catch(e){}}
function photo(o){return '<div class="ph"><span>'+o.e+'</span>'+(o.f?'<img loading="lazy" alt="'+o.n+'" src="'+o.f+'" onerror="this.remove()">':'')+'</div>'}
function card(o,tipo){
 var h='<div class="card rv" data-id="'+o.id+'" data-s="'+(o.n+' '+(o.d||'')+' '+(o.i||[]).join(' ')).toLowerCase()+'">'+photo(o)+'<div class="cb"><h3>'+o.n+'</h3>';
 if(tipo=="p")h+='<ul>'+o.i.map(function(t){return"<li>"+t+"</li>"}).join("")+'</ul>'+(o.d?'<p>'+o.d+'</p>':'');else h+='<p>'+o.d+'</p>';
 h+=o.p?'<div class="pr">'+fm(o.p)+'</div>':'<div class="pr c">'+CFG.sinPrecio+'</div>';
 if(o.v)h+='<select aria-label="Variante">'+o.v.map(function(v){return"<option>"+v+"</option>"}).join("")+'</select>';
 h+='<input placeholder="Nota (ej. sin cebolla)" aria-label="Nota"><div class="cq q"><button data-c="-1" aria-label="Menos">−</button><b class="cn">1</b><button data-c="1" aria-label="Más">+</button></div><button class="btn" data-add="'+o.id+'">Agregar al pedido</button></div></div>';return h}
var ALL={};PROMOS.forEach(function(o){ALL[o.id]=o;o.t="Promoción"});
$("#gp").innerHTML=PROMOS.map(function(o){return card(o,"p")}).join("");
$("#gc").innerHTML=CARTA.map(function(g,k){g.x.forEach(function(o){o.e=g.e;ALL[o.id]=o;o.t=g.c});return '<div class="cat" id="cat'+k+'"><h2>'+g.c+'</h2><div class="grid">'+g.x.map(function(o){return card(o,"c")}).join("")+'</div></div>'}).join("");
$("#chips").innerHTML=CARTA.map(function(g,k){return '<a href="#carta" data-go="cat'+k+'">'+g.c+'</a>'}).join("");
$("#telTxt").textContent=CFG.telTexto;
document.addEventListener("click",function(e){
 var a=e.target.closest("[data-add]");
 if(a){var box=a.closest(".card"),o=ALL[a.dataset.add],s=box.querySelector("select"),n=box.querySelector("input").value.trim(),v=s?s.value:"";
  var f=cart.find(function(l){return l.id==o.id&&l.v==v&&l.n==n});
  var k=+box.querySelector(".cn").textContent;if(f)f.q+=k;else cart.push({id:o.id,v:v,n:n,q:k});box.querySelector(".cn").textContent=1;toast("✓ "+o.n+" agregado");
  save();render();a.textContent="✓ Agregado";setTimeout(function(){a.textContent="Agregar al pedido"},900);box.querySelector("input").value="";return}
 var cb=e.target.closest("[data-c]");if(cb){var cn=cb.parentNode.querySelector(".cn");cn.textContent=Math.max(1,+cn.textContent+ +cb.dataset.c);return}
 var g=e.target.closest("[data-go]");
 if(g){setTimeout(function(){var t=document.getElementById(g.dataset.go);t&&t.scrollIntoView({behavior:"smooth"})},30)}
 var m=e.target.closest("[data-q]");
 if(m){var p=m.dataset.q.split(":"),l=cart[+p[0]];l.q+=+p[1];if(l.q<1)cart.splice(+p[0],1);save();render()}
 if(e.target.id=="send")send();
 if(e.target.id=="clr"){cart=[];save();render()}
});
function totals(){var t=0,c=0,q=0;cart.forEach(function(l){var o=ALL[l.id];q+=l.q;if(o.p)t+=o.p*l.q;else c++});return{t:t,c:c,q:q}}
function render(){
 var T=totals();$("#cnt").textContent=T.q;bar(T);
 if(!cart.length){$("#cart").innerHTML='<p class="sub">Tu pedido está vacío.</p><div class="row"><a class="btn" href="#promociones">Ver promociones</a><a class="btn o" href="#carta">Nuestra carta</a></div>';return}
 var h=cart.map(function(l,i){var o=ALL[l.id];return '<div class="ci"><div><span class="tag">'+o.t+'</span> <b>'+o.n+'</b>'+(l.v?'<small>'+l.v+'</small>':'')+(l.n?'<small>Nota: '+l.n.replace(/</g,"&lt;")+'</small>':'')+'<small>'+(o.p?fm(o.p)+' c/u':CFG.sinPrecio)+'</small></div><div class="q"><button data-q="'+i+':-1" aria-label="Menos">−</button><b>'+l.q+'</b><button data-q="'+i+':1" aria-label="Más">+</button></div></div>'}).join("");
 h+='<div class="tot"><span>Total</span><span>'+fm(T.t)+'</span></div>';
 if(T.c)h+='<p class="note">+ '+T.c+' ítem(s) con precio a consultar, no incluidos en el total.</p>';
 h+='<label class="note">Tu nombre</label><input id="nom" autocomplete="name"><label class="note">Dirección de entrega o “retiro en local”</label><input id="dir"><div class="row"><button class="btn" id="send">Enviar pedido por WhatsApp</button><button class="btn o" id="clr">Vaciar</button></div>';
 $("#cart").innerHTML=h}
function send(){
 var T=totals(),L=["*Nuevo pedido*"];
 cart.forEach(function(l){var o=ALL[l.id];L.push("• "+l.q+" x "+o.n+" ("+o.t+")"+(l.v?" – "+l.v:"")+(l.n?" – Nota: "+l.n:"")+" – "+(o.p?fm(o.p*l.q):CFG.sinPrecio))});
 L.push("*Total: "+fm(T.t)+"*"+(T.c?" (+ "+T.c+" ítem(s) a consultar)":""));
 var nm=$("#nom").value,dr=$("#dir").value;if(nm)L.push("Nombre: "+nm);if(dr)L.push("Entrega: "+dr);
 var txt=L.join("\n");
 deliver(txt,"Tu pedido")}
function route(){var v=(location.hash||"#inicio").slice(1);if(!document.getElementById("v-"+v))v="inicio";
 document.querySelectorAll(".view").forEach(function(s){s.classList.toggle("on",s.id=="v-"+v)});
 document.querySelectorAll("#nav a").forEach(function(a){a.classList.toggle("on",a.dataset.v==v)});window.scrollTo(0,0)}
function toast(m){var t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.h);toast.h=setTimeout(function(){t.classList.remove("on")},1600);var c=$("#cnt");c.classList.remove("bump");void c.offsetWidth;c.classList.add("bump")}
function bar(T){var b=$("#bar");b.classList.toggle("on",T.q>0&&location.hash!=="#pedido");$("#bq").textContent="🛒 "+T.q+" ítem"+(T.q==1?"":"s");$("#bt").textContent=T.t?fm(T.t):CFG.sinPrecio}
function filt(inp,sel){var q=inp.value.toLowerCase().trim();document.querySelectorAll(sel+" .card").forEach(function(c){c.style.display=c.dataset.s.indexOf(q)<0?"none":""});document.querySelectorAll(sel+" .cat").forEach(function(c){var v=[].some.call(c.querySelectorAll(".card"),function(x){return x.style.display!=="none"});c.style.display=v?"":"none"})}
$("#sp").addEventListener("input",function(){filt(this,"#gp")});
$("#sc").addEventListener("input",function(){filt(this,"#gc")});
var io=null;try{io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.08})}catch(e){}
document.querySelectorAll(".rv").forEach(function(c){io?io.observe(c):c.classList.add("in")});
var fi=0;function feat(){var f=$("#feat");if(fi&&f.matches(":hover,:focus-within"))return;var o=PROMOS[fi%PROMOS.length];fi++;f.style.opacity=0;setTimeout(function(){f.innerHTML=card(o,"p");f.firstChild.classList.add("in");f.style.opacity=1},300)}
feat();setInterval(feat,5000);
window.addEventListener("scroll",function(){if(location.hash!=="#carta")return;var cur=0;CARTA.forEach(function(g,k){if(document.getElementById("cat"+k).getBoundingClientRect().top<150)cur=k});document.querySelectorAll("#chips a").forEach(function(a,k){a.classList.toggle("on",k==cur)})},{passive:true});
window.addEventListener("hashchange",function(){route();bar(totals())});route();render();

/* ===== ENVÍO, CONTACTO Y DIÁLOGO ===== */
function deliver(txt,title){
 var d=$("#dlg"),wa=$("#dwa");$("#dt").textContent=title;$("#dx").value=txt;
 if(CFG.tel){wa.href="https://wa.me/"+CFG.tel+"?text="+encodeURIComponent(txt);wa.hidden=false;$("#dp").textContent="Tocá “Abrir WhatsApp” para enviarlo al local."}
 else{wa.hidden=true;$("#dp").textContent="Copiá este mensaje y envialo al local por WhatsApp o teléfono."}
 d.hidden=false}
$("#dcl").addEventListener("click",function(){$("#dlg").hidden=true});
$("#dlg").addEventListener("click",function(e){if(e.target.id=="dlg")$("#dlg").hidden=true});
document.addEventListener("keydown",function(e){if(e.key=="Escape")$("#dlg").hidden=true});
$("#dcp").addEventListener("click",function(){var x=$("#dx"),b=this;x.select();var ok=false;try{ok=document.execCommand("copy")}catch(e){}
 if(!ok&&navigator.clipboard){navigator.clipboard.writeText(x.value).catch(function(){})}
 b.textContent="¡Copiado!";setTimeout(function(){b.textContent="Copiar"},1400)});
$("#cf").addEventListener("submit",function(e){e.preventDefault();
 deliver("*Consulta desde la web*\nNombre: "+$("#cfn").value+"\nTeléfono: "+($("#cft").value||"—")+"\nMensaje: "+$("#cfm").value,"Tu consulta");this.reset()});
if(CFG.tel){$("#telRow").innerHTML='<a class="btn" href="tel:+'+CFG.tel+'">Llamar</a><a class="btn o" target="_blank" rel="noopener" href="https://wa.me/'+CFG.tel+'">WhatsApp</a>'}else{$("#telRow").hidden=true}
