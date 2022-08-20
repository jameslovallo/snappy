export default (() => {
	!customElements.get('snappy-pagination') &&
		// prettier-ignore
		customElements.define("snappy-pagination", class extends HTMLElement {
				constructor() {
					super();
					this.sr = this.attachShadow({ mode: "open" });
					this.page = Number(this.getAttribute("page")) || 1;
					this.spread = 2;
					this.total = 10;
				}
		
				setup(o) {
					if (o?.spread) this.spread = o.spread;
					if (o?.total) this.total = o.total;
		
					const rangeStart = this.page - this.spread;
					const rangeEnd = this.page + this.spread + 1;
					const ellipsis = `<slot name="ellipsis">...</slot>`;
					const fE = rangeStart > 2 ? ellipsis : "";
					const firstPage = `<button part="page">1</button>${fE}`;
					const lE = rangeEnd < this.total ? ellipsis : "";
					const lastPage = `${lE}<button part="page">${this.total}</button>`;
		
					let pages = "";
					for (let i = rangeStart; i < rangeEnd; i++) {
						if (i > 0 && i < this.total + 1) {
							const current = i === this.page ? "current-" : "";
							pages += `<button part="${current}page">${i}</button>`;
						}
					}
		
					this.sr.innerHTML = /* html */ `
						<style>
							:host, [part=wrapper] { display: flex; align-items: center; }
							:host { justify-content: space-between }
							[part=prev], [part*=page], [part=next] {
								background: transparent;
								border: none;
								cursor: pointer;
								display: flex;
								align-items: center;
								justify-content: center;
								padding: .5rem;
								color: inherit;
								font: inherit;
							}
							[part=current-page] { font-weight: bold }
							::slotted(svg) {
								fill: currentcolor;
								height: 1.5rem;
								width: 1.5rem;
							}
						</style>
						<button part="prev"><slot name="prev">❮</slot></button>
						<div part="wrapper">
							${rangeStart >= 2 ? firstPage : ""}
							${pages}
							${this.page < this.total - this.spread ? lastPage : ""}
						</div>
						<button part="next"><slot name="next">❯</slot></button>
					`;
		
					const prev = this.sr.querySelector("[part=prev]");
					prev.addEventListener("click", () => {
						if (this.page > 1) this.page--;
						this.dispatch();
					});
		
					const next = this.sr.querySelector("[part=next]");
					next.addEventListener("click", () => {
						if (this.page < this.total) this.page++;
						this.dispatch();
					});
		
					pages = this.sr.querySelectorAll("[part*=page]");
					pages.forEach((button) => {
						button.addEventListener("click", () => {
							this.page = Number(button.innerText);
							this.dispatch();
						});
					});
				}
		
				dispatch() {
					this.dispatchEvent(
						new CustomEvent("page-changed", { detail: { page: this.page } })
					);
					this.setup();
				}
			}
		)
})()
