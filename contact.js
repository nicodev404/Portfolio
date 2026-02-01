var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);

  var titleText = document.querySelector('[data-translate="contactTitle"]').innerText;
  var currentLang = titleText.includes("Contact") ? 'en' : 'es';

  var messages = {
      en: {
        success: "Thanks for your message! I'll be in touch soon.",
        error: "Oops! There was a problem submitting your form.",
        serverError: "Server connection error."
      },
    es: {
      success: "¡Gracias por tu mensaje! Me pondré en contacto pronto.",
      error: "Oops! Hubo un problema al enviar el formulario.",
      serverError: "Error de conexión con el servidor."
    }
  };

  var text = messages[currentLang] || messages['es'];

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.classList.add("form-status-success");  
      status.innerHTML = text.success;
      status.style.color = "#4caf50"; 
      form.reset(); 
      setTimeout(() => {
        status.innerHTML = "";
        status.classList.remove("form-status-success");
      }, 5000);
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = text.error;
        }
        status.style.color = "#f44336";
      })
    }
  }).catch(error => {
    status.innerHTML = text.serverError;
    status.style.color = "#f44336"; 
  });
}

form.addEventListener("submit", handleSubmit);



window.updateValidationMessages = function(lang) {
  const titleElement = document.querySelector('[data-translate="contactTitle"]');
  const currentLang = lang || (titleElement && titleElement.innerText.includes("Contact") ? 'en' : 'es');
  
  const isEn = currentLang === 'en';
  const inputs = document.querySelectorAll('.contact-input');

  inputs.forEach(input => {
    const msgEn = "Please fill out this field.";
    const msgEs = "Por favor, completa este campo.";
    const selectedMsg = isEn ? msgEn : msgEs;

    if (input.validationMessage !== "") {
      input.setCustomValidity(selectedMsg);
    } else {
      input.setCustomValidity(""); 
    }

    input.oninvalid = function(e) {
      e.target.setCustomValidity(""); 
      if (!e.target.validity.valid) {
        e.target.setCustomValidity(selectedMsg);
      }
    };

    input.oninput = function(e) {
      e.target.setCustomValidity("");
    };
  });
};

window.addEventListener('load', window.updateValidationMessages);