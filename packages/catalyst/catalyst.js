export default (c) => {
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
					const func = c.props[prop]
					this.props[prop] = {
						value: this.getAttribute(prop),
						handler: typeof func === 'string' ? this[func] : func,
					}
					this.props[prop].handler = handler
					this[prop] = handler(this.getAttribute(prop))
				})
			}

			// add template to dom and set up this.parts
			if (c.template) {
				this.template = c.template
				this.DOM.innerHTML += (c.styles || '') + this.template()
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
		}
	}

	!customElements.get(c.name) && customElements.define(c.name, el)
}
