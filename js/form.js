// ==========================
// FORMULARIO
// ==========================

const form =
document.getElementById('leadForm');

if(form){

    form.addEventListener(
        'submit',
        async function(e){

            e.preventDefault();

            const button =
            form.querySelector('button');

            button.disabled = true;
            button.innerText = 'Enviando...';

            const formData = {

                nombre:
                form.nombre.value.trim(),

                correo:
                form.correo.value.trim(),

                telefono:
                form.telefono.value.trim(),

                ciudad:
                form.ciudad.value.trim()

            };

            console.log(
                'Nuevo Lead:',
                formData
            );

            try{

                /*
                Aquí conectaremos:

                - Google Sheets
                - Systeme.io
                - Zapier
                - Make
                - CRM
                */

                await fakeRequest();

                showSuccess();

                form.reset();

            }
            catch(error){

                showError();

                console.error(error);

            }
            finally{

                button.disabled = false;

                button.innerText =
                'Quiero Recibir Información';

            }

        }
    );

}


// ==========================
// SIMULADOR API
// ==========================

function fakeRequest(){

    return new Promise(resolve => {

        setTimeout(() => {

            resolve(true);

        },1500);

    });

}


// ==========================
// ALERTAS
// ==========================

function showSuccess(){

    alert(
        '✅ Información enviada correctamente. Te contactaremos pronto.'
    );

}

function showError(){

    alert(
        '❌ Ocurrió un error. Intenta nuevamente.'
    );

}