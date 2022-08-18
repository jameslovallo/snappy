export default void(!customElements.get("snappy-tabs")&&customElements.define("snappy-tabs",class extends HTMLElement{constructor(){super(),this.sr=this.attachShadow({mode:"open"}),this.type=this.getAttribute("type"),this.rm=matchMedia("prefers-reduced-motion").matches;const t=this.getAttribute("breakpoint");if(t){const e=matchMedia(`(min-width: ${t})`);this.type=e.matches?"tabs":"accordion",e.addEventListener("change",(t=>{this.type=e.matches?"tabs":"accordion",this.connectedCallback()}))}this.tabs=this.querySelectorAll("[slot=tab]"),this.tabs.forEach(((t,e)=>{t.setAttribute("slot","tab-"+e)})),this.panels=this.querySelectorAll("[slot=panel]"),this.panels.forEach(((t,e)=>{t.setAttribute("slot","panel-"+e)}));const e=t=>{if("tabs"===this.type&&0===t)return"open"},n=[...this.tabs].map(((t,n)=>`\n\t\t\t\t\t\t\t<details ${e(n)}>\n\t\t\t\t\t\t\t\t<summary part="tab">\n\t\t\t\t\t\t\t\t\t<slot name="tab-${n}"></slot>\n\t\t\t\t\t\t\t\t</summary>\n\t\t\t\t\t\t\t\t<div part="panel">\n\t\t\t\t\t\t\t\t\t<slot name="panel-${n}"></slot>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</details>\n\t\t\t\t\t\t`)).join("");this.template="\n\t\t\t\t\t<style>\n\t\t\t\t\t\t:host {\n\t\t\t\t\t\t\tborder: 1px solid currentcolor;\n\t\t\t\t\t\t\tborder-radius: 4px;\n\t\t\t\t\t\t\tdisplay: block;\n\t\t\t\t\t\t\toverflow: hidden;\n\t\t\t\t\t\t\tposition: relative;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdetails[open] [part=tab] {\n\t\t\t\t\t\t\tborder-bottom: 1px solid currentcolor;\n\t\t\t\t\t\t\tfont-weight: bold;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tdetails:not(:last-of-type) {\n\t\t\t\t\t\t\tborder-bottom: 1px solid currentcolor\n\t\t\t\t\t\t}\n\t\t\t\t\t\t[part=tab] {\n\t\t\t\t\t\t\tcursor: pointer;\n\t\t\t\t\t\t\tbox-sizing: border-box;\n\t\t\t\t\t\t\tdisplay: block;\n\t\t\t\t\t\t\tpadding: 1rem;\n\t\t\t\t\t\t}\n\t\t\t\t\t\t[part=tab] + div { left: 0; right: 0; padding: 1rem }\n\t\t\t\t\t\t[part=tab] + div *:first-child { margin-top: 0 }\n\t\t\t\t\t\t[part=tab] + div *:last-child { margin-bottom: 0 }\n\t\t\t\t\t\tslot[name*=tab]::slotted(*) { font: inherit; margin: 0; }\n\t\t\t\t\t</style>\n\t\t\t\t"+n,this.tab_stuff="tabs"===this.type?'<div part="indicator"></div>\n\t\t\t\t\t<style>\n\t\t\t\t\t\t:host { padding-top: var(--padding-top) }\n\t\t\t\t\t\tdetails:not(:last-of-type) { border-bottom: 0 }\n\t\t\t\t\t\tdetails:not(:last-of-type) summary {\n\t\t\t\t\t\t\tborder-right: 1px solid currentcolor;\n\t\t\t\t\t\t}\n\t\t\t\t\t\tsummary { border-bottom: 1px solid currentcolor }\n\t\t\t\t\t\t[part=indicator] {\n\t\t\t\t\t\t\tbackground: currentcolor;\n\t\t\t\t\t\t\theight: 2px;\n\t\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\t\ttop: calc(var(--padding-top) - 2px);\n\t\t\t\t\t\t\ttransition: 0.33s;\n\t\t\t\t\t\t}\n\t\t\t\t\t<style>\n\t\t\t\t':""}connectedCallback(){if(this.sr.innerHTML=this.template,"tabs"===this.type){this.sr.innerHTML+=this.tab_stuff;const t=this.tabs.length,e=this.sr.querySelector("[part=indicator]"),n=this.sr.querySelectorAll("details");n.forEach(((s,o)=>{const i=s.querySelector("[part=tab]"),a=s.querySelector("[part=panel]");this.setAttribute("style","--padding-top: "+i.clientHeight+"px"),i.style.position="absolute",i.style.top=0,i.style.width=100/t+"%",i.style.left=100/t*o+"%",s.open&&(this.open=o,e.style.left=i.style.left),e.style.width=100/t+"%",i.addEventListener("click",(()=>{if(e.style.left=i.style.left,!this.rm&&o!==this.open){const t=`translateX(${o<this.open?"-":""}100%)`;a.animate([{opacity:0,transform:t},{opacity:.33},{opacity:"1",transform:"translateX(0)"}],{duration:333,iterations:1,easing:"linear"})}this.open=o,n.forEach((t=>t.open=!1))}))}))}}}));