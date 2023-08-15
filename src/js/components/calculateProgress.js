const progressBars = document.querySelectorAll(".progress-bar");
if (progressBars) {
	progressBars.forEach((bar) => {
		let track = bar.querySelector(".progress-bar__track");
		let currentCountEl = bar.parentNode.querySelector(".progress-bar__text-current");
		let currentCount = currentCountEl.getAttribute("data-current");
		if (currentCount == 0) {
			currentCountEl.classList.add("progress-bar__text-stat-bigger-red");
			track.classList.add("progress-bar__track-red");
			return;
		}
		let allCount = bar.parentNode.querySelector(".progress-bar__text-all").getAttribute("data-all");
		let widthPersent = (currentCount / allCount) * 100;
		track.style.width = widthPersent + "%";
	});
} else {
	console.log("no progressbars");
}
