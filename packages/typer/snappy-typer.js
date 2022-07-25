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
					this.baseString = this.getAttribute('base-string')
					this.typedStrings = this.getAttribute('typed-strings').split(',')
					this.typingSpeed = Number(this.getAttribute('typing-speed')) || 120
					this.wordDelay = Number(this.getAttribute('word-delay')) || 5000
					this.nextDelay = Number(this.getAttribute('next-delay')) || 500
					// setup template
					this.sr.innerHTML = `
					<span part="base">${this.baseString}</span>
					<span part="typed" class="typing"></span>
					
					<style>
						:host { display: block }
						
						[part="typed"]:after {
							content: '|';
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
					this.typed = this.sr.querySelector('[part=typed]')
				}

				connectedCallback() {
					let currentString = 0 // "state"

					const typer = () => {
						// get current string
						const word = this.typedStrings[currentString].trim()
						// add letters with delay
						for (let i = 0; i < word.length; i++) {
							setTimeout(() => {
								this.typed.dataset.typing = true
								this.typed.innerText += word[i]
								if (this.typed.innerText === word) {
									this.typed.dataset.typing = false
								}
							}, i * this.typingSpeed) // delay
						}
						// remove letters with delay
						for (let i = 0; i < word.length; i++) {
							setTimeout(() => {
								this.typed.dataset.typing = true
								this.typed.innerText = this.typed.innerText.slice(0, -1)
								if (this.typed.innerText === '') {
									this.typed.dataset.typing = false
									// advance to next word or reset state to 0
									if (currentString < this.typedStrings.length - 1) {
										currentString++
									} else currentString = 0
									setTimeout(typer, this.nextDelay) // run it again
								}
							}, this.wordDelay + i * this.typingSpeed) // delay
						}
					}

					typer(this.typedStrings[0])
				}
			}
		)
})()
