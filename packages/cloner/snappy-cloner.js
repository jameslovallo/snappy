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
					this.template = template.cloneNode(true)

					if (typeof template.getAttribute('shadow') === 'string') {
						this.attachShadow({ mode: 'open' })
					}
				}

				connectedCallback() {
					this.props?.forEach((prop) => {
						this.template.innerHTML = this.template.innerHTML.replaceAll(
							`{${prop}}`,
							this.getAttribute(prop) || this.template.getAttribute(prop)
						)
					})

					this.template.content.querySelectorAll('[if]').forEach((el) => {
						let condition = el.getAttribute('if')
						const condProps = condition?.match(/[a-z]+/g)
						condProps.forEach((prop) => {
							condition = condition.replaceAll(
								prop,
								!!this.getAttribute(prop) || !!this.template.getAttribute(prop)
							)
						})
						!eval(condition) && el.remove()
					})
					;(this.shadowRoot || this).innerHTML = this.template.innerHTML

					this.shadowRoot?.querySelectorAll('slot').forEach((slot) => {
						!slot.assignedElements().length && slot.remove()
					})
				}
			}

			customElements.define('snappy-cloner', cloner)
	}
})()
