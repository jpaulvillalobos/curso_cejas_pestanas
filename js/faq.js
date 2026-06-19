// ==========================
// FAQ DINAMICO
// ==========================

async function loadFaq(){

    try{

        const response =
        await fetch(
            'data/faq.json'
        );

        const data =
        await response.json();

        const container =
        document.getElementById(
            'faq-container'
        );

        if(!container) return;

        data.forEach(item => {

            container.innerHTML += `

            <div class="faq-item">

                <button class="faq-question">

                    ${item.question}

                </button>

                <div class="faq-answer">

                    <p>${item.answer}</p>

                </div>

            </div>

            `;

        });

        activateFaq();

    }
    catch(error){

        console.error(
            'Error FAQ:',
            error
        );

    }

}

function activateFaq(){

    const items =
    document.querySelectorAll('.faq-item');

    items.forEach(item => {

        const question =
        item.querySelector('.faq-question');

        question.addEventListener('click', () => {

            const isOpen =
            item.classList.contains('active');

            items.forEach(el => {
                el.classList.remove('active');
            });

            if(!isOpen){
                item.classList.add('active');
            }

        });

    });

}
loadFaq();