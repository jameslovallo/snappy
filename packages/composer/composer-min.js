export default t=>{class e extends HTMLElement{constructor(){if(super(),this.DOM=t.shadow?this.attachShadow({mode:"open"}):this,t.methods&&Object.keys(t.methods).forEach((e=>this[e]=t.methods[e])),t.props&&(this.props={},Object.keys(t.props).forEach((e=>{const s=t.props[e];this.props[e]={value:this.getAttribute(e),handler:"string"==typeof s?this[s]:s},this[e]=this.props[e].handler(this.getAttribute(e))}))),t.template){this.template=t.template,t.styles&&(this.styles=t.styles);const e=this.styles?`<style>${this.styles}</style>`:"";this.DOM.innerHTML=e+this.template(),this.parts={},this.DOM.querySelectorAll("[part]").forEach((t=>{this.parts[t.getAttribute("part")]=t}))}}connectedCallback(){t.ready&&(this.ready=t.ready,this.ready())}}!customElements.get(t.name)&&customElements.define(t.name,e)};