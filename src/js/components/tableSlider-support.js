import axios from "axios";
import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
Swiper.use([Navigation, Pagination, Thumbs]);

import { makeHovers } from "./cols-hover-support";
import { applyHorizontalScroll } from "./horizontal-scroll-wheel";

let sliderData = [];
if (document.querySelector(".support")) {
	axios
		.get("http://localhost:3000/supportData")
		.then((r) => {
			sliderData = r.data;
			makeSlider();
			makeHovers();
			applyHorizontalScroll();
		})
		.catch((e) => {
			console.log(e);
		});
}

function makeSlider() {
	// верстка внутреннего элемента списка
	const supportItemInner = `
		<div class="support__cell support__col-stage"></div>
		<div class="support__cell support__col-contact"></div>
		<div class="support__cell support__cell-deal support__col-deal"></div>
		<div class="support__cell support__col-isClosed"></div>
		<div class="support__cell support__col-created"></div>
		<div class="support__cell support__col-comment"></div>
		<div class="support__cell support__col-category"></div>
		<div class="support__cell support__col-time"></div>
		<div class="support__cell support__col-completed"></div>
	`;

	const sliderWrapper = document.querySelector(`.support__wrapper`);
	const formattedData = [];

	// получаем гет параметр
	const urlParams = new URLSearchParams(window.location.search);
	let chunkSize = 8;
	if (urlParams.get("chunkSize") !== null) {
		chunkSize = +urlParams.get("chunkSize");
	}

	const select = document.querySelector(".support__select");
	let selectOptions = [5, 8, 10, 15];
	if (!selectOptions.includes(chunkSize)) {
		selectOptions.push(chunkSize);
		selectOptions.sort((a, b) => a - b);
	}
	[...new Set(selectOptions)].forEach((option) => {
		let optionEl = document.createElement("option");
		optionEl.setAttribute("value", option);
		optionEl.innerHTML = option;
		select.appendChild(optionEl);
	});
	select.value = chunkSize;

	for (let i = 0; i < sliderData.length; i += chunkSize) {
		const chunk = sliderData.slice(i, i + chunkSize);
		formattedData.push(chunk);
	}

	formattedData.forEach((array) => {
		// создаем новый слайд
		let supportSlide = document.createElement("div");
		supportSlide.classList = `swiper-slide support__slide`;
		supportSlide.innerHTML = `
			<div class="support__row">
				<div class="support__cell support__cell-header support__col-stage">
					Стадия сделки
				</div>
				<div class="support__cell support__cell-header support__col-contact">Контакт</div>
				<div class="support__cell support__cell-header support__col-deal">
					Название сделки
				</div>
				<div class="support__cell support__cell-header support__col-isClosed">
					Сделка закрыта
				</div>
				<div class="support__cell support__cell-header support__col-created">
					Дата </br> создания
				</div>
				<div class="support__cell support__cell-header support__col-comment">
					Комментарий
				</div>
				<div class="support__cell support__cell-header support__col-category">
					Категория обращения
				</div>
				<div class="support__cell support__cell-header support__col-time">
					Затраченное время
				</div>
				<div class="support__cell support__cell-header support__col-completed">
					Выполнены работы (информация для клиента/проекта)
				</div>
			</div>
		`;
		array.forEach((row) => {
			// создем новый айтем
			let supportItem = document.createElement("div");
			supportItem.classList = "support__row";
			supportItem.innerHTML = supportItemInner;

			// изменяем контент внутри
			supportItem.querySelector(".support__col-stage").innerHTML = row.stage;
			supportItem.querySelector(".support__col-contact").innerHTML = row.contact;
			supportItem.querySelector(".support__col-deal").innerHTML = row.deal;
			supportItem.querySelector(".support__col-isClosed").innerHTML = row.isClosed;
			supportItem.querySelector(".support__col-created").innerHTML = row.created;
			supportItem.querySelector(".support__col-comment").innerHTML = row.comment;
			supportItem.querySelector(".support__col-category").innerHTML = row.category;
			supportItem.querySelector(".support__col-time").innerHTML = row.time;
			supportItem.querySelector(".support__col-completed").innerHTML = row.completed;

			// засовываем в лист
			supportSlide.appendChild(supportItem);
		});
		sliderWrapper.appendChild(supportSlide);
	});

	const sliderBullets = new Swiper(document.querySelector(`.support__container-slider-bullets`), {
		slidesPerView: 3,
		spaceBetween: 30,
		speed: 500,
	});

	const slider = new Swiper(document.querySelector(`.support__slider`), {
		slidesPerView: 1,
		spaceBetween: 30,
		speed: 500,
		allowTouchMove: false,
		pagination: {
			el: ".support__pagination",
			clickable: true,
			bulletActiveClass: "support__bullet-active",
			renderBullet: function (index, className) {
				return `<span class="swiper-slide support__bullet ${className}">${index + 1}</span>`;
			},
		},
		navigation: {
			nextEl: ".support__button-next",
			prevEl: ".support__button-prev",
		},
		thumbs: {
			swiper: sliderBullets,
		},
	});

	// общее количество
	const allCountSpan = document.querySelector(".support__text-all-value");
	allCountSpan.innerHTML = sliderData.length;

	// 1 page span
	const textContainer = document.querySelector(".support__text-page");
	const onePageSpan = document.querySelector(".support__text-page-1");
	const footerButtons = document.querySelectorAll(".support__button-control");
	if (formattedData.length == 1) {
		footerButtons.forEach((btn) => {
			btn.style.display = "none";
		});
		onePageSpan.style.marginRight = "0";
		onePageSpan.classList.remove("support__text-page-hidden");
		textContainer.style.marginRight = "0";
	}

	// проверка на наличие последнего ряда без нижней границы
	let lastSlide = formattedData[formattedData.length - 1];
	if (lastSlide.length !== chunkSize) {
		let lastRowNode = document.getElementById(lastSlide[lastSlide.length - 1].id);
		if (lastRowNode) {
			lastRowNode.style.boxShadow = "0 -1px 0 var(--border-color), 0 1px 0 var(--border-color)";
		}
	}

	// обработчик кнопки "последняя"
	const lastButton = document.querySelector(".support__button-last");
	lastButton.addEventListener("click", () => {
		slider.slideTo(formattedData.length - 1, 1000);
	});
}
