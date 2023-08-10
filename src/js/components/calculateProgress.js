const progressBars = document.querySelectorAll(".hero__progress");
progressBars.forEach((bar) => {
	let track = bar.querySelector(".hero__track");
	let currentCountEl = bar.parentNode.querySelector(".hero__text-current");
	let currentCount = currentCountEl.getAttribute("data-current");
	if (currentCount == 0) {
		currentCountEl.classList.add("hero__text-stat-bigger-red");
		track.classList.add("hero__track-red");
		return;
	}
	let allCount = bar.parentNode.querySelector(".hero__text-all").getAttribute("data-all");
	let widthPersent = (currentCount / allCount) * 100;
	track.style.width = widthPersent + "%";
});
