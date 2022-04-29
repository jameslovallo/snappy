export default (() => {
	const loaded = typeof customElements.get('snappy-carousel') === 'function'
	switch (loaded) {
		case true:
			break
		case false:
			class snappyCarousel extends HTMLElement {
				constructor() {
					super()
					this.attachShadow({ mode: 'open' })
					this.shadowRoot.innerHTML = `
							<style>
								:host {display: block;}
								.c {
									display: flex;
									flex-direction: column;
									justify-content: var(--arrow-alignment, flex-end);
									position: relative;
									overflow: hidden;
								}
								.c__track {
									display: flex;
									overflow-x: scroll;
									scroll-behavior: smooth;
									margin: 0 calc(-1 * var(--gap, 0));
									-ms-overflow-style: none;
									scrollbar-width: none;
								}
								.c__track::-webkit-scrollbar {
									display: none;
								}
								.c__track::slotted(*) {
									flex-shrink: 0;
									scroll-snap-align: start;
									width: var(--mobile, 100%);
									padding: 0 var(--gap, 0);
									box-sizing: border-box;
								}
								@media (min-width: 768px) {
									.c__track::slotted(*) {
										width: var(--tablet, 50%);
									}
								}
								@media (min-width: 1024px) {
									.c__track::slotted(*) {
										width: var(--desktop, 33.33%);
									}
								}
								.c > button {
									position: absolute;
								}
								.c > button, .c__indicators > button {
									color: inherit;
									background: none;
									border: none;
									cursor: pointer;
								}
								.c > button svg,
								.c__indicators > button svg,
								[name=prev-icon]::slotted(*),
								[name=next-icon]::slotted(*) {
									display: block;
									height: var(--arrow-size, 48px);
									width: var(--arrow-size, 48px);
									fill: var(--icon-color, currentcolor);
								}
								.c__next {
									right: 0;
								}
								.c__indicators {
									left: 0;
									width: 100%;
									height: var(--arrow-size, 48px);
									display: flex;
									justify-content: center;
								}
								.c__indicators button {
									height: var(--arrow-size, 48px);
								}
								.c__indicators button svg {
									height: var(--indicator-size, 16px);
									width: var(--indicator-size, 16px);
								}
							</style>
							
							<div class="c" part="carousel">
								<slot class="c__track" part="track"></slot>
								<div class="c__indicators" part="indicators"></div>
								<button class="c__prev" part="prev">
									<slot name="prev-icon">
										<svg viewbox="0 0 24 24">
											<path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
										</svg>
									</slot>
								</button>
								<button class="c__next" part="next">
									<slot name="next-icon">
										<svg viewbox="0 0 24 24">
											<path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
										</svg>
									</slot>
								</button>
								<div style="display: none;">
									<slot name="indicator-icon" class="c__i">
										<svg viewBox="0 0 24 24">
											<path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
										</svg>
									</slot>
									<slot name="indicator-icon-active" class="c__i__active">
										<svg viewBox="0 0 24 24">
											<path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" />
										</svg>
									</slot>
								</div>
							</div>
						`
				}

				connectedCallback() {
					const c = this.shadowRoot
					const track = c.querySelector('.c__track')
					const prev = c.querySelector('.c__prev')
					const next = c.querySelector('.c__next')
					const indicators = c.querySelector('.c__indicators')

					// get indicator icons
					const iSlot = c.querySelector('.c__i').assignedElements()[0]
					const iActiveSlot = c
						.querySelector('.c__i__active')
						.assignedElements()[0]
					const iDefault = c.querySelector('.c__i svg')
					const iActiveDefault = c.querySelector('.c__i__active svg')

					// assign indicator icons
					let i = (iSlot || iDefault).outerHTML
					let iActive = (iActiveSlot || iActiveDefault).outerHTML

					// methods
					this.prev = () => {
						if (track.scrollLeft === 0) {
							track.scrollLeft = track.scrollWidth
						} else track.scrollLeft -= this.slides[0].offsetWidth
					}
					prev.addEventListener('click', this.prev)

					this.next = () => {
						if (track.scrollLeft + track.offsetWidth + 2 > track.scrollWidth) {
							track.scrollLeft = 0
						} else track.scrollLeft += this.slides[0].offsetWidth
					}
					next.addEventListener('click', this.next)

					this.goToSlide = (index) => {
						track.scrollLeft = this.slides[index].offsetLeft
					}

					this.toggleControls = () => {
						const display =
							track.scrollWidth === track.offsetWidth ? 'none' : ''
						prev.style.display = display
						next.style.display = display
						indicators.style.display = display
					}

					// hide controls if all slides showing
					const debounce = (ms, fn) => {
						let timer
						return function () {
							clearTimeout(timer)
							let args = Array.prototype.slice.call(arguments)
							args.unshift(this)
							timer = setTimeout(fn.bind.apply(fn, args), ms)
						}
					}

					new ResizeObserver(
						debounce(500, (entries) => {
							entries.forEach(this.toggleControls)
						})
					).observe(track)

					// handle slot change
					track.addEventListener('slotchange', () => {
						// disable snap to prevent starting on wrong slide
						track.style.scrollSnapType = ''

						// get slides
						this.slides = track.assignedElements()

						// activate indicators
						const observer = new IntersectionObserver(
							(entries) => {
								entries.forEach((entry) => {
									const slideIndex = this.slides.indexOf(entry.target)
									const indicator = indicators.children[slideIndex]
									if (indicator) {
										indicator.innerHTML = entry.isIntersecting ? iActive : i
									}
								})
							},
							{
								root: track,
								threshold: 0.5,
							}
						)

						indicators.innerHTML = ''

						this.slides.forEach((slide) => {
							const indicator = document.createElement('button')
							indicators.appendChild(indicator)
							indicator.addEventListener('click', () => {
								track.scrollLeft = slide.offsetLeft
							})
							observer.observe(slide)
						})

						setTimeout(() => {
							// re-enable snap
							track.style.scrollSnapType = 'x mandatory'
							// check if all slides showing
							this.toggleControls()
						}, 1000)
					})
				}
			}
			customElements.define('snappy-carousel', snappyCarousel)
	}
})()
