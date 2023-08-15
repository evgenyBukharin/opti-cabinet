export function makeHovers() {
	const stages = document.querySelectorAll(".support__col-stage");
	const contacts = document.querySelectorAll(".support__col-contact");
	const deals = document.querySelectorAll(".support__col-deal");
	const isCloseds = document.querySelectorAll(".support__col-isClosed");
	const created = document.querySelectorAll(".support__col-created");
	const comments = document.querySelectorAll(".support__col-comment");
	const categories = document.querySelectorAll(".support__col-category");
	const time = document.querySelectorAll(".support__col-time");
	const completed = document.querySelectorAll(".support__col-completed");

	const cols = [stages, contacts, deals, isCloseds, created, comments, categories, time, completed];

	for (let i = 0; i < cols.length; i++) {
		cols[i].forEach((hoverElement) => {
			hoverElement.onmouseenter = () => {
				cols[i].forEach((el) => {
					el.classList.add("support__cell-hovered");
				});
				if (cols[i - 1]) {
					cols[i - 1][0].classList.add("support__cell-header-hide-after");
				}
				if (cols[i]) {
					cols[i][0].classList.add("support__cell-header-hide-after");
				}
			};
			hoverElement.onmouseleave = () => {
				cols[i].forEach((el) => {
					el.classList.remove("support__cell-hovered");
				});
				if (cols[i - 1]) {
					cols[i - 1][0].classList.remove("support__cell-header-hide-after");
				}
				if (cols[i]) {
					cols[i][0].classList.remove("support__cell-header-hide-after");
				}
			};
		});
	}
}
