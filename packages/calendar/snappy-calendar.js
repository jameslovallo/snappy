export default (() => {
	switch (!!customElements.get('snappy-calendar')) {
		case true:
			break
		case false:
			class cal extends HTMLElement {
				constructor() {
					super()
					this.attachShadow({ mode: 'open' })

					const prevAria =
						this.getAttribute('prev-aria-label') || 'Show Previous Month'
					const nextAria =
						this.getAttribute('next-aria-label') || 'Show Next Month'

					this.shadowRoot.innerHTML = `<style>:host {display: block;}:host * {box-sizing: border-box;}[part=header] {display: flex;align-items: center;justify-content: space-between;margin-bottom: 1rem;}[part=prev],[part=next] {background: none;border: none;cursor: pointer;padding: 0;height: 3rem;width: 3rem;display: flex;align-items: center;justify-content: center;}[part=prev] svg,[part=next] svg{fill: currentcolor;display: block;}:host([format=list]) [part=grid] [part=day] {margin-bottom: 1.5rem;}:host([format=list]) [part=grid] [part=day]:before {content: attr(data-label)}:host([format=list]) [part=grid] [part=day]:empty {display: none;}:host([format=grid]) [part=grid] {display: grid;grid-template-columns: repeat(7, 1fr);gap: .25rem;}:host([format=grid]) [part=grid] [part=day] {padding: 0.25rem;min-height: 5rem;}:host([format=grid]) [part=grid] [part=day]:before {content: attr(data-numeral);}[part=event] {margin: 0.75em 0;}[part=event-name] {display: block;font-size: .9rem;text-decoration: none;}[part=event-time] {font-size: .75rem;opacity: 0.75;}</style><div part="header"><button part="prev" aria-label="${prevAria}"><slot name="prev"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" /></svg></slot></button><div part="date"></div><button part="next" aria-label="${nextAria}"><slot name="next"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg></slot></button></div><div part="grid"></div>`

					const cal = this.shadowRoot
					const prev = cal.querySelector('[part=prev]')
					const next = cal.querySelector('[part=next]')
					this.date = cal.querySelector('[part=date]')
					this.grid = cal.querySelector('[part=grid]')

					const d = new Date()
					this.selectedMonth = d.getMonth()
					this.selectedYear = d.getFullYear()

					prev.addEventListener('click', this.prev)
					next.addEventListener('click', this.next)
				}

				getEvents = (min, max) => {
					fetch(
						[
							'https://www.googleapis.com',
							'/calendar/v3/calendars/',
							this.getAttribute('calendar'),
							'/events?key=',
							this.getAttribute('key'),
							`&timeMin=${min}`,
							`&timeMax=${max}`,
							'&singleEvents=true',
							'&orderBy=startTime',
						].join('')
					)
						.then((res) => res.json())
						.then((events) => this.renderEvents(events))
				}

				goToMonth = (year, month) => {
					this.grid.innerHTML = ''
					const monthStart = new Date(year, month)
					const weekStart = monthStart.getDay()
					const min = monthStart.toISOString()
					const max = new Date(year, month + 1).toISOString()
					const days = new Date(year, month + 1, 0).getDate()

					this.date.innerHTML = monthStart.toLocaleDateString(this.locale, {
						month: 'long',
						year: 'numeric',
					})

					for (let i = 1; i <= days; i++) {
						let day = document.createElement('div')
						day.part = 'day'
						day.dataset.numeral = i

						day.dataset.label = new Date(year, month, i).toLocaleDateString(
							this.locale,
							{
								weekday: 'long',
								month: 'long',
								day: 'numeric',
							}
						)

						this.grid.appendChild(day)

						if (i === 1) {
							day.style.gridColumnStart = weekStart + 1
						}
					}

					this.getEvents(min, max)
				}

				renderEvents = (events) => {
					const localTime = (date) => {
						return date.toLocaleString(this.locale, {
							hour: 'numeric',
							minute: 'numeric',
						})
					}

					events.items.forEach((item) => {
						const start = new Date(item.start.dateTime)
						const startDate = start.getDate()
						const startTime = localTime(start)
						const endTime = localTime(new Date(item.end.dateTime))
						const day = this.grid.querySelector(
							`[part=day]:nth-child(${startDate})`
						)

						day.innerHTML += `<div part="event"><a part="event-name" href="${item.htmlLink}" target="_blank">${item.summary}</a><span part="event-time">${startTime} - ${endTime}</span></div>`
					})
				}

				prev = () => {
					if (this.selectedMonth > 0) {
						this.selectedMonth--
					} else {
						this.selectedMonth = 11
						this.selectedYear--
					}
					this.goToMonth(this.selectedYear, this.selectedMonth)
				}

				next = () => {
					if (this.selectedMonth < 11) {
						this.selectedMonth++
					} else {
						this.selectedMonth = 0
						this.selectedYear++
					}
					this.goToMonth(this.selectedYear, this.selectedMonth)
				}

				connectedCallback() {
					this.locale =
						this.getAttribute('locale') || navigator.language || undefined

					if (!this.hasAttribute('format')) {
						const mq = matchMedia('(min-width: 1024px)')
						const setFormat = () => {
							this.setAttribute('format', mq.matches ? 'grid' : 'list')
						}
						setFormat()
						mq.addEventListener('change', setFormat)
					}

					this.goToMonth(this.selectedYear, this.selectedMonth)
				}

				static get observedAttributes() {
					return ['calendar, key, locale']
				}

				attributeChangedCallback() {
					this.connectedCallback()
				}
			}

			customElements.define('snappy-calendar', cal)
	}
})()
