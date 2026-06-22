// ====================================
// CONFIGURACIÓN
// ====================================

const GOOGLE_SCRIPT_URL = 
'https://script.google.com/macros/s/AKfycbxApmgNc3imxLTkt202LD0yTI-jg8WF4ijRgdJ3AoX1bfAHsTF-Qg5QQWaoQwncKEu-/exec';


// ====================================
// INICIALIZAR FORMULARIO
// ====================================

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('leadForm');

    if (!form) {
        console.error('No se encontró el formulario #leadForm');
        return;
    }

    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const button = form.querySelector('button');

        button.disabled = true;
        button.innerText = 'Enviando...';

        const formData = {
            nombre: form.nombre.value.trim(),
            correo: form.correo.value.trim(),
            telefono: form.telefono.value.trim(),
            ciudad: form.ciudad.value.trim(),
            landing: window.location.href,
            fecha: new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })
        };

        console.log('Enviando lead a Google Sheets:', formData);

        try {
            const response = await fetch(
                GOOGLE_SCRIPT_URL,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'text/plain' // Evita restricciones preflight de CORS con Google Apps Script
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();
            console.log('Respuesta de Google:', result);

            if (result.status === 'success') {
                alert('✅ Hemos recibido tu información. Muy pronto te contactaremos.');
                form.reset();
            } else {
                throw new Error(result.message);
            }

        }
        catch (error) {
            console.error('Error al enviar:', error);
            alert('❌ No fue posible enviar la información. Intenta nuevamente.');
        }
        finally {
            button.disabled = false;
            button.innerText = 'Quiero Recibir Información';
        }

    });

});