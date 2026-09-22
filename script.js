const nav=document.querySelector(".nav");
const menu=document.querySelector(".menu");
menu.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const progress=document.querySelector(".progress");
window.addEventListener("scroll",()=>{
  const h=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(window.scrollY/h*100)+"%";
});

const cursor=document.querySelector(".cursor");
const ring=document.querySelector(".cursor-ring");
window.addEventListener("mousemove",e=>{
  cursor.style.left=e.clientX+"px"; cursor.style.top=e.clientY+"px";
  ring.animate({left:e.clientX+"px",top:e.clientY+"px"},{duration:180,fill:"forwards"});
});
document.querySelectorAll("a,.btn,.skill,.project-card").forEach(el=>{
  el.addEventListener("mouseenter",()=>{ring.style.width="52px";ring.style.height="52px"});
  el.addEventListener("mouseleave",()=>{ring.style.width="32px";ring.style.height="32px"});
});

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in")});
},{threshold:.12});
document.querySelectorAll(".section-content,.section-kicker,.skill,.project-card,.timeline article").forEach(el=>{
  el.classList.add("observe");
  io.observe(el);
});

const style=document.createElement("style");
style.textContent=`
.observe{opacity:0;transform:translateY(28px);transition:opacity .8s ease,transform .8s ease}
.observe.in{opacity:1;transform:none}
.skill:nth-child(2),.skill:nth-child(5){transition-delay:.08s}
.skill:nth-child(3),.skill:nth-child(6){transition-delay:.16s}
`;
document.head.appendChild(style);

document.getElementById("year").textContent=new Date().getFullYear();
