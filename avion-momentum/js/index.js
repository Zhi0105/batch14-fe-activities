window.addEventListener('DOMContentLoaded', () => {

    //INSERTING A NAME WITH FADE IN AND FADE OUT EFFECT
    document.querySelector(`.header`).style.display = "none"
    document.querySelector(`.footer`).style.display = "none"
    document.querySelector(`.main-container`).style.display = "none"

    document.querySelector(`.name`).addEventListener(`change`, () => {
        // $(`.initial-container`).fadeOut(500);
        // $(`.header`).fadeIn(2000);
        // $(`.footer`).fadeIn(2000);
        // $(`.main-container`).fadeIn(2000);
        document.querySelector(`.initial-container`).style.display = 'none'
        document.querySelector(`.header`).style.display = "block"
        document.querySelector(`.footer`).style.display = "block"

    
        document.querySelector(`.main-container`).style.display = 'block'

        let name = document.querySelector(`.name`).value

        document.querySelector(`.greet-detail`).textContent = `${name}!`
    })

    document.querySelector(`.greet-detail`).addEventListener(`click`, () => {
        window.location.reload()
    })
    
})