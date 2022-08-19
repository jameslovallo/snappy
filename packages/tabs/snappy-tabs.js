export default (() => {
	!customElements.get('snappy-tabs') &&
		customElements.define(
			'snappy-tabs',
			class extends HTMLElement {
				constructor() {
					super()
					this.sr = this.attachShadow({ mode: 'open' })
					this.type = this.getAttribute('type')
					this.rm = matchMedia('prefers-reduced-motion').matches

					const bp = this.getAttribute('breakpoint')
					const mq = matchMedia(`(min-width: ${bp})`)

					const setType = () => {
						this.type = mq.matches ? 'tabs' : 'accordion'
						this.setAttribute('type', this.type)
					}

					if (bp) {
						setType()
						mq.addEventListener('change', () => {
							setType()
							this.connectedCallback()
						})
					}

					this.tabs = this.querySelectorAll('[slot=tab]')
					this.tabs.forEach((tab, i) => {
						tab.setAttribute('slot', 'tab-' + i)
					})

					this.panels = this.querySelectorAll('[slot=panel]')
					this.panels.forEach((panel, i) => {
						panel.setAttribute('slot', 'panel-' + i)
					})

					const open = (i) => {
						if (this.type === 'tabs' && i === 0) {
							return 'open'
						}
					}

					const html = [...this.tabs]
						.map((child, i) => {
							return `
								<details ${open(i)}>
									<summary part="tab">
										<slot name="tab-${i}"></slot>
									</summary>
									<div part="panel">
										<slot name="panel-${i}"></slot>
									</div>
								</details>
							`
						})
						.join('')

					const css = `
						<style>
							:host {
								border: 1px solid currentcolor;
								border-radius: 4px;
								display: block;
								overflow: hidden;
								position: relative;
							}
							details[open] [part=tab] {
								border-bottom: 1px solid currentcolor;
								font-weight: bold;
							}
							details:not(:last-of-type) {
								border-bottom: 1px solid currentcolor
							}
							[part=tab] {
								cursor: pointer;
								box-sizing: border-box;
								display: block;
								padding: 1rem;
							}
							[part=tab] + div { left: 0; right: 0; padding: 1rem }
							[part=tab] + div *:first-child { margin-top: 0 }
							[part=tab] + div *:last-child { margin-bottom: 0 }
							slot[name*=tab]::slotted(*) { font: inherit; margin: 0; }
						</style>
					`

					const tab_css = `
						<style>
							:host { padding-top: var(--padding-top) }
							details:not(:last-of-type) { border-bottom: 0 }
							details:not(:last-of-type) summary {
								border-right: 1px solid currentcolor;
							}
							summary { border-bottom: 1px solid currentcolor }
							[part=indicator] {
								background: currentcolor;
								height: 2px;
								position: absolute;
								top: calc(var(--padding-top) - 2px);
								transition: 0.33s;
							}
						<style>
					`

					const indicator = `<div part="indicator"></div>`

					this.template = css + html
					this.tab_stuff = this.type === 'tabs' ? indicator + tab_css : ''
				}

				connectedCallback() {
					this.sr.innerHTML = this.template
					if (this.type === 'tabs') {
						this.sr.innerHTML += this.tab_stuff

						const tabCount = this.tabs.length
						const indicator = this.sr.querySelector('[part=indicator]')
						const details = this.sr.querySelectorAll('details')

						details.forEach((d, i) => {
							const tab = d.querySelector('[part=tab]')
							const panel = d.querySelector('[part=panel]')

							this.setAttribute('style', '--padding-top: ' + tab.clientHeight + 'px')
							tab.style.position = 'absolute'
							tab.style.top = 0
							tab.style.width = 100 / tabCount + '%'
							tab.style.left = (100 / tabCount) * i + '%'

							if (d.open) {
								this.open = i
								indicator.style.left = tab.style.left
							}
							indicator.style.width = 100 / tabCount + '%'

							tab.addEventListener('click', () => {
								indicator.style.left = tab.style.left
								if (!this.rm && i !== this.open) {
									const direction = `translateX(${i < this.open ? '-' : ''}100%)`
									panel.animate(
										[
											{ opacity: 0, transform: direction },
											{ opacity: 0.33 },
											{ opacity: '1', transform: 'translateX(0)' },
										],
										{
											duration: 333,
											iterations: 1,
											easing: 'linear',
										}
									)
								}
								this.open = i
								details.forEach((d) => (d.open = false))
							})
						})
					}
				}
			}
		)
})()
