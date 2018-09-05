(function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
	1: [function (require, module, exports) {
		"use strict"
		window.addEventListener('DOMContentLoaded', function () {
			var tab = require("../parts/tab.js");
			var modal = require("../parts/modal.js");
			var ajax = require("../parts/ajax.js");
			var slider = require("../parts/slider.js");
			var calc = require("../parts/calc.js");
			var timer = require("../parts/timer.js");
			tab();
			modal();
			ajax();
			slider();
			calc();
			timer();
		});


	}, { "../parts/ajax.js": 2, "../parts/calc.js": 3, "../parts/modal.js": 4, "../parts/slider.js": 5, "../parts/tab.js": 6, "../parts/timer.js": 7 }], 2: [function (require, module, exports) {
		"use strict";

		function ajax() {
			// form
			var message = new Object();
			message.loading = "Загрузка.....";
			message.success = "Спасибо, скоро мы с Вами свяжемся... ";
			message.failure = "Чтото пошло не так...";
			var form = document.getElementsByClassName('main-form')[0],
				input = form.getElementsByTagName('input'),
				statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			form.addEventListener('submit', function (event) {
				event.preventDefault();
				form.appendChild(statusMessage); //AJAX

				var request = new XMLHttpRequest();
				request.open("POST", 'server.php');
				request.setRequestHeader("Content-type", "Application/x-www-form-urlencoded");
				var formData = new FormData(form);
				request.send(form);

				request.onreadystatechange = function () {
					if (request.readyState < 4) {
						statusMessage.innerHTML = message.loading;
					} else if (request.readyState === 4) {
						if (request.status === 200 && request.status < 300) {
							statusMessage.innerHTML = message.success; //Добавление анимации или контента на страницу
						} else {
							statusMessage.contentText = message.failure;
						}
					}
				};

				for (var i = 0; i < input.length; i++) {
					input[i].value = ""; // очищаем инпут
				}
			}); // form contacts

			var contactForm = document.getElementsByClassName('contact-form')[0],
				inputContacts = contactForm.getElementsByTagName('input');
			statusMessage.classList.add('status');
			contactForm.addEventListener('submit', function (event) {
				event.preventDefault();
				contactForm.appendChild(statusMessage); // AJAX

				var request = new XMLHttpRequest();
				request.open('POST', 'server.php');
				request.setRequestHeader("Content-type", "Application/x-www-form-urlencoded");
				var FormContacts = new FormData(contactForm);
				request.send(contactForm);

				request.onreadystatechange = function () {
					if (request.readyState < 4) {
						statusMessage.innerHTML = message.loading;
					} else if (request.readyState === 4) {
						if (request.status === 200 && request.status < 300) {
							statusMessage.innerHTML = message.success; //Добавление анимации или контента на страницу
						} else {
							statusMessage.contentText = message.failure;
						}
					}
				};

				for (var i = 0; i < inputContacts.length; i++) {
					inputContacts[i].value = ""; // очищаем инпут
				}
			});
		}

		module.exports = ajax;
	}, {}], 3: [function (require, module, exports) {
		function calc() {
			//calc
			var persons = document.getElementsByClassName('counter-block-input')[0],
				restDays = document.getElementsByClassName('counter-block-input')[1],
				place = document.getElementById('select'),
				totalValue = document.getElementById('total'),
				personsSum = 0,
				daysSum = 1,
				total = 0;
			totalValue.innerHTML = 0;


			persons.addEventListener('change', function () {
				personsSum = +this.value;
				total = (daysSum * personsSum) * 4000;

				if (persons.value == "" || persons.value == "0" || restDays.value == "" || restDays.value == "0") {
					totalValue.innerHTML = 0;

				} else {
					totalValue.innerHTML = a * this.options[this.selectedIndex].value;
				}

			});


			restDays.addEventListener('change', function () {
				daysSum = +this.value;
				total = (daysSum * personsSum) * 4000;

				if (persons.value == "" || persons.value == "0" || restDays.value == "" || restDays.value == "0") {
					totalValue.innerHTML = 0;
				} else {
					totalValue.innerHTML = a * this.options[this.selectedIndex].value;
				}
			});


			place.addEventListener('change', function () {
				if (persons.value == "" || persons.value == "0" || restDays.value == "" || restDays.value == "0") {
					totalValue.innerHTML = 0;
				} else {
					var a = total;
					totalValue.innerHTML = a * this.options[this.selectedIndex].value;
				}
			});
			// замена символов restDays

			restDays.onkeyup = function () {
				return this.value = this.value.replace(/[\D]/g, '');
			}; // замена символов  persons


			persons.onkeyup = function () {
				return this.value = this.value.replace(/[\D]/g, '');
			};
		}

		module.exports = calc;
	}, {}], 4: [function (require, module, exports) {

		function modal() {
			// модалка 
			var more = document.querySelector('.more');
			var overlay = document.querySelector('.overlay');
			var close = document.querySelector('.popup-close');
			more.addEventListener('click', function () {
				this.classList.add('more-splash');
				overlay.style.display = "block";
				document.body.style.overflow = "hidden";
			});
			close.addEventListener('click', function () {
				overlay.style.display = 'none';
				more.classList.remove('more-splash');
				document.body.style.overflow = "";
			}); // модалка на кнопку узнать подробнее

			var knowMore = document.querySelectorAll('.description-btn'); // получение версии браузера

			function get_name_browser() {
				// получаем данные userAgent
				var ua = navigator.userAgent;
				if (ua.search(/Chrome/) > 0) return 'Google Chrome';
				if (ua.search(/Firefox/) > 0) return 'Firefox';
				if (ua.search(/Opera/) > 0) return 'Opera';
				if (ua.search(/Safari/) > 0) return 'Safari';
				if (ua.search(/MSIE/) > 0) return 'IE';
				return 'Не определен';
			}

			var browser = get_name_browser(); //  цикл

			if (window.screen.width > 600) {
				var _loop = function _loop(i) {
					knowMore[i].addEventListener('click', function () {
						if (i === 2 && window.screen.width > 600 && browser != "IE") {
							knowMore[i].classList.remove('more-splash'); //удалил огненную кнопку

							knowMore[i].classList.add('animation-open'); //добавил свой класс анимации

							overlay.classList.remove('fade'); //удалил у оверлея эффект выпадания

							overlay.classList.add('animation-open'); //добавил свой эффект выпадания

							overlay.style.display = 'block';
							document.body.style.overflow = 'hidden'; //удалил прокрутку на фоне
						}

						if (i === 3) {
							knowMore[i].classList.remove('more-splash');
							document.body.style.overflow = 'hidden';
							overlay.classList.remove('fade');
							overlay.classList.add('active');
							var opacit = 0.1;
							overlay.style.display = 'block';
							var timer = setInterval(function () {
								if (opacit >= 1) {
									clearInterval(timer);
								}

								overlay.style.opacity = opacit;
								overlay.style.filter = 'alpha(opacity=' + opacit * 100 + ")";
								opacit += opacit + 0.1;
							}, 10);
						} else {
							knowMore[i].classList.add('more-splash');
							overlay.classList.add('fade');
							overlay.style.display = 'block';
							document.body.style.overflow = 'hidden';
						}
					});
				};

				for (var i = 0; i < knowMore.length; i++) {
					_loop(i);
				}
			} else {
				var _loop2 = function _loop2(i) {
					knowMore[i].addEventListener('click', function () {
						knowMore[i].classList.remove('more-splash');
						overlay.classList.remove('fade');
						overlay.style.display = "block";
						document.body.style.overflow = "hidden";
					});
				};

				for (var i = 0; i < 4; i++) {
					_loop2(i);
				}
			}

			;
		}

		module.exports = modal;
	}, {}], 5: [function (require, module, exports) {
		function slider() {
			//slider
			var slideIndex = 1,
				slides = document.getElementsByClassName('slider-item'),
				prev = document.querySelector(".prev"),
				next = document.querySelector('.next'),
				dotsWrap = document.querySelector('.slider-dots'),
				dots = document.getElementsByClassName('dot');
			showSlides(slideIndex);

			function showSlides(n) {
				if (n > slides.length) {
					slideIndex = 1;
				}

				;

				if (n < 1) {
					slideIndex = slides.length;
				}

				;

				for (var i = 0; i < slides.length; i++) {
					slides[i].style.display = 'none';
				}

				;

				for (var _i = 0; _i < dots.length; _i++) {
					dots[_i].classList.remove("dot-active");
				}

				;
				slides[slideIndex - 1].style.display = "block";
				dots[slideIndex - 1].classList.add('dot-active');
			}

			;

			function plusSlides(n) {
				showSlides(slideIndex += n);
			}

			;

			function currentSlide(n) {
				showSlides(slideIndex = n);
			}

			;
			prev.addEventListener('click', function () {
				plusSlides(-1);
			});
			next.addEventListener('click', function () {
				plusSlides(1);
			});
			dotsWrap.addEventListener('click', function (event) {
				for (var i = 0; i < dots.length + 1; i++) {
					if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
						currentSlide(i);
					}
				}
			});
		}

		module.exports = slider;
	}, {}], 6: [function (require, module, exports) {
		function tab() {
			var tab = document.getElementsByClassName('info-header-tab'),
				tabContent = document.getElementsByClassName('info-tabcontent'),
				info = document.getElementsByClassName('info-header')[0];

			function hideTabContent(a) {
				for (var i = a; i < tabContent.length; i++) {
					tabContent[i].classList.remove('show');
					tabContent[i].classList.add('hide');
				}
			}

			hideTabContent(1);

			function showTabContent(b) {
				if (tabContent[b].classList.contains('hide')) {
					hideTabContent(0);
					tabContent[b].classList.remove('hide');
					tabContent[b].classList.add('show');
				}
			}

			info.addEventListener('click', function (event) {
				var target = event.target;

				if (target.className == 'info-header-tab') {
					for (var i = 0; i < tab.length; i++) {
						if (target == tab[i]) {
							showTabContent(i);
							break;
						}
					}
				}
			});
		}

		module.exports = tab;
	}, {}], 7: [function (require, module, exports) {
		function timer() {
			//  timer
			var deadLine = '2018-09-17'; // расчет времени в милисекундах от того времени которое задано
			// расчет времени в милисекундах от того времени которое задано

			function getTimeRemaining(endtime) {
				var t = Date.parse(endtime) - Date.parse(new Date()),
					seconds = Math.floor(t / 1000 % 60),
					minutes = Math.floor(t / 1000 / 60 % 60),
					hours = Math.floor(t / (1000 * 60 * 60));
				return {
					'total': t,
					'hours': hours,
					'minutes': minutes,
					'seconds': seconds
				};
			}

			;

			function setClock(id, endtime) {
				var timer = document.getElementById(id),
					hours = timer.querySelector('.hours'),
					minutes = timer.querySelector('.minutes'),
					seconds = timer.querySelector('.seconds');

				function updateClock() {
					var t = getTimeRemaining(endtime);
					hours.innerHTML = t.hours;
					minutes.innerHTML = t.minutes;
					seconds.innerHTML = t.seconds;

					if (t.total == 0) {
						clearInterval(timeInterval);
					}

					if (t.total < 0) {
						hours.innerHTML = "00";
						minutes.innerHTML = "00";
						seconds.innerHTML = "00";
					}

					if (t.hours < 10) {
						hours.innerHTML = "0".concat(t.hours);
					}

					;

					if (t.minutes < 10) {
						minutes.innerHTML = "0".concat(t.minutes);
					}

					;

					if (t.seconds < 10) {
						seconds.innerHTML = "0".concat(t.seconds);
					}

					;
				}

				updateClock();
				var timeInterval = setInterval(updateClock, 1000);
			}

			setClock('timer', deadLine);
		}

		module.exports = timer;
	}, {}]
}, {}, [1]);
