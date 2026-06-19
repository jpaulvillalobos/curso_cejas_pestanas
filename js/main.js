// ==========================
// SCROLL ANIMATIONS
// ==========================

const observer = new IntersectionObserver(
(entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add('active');

        }

    });

},
{
    threshold:0.2
});

document
.querySelectorAll('.fade-up, .zoom-in')
.forEach(el => observer.observe(el));


// ==========================
// SMOOTH BUTTON EFFECT
// ==========================

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener('click', function(e){

        e.preventDefault();

        const target =
        document.querySelector(
            this.getAttribute('href')
        );

        if(target){

            target.scrollIntoView({
                behavior:'smooth',
                block:'start'
            });

        }

    });

});


// ==========================
// YEAR FOOTER
// ==========================

const footerText =
document.querySelector('footer p');

if(footerText){

    footerText.innerHTML =
    `© ${new Date().getFullYear()} Curso Profesional de Cejas y Pestañas. Todos los derechos reservados.`;

}