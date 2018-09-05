function ajax(){

	let message = new Object();
	message.loading = "Загрузка...";
	message.success = "Спасибо! Скоро мы с вами свяжемся";
	message.failure = "Что-то пошло не так...";

	let form = document.getElementsByClassName('main-form')[0],
		input = form.getElementsByTagName('input'),
		statusMessage = document.createElement('div');
		statusMessage.classList.add('status');

		form.addEventListener('submit', function (event) {
			event.preventDefault();
			form.appendChild(statusMessage);});

		//AJAX
		let request = new XMLHttpRequest();
		request.open("POST", 'server.php');

		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		let formData = new FormData(form);
		request.send(formData);

		request.onreadystatechange = function(){
				if (request.readyState < 4){
					statusMessage.innerHTML = message.loading;
				} else if (request.readyState === 4) {
					if (request.status == 200 && request.status < 300){
						statusMessage.innerHTML = message.suссess;
						//Добавим контент на страницу
					}
					else {
						statusMessage.innerHTML = message.failure;
					}
				}
			};

			for (let i = 0; i < input.length; i++) {
				input[i].value = '';
				//очищаем поля ввода
			};
		// form contacts

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
