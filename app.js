/* Don Italiano · JavaScript modular por responsabilidades */
"use strict";
const PIZZAS = [
 {id:"basica",name:"Básica",category:"Clásicas",description:"Morrón, queso, jamón y aceitunas.",tag:"Tradicional",image:"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85"},
 {id:"carnivora",name:"Carnívora",category:"Especiales",description:"Jamón, pepperoni, tocino, carne molida, chorizo, salami y queso.",tag:"Favorita",image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85"},
 {id:"tradicional",name:"Tradicional",category:"Clásicas",description:"La combinación de siempre: jamón y queso.",tag:"Clásica",image:"https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=900&q=85"},
 {id:"hawaiana",name:"Hawaiana",category:"Especiales",description:"Piña, durazno, tomate cherry y queso.",tag:"Dulce y salada",image:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85"},
 {id:"pepperoni",name:"Pepperoni",category:"Clásicas",description:"Pepperoni y queso fundido sobre nuestra masa.",tag:"Popular",image:"https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85"},
 {id:"clasica",name:"Clásica de choclo",category:"Clásicas",description:"Jamón, queso y granos tiernos de choclo.",tag:"De la casa",image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85"},
 {id:"espanola",name:"Española",category:"Especiales",description:"Queso y chorizo español de sabor intenso.",tag:"Especial",image:"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85"},
 {id:"tropical",name:"Tropical",category:"Especiales",description:"Piña, durazno, jamón, pimiento y queso mozzarella.",tag:"Frutal",image:"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85"},
 {id:"margarita",name:"Margarita",category:"Clásicas",description:"Tomate, mozzarella, albahaca y un toque de aceite de oliva.",tag:"Italiana",image:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85"},
 {id:"cuatroquesos",name:"Cuatro quesos",category:"Especiales",description:"Mozzarella, parmesano, cheddar y queso azul.",tag:"Quesera",image:"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85"},
 {id:"vegetariana",name:"Vegetariana",category:"Vegetarianas",description:"Champiñones, morrón, cebolla, tomate, aceitunas y queso.",tag:"Sin carne",image:"https://images.unsplash.com/photo-1511689660979-10d2b1aada49?auto=format&fit=crop&w=900&q=85"},
 {id:"bbq",name:"BBQ",category:"Especiales",description:"Pollo, cebolla, mozzarella y salsa barbacoa.",tag:"Ahumada",image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85"}
];
const SIZES=[
 {name:"Individual",price:28,measure:"25 × 25 cm",portion:"1 persona"},
 {name:"Pequeña",price:39,measure:"30 × 30 cm",portion:"Para compartir"},
 {name:"Mediana",price:60,measure:"35 × 35 cm",portion:"2–3 personas"},
 {name:"Especial",price:70,measure:"40 × 40 cm",portion:"Tamaño especial"},
 {name:"Grande",price:100,measure:"45 × 45 cm",portion:"Para compartir"},
 {name:"Familiar",price:130,measure:"50 × 50 cm",portion:"Reuniones"}
];
const money=n=>"Bs "+Number(n).toFixed(0);
let activeFilter="Todas";
const $=id=>document.getElementById(id);
const safeText=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function renderSizes(){ $("sizeGrid").innerHTML=SIZES.map(s=>`<article class="size-card"><span>${s.name}</span><strong>${money(s.price)}</strong><small>${s.measure}</small><small>${s.portion}</small></article>`).join(""); }
function renderCatalog(){
 const query=$("searchInput").value.trim().toLocaleLowerCase("es");
 const filtered=PIZZAS.filter(p=>(activeFilter==="Todas"||p.category===activeFilter)&&`${p.name} ${p.description}`.toLocaleLowerCase("es").includes(query));
 $("pizzaGrid").innerHTML=filtered.length?filtered.map(p=>`<article class="pizza-card"><div class="pizza-photo"><img src="${p.image}" alt="Pizza ${safeText(p.name)}" loading="lazy"><span class="pizza-tag">${safeText(p.tag)}</span></div><div class="pizza-info"><div class="pizza-title-row"><h3>${safeText(p.name)}</h3><strong>Desde Bs 28</strong></div><p>${safeText(p.description)}</p><div class="pizza-meta"><small>${safeText(p.category)}</small><button class="mini-add" data-pizza="${safeText(p.id)}">Elegir pizza +</button></div></div></article>`).join(""):`<div class="empty-state">No encontramos pizzas con esa búsqueda.</div>`;
 $("resultCount").textContent=`Mostrando ${filtered.length} de ${PIZZAS.length} variedades`;
 $("pizzaGrid").querySelectorAll("[data-pizza]").forEach(b=>b.addEventListener("click",()=>{ $("orderPizza").value=b.dataset.pizza; $("reservas").scrollIntoView({behavior:"smooth"}); updateTotal(); toast("Pizza seleccionada. Completa tu pedido."); }));
}
function populateSelects(){
 $("orderPizza").insertAdjacentHTML("beforeend",PIZZAS.map(p=>`<option value="${p.id}">${safeText(p.name)}</option>`).join(""));
 const options=SIZES.map((s,i)=>`<option value="${i}">${s.name} — ${money(s.price)}</option>`).join("");
 $("orderSize").insertAdjacentHTML("beforeend",options); $("calcSize").innerHTML=options;
}
function getTotal(){const size=SIZES[Number($("orderSize").value)];const qty=Number($("quantity").value);return size&&Number.isInteger(qty)&&qty>0?size.price*qty:0;}
function updateTotal(){ $("orderTotal").textContent=money(getTotal()); }
function toast(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),2300);}
function clearErrors(){document.querySelectorAll(".error").forEach(e=>e.textContent="");}
function validateNameLive(){const field=$("customerName"),value=field.value.trim();const valid=/^(?=.{4,60}$)[\p{L}]+(?: +[\p{L}]+)*$/u.test(value);$("nameError").textContent=value&&!valid?"Usa solo letras y espacios; mínimo 4 letras.":"";field.setAttribute("aria-invalid",String(!!value&&!valid));return valid;}
function validateForm(){
 clearErrors();let ok=true;
 const checks=[
  ["customerName",v=>/^(?=.{4,60}$)[\p{L}]+(?: +[\p{L}]+)*$/u.test(v.trim()),"nameError","Escribe un nombre válido usando solamente letras."],
  ["customerPhone",v=>/^7\d{7}$/.test(v.trim()),"phoneError","Ingresa 8 dígitos y comienza con 7."],
  ["customerEmail",v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),"emailError","Ingresa un correo válido."],
  ["department",v=>!!v,"departmentError","Selecciona un departamento."],
  ["orderPizza",v=>!!v,"pizzaError","Selecciona una pizza."],
  ["orderSize",v=>v!=="","sizeError","Selecciona un tamaño."],
  ["quantity",v=>Number.isInteger(Number(v))&&Number(v)>=1&&Number(v)<=20,"quantityError","La cantidad debe estar entre 1 y 20."],
  ["orderDate",v=>!!v&&v>=new Date().toISOString().slice(0,10),"dateError","Selecciona hoy o una fecha futura."]
 ];
 checks.forEach(([id,test,error,msg])=>{if(!test($(id).value)){ $(error).textContent=msg;ok=false;}});
 return ok;
}
function sendOrder(e){
 e.preventDefault();$("formFeedback").textContent="";
 if(!validateForm()){$("formFeedback").textContent="Revisa los campos marcados antes de continuar.";return;}
 const pizza=PIZZAS.find(p=>p.id===$("orderPizza").value),size=SIZES[Number($("orderSize").value)];
 const msg=`Hola, Don Italiano. Quiero realizar un pedido:%0A- Nombre: ${encodeURIComponent($("customerName").value.trim())}%0A- WhatsApp: ${encodeURIComponent($("customerPhone").value.trim())}%0A- Correo: ${encodeURIComponent($("customerEmail").value.trim())}%0A- Departamento: ${encodeURIComponent($("department").value)}%0A- Pizza: ${encodeURIComponent(pizza.name)}%0A- Tamaño: ${encodeURIComponent(size.name)}%0A- Cantidad: ${$("quantity").value}%0A- Fecha: ${$("orderDate").value}%0A- Total estimado: ${encodeURIComponent(money(getTotal()))}%0A- Indicaciones: ${encodeURIComponent($("notes").value.trim()||"Ninguna")}`;
 // Número ficticio de demostración: reemplazar por el contacto autorizado antes de publicar.
 window.open(`https://wa.me/59177761768?text=${msg}`,"_blank","noopener,noreferrer");
 $("formFeedback").textContent="Se preparó el mensaje. La reserva queda pendiente de confirmación.";
}
function setupAccordion(){
 document.querySelectorAll(".faq-question").forEach(btn=>btn.addEventListener("click",()=>{const item=btn.closest(".faq-item"),open=item.classList.toggle("open");btn.setAttribute("aria-expanded",String(open));btn.querySelector("span").textContent=open?"−":"＋";}));
}
function setupMenu(){const btn=$("menuToggle"),nav=$("navLinks");btn.addEventListener("click",()=>{const open=nav.classList.toggle("open");btn.setAttribute("aria-expanded",String(open));btn.textContent=open?"×":"☰";});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");btn.setAttribute("aria-expanded","false");btn.textContent="☰";}));}
function setupTheme(){const saved=localStorage.getItem("don-italiano-theme");if(saved==="dark")document.body.classList.add("dark");$("themeToggle").textContent=document.body.classList.contains("dark")?"☀":"☾";$("themeToggle").addEventListener("click",()=>{document.body.classList.toggle("dark");const dark=document.body.classList.contains("dark");localStorage.setItem("don-italiano-theme",dark?"dark":"light");$("themeToggle").textContent=dark?"☀":"☾";});}
function setupNetwork(){const update=()=>{const online=navigator.onLine;const el=$("statusDot").parentElement;el.className="status "+(online?"online":"offline");$("networkStatus").textContent=online?"En línea":"Sin conexión · Modo offline";};window.addEventListener("online",update);window.addEventListener("offline",update);update();}
function setupCalculator(){
 const modal=$("calcModal"),show=()=>{modal.classList.add("show");modal.setAttribute("aria-hidden","false");},hide=()=>{modal.classList.remove("show");modal.setAttribute("aria-hidden","true");};
 $("openCalc").addEventListener("click",show);$("closeModal").addEventListener("click",hide);$("calcDone").addEventListener("click",hide);modal.addEventListener("click",e=>{if(e.target===modal)hide();});
 const calc=()=>{$("calcResult").textContent=money(SIZES[Number($("calcSize").value)].price*Math.max(1,Math.min(20,Number($("calcQty").value)||1)));};
 $("calcSize").addEventListener("change",calc);$("calcQty").addEventListener("input",calc);calc();
}
function setupHydration(){$("hydrateBtn").addEventListener("click",()=>{renderCatalog();toast("Catálogo actualizado e hidratado correctamente.");});}
function setupPizzaCarousel(){const track=$("pizzaGrid");const move=direction=>track.scrollBy({left:direction*Math.max(260,track.clientWidth*.82),behavior:"smooth"});$("pizzaPrev").addEventListener("click",()=>move(-1));$("pizzaNext").addEventListener("click",()=>move(1));}
function setupLazyImages(){if("IntersectionObserver"in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const img=entry.target;if(img.dataset.src){img.src=img.dataset.src;img.removeAttribute("data-src");}observer.unobserve(img);}}));document.querySelectorAll("img[data-src]").forEach(img=>observer.observe(img));}}
async function loadCatalogWithFetch(){
 try{
  const response=await fetch("./pizzas.json",{cache:"no-cache"});
  if(!response.ok)throw new Error("No se pudo cargar el catálogo");
  const data=await response.json();
  if(Array.isArray(data)&&data.length){PIZZAS.splice(0,PIZZAS.length,...data);}
 }catch(error){console.info("Se utiliza el catálogo integrado para modo offline.",error);}
 renderCatalog();
}
function init(){
 renderSizes();populateSelects();renderCatalog();loadCatalogWithFetch();setupAccordion();setupMenu();setupTheme();setupNetwork();setupCalculator();setupHydration();setupLazyImages();setupPizzaCarousel();
 $("filterRow").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;document.querySelectorAll(".filter-chip").forEach(x=>x.classList.toggle("active",x===b));renderCatalog();});
 $("searchInput").addEventListener("input",renderCatalog);$("orderSize").addEventListener("change",updateTotal);$("quantity").addEventListener("input",updateTotal);$("orderPizza").addEventListener("change",updateTotal);$("orderForm").addEventListener("submit",sendOrder);
 $("customerName").addEventListener("input",validateNameLive);$("year").textContent=new Date().getFullYear();$("orderDate").min=new Date().toISOString().slice(0,10);$("orderDate").value=$("orderDate").min;
 if("serviceWorker"in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>toast("No se pudo activar el modo offline en este navegador.")));}
}
document.addEventListener("DOMContentLoaded",init);