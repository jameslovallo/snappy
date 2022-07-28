export default (() => {
	!customElements.get('snappy-typer') &&
		customElements.define(
			'snappy-typer',
			class extends HTMLElement {
				constructor() {
					// boilerplate
					super()
					this.sr = this.attachShadow({ mode: 'open' })
					// get attributes
					this.static = this.getAttribute('static')
					this.typed = this.getAttribute('typed').split(',')
					this.typingSpeed = Number(this.getAttribute('typing-speed')) || 120
					this.wordDelay = Number(this.getAttribute('word-delay')) || 5000
					this.nextDelay = Number(this.getAttribute('next-delay')) || 0
					// setup template
					this.sr.innerHTML = `
					<span part="static">${this.static || ''}</span>
					<span part="typed" class="typing"></span>
					
					<style>
						:host { display: block }
						
						[part="typed"]:after {
							content: var(--caret, '|');
							color: var(--caret-color, currentcolor);
							font-weight: 100;
						}
						
						[part="typed"]:not([data-typing="true"]):after {
							animation: blink 1s infinite
						}
						
						@keyframes blink {
							0% { opacity: 1 } 50% { opacity: 1 }
							51% { opacity: 0 } 100% { opacity: 0 }
						}
					</style>
				`
					this.typedEl = this.sr.querySelector('[part=typed]')
				}

				connectedCallback() {
					let currentString = 0 // "state"

					const typer = () => {
						// get current string
						const word = this.typed[currentString].trim()
						const wordDelay = this.wordDelay + word.length * this.typingSpeed
						// add letters with delay
						for (let i = 0; i < word.length; i++) {
							setTimeout(() => {
								this.typedEl.dataset.typing = true
								this.typedEl.innerText += word[i]
								if (this.typedEl.innerText === word) {
									this.typedEl.dataset.typing = false
								}
							}, i * this.typingSpeed) // delay
						}
						// remove letters with delay
						for (let i = 0; i < word.length; i++) {
							setTimeout(() => {
								this.typedEl.dataset.typing = true
								this.typedEl.innerText = this.typedEl.innerText.slice(0, -1)
								if (this.typedEl.innerText === '') {
									this.typedEl.dataset.typing = false
									// advance to next word or reset state to 0
									if (currentString < this.typed.length - 1) {
										currentString++
									} else currentString = 0
									setTimeout(typer, this.nextDelay) // run it again
								}
							}, wordDelay + i * this.typingSpeed) // delay
						}
					}

					typer(this.typed[0])
				}
			}
		)
})()
