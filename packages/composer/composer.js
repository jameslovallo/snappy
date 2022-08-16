export default (c) => {
	class el extends HTMLElement {
		constructor() {
			super()

			// attach methods to component
			Object.keys(c).forEach((key) => (this[key] = c[key]))

			// get props and process values
			const props = this.props()
			Object.keys(props).forEach((prop) => {
				const func = this.props()[prop]
				this[prop] = func(this.getAttribute(prop))
			})

			// shadow dom or no?
			this.DOM = this.shadow ? this.attachShadow({ mode: 'open' }) : this

			// add template to dom and set up this.parts
			const css = this.styles ? `<style>${this.styles()}</style>` : ''
			this.DOM.innerHTML = css + this.template()
			this.parts = {}
			this.DOM.querySelectorAll('[part]').forEach((part) => {
				part.on = (type, callback) => {
					callback = callback.bind(this)
					part.addEventListener(type, (e) => callback(e))
				}
				this.parts[part.getAttribute('part')] = part
			})
		}

		// run ready callback
		connectedCallback() {
			this.ready()
		}
	}

	!customElements.get(c.component) && customElements.define(c.component, el)
}
