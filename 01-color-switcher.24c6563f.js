!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body");e.disabled=!0;var o=null,a={DELAY:1e3,getRandomHexColor:function(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))},interval:function(){o=setInterval((function(){n.style.backgroundColor="".concat(a.getRandomHexColor())}),this.DELAY),e.disabled=!1},start:function(){var n=this;t.addEventListener("click",(function(){n.interval(),t.disabled=!0,e.disabled=!1})),e.addEventListener("click",this.stop)},stop:function(){clearInterval(o),e.disabled=!0,t.disabled=!1}};a.start()}();
//# sourceMappingURL=01-color-switcher.24c6563f.js.map