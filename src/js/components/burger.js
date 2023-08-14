const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
if (burger && menu) {
	burger.addEventListener("click", () => {
		burger.classList.toggle("burger--active");
		menu.classList.toggle("menu-active");
	});
} else {
	console.log("no burger or menu");
}
