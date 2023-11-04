import axios from "axios";
import Swiper, { Navigation, Pagination, Thumbs } from "swiper";
Swiper.use([Navigation, Pagination, Thumbs]);

import { makeHovers } from "./cols-hover-support";
import { applyHorizontalScroll } from "./horizontal-scroll-wheel";

const loader = document.querySelector(".loader");
const loaderTitle = document.querySelector(".loader__title");
const loaderSpinner = document.querySelector(".loader__spinner");
const loaderButton = document.querySelector(".loader__button");

function hideLoader() {
	loader.classList.add("loader-hidden");
}

function showError(errorText) {
	loaderTitle.innerHTML = errorText;
	loaderSpinner.style.animationPlayState = "paused";
	loaderButton.classList.add("loader__button-visible");
}

loaderButton.addEventListener("click", () => {
	hideLoader();
});

function showLoader() {
	loader.classList.remove("loader-hidden");
}

let sliderData = [];
if (document.querySelector(".support")) {
	showLoader();
	axios
		.get("https://opti.ooo/cabinet/webhook/webhook_support.php")
		.then((r) => {
			sliderData = r.data.supportSliderData;
			makeSlider();
			makeHovers();
			applyHorizontalScroll();
			updateTime(r.data.timeData);
			hideLoader();
		})
		.catch((e) => {
			console.log(e);
			showError(e.message);
		});
}

function makeSlider() {
	// верстка внутреннего элемента списка
	const supportItemInner = `
		<div class="support__cell support__col-category"></div>
		<div class="support__cell support__col-created"></div>
		<div class="support__cell support__cell-deal support__col-deal"></div>
		<div class="support__cell support__col-comment"></div>
		<div class="support__cell support__col-time"></div>
		<div class="support__cell support__col-completed"></div>
		<div class="support__cell support__col-contact"></div>
		<div class="support__cell support__col-stage"></div>
		<div class="support__cell support__col-isClosed"></div>
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
                <div class="support__cell support__cell-header support__col-category">
                    Категория обращения
                </div>
                <div class="support__cell support__cell-header support__col-created">
                    Дата </br> создания
                </div>
                <div class="support__cell support__cell-header support__col-deal">
                    Название сделки
                </div>
                <div class="support__cell support__cell-header support__col-comment">
                    Комментарий
                </div>
                <div class="support__cell support__cell-header support__col-time">
                    Затраченное время
                </div>
                <div class="support__cell support__cell-header support__col-completed">
                    Выполнены работы (информация для клиента/проекта)
                </div>
                <div class="support__cell support__cell-header support__col-contact">Контакт</div>
                <div class="support__cell support__cell-header support__col-stage">
                    Стадия сделки
                </div>
                <div class="support__cell support__cell-header support__col-isClosed">
                    Сделка закрыта
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
			if (supportItem.querySelector(".support__col-comment img")) {
				let img = supportItem.querySelector(".support__col-comment img");
				let src = img.getAttribute("src");
				img.outerHTML = `<a style="text-decoration: underline;" href="${src}">Прикрепленное изображение</a>`;
			}
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

function calculateProgress() {
	const progressBars = document.querySelectorAll(".progress-bar");
	if (progressBars) {
		progressBars.forEach((bar) => {
			let track = bar.querySelector(".progress-bar__track");
			let currentCountEl = bar.parentNode.querySelector(".progress-bar__text-current");
			let currentCount = currentCountEl.getAttribute("data-current");
			if (currentCount == 0) {
				currentCountEl.classList.add("progress-bar__text-stat-bigger-red");
				track.classList.add("progress-bar__track-red");
			} else {
				currentCountEl.classList.remove("progress-bar__text-stat-bigger-red");
				track.classList.remove("progress-bar__track-red");
			}
			let allCount = bar.parentNode.querySelector(".progress-bar__text-all").getAttribute("data-all");
			let widthPersent = (currentCount / allCount) * 100;
			if (widthPersent !== 0) {
				track.style.width = widthPersent + "%";
			} else {
				track.style.width = "4px";
			}
		});
	} else {
		console.log("no progressbars");
	}
}

function updateTime(timeData) {
	const workSpan = document.querySelector(".progress-bar__text-time-workH");
	const meetingSpan = document.querySelector(".progress-bar__text-time-meetH");
	workSpan.innerHTML = timeData.workTimeH;
	workSpan.setAttribute("data-current", timeData.workTimeH);
	meetingSpan.innerHTML = timeData.meetTimeH;
	meetingSpan.setAttribute("data-current", timeData.meetTimeH);
	const overworkLastMonthSpan = document.querySelector(".progress-bar__text-all-lastmonth-overwork");
	overworkLastMonthSpan.innerHTML = timeData.workTimeLastMonth;
	calculateProgress();
}
