"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  console.log(form);
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add("_sending");
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
      } else {
        alert("Ошибка");
      }
    } else {
      alert("Заполните обязательное поле");
    }
  }

  //валидация + добавляем класс обязательно к проверке
  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      //условия проверка phone
      if (input.classList.contains("_phone")) {
        if (phoneValid(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === " ") {
          formAddError(input);
          error++;
        }
      }

      //условия проверка name
      if (input.classList.contains("_name")) {
        if (nameValid(input)) {
          formAddError(input);
          error++;
        }
      } else {
        if (input.value === " ") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  //добавляем класс Ошибка родителю и объекту
  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }

  //удаляем класс ошибка родителю и объекту
  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

  //валидация email
  function phoneValid(input) {
    return /^\+7\(\d{3}\)\d{3}-\d{4}$/.test(input.value);
  }

  //валидация name
  function nameValid(input) {
    return /^[a-zа-яё]+$/i.test(input.value);
  }
});
