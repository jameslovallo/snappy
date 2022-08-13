export default (() => {
	!customElements.get('snappy-tabs') &&
		customElements.define(
			'snappy-tabs',
			class extends HTMLElement {
				constructor() {
					super();
					this.sr = this.attachShadow({ mode: "open" });
					this.type = this.getAttribute("type");
		
					const bp = this.getAttribute("breakpoint");
					if (bp) {
						const mq = matchMedia(`(min-width: ${bp})`);
						this.type = mq.matches ? "tabs" : "accordion";
						mq.addEventListener("change", (e) => {
							this.type = mq.matches ? "tabs" : "accordion";
							this.connectedCallback();
						});
					}
		
					this.template = `
						<style>
							:host {
								border: 1px solid currentcolor;
								border-radius: 4px;
								display: block;
								overflow: hidden;
								position: relative;
							}
							details[open] summary {
								border-bottom: 1px solid currentcolor;
								font-weight: bold;
							}
							details:not(:last-of-type) {
								border-bottom: 1px solid currentcolor
							}
							summary {
								cursor: pointer;
								box-sizing: border-box;
								display: block;
								padding: 1rem;
							}
							summary:marker { display: none }
							summary::-webkit-details-marker { display: none }
							summary * { font: inherit; margin: 0; }
							summary + div { left: 0; right: 0; padding: 1rem }
							summary + div *:first-child { margin-top: 0 }
							summary + div *:last-child { margin-bottom: 0 }
						</style>
						${this.innerHTML}
					`;
				}
		
				connectedCallback() {
					this.sr.innerHTML = this.template;
		
					this.sr.querySelectorAll("summary").forEach((s) => {
						s.setAttribute("part", "tab");
					});
		
					this.sr.querySelectorAll("summary + *").forEach((s) => {
						s.setAttribute("part", "panel");
					});
		
					if (this.type === "tabs") {
						this.sr.innerHTML += `
							<style>
								:host { padding-top: var(--padding-top) }
								details:not(:last-of-type) { border-bottom: 0 }
								details:not(:last-of-type) summary {
									border-right: 1px solid currentcolor;
								}
								summary { border-bottom: 1px solid currentcolor }
								[part=indicator] {
									background: white;
									height: 2px;
									position: absolute;
									top: calc(var(--padding-top) - 2px);
									transition: 0.33s;
								}
							</style>
							<div part="indicator"></div>
						`;
		
						const tabCount = this.children.length;
						const indicator = this.sr.querySelector("[part=indicator]");
						const details = this.sr.querySelectorAll("details");
		
						details.forEach((d, i) => {
							const tab = d.querySelector("summary");
							const panel = d.querySelector("summary + *");
							const rm = matchMedia("prefers-reduced-motion").matches;
		
							this.setAttribute("style", "--padding-top: " + tab.clientHeight + "px");
							tab.style.position = "absolute";
							tab.style.top = 0;
							tab.style.width = 100 / tabCount + "%";
							tab.style.left = (100 / tabCount) * i + "%";
		
							if (d.open) {
								this.open = i;
								indicator.style.left = tab.style.left;
							}
							indicator.style.width = 100 / tabCount + "%";
		
							tab.addEventListener("click", () => {
								indicator.style.left = tab.style.left;
								if (!rm && i !== this.open) {
									const direction = `translateX(${i < this.open ? "-" : ""}100%)`;
									panel.animate(
										[
											{ opacity: 0, transform: direction },
											{ opacity: 0.33 },
											{ opacity: "1", transform: "translateX(0)" }
										],
										{
											duration: 333,
											iterations: 1,
											easing: "linear"
										}
									);
								}
								this.open = i;
								details.forEach((d) => (d.open = false));
							});
						});
					}
				}
			}
		)
})()
