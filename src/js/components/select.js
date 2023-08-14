const select = document.querySelector(".deals__select");
select.addEventListener("change", () => {
	let url = new URL(window.location.href);
	if (url.searchParams.get("chunkSize") !== select.value) {
		url.searchParams.set("chunkSize", select.value);
		window.location.href = url.href;
	}
});
