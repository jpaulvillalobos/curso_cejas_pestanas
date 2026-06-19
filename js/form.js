// ========================================
// CONFIGURACIÓN
// ========================================

const WEBHOOK_URL =
'https://dividend-extenuate-stinger.ngrok-free.dev/webhook/curso-cejas';

// ========================================
// FORMULARIO
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('leadForm');

    if (!form) {
        console.error('No se encontró el formulario #leadForm');
        return;
    }

    form.addEventListener('submit', async (e) => {

        e.preventDefault();

        const button = form.querySelector('button');

        try {

            // Estado de carga
            button.disabled = true;
            button.textContent = 'Enviando...';

            // Datos del formulario
            const formData = {

                nombre: form.nombre.value.trim(),
                correo: form.correo.value.trim(),
                telefono: form.telefono.value.trim(),
                ciudad: form.ciudad.value.trim(),

                // Datos adicionales útiles
                landing: window.location.href,
                fecha: new Date().toISOString(),
                userAgent: navigator.userAgent

            };

            console.log('Enviando lead:', formData);

            // Envío a n8n
            const response = await fetch(
                WEBHOOK_URL,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            );

            // Verificar respuesta HTTP
            if (!response.ok) {

                throw new Error(
                    `Error HTTP: ${response.status}`
                );

            }

            // Intentar leer JSON
            let result;

            try {

                result = await response.json();

            } catch {

                result = {
                    success: true
                };

            }

            console.log('Respuesta n8n:', result);

            // Mensaje éxito
            alert(
                '✅ Hemos recibido tu información. Muy pronto te contactaremos.'
            );

            // Limpiar formulario
            form.reset();

            // Opcional: redireccionar a WhatsApp
            /*
            setTimeout(() => {

                window.location.href =
                'https://wa.me/573001234567';

            }, 1500);
            */

        }
        catch (error) {

            console.error('Error:', error);

            alert(
                '❌ No fue posible enviar la información. Intenta nuevamente.'
            );

        }
        finally {

            button.disabled = false;
            button.textContent =
                'Quiero Recibir Información';

        }

    });

});