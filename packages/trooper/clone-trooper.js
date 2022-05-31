export default (() => {
	switch (!!customElements.get('clone-trooper')) {
		case true:
			break
		case false:
			class cloneTrooper extends HTMLElement {
				constructor() {
					super()

					const id = this.getAttribute('template')
					this.template = document.getElementById(id).cloneNode(true)
					this.props = this.template.getAttribute('props')?.match(/[a-z]+/g)

					if (typeof this.template.getAttribute('shadow') === 'string') {
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
						condition?.match(/[a-z]+/g).forEach((prop) => {
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

			customElements.define('clone-trooper', cloneTrooper)
	}
})()
