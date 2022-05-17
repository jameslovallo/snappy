import { parse } from './node_modules/marked/lib/marked.esm.js'

export default (() => {
	switch (!!customElements.get('snappy-md')) {
		case true:
			break
		case false:
			class md extends HTMLElement {
				constructor() {
					super()
					this.attachShadow({ mode: 'open' })
					this.shadowRoot.innerHTML = `<style>:host{display:block;}img{max-width:100%;}</style>`
					this.output = document.createElement('div')
					this.shadowRoot.appendChild(this.output)
				}

				static get observedAttributes() {
					return ['src', 'theme']
				}

				inline() {
					let md = this.innerHTML
					const mdArray = md.split('\n')
					if (mdArray[0] === '') mdArray.shift()
					const leadingWhitespace = mdArray[0] ? mdArray[0].match(/[ \t]+/) : ''

					mdArray.forEach((line, i) => {
						if (line.startsWith(leadingWhitespace)) {
							line = line.replace(leadingWhitespace, '')
						}
						if (line.startsWith('&gt;')) {
							line = line.replace('&gt; ', '> ')
						}
						mdArray[i] = line
						md = mdArray.join('\n')
					})

					this.render(md)
				}

				remote() {
					fetch(this.src)
						.then((res) => res.text())
						.then((md) => this.render(md))
				}

				highlight(parsed) {
					if (parsed.match('code class="language-')) {
						const link = document.createElement('link')
						link.href =
							this.theme ||
							'https://unpkg.com/@highlightjs/cdn-assets@11.5.1/styles/atom-one-dark.min.css'
						link.rel = 'styleSheet'
						this.output.appendChild(link)

						const script = document.createElement('script')
						script.src =
							'https://unpkg.com/@highlightjs/cdn-assets@11.5.1/highlight.min.js'
						this.output.appendChild(script)

						script.addEventListener('load', () => {
							this.shadowRoot.querySelectorAll('pre code').forEach((el) => {
								el.textContent = el.textContent
									.replaceAll('<!--safe', '')
									.replaceAll('safe-->', '')
									.trim()
								hljs.highlightElement(el)
							})
						})
					}
				}

				render(md) {
					const parsed = parse(md)
					this.output.innerHTML = parsed
					this.highlight(parsed)
				}

				connectedCallback() {
					this.output.innerHTML = ''
					const style = this.querySelector('style')
					if (style) {
						this.shadowRoot.appendChild(style.cloneNode(true))
						style.remove()
					}
					this.src = this.getAttribute('src')
					this.theme = this.getAttribute('theme')
					this.src ? this.remote() : this.inline()
				}

				attributeChangedCallback() {
					this.connectedCallback()
				}
			}

			customElements.define('snappy-md', md)
	}
})()
