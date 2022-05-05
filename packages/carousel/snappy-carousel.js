export default (() => {
	switch (!!customElements.get('snappy-carousel')) {
		case true:
			break
		case false:
			class snappyCarousel extends HTMLElement {
				constructor() {
					super()
					this.attachShadow({ mode: 'open' })
					this.shadowRoot.innerHTML = `<style>:host{display: block;}.c{display: flex;flex-direction: column;justify-content: var(--arrow-alignment, flex-end);position: relative;}.c__track{display: flex;overflow-x: scroll;scroll-behavior: smooth;margin: 0 calc(-1 * var(--gap, 0));-ms-overflow-style: none;scrollbar-width: none;}.c__track::-webkit-scrollbar{display: none;}.c__track::slotted(*){flex-shrink: 0;scroll-snap-align: start;width: var(--mobile, 100%);padding: 0 var(--gap, 0);box-sizing: border-box;}@media (min-width: 768px){.c__track::slotted(*){width: var(--tablet, 50%);}}@media (min-width: 1024px){.c__track::slotted(*){width: var(--desktop, 33.33%);}}.c > button{position: absolute;height: var(--arrow-size, 48px);width: var(--arrow-size, 48px);display: flex;align-items: center;justify-content: center;}.c > button, .c__indicators > button{color: inherit;background: none;border: none;cursor: pointer;}.c > button svg,.c__indicators svg,[name=prev-icon]::slotted(svg),[name=next-icon]::slotted(svg){display: block;height: var(--arrow-size, 48px);width: var(--arrow-size, 48px);fill: var(--icon-color, currentcolor);}.c__next{right: 0;}.c__indicators{left: 0;width: 100%;height: var(--arrow-size, 48px);display: flex;justify-content: center;}.c__indicators button{height: var(--arrow-size, 48px);}.c__indicators svg{height: var(--indicator-size, 16px);width: var(--indicator-size, 16px);}.c__announcer{position: absolute;height: 1px;width: 1px;clip: rect(0 0 0 0);overflow: hidden;}</style><div class="c" part="carousel"><slot class="c__track" part="track" role="list"></slot><div class="c__indicators" part="indicators"></div><button class="c__prev" part="prev" aria-label="Go to previous slide"><slot name="prev-icon"><svg viewbox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/></svg></slot></button><button class="c__next" part="next" aria-label="Go to next slide"><slot name="next-icon"><svg viewbox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg></slot></button><div style="display: none;"><slot name="indicator-icon" class="c__i"><svg viewBox="0 0 24 24"><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/></svg></slot><slot name="indicator-icon-active" class="c__i__active"><svg viewBox="0 0 24 24"><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z"/></svg></slot></div><div class="c__announcer" aria-live="polite" aria-atomic="true"></div></div>`
				}

				connectedCallback() {
					const c = this.shadowRoot

					// elements
					const track = c.querySelector('.c__track')
					const prev = c.querySelector('.c__prev')
					const next = c.querySelector('.c__next')
					const indicators = c.querySelector('.c__indicators')
					const announcer = c.querySelector('.c__announcer')

					// slotted indicator icons
					const iSlot = c.querySelector('.c__i').assignedElements()[0]
					const iActiveSlot = c
						.querySelector('.c__i__active')
						.assignedElements()[0]

					// default indicator icons
					const iDefault = c.querySelector('.c__i svg')
					const iActiveDefault = c.querySelector('.c__i__active svg')

					// get indicator html
					const i = (iSlot || iDefault).outerHTML
					const iActive = (iActiveSlot || iActiveDefault).outerHTML

					// prev button/method
					this.prev = () => {
						if (track.scrollLeft === 0) {
							track.scrollLeft = track.scrollWidth
						} else track.scrollLeft -= this.slides[0].offsetWidth
					}
					prev.addEventListener('click', this.prev)

					// next button/method
					this.next = () => {
						if (track.scrollLeft + track.offsetWidth + 2 > track.scrollWidth) {
							track.scrollLeft = 0
						} else track.scrollLeft += this.slides[0].offsetWidth
					}
					next.addEventListener('click', this.next)

					// goToSlide method
					this.goToSlide = (index) => {
						track.scrollLeft = this.slides[index].offsetLeft
					}

					// hide controls if all slides are visible
					this.toggleControls = () => {
						const display =
							track.scrollWidth === track.offsetWidth ? 'none' : ''
						prev.style.display = display
						next.style.display = display
						indicators.style.display = display
					}

					// announce visible slides to screen readers
					const announce = () => {
						const current = this.slides.filter(
							(slide) => slide.ariaHidden === 'false'
						)
						const from = +current[0].dataset.slideIndex + 1
						let to = +current[current.length - 1].dataset.slideIndex + 1
						to = to === from ? '' : '-' + to
						const message = `Showing slide ${from}${to} of ${this.slides.length}`
						if (announcer.innerText !== message) announcer.innerText = message
					}

					// tiny debounce helper
					const debounce = (fn, ms) => {
						let timer
						return function () {
							clearTimeout(timer)
							let args = Array.prototype.slice.call(arguments)
							args.unshift(this)
							timer = setTimeout(fn.bind.apply(fn, args), ms)
						}
					}

					// handle resize (show/hide controls)
					new ResizeObserver(
						debounce((entries) => {
							entries.forEach(this.toggleControls)
						}, 500)
					).observe(track)

					// handle scroll (announce visible slides)
					track.addEventListener('scroll', debounce(announce, 500))

					// do all the things
					this.initCarousel = () => {
						// make sure first slide is first
						track.style.scrollSnapType = ''

						// remove old indicators
						indicators.innerHTML = ''

						// get current slides
						this.slides = track.assignedElements()

						// refresh intersect observer
						const observer = new IntersectionObserver(
							(entries) => {
								entries.forEach((entry) => {
									const slide = entry.target
									const { slideIndex } = slide.dataset
									const indicator = indicators.children[slideIndex]
									const visible = entry.isIntersecting

									slide.ariaHidden = !visible
									if (indicator) indicator.innerHTML = visible ? iActive : i

									// fire slide events
									slide.dispatchEvent(new Event(visible ? 'visible' : 'hidden'))
								})
							},
							{
								root: track,
								threshold: 0.5,
							}
						)

						// set up indicators
						this.slides.forEach((slide, n) => {
							slide.dataset.slideIndex = n
							slide.setAttribute('role', 'list-item')
							const indicator = document.createElement('button')
							indicator.ariaLabel = 'Go to slide ' + (n + 1)
							indicators.appendChild(indicator)
							indicator.addEventListener('click', () => {
								track.scrollLeft = slide.offsetLeft
							})
							observer.observe(slide)
						})

						// deferred tasks
						setTimeout(() => {
							track.style.scrollSnapType = 'x mandatory'
							this.toggleControls()
							announce()
						}, 1000)
					}

					// handle connected
					this.initCarousel()

					//handle content change
					track.addEventListener('slotchange', this.initCarousel)
				}
			}
			customElements.define('snappy-carousel', snappyCarousel)
	}
})()
