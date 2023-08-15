import axios from "axios";
import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
Swiper.use([Navigation, Pagination, Thumbs]);

import { makeHovers } from "./cols-hover-deals";

let sliderData = [];

const tooltipText = {
	blue: "сделка в работе",
	green: "выплачена / оплачено",
	red: "к выплате / оплате",
};

if (document.querySelector(".deals")) {
	axios
		.get("http://localhost:3000/sliderData")
		.then((r) => {
			sliderData = r.data;
			makeSlider();
			makeHovers();
		})
		.catch((e) => {
			console.log(e);
		});
}

function makeSlider() {
	// верстка внутреннего элемента списка
	const dealsItemInner = `
		<div class="deals__cell deals__col-status">
			<span class="deals__tooltip"></span>
			<svg
				class=""
				xmlns="http://www.w3.org/2000/svg"
				width="40"
				height="40"
				viewBox="0 0 20 20"
				fill="none"
			>
				<circle cx="10" cy="10" r="2" fill="#EF940B" />
			</svg>
		</div>
		<div class="deals__cell deals__col-id"></div>
		<div class="deals__cell deals__col-date"></div>
		<div class="deals__cell deals__col-company"></div>
		<div class="deals__cell deals__col-deal"></div>
		<div class="deals__cell deals__col-summ"><span></span></div>
		<div class="deals__cell deals__col-cashback"><span>1 500 00 ₽</span></div>
	`;

	const sliderWrapper = document.querySelector(`.deals__wrapper`);
	const formattedData = [];

	// получаем гет параметр
	const urlParams = new URLSearchParams(window.location.search);
	let chunkSize = 8;
	if (urlParams.get("chunkSize") !== null) {
		chunkSize = +urlParams.get("chunkSize");
	}

	const select = document.querySelector(".deals__select");
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
		let dealsSlide = document.createElement("div");
		dealsSlide.classList = `swiper-slide deals__slide`;
		array.forEach((row) => {
			// создем новый айтем
			let dealsItem = document.createElement("div");
			dealsItem.classList = "deals__row";
			dealsItem.innerHTML = dealsItemInner;

			// изменяем контент внутри
			dealsItem.setAttribute("id", row.id);
			dealsItem.querySelector(".deals__col-status svg").classList.add(`deals__circle-${row.status}`);
			dealsItem.querySelector(".deals__tooltip").innerHTML = tooltipText[row.status];
			dealsItem.querySelector(".deals__tooltip").classList.add(`deals__tooltip-${row.status}`);
			dealsItem.querySelector(".deals__col-id").innerHTML = row.id;
			dealsItem.querySelector(".deals__col-date").innerHTML = row.date;
			dealsItem.querySelector(".deals__col-company").innerHTML = row.company;
			dealsItem.querySelector(".deals__col-deal").innerHTML = row.deal;
			dealsItem.querySelector(".deals__col-summ span").classList.add(`deals__col-summ-${row.summ.status}`);
			dealsItem.querySelector(".deals__col-summ span").innerHTML = row.summ.value;
			dealsItem
				.querySelector(".deals__col-cashback span")
				.classList.add(`deals__col-cashback-${row.cashback.status}`);
			dealsItem.querySelector(".deals__col-cashback span").innerHTML = row.cashback.value;

			// засовываем в лист
			dealsSlide.appendChild(dealsItem);
		});
		sliderWrapper.appendChild(dealsSlide);
	});

	const sliderBullets = new Swiper(document.querySelector(`.deals__container-slider-bullets`), {
		slidesPerView: 3,
		spaceBetween: 30,
		speed: 500,
	});

	const slider = new Swiper(document.querySelector(`.deals__slider`), {
		slidesPerView: 1,
		spaceBetween: 30,
		speed: 500,
		pagination: {
			el: ".deals__pagination",
			clickable: true,
			bulletActiveClass: "deals__bullet-active",
			renderBullet: function (index, className) {
				return `<span class="swiper-slide deals__bullet ${className}">${index + 1}</span>`;
			},
		},
		navigation: {
			nextEl: ".deals__button-next",
			prevEl: ".deals__button-prev",
		},
		thumbs: {
			swiper: sliderBullets,
		},
	});

	// общее количество
	const allCountSpan = document.querySelector(".deals__text-all-value");
	allCountSpan.innerHTML = sliderData.length;

	// 1 page span
	const textContainer = document.querySelector(".deals__text-page");
	const onePageSpan = document.querySelector(".deals__text-page-1");
	const footerButtons = document.querySelectorAll(".deals__button-control");
	if (formattedData.length == 1) {
		footerButtons.forEach((btn) => {
			btn.style.display = "none";
		});
		onePageSpan.style.marginRight = "0";
		onePageSpan.classList.remove("deals__text-page-hidden");
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
	const lastButton = document.querySelector(".deals__button-last");
	lastButton.addEventListener("click", () => {
		slider.slideTo(formattedData.length - 1, 1000);
	});
}
