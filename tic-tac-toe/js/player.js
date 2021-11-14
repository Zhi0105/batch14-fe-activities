    const currentPlaying = () => {
        
    
    for( i = 0;  i < document.querySelectorAll(`input[type=text]`).length; i+=1){


        //MANIPULATING 9 BOX VALUE BASE ON WHAT PLAYER CHOOSE
        document.querySelectorAll(`input[type=text]`)[i].addEventListener(`click`, (e) => {

                //FUNCTION FOR AI PLAYER O
                const PlayerOAi = () => {

                     //RANDOM AI MOVEMENT FOR PLAYER O EVERYTIME USER MOVE ON GAME
                        let arr = []
                        document.querySelectorAll(`input[type=text]`).forEach(i => {
                            if(i.value != 'X' && i.value != 'O'){
                                arr.push(i)
                            }
                        })
                    
                        let randomitem = arr[Math.floor(Math.random()*arr.length)]
                                if(randomitem){
                                    randomitem.value = 'O'
                                    randomitem.disabled = true;
                                    randomitem.style.background = 'rgb(227, 77, 132)'
                                    
                                }
                }

                //FUNCTION FOR AI PLAYER O
                const PlayerXAi = () => {

                        //RANDOM AI MOVEMENT FOR PLAYER X EVERYTIME USER MOVE ON GAME
                        let arr = []
                        document.querySelectorAll(`input[type=text]`).forEach(i => {
                            if(i.value != 'X' && i.value != 'O'){
                                arr.push(i)
                            }
                        })
                    
                        let randomitem = arr[Math.floor(Math.random()*arr.length)]
                                if(randomitem){
                                    randomitem.value = 'X'
                                    randomitem.disabled = true;
                                    randomitem.style.background = 'rgb(227, 77, 132)'
                                    
                                }
            
                }

                //WHEN PLAYER CHOOSE PLAYER X
                if(document.querySelector(`.typeOfPlayer`).value == `x` || document.querySelector(`.typeOfPlayer`).value == `X`){
                    e.target.value = 'X'
                    e.target.disabled = true;
                    e.target.style.background = 'rgb(78, 204, 202)'

                    setTimeout(PlayerOAi, 500)
                    

                } 

                //WHEN PLAYER CHOOSE PLAYER O
                if(document.querySelector(`.typeOfPlayer`).value == `o` || document.querySelector(`.typeOfPlayer`).value == `O`){
                    e.target.value = 'O'
                    e.target.disabled = true;
                    e.target.style.background = 'rgb(78, 204, 202)'
                    
                    setTimeout(PlayerXAi, 500)
                
                } 
        })
    }
}

currentPlaying()

