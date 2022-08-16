export default (c) => {
	class el extends HTMLElement {
		constructor() {
			super()

			// attach all keys to component
			Object.assign(this, c)

			// get props and process values
			this.props && Object.keys(this.props()).forEach((prop) => {
				const func = this.props()[prop]
				this[prop] = func(this.getAttribute(prop))
			})

			// add template to dom and set up this.parts
			this.DOM = this.shadow ? this.attachShadow({ mode: 'open' }) : this
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
