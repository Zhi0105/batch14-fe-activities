document.querySelector(`.prev`).style.display = 'none'
document.querySelector(`.next`).style.display = 'none'

document.querySelector(`.backToModal`).addEventListener(`click`, ()=>{
    modal.style.display = 'block'
    document.querySelector(`.backToModal`).style.display = 'none'
    document.querySelector(`.prev`).style.display = 'none'
    document.querySelector(`.next`).style.display = 'none'
    
})

//CHECK GAME HISTORY
document.querySelector(`.checkGame`).addEventListener(`click`, () => {
    modal.style.display = 'none'
    document.querySelector(`.checkGame`).style.display = 'none'
    document.querySelector(`.backToModal`).style.display = 'block'
    document.querySelector(`.prev`).style.display = 'block'
    document.querySelector(`.next`).style.display = 'block'

    document.querySelectorAll(`input[type=text]`).forEach(i => {
        i.style.background = 'gray'
    })
    
    
    
    let movementIndex = document.querySelector(`.movementIndex`)
    let inputs = document.querySelectorAll(`input[type=text]`)

        movementIndex.value = movements.indexOf(movements[movements.length - 1])

    //PREVIOUS BUTTON
    document.querySelector(`.prev`).addEventListener(`click`, () => {
        // console.log(movements)
        if(movementIndex.value > 0){

            movementIndex.value = parseInt( movementIndex.value) - 1
            
            inputs[0].value = movements[movementIndex.value][0][0]
            inputs[1].value = movements[movementIndex.value][0][1]
            inputs[2].value = movements[movementIndex.value][0][2]
            inputs[3].value = movements[movementIndex.value][1][0]
            inputs[4].value = movements[movementIndex.value][1][1]
            inputs[5].value = movements[movementIndex.value][1][2]
            inputs[6].value = movements[movementIndex.value][2][0]
            inputs[7].value = movements[movementIndex.value][2][1]
            inputs[8].value = movements[movementIndex.value][2][2]

                if(movementIndex.value == 0){
                    document.querySelector(`.prev`).style.display = `none`
                }
                document.querySelector(`.next`).style.display = `block`
                
            
        }
    

        
    })   
    
    //NEXT BUTTON
    document.querySelector(`.next`).addEventListener(`click`, () => {
        let lastIndex = movements.indexOf(movements[movements.length - 1])
        // console.log(movements)
        if(movementIndex.value != lastIndex){

            movementIndex.value = parseInt(movementIndex.value) + 1

            inputs[0].value = movements[movementIndex.value][0][0]
            inputs[1].value = movements[movementIndex.value][0][1]
            inputs[2].value = movements[movementIndex.value][0][2]
            inputs[3].value = movements[movementIndex.value][1][0]
            inputs[4].value = movements[movementIndex.value][1][1]
            inputs[5].value = movements[movementIndex.value][1][2]
            inputs[6].value = movements[movementIndex.value][2][0]
            inputs[7].value = movements[movementIndex.value][2][1]
            inputs[8].value = movements[movementIndex.value][2][2]

            if(movementIndex.value == lastIndex){
                document.querySelector(`.next`).style.display = `none`

            }

            document.querySelector(`.prev`).style.display = `block`
            
        }
    })

})

