// ====================================
// CONFIGURACIÓN
// ====================================

const WEBHOOK_URL =
'https://dividend-extenuate-stinger.ngrok-free.dev/webhook/curso-cejas';


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
            fecha: new Date().toISOString()

        };

        console.log('Enviando lead:', formData);

        try {

            const response = await fetch(
                WEBHOOK_URL,
                {
                    method: 'POST',
                    body: JSON.stringify(formData)
                }
            );

            console.log('Status:', response.status);

            const text = await response.text();

            console.log('Respuesta:', text);

            if (!response.ok) {
                throw new Error(
                    `Error HTTP ${response.status}`
                );
            }

            alert(
                '✅ Hemos recibido tu información. Muy pronto te contactaremos.'
            );

            form.reset();

        }
        catch (error) {

            console.error('Error:', error);

            alert(
                '❌ No fue posible enviar la información. Intenta nuevamente.'
            );

        }
        finally {

            button.disabled = false;
            button.innerText =
            'Quiero Recibir Información';

        }

    });

});