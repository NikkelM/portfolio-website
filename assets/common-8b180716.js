(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function c(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(t){if(t.ep)return;t.ep=!0;const i=c(t);fetch(t.href,i)}})();/*! js-cookie v3.0.5 | MIT */function u(e){for(var o=1;o<arguments.length;o++){var c=arguments[o];for(var s in c)e[s]=c[s]}return e}var B={read:function(e){return e[0]==='"'&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}};function y(e,o){function c(t,i,n){if(!(typeof document>"u")){n=u({},o,n),typeof n.expires=="number"&&(n.expires=new Date(Date.now()+n.expires*864e5)),n.expires&&(n.expires=n.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var r="";for(var l in n)n[l]&&(r+="; "+l,n[l]!==!0&&(r+="="+n[l].split(";")[0]));return document.cookie=t+"="+e.write(i,t)+r}}function s(t){if(!(typeof document>"u"||arguments.length&&!t)){for(var i=document.cookie?document.cookie.split("; "):[],n={},r=0;r<i.length;r++){var l=i[r].split("="),w=l.slice(1).join("=");try{var p=decodeURIComponent(l[0]);if(n[p]=e.read(w,p),t===p)break}catch{}}return t?n[t]:n}}return Object.create({set:c,get:s,remove:function(t,i){c(t,"",u({},i,{expires:-1}))},withAttributes:function(t){return y(this.converter,u({},this.attributes,t))},withConverter:function(t){return y(u({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(e)}})}var d=y(B,{path:"/"});const a=document.getElementById("navBar"),C=document.querySelectorAll(".navLink"),E=document.querySelector(".closeButton"),f=document.getElementById("openNavBarButton"),g=document.getElementById("navBarContents");let m=!0;function L(){d.set("navBarOpened","true",{expires:1}),a.style.width="250px"}function h(){a.style.width="0",a.style.height="100%"}window.addEventListener("click",function(e){e.target!==a&&!a.contains(e.target)&&h()});f.addEventListener("click",function(e){a.style.height="calc(100% - 120px)",m&&(m=!1,g.style.display="block",f.classList.remove("wiggle")),L(),e.stopPropagation()});E.addEventListener("click",function(e){h(),e.stopPropagation()});C.forEach(function(e){e.addEventListener("click",h)});window.addEventListener("load",function(){d.get("navBarOpened")||(f.classList.add("wiggle"),setTimeout(function(){m&&(g.style.display="none",a.style.width="60px")},100),setTimeout(function(){f.classList.remove("wiggle")},1e3),setTimeout(function(){m&&(a.style.width="0")},1500),setTimeout(function(){g.style.display="block"},1700))});console.log("Made with ❤️ by @NikkelM");console.log("Find the source code at https://github.com/NikkelM/NikkelM.github.io");b();function b(){window.addEventListener("load",function(){x(),T()})}function x(){let e=document.getElementsByClassName("contactLink");for(let c=0;c<e.length;c++)e[c].onclick=function(){return F(),!1};let o=document.getElementById("contactForm");o.addEventListener("click",function(c){c.stopPropagation()}),I(o)}function F(){const e=document.getElementById("contactFormDiv");e.onclick=function(){k()},e.style.display="block",window.innerWidth<768&&document.getElementsByTagName("html")[0].setAttribute("style","overflow: hidden !important")}function k(){const e=document.getElementById("contactFormDiv");e.style.display="none",document.body.style="",document.getElementsByTagName("html")[0].setAttribute("style","overflow: auto !important")}function I(e){const o=document.getElementById("result");e.addEventListener("submit",function(c){c.preventDefault();const s=new FormData(e),t=Object.fromEntries(s);t.access_key="d8cb0be5-68b2-4c0c-91e7-4f9f4a13e9ea",t.replyto=t.email;const i=JSON.stringify(t);o.innerText="Please wait...",o.style.display="block",fetch("https://api.web3forms.com/submit",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:i}).then(async n=>{let r=await n.json();n.status==200?o.innerText="Your message has been sent!":(console.log(n),o.innerText=r.message),e.reset(),setTimeout(()=>{o.style.display="none",k()},3e3)}).catch(n=>{console.log(n),o.innerText="Something went wrong!",setTimeout(()=>{o.style.display="none"},3e3)})})}function T(){const e=document.getElementById("cookieConsent"),o=document.getElementById("acceptCookiesButton"),c=document.getElementById("declineCookiesButton");d.get("cookieConsent")===void 0?(e.style.display="block",o.addEventListener("click",function(){d.set("cookieConsent","true",{expires:365}),e.style.display="none",v()}),c.addEventListener("click",function(){d.set("cookieConsent","false",{expires:365}),e.style.display="none"})):d.get("cookieConsent")==="true"&&v()}function v(){window.dataLayer=window.dataLayer||[];function e(){dataLayer.push(arguments)}e("consent","default",{ad_storage:"denied",analytics_storage:"granted"}),e("js",new Date),e("config","G-9K4WW3ECLR")}