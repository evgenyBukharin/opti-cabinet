export function applyHorizontalScroll() {
	const slides = document.querySelectorAll(".support__slide");
	slides.forEach((slide) => {
		slide.addEventListener("wheel", (e) => {
			e.preventDefault();
			slide.scrollLeft += e.deltaY;
		});
	});
}
