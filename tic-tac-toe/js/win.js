let input = document.querySelectorAll(`input[type=text]`)

//FUNCTION THAT HANDLES 8 COMBINATION FOR PLAYER X TO BE ABLE TO WIN
const ifPlayerXWin = () => {

            if(input[0].value == 'X' && input[1].value == 'X' && input[2].value == 'X'){
                input[0].style.background = 'rgb(59, 245, 108)'
                input[1].style.background = 'rgb(59, 245, 108)'
                input[2].style.background = 'rgb(59, 245, 108)'
                return true
            }
            else if(input[2].value == 'X' && input[5].value == 'X' && input[8].value == 'X'){
                input[2].style.background = 'rgb(59, 245, 108)'
                input[5].style.background = 'rgb(59, 245, 108)'
                input[8].style.background = 'rgb(59, 245, 108)'
                return true
            }
            else if(input[6].value == 'X' && input[7].value == 'X' && input[8].value == 'X'){
                input[6].style.background = 'rgb(59, 245, 108)'
                input[7].style.background = 'rgb(59, 245, 108)'
                input[8].style.background = 'rgb(59, 245, 108)'
                return true
            }
            else if(input[0].value == 'X' && input[3].value == 'X' && input[6].value == 'X'){
                input[0].style.background = 'rgb(59, 245, 108)'
                input[3].style.background = 'rgb(59, 245, 108)'
                input[6].style.background = 'rgb(59, 245, 108)'
                return true
            }

            else if(input[1].value == 'X' && input[4].value == 'X' && input[7].value == 'X'){
                input[1].style.background = 'rgb(59, 245, 108)'
                input[4].style.background = 'rgb(59, 245, 108)'
                input[7].style.background = 'rgb(59, 245, 108)'
                return true
            }
            else if(input[3].value == 'X' && input[4].value == 'X' && input[5].value == 'X'){
                input[3].style.background = 'rgb(59, 245, 108)'
                input[4].style.background = 'rgb(59, 245, 108)'
                input[5].style.background = 'rgb(59, 245, 108)'
                return true
            }
            else if(input[0].value == 'X' && input[4].value == 'X' && input[8].value == 'X'){
                input[0].style.background = 'rgb(59, 245, 108)'
                input[4].style.background = 'rgb(59, 245, 108)'
                input[8].style.background = 'rgb(59, 245, 108)'
                return true
            }
            else if(input[2].value == 'X' && input[4].value == 'X' && input[6].value == 'X'){
                input[2].style.background = 'rgb(59, 245, 108)'
                input[4].style.background = 'rgb(59, 245, 108)'
                input[6].style.background = 'rgb(59, 245, 108)'
                return true
            } else {
                return false
            }

    }

    //FUNCTION THAT HANDLES 8 COMBINATION FOR PLAYER O TO BE ABLE TO WIN
    const ifPlayerOWin = () => {

        
            if(input[0].value == 'O' && input[1].value == 'O' && input[2].value == 'O'){
                input[0].style.background = 'rgb(59, 245, 108)'
                input[1].style.background = 'rgb(59, 245, 108)'
                input[2].style.background = 'rgb(59, 245, 108)'
                return true
            }
            else if(input[2].value == 'O' && input[5].value == 'O' && input[8].value == 'O'){
                input[2].style.background = 'rgb(59, 245, 108)'
                input[5].style.background = 'rgb(59, 245, 108)'
                input[8].style.background = 'rgb(59, 245, 108)'
                return true
            }
            else if(input[6].value == 'O' && input[7].value == 'O' && input[8].value == 'O'){
                input[6].style.background = 'rgb(59, 245, 108)'
                input[7].style.background = 'rgb(59, 245, 108)'
                input[8].style.background = 'rgb(59, 245, 108)'
                return true
            }
            else if(input[0].value == 'O' && input[3].value == 'O' && input[6].value == 'O'){
                input[0].style.background = 'rgb(59, 245, 108)'
                input[3].style.background = 'rgb(59, 245, 108)'
                input[6].style.background = 'rgb(59, 245, 108)'
                return true
            }

            else if(input[1].value == 'O' && input[4].value == 'O' && input[7].value == 'O'){
                input[1].style.background = 'rgb(59, 245, 108)'
                input[4].style.background = 'rgb(59, 245, 108)'
                input[7].style.background = 'rgb(59, 245, 108)'
                return true
            }
            else if(input[3].value == 'O' && input[4].value == 'O' && input[5].value == 'O'){
                input[3].style.background = 'rgb(59, 245, 108)'
                input[4].style.background = 'rgb(59, 245, 108)'
                input[5].style.background = 'rgb(59, 245, 108)'
                return true
            }
            else if(input[0].value == 'O' && input[4].value == 'O' && input[8].value == 'O'){
                input[0].style.background = 'rgb(59, 245, 108)'
                input[4].style.background = 'rgb(59, 245, 108)'
                input[8].style.background = 'rgb(59, 245, 108)'
                return true
            }
            else if(input[2].value == 'O' && input[4].value == 'O' && input[6].value == 'O'){
                input[2].style.background = 'rgb(59, 245, 108)'
                input[4].style.background = 'rgb(59, 245, 108)'
                input[6].style.background = 'rgb(59, 245, 108)'
                return true
            } else {
                return false
            }

    }

    //FUNCTION THAT HANDLES WHO PLAYER WIN DEPENDS ON THE MOVEMENT IN THE GAME
    const whoPlayerWin = () => {
        
            if(
                input[0].value != "" &&
                input[1].value != "" &&
                input[2].value != "" &&
                input[3].value != "" &&
                input[4].value != "" &&
                input[5].value != "" &&
                input[6].value != "" &&
                input[7].value != "" &&
                input[8].vaue != "" 
                
            ){
                if(ifPlayerXWin() == false && ifPlayerOWin() == false){
                    return `draw`
                }
            }

        else if(ifPlayerXWin() == true && ifPlayerOWin() == true){
                return `draw`
        }
        else if(ifPlayerXWin() == true){
                return `X`
        }
        else if(ifPlayerOWin() == true){
                return `O`
        }
    
    }

    //IDENTIFYING WHO PLAYER WIN DEPENDS ON THE RESULT OF whoPlayerWin Function!
    //AND MANIPULATING PLAYERS SCORE
    document.querySelector(`.container`).addEventListener(`click`, () => {

        let modal = document.querySelector(`.modal`)
        let xScore = document.querySelector(`#X`).textContent
        let OScore = document.querySelector(`#O`).textContent
        let scoreDraw = document.querySelector(`#draw`).textContent
        
                
        
            if(whoPlayerWin() == `draw`){
                document.querySelector(`#changePlayer`).style.display = 'block'
                modal.style.display = `block`
                document.querySelector(`.playerWin`).textContent = `Draw!`

                scoreDraw = parseInt(scoreDraw) + 1
                document.querySelector(`#draw`).textContent = scoreDraw

                document.querySelector(`.playerWon`).value = `Draw game`
                
            }
            else if(whoPlayerWin() == `X`){
                document.querySelector(`#changePlayer`).style.display = 'block'
                modal.style.display = `block`
                document.querySelector(`.playerWin`).textContent = `Player X's Wins!`

                xScore = parseInt(xScore) + 1
                document.querySelector(`#X`).textContent = xScore

                document.querySelector(`.playerWon`).value = `X`
                
            
                }

            else if(whoPlayerWin() == `O`){
                document.querySelector(`#changePlayer`).style.display = 'block'
                modal.style.display = `block`
                document.querySelector(`.playerWin`).textContent = `Player O's Wins!`

                OScore = parseInt(OScore) + 1
                document.querySelector(`#O`).textContent = OScore
                
                document.querySelector(`.playerWon`).value = `O`
                
            }

    })

