//OOP FOR CREATING A RECORD PER ROUND OF GAME

let board = []
if(storedBoard){
    board = [...storedBoard]
}


class boardRecord{
    constructor(gameNo, playerWon, playerMovement){
        this.gameNo = gameNo
        this.playerWon = playerWon
        this.playerMovement = playerMovement
    }
    createBoardRecord(){
        addBoardRecord(this.gameNo, this.playerWon, this.playerMovement)
    }
}

const addBoardRecord = (gameNumber, player, playerMovement) => {
    let boardDetail = {
        gameNo : gameNumber,
        playerWon : player,
        movements : playerMovement
    }
    board.push(boardDetail)
}

//TO RECORD PLAYER MOVEMENTS
let movements = []
let movement = []

//FUNCTION THAT CAN SAVE MOVEMENT
const getMovement = () => {
    let inputs = document.querySelectorAll(`input[type=text]`)
    let firstLayer = []
    let secondLayer = []
    let thirdLayer = []

    firstLayer.push(inputs[0].value); firstLayer.push(inputs[1].value); firstLayer.push(inputs[2].value)
    secondLayer.push(inputs[3].value); secondLayer.push(inputs[4].value); secondLayer.push(inputs[5].value)
    thirdLayer.push(inputs[6].value); thirdLayer.push(inputs[7].value); thirdLayer.push(inputs[8].value)
    
    
        movement = [[...firstLayer], [...secondLayer], [...thirdLayer]]
        movements.push(movement)

        console.table(movement)
}

document.querySelector(`.container`).addEventListener(`click`, () => {

    getMovement()

    setTimeout(()=>{       
        getMovement()
    }, 1000)

})


//WHEN NEWGAME BUTTON CLICKED!
document.querySelector(`.newGame`).addEventListener(`click`, ()=>{

    //RESETTING CONTAINER INPUTS
    document.querySelectorAll(`input[type=text]`).forEach( i => {
        i.value = ''
        i.style.background = 'transparent'
        i.disabled = false
        document.querySelector(`.modal`).style.display = `none`
    })

        //UPDATING NEW RECORD
        let newRecord = new boardRecord(document.querySelector(`.gameNo`).value, document.querySelector(`.playerWon`).value, movements)
        
            newRecord.createBoardRecord()
            localStorage.setItem(`boardRecord`, JSON.stringify(board))
            // console.log(board)

        //TO RECORD SCORE
        const gameScore  = {
            X : 0,
            O : 0,
            Draw : 0
        }

            gameScore.X = document.querySelector(`#X`).textContent
            gameScore.O = document.querySelector(`#O`).textContent
            gameScore.Draw = document.querySelector(`#draw`).textContent

        localStorage.setItem(`Score`, JSON.stringify(gameScore))
        // console.log(gameScore)
        
        //UPDATING GAME NUMBER
        let currentGameNo = parseInt(document.querySelector(`.gameNo`).value) + 1
        document.querySelector(`.gameNo`).value = currentGameNo

        //CLEAR ALL MOVEMENT OF PREV ROUND
        movements = []

        //CLEAR CONSOLE
        console.clear()

        
})

