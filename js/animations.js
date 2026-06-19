// ==========================
// CONTADOR ANIMADO
// ==========================

function animateCounter(
element,
start,
end,
duration
){

    let startTime = null;

    function update(currentTime){

        if(!startTime)
            startTime = currentTime;

        const progress =
        Math.min(
            (currentTime - startTime)
            / duration,
            1
        );

        element.textContent =
        Math.floor(
            progress *
            (end - start)
            + start
        );

        if(progress < 1){

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}


// ==========================
// OBSERVER PARA CONTADORES
// ==========================

const counters =
document.querySelectorAll('[data-counter]');

const counterObserver =
new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const target =
            entry.target;

            animateCounter(

                target,

                0,

                Number(
                    target.dataset.counter
                ),

                2500

            );

            counterObserver.unobserve(
                target
            );

        }

    });

},
{
    threshold:0.4
});

counters.forEach(counter=>{

    counterObserver.observe(counter);

});


// ==========================
// EFECTO PARALLAX HERO
// ==========================

window.addEventListener(
'scroll',
()=>{

    const heroImage =
    document.querySelector(
        '.hero-image img'
    );

    if(!heroImage) return;

    const offset =
    window.pageYOffset;

    heroImage.style.transform =
    `translateY(${offset * 0.08}px)`;

});