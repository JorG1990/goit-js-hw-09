document.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),d=document.body;t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,intervalId=setInterval((function(){d.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(intervalId)}))}));
//# sourceMappingURL=01-color-switcher.92f9bb43.js.map
