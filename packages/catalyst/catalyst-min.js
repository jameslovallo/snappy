export default (c) => {
	class el extends HTMLElement {
		constructor() {
			super(),
				(this.DOM = c.shadow ? this.attachShadow({ mode: 'open' }) : this),
				c.methods &&
					Object.keys(c.methods).forEach((t) => (this[t] = c.methods[t])),
				c.props &&
					((this.props = {}),
					Object.keys(c.props).forEach((t) => {
						const e = t,
							s = c.props[e],
							r = 'string' == typeof s ? this[s] : s
						;(this.props[e] = {}),
							(this.props[e].value = this.getAttribute(e)),
							(this.props[e].handler = r),
							(this[e] = r(this.getAttribute(e)))
					})),
				c.styles &&
					((this.styles = c.styles),
					(this.DOM.innerHTML += `<style>${this.styles()}</style>`)),
				c.template &&
					((this.template = c.template),
					(this.DOM.innerHTML += this.template()),
					(this.parts = {}),
					this.DOM.querySelectorAll('[part]').forEach((t) => {
						this.parts[t.getAttribute('part')] = t
					}))
		}
		connectedCallback() {
			c.ready && ((this.ready = c.ready), this.ready()),
				this.DOM.querySelectorAll('*').forEach((el) => {
					const events = el.getAttributeNames().filter((t) => t.startsWith('@'))
					events.forEach((event) => {
						const f = el.getAttribute(event)
						el.addEventListener(event.replace('@', ''), (e) => {
							'function' == typeof this[f] ? this[f](e) : eval(f)
						})
					})
				})
		}
	}
	!customElements.get(c.name) && customElements.define(c.name, el)
}
