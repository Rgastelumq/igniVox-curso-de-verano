document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se refresque al enviar

    const responseMessage = document.getElementById('formResponse');
    responseMessage.textContent = "Enviando preinscripción...";
    responseMessage.className = "form-response";

    // Captura de datos ingresados en el formulario
    const formData = {
        studentName: document.getElementById('studentName').value,
        age: document.getElementById('age').value,
        tutorPhone: document.getElementById('tutorPhone').value,
        schoolEmail: document.getElementById('schoolEmail').value
    };

    // ⚠️ REEMPLAZA ESTA URL con el enlace de "Aplicación Web" que te genere Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxwu3mBzvIIw4KFsZvyEiGOuzsaJn6dYtpQDoa_gkULNL-rsyNap3NIXcqeU6qxwq4/exec';

    // Envío de datos al Google Sheets mediante un método POST asíncrono
    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Evita problemas de CORS al cruzar dominios locales/nube
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        responseMessage.textContent = "¡Preinscripción enviada con éxito! Nos pondremos en contacto pronto.";
        responseMessage.classList.add('success');
        document.getElementById('registrationForm').reset(); // Limpia los campos del formulario
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        responseMessage.textContent = "Hubo un error al enviar. Por favor, intenta de nuevo.";
        responseMessage.classList.add('error');
    });
});