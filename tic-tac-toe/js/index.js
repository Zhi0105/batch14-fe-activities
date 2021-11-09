    //PLAYER SELECTION
    const playerSelection = () => {
        let playerSelect = prompt(`
        Welcome to Tic-Tac-Toe!

        For player selection, Type 'X' or Type 'O'`)
    
        if(playerSelect == 'o' || playerSelect == 'O' || playerSelect == 'x' || playerSelect == 'X'){
            // document.querySelector(`.currentPlaying`).innerHTML = `<h1>${playerSelect.toUpperCase()} is Playing!</h1>`
            let h1 = document.createElement(`h1`)
            h1.textContent = `${playerSelect.toUpperCase()} is Playing!`
            h1.className = 'currentPlayer'
            document.querySelector(`.currentPlaying`).append(h1)

            document.querySelector(`.typeOfPlayer`).value = playerSelect.toUpperCase()
        } else {
            location.reload()
        }
    
    }    
    playerSelection()

    //CHANGING OR SWITCHING PLAYER
    document.querySelector(`#changePlayer`).addEventListener(`click`, () => {
        let currentPlayer = document.querySelector(`.typeOfPlayer`).value
            if(currentPlayer == 'X'){
                document.querySelector(`.typeOfPlayer`).value = 'O'
                document.querySelector(`.currentPlayer`).textContent = 
                `  
                    ${document.querySelector(`.typeOfPlayer`).value.toUpperCase()} is Playing!
                `
                
            }
            if(currentPlayer == 'O'){
                document.querySelector(`.typeOfPlayer`).value = 'X'
                document.querySelector(`.currentPlayer`).textContent = 
                `  
                    ${document.querySelector(`.typeOfPlayer`).value.toUpperCase()} is Playing!
                `  
            }
            document.querySelector(`#changePlayer`).style.display = 'none'
            alert(`Player change successful!`)
    })


