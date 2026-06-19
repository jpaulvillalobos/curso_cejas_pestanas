const WEBHOOK_URL =
'https://dividend-extenuate-stinger.ngrok-free.dev/webhook-test/curso-cejas';

const form = document.getElementById('leadForm');

if(form){

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

        console.log("Enviando:", formData);

        try {

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

            console.log("Status:", response.status);

            const result = await response.text();

            console.log("Respuesta n8n:", result);

            if(!response.ok){
                throw new Error(result);
            }

            alert(
                '✅ Información enviada correctamente.'
            );

            form.reset();

        }
        catch(error){

            console.error(error);

            alert(
                '❌ Error enviando información. Revisa la consola.'
            );

        }
        finally{

            button.disabled = false;
            button.innerText =
            'Quiero Recibir Información';

        }

    });

}