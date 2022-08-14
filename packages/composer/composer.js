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
					this[prop] = this.props[prop].handler(this.getAttribute(prop))
				})
			}

			// add template to dom and set up this.parts
			if (c.template) {
				this.template = c.template
				if (c.styles) this.styles = c.styles
				const css = this.styles ? `<style>${this.styles}</style>` : ''
				this.DOM.innerHTML = css + this.template()
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
