export default (() => {
	switch (!!customElements.get('snappy-cloner')) {
		case true:
			break
		case false:
			class cloner extends HTMLElement {
				constructor() {
					super()

					const id = this.getAttribute('template')
					const template = document.getElementById(id)
					this.props = template.getAttribute('props')?.match(/[a-z]+/g)
					this.shadow = template.getAttribute('shadow')
					this.template = template.cloneNode(true)

					if (this.shadow === 'true') {
						this.attachShadow({ mode: 'open' })
					}
				}

				connectedCallback() {
					this.props?.forEach((prop) => {
						const moustache = `{${prop}}`
						const value = this.getAttribute(prop)
						const fallback = this.template.getAttribute(prop)
						const el = this.template.content.querySelector(`[if=${prop}]`)
						!value && !fallback && el?.remove()
						el?.removeAttribute('if')
						this.template.innerHTML = this.template.innerHTML.replaceAll(
							moustache,
							value || fallback
						)
					})

					;(this.shadowRoot || this).innerHTML = this.template.innerHTML
				}
			}

			customElements.define('snappy-cloner', cloner)
	}
})()
