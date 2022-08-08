export default function catalyst(c) {
	class el extends HTMLElement {
		constructor() {
			super()

			// shadow dom or no?
			this.DOM = c.shadow ? this.attachShadow({ mode: 'open' }) : this

			// attach methods to component
			if (c.methods) {
				Object.keys(c.methods).forEach((key) => (this[key] = c.methods[key]))
			}

			// get props and process values
			if (c.props) {
				this.props = {}
				Object.keys(c.props).forEach((prop) => {
					const name = prop
					const func = c.props[name]
					const handler = typeof func === 'string' ? this[func] : func
					this.props[name] = {}
					this.props[name].value = this.getAttribute(name)
					this.props[name].handler = handler
					this[name] = handler(this.getAttribute(name))
				})
			}

			// add css to dom
			if (c.css) {
				this.css = c.css
				this.DOM.innerHTML += `<style>${this.css()}</style>`
			}

			// add template to dom and set up this.parts
			if (c.template) {
				this.template = c.template
				this.DOM.innerHTML += this.template()
				this.parts = {}
				this.DOM.querySelectorAll('[part]').forEach((part) => {
					this.parts[part.getAttribute('part')] = part
				})
			}
		}

		connectedCallback() {
			// run ready callback
			if (c.ready) {
				this.ready = c.ready
				this.ready()
			}

			// setup @event handlers
			this.DOM.querySelectorAll('*').forEach((el) => {
				const events = el.getAttributeNames().filter((name) => {
					return name.startsWith('@')
				})
				events.forEach((event) => {
					const f = el.getAttribute(event)
					el.addEventListener(event.replace('@', ''), (e) => {
						typeof this[f] === 'function' ? this[f](e) : eval(f)
					})
				})
			})
		}
	}

	!customElements.get(c.name) && customElements.define(c.name, el)
}
