var form = document.getElementById("my-form");
form.noValidate = true;

async function handleSubmit(event) {
  event.preventDefault();
  const isValid = Array.from(fields)
  .map(input => validateField(input))
  .every(Boolean);

  if (!isValid) {
    form.querySelector('.input-error')?.focus();
    return;
  }
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

const fields = form.querySelectorAll(
    'input:not([type="submit"]):not([type="hidden"]), textarea'
);

function getValidationMessage(input) {
    const isEn = document.documentElement.lang === 'en';

    input.setCustomValidity("");

    if (input.validity.valueMissing) {
        return isEn
            ? "Please fill out this field."
            : "Por favor, completa este campo.";
    }

    if (input.type === 'email' && input.value.trim() !== '' &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())){
    return isEn
        ? "Please enter a valid email address."
        : "Por favor, ingresa un correo electrónico válido.";
    }

  return "";
}

function validateField(input) {
    const message = getValidationMessage(input);

    let error = input.nextElementSibling;

    if (!error || !error.classList.contains('field-error')) {
        error = null;
    }

    if (message) {
        input.classList.add('input-error');
        input.setAttribute('aria-invalid', 'true');

        if (!error) {
            error = document.createElement('small');
            error.className = 'field-error';
            input.insertAdjacentElement('afterend', error);
        }

        error.textContent = message;
        return false;
    }

    input.classList.remove('input-error');
    input.removeAttribute('aria-invalid');

    if (error) {
        error.remove();
    }

    return true;
}

fields.forEach(input => {
    input.addEventListener('blur', () => {
        validateField(input);
    });

    input.addEventListener('input', () => {
        if (input.classList.contains('input-error')) {
            validateField(input);
        }
    });
});

window.updateValidationMessages = function() {
    fields.forEach(input => {
        if (input.classList.contains('input-error')) {
            validateField(input);
        }
    });
};