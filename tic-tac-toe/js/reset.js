document.querySelector(`.resetGame`).addEventListener(`click`, () => {

    if(confirm(`Do you really want to reset the game ?`)){

        //RESETTING CONTAINER INPUTS
        document.querySelectorAll(`input[type=text]`).forEach( i => {
            i.value = ''
            i.style.background = 'transparent'
            i.disabled = false
            document.querySelector(`.modal`).style.display = `none`
        })

        //RESETTING SCORE VALUE AND GAME NUMBER
        document.querySelector(`#X`).textContent = 0;
        document.querySelector(`#O`).textContent = 0;
        document.querySelector(`#draw`).textContent = 0;
        document.querySelector(`.gameNo`).value = 1;
        


        //RESETTING ALL MOVEMENT AND BOARD HISTORY
        movements = []
        board = []

        //DELETING ALL DATA FROM LOCAL STORAGE
        localStorage.clear()
        
        }
})