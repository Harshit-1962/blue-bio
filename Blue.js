document.querySelectorAll(".pin").forEach(function(p,i){
  p.style.setProperty("--i",i);
});
var orbs=[].slice.call(document.querySelectorAll(".orb"));
function burst(x,y,r){
  for(var i=0;i<10;i++){
    var d=document.createElement("div"),s=6+Math.random()*10;
    d.style.cssText="position:fixed;z-index:2;pointer-events:none;border-radius:50%;width:"+s+"px;height:"+s+"px;left:"+(x-s/2)+"px;top:"+(y-s/2)+"px;background:radial-gradient(circle at 30% 25%,rgba(255,255,255,.9),rgba(130,175,255,.45));border:1px solid rgba(255,255,255,.5)";
    document.body.appendChild(d);
    var a=Math.PI*2*i/10+Math.random()*.5,dist=r*(.9+Math.random()*.9);
    var an=d.animate([{transform:"translate(0,0) scale(1)",opacity:1},{transform:"translate("+Math.cos(a)*dist+"px,"+Math.sin(a)*dist+"px) scale(.2)",opacity:0}],{duration:600+Math.random()*300,easing:"cubic-bezier(.1,.8,.3,1)"});
    an.onfinish=(function(el){return function(){el.remove()}})(d);
  }
}
window.addEventListener("pointerdown",function(e){
  if(e.target.closest&&e.target.closest("a,button"))return;
  orbs.forEach(function(o){
    if(o._gone)return;
    var r=o.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,rad=r.width/2,dx=e.clientX-cx,dy=e.clientY-cy;
    if(dx*dx+dy*dy>rad*rad)return;
    o._gone=true;burst(cx,cy,rad);
    var p=o.animate([{scale:1,opacity:1},{scale:1.35,opacity:.9,offset:.35},{scale:1.8,opacity:0}],{duration:380,easing:"ease-out",fill:"forwards"});
    setTimeout(function(){p.cancel();o.animate([{scale:.1,opacity:0},{scale:1.12,opacity:1,offset:.7},{scale:1,opacity:1}],{duration:900,easing:"ease-out"});o._gone=false},2200);
  });
});
(function(){
var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches;
/* name: letters drop in one by one, jump on hover */
var em=document.querySelector("h1 em");
if(em){var txt=em.textContent;em.textContent="";txt.split("").forEach(function(c,i){var s=document.createElement("span");s.className="ch";s.textContent=c;s.style.animationDelay=(.4+i*.09)+"s";em.appendChild(s)})}
/* typewriter tagline */
var sub=document.querySelector(".sub");
if(sub&&!RM){
  var lines=["find me below \u2193"],li=0,ci=0,del=false;
  sub.textContent="";sub.classList.add("type");
  (function tick(){
    var t=lines[li];sub.textContent=t.slice(0,ci);
    if(!del){ci++;if(ci>t.length){if(lines.length<2)return;del=true;return setTimeout(tick,1900)}}
    else{ci--;if(ci<0){del=false;ci=0;li=(li+1)%lines.length}}
    setTimeout(tick,del?26:62);
  })();
}
if(RM)return;
/* 3D tilt + moving glare on glass cards */
document.querySelectorAll(".board .pin").forEach(function(p){
  p.addEventListener("pointermove",function(e){
    var r=p.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    p.classList.add("tilting");
    p.style.setProperty("--ry",((x-.5)*16)+"deg");p.style.setProperty("--rx",((.5-y)*16)+"deg");
    p.style.setProperty("--mx",(x*100)+"%");p.style.setProperty("--my",(y*100)+"%");
  });
  p.addEventListener("pointerleave",function(){p.classList.remove("tilting");p.style.setProperty("--rx","0deg");p.style.setProperty("--ry","0deg")});
});
/* magnetic circles */
document.querySelectorAll(".circ").forEach(function(c){
  c.addEventListener("pointermove",function(e){var r=c.getBoundingClientRect();c.style.translate=((e.clientX-r.left-r.width/2)*.35)+"px "+((e.clientY-r.top-r.height/2)*.35)+"px"});
  c.addEventListener("pointerleave",function(){c.style.translate="0 0"});
});
/* ripple on tap */
window.addEventListener("pointerdown",function(e){
  var d=document.createElement("div");
  d.style.cssText="position:fixed;z-index:3;pointer-events:none;left:"+(e.clientX-10)+"px;top:"+(e.clientY-10)+"px;width:20px;height:20px;border-radius:50%;border:2px solid rgba(255,255,255,.75);box-shadow:0 0 22px rgba(120,170,255,.6)";
  document.body.appendChild(d);
  d.animate([{transform:"scale(1)",opacity:.9},{transform:"scale(9)",opacity:0}],{duration:800,easing:"cubic-bezier(.1,.7,.3,1)"}).onfinish=function(){d.remove()};
});
/* liquid droplet trail, spotlight and parallax following the pointer */
var spot=document.createElement("div");spot.className="spot";document.body.appendChild(spot);
var bg=document.querySelector(".bg"),lastPointer=null,pointerFrame=0;
function updatePointerEffects(){
  pointerFrame=0;
  if(!lastPointer)return;
  var e=lastPointer;
  spot.style.transform="translate("+e.clientX+"px,"+e.clientY+"px)";
  if(bg){bg.style.transform="scale(1.1) translate("+(-(e.clientX/innerWidth-.5)*26)+"px,"+(-(e.clientY/innerHeight-.5)*26)+"px)"}
}
window.addEventListener("pointermove",function(e){
  lastPointer=e;
  if(!pointerFrame)pointerFrame=requestAnimationFrame(updatePointerEffects);
},{passive:true});
})();
(function(){
if(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches)return;
var wrap=document.createElement("div");wrap.className="motes";document.body.appendChild(wrap);
var motes=[];
var isMobile=window.matchMedia&&matchMedia("(max-width:700px), (pointer:coarse)").matches;
var moteCount=isMobile?24:44;
for(var i=0;i<moteCount;i++){
  var m=document.createElement("i"),z=Math.random(),s=2+z*8;
  m.className="mote";
  m.style.cssText="left:"+(Math.random()*100)+"vw;width:"+s+"px;height:"+s+"px;filter:blur("+(z>.7?(z-.6)*9:0)+"px);opacity:"+(.22+z*.45)+";animation-duration:"+(42-z*24)+"s;animation-delay:-"+(Math.random()*42)+"s";
  m._z=z;wrap.appendChild(m);motes.push(m);
}
var orbs=[].slice.call(document.querySelectorAll(".orb")),depth=[1,.7,.35,.55,.9,.3];
orbs.forEach(function(o,i){o._d=depth[i]||.6;o.style.filter="blur("+((1-o._d)*3.2)+"px)"});
function apply(x,y){
  var b=document.body.style;
  b.setProperty("--bx",(-x*44)+"px");b.setProperty("--by",(-y*44)+"px");
  motes.forEach(function(m){m.style.translate=(-x*90*m._z)+"px "+(-y*90*m._z)+"px"});
  orbs.forEach(function(o){o.style.transform="translate("+(-x*80*o._d)+"px,"+(-y*80*o._d)+"px)"});
}
var targetX=0,targetY=0,moteFrame=0;
function updateMotes(){moteFrame=0;apply(targetX,targetY)}
window.addEventListener("pointermove",function(e){
  targetX=e.clientX/innerWidth-.5;targetY=e.clientY/innerHeight-.5;
  if(!moteFrame)moteFrame=requestAnimationFrame(updateMotes);
},{passive:true});
window.addEventListener("deviceorientation",function(e){
  if(e.gamma==null||e.beta==null)return;
  apply(Math.max(-.5,Math.min(.5,e.gamma/60)),Math.max(-.5,Math.min(.5,(e.beta-45)/60)));
});
document.querySelectorAll(".board .pin").forEach(function(p){
  p.addEventListener("pointermove",function(e){
    var r=p.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    p.style.setProperty("--px",(-x*16)+"px");p.style.setProperty("--py",(-y*16)+"px");
    p.style.setProperty("--sx",(-x*30)+"px");p.style.setProperty("--sy",(28-y*22)+"px");
  });
  p.addEventListener("pointerleave",function(){
    ["--px","--py","--sx"].forEach(function(k){p.style.setProperty(k,"0px")});p.style.setProperty("--sy","28px");
  });
});
})();
(function(){
if(window.matchMedia&&matchMedia("(prefers-reduced-motion:reduce)").matches)return;
var isMobile=window.matchMedia&&matchMedia("(max-width:700px), (pointer:coarse)").matches;
var c=document.createElement("canvas");
c.style.cssText="position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:3;filter:blur("+(isMobile?".7px":"1.2px")+");mix-blend-mode:screen";
document.body.appendChild(c);
var g=c.getContext("2d"),pts=[],W=0,H=0,dpr=isMobile?1:Math.min(window.devicePixelRatio||1,2),LIFE=isMobile?800:1100,maxPoints=isMobile?34:70,raf=0,lastPoint=0;
function size(){W=innerWidth;H=innerHeight;c.width=W*dpr;c.height=H*dpr;g.setTransform(dpr,0,0,dpr,0,0)}
size();window.addEventListener("resize",size,{passive:true});
function ensureFrame(){if(!raf&&!document.hidden)raf=requestAnimationFrame(frame)}
window.addEventListener("pointermove",function(e){
  var now=performance.now();
  if(now-lastPoint<(isMobile?32:16))return;
  lastPoint=now;pts.push({x:e.clientX,y:e.clientY,t:now});
  if(pts.length>maxPoints)pts.shift();ensureFrame();
},{passive:true});
function frame(now){
  raf=0;
  if(document.hidden)return;
  g.clearRect(0,0,W,H);
  while(pts.length&&now-pts[0].t>LIFE)pts.shift();
  if(pts.length>2){
    var p=[],i,j;
    for(i=0;i<pts.length;i++){
      var a=pts[Math.max(0,i-1)],b=pts[Math.min(pts.length-1,i+1)],dx=b.x-a.x,dy=b.y-a.y,l=Math.sqrt(dx*dx+dy*dy)||1,age=(now-pts[i].t)/LIFE;
      var off=Math.sin(now/150+i*.55)*age*10;
      p.push({x:pts[i].x-dy/l*off,y:pts[i].y+dx/l*off,age:age});
    }
    g.lineCap="butt";g.lineJoin="round";
    for(j=1;j<p.length;j++){
      var al=Math.max(0,1-p[j].age);
      g.beginPath();g.moveTo(p[j-1].x,p[j-1].y);g.lineTo(p[j].x,p[j].y);
      g.strokeStyle="rgba(70,150,255,"+(al*.42)+")";g.lineWidth=4+al*28;g.stroke();
    }
    for(j=1;j<p.length;j++){
      var al2=Math.max(0,1-p[j].age);
      g.beginPath();g.moveTo(p[j-1].x,p[j-1].y);g.lineTo(p[j].x,p[j].y);
      g.strokeStyle="rgba(200,236,255,"+(al2*.6)+")";g.lineWidth=2+al2*9;g.stroke();
    }
    var hd=p[p.length-1],gr=g.createRadialGradient(hd.x,hd.y,0,hd.x,hd.y,26);
    gr.addColorStop(0,"rgba(220,242,255,.55)");gr.addColorStop(1,"rgba(90,170,255,0)");
    g.fillStyle=gr;g.beginPath();g.arc(hd.x,hd.y,26,0,Math.PI*2);g.fill();
  }
  if(pts.length)raf=requestAnimationFrame(frame);
}
document.addEventListener("visibilitychange",function(){if(!document.hidden)ensureFrame()},{passive:true});
})();
