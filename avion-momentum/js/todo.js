window.addEventListener('DOMContentLoaded', () => {

        //MODAL FUNCTIONALITY
        let modal = document.querySelector(`.modal`)
        let btn_todo = document.querySelector(`.todo`)
        let close = document.getElementsByClassName(`close`)[0]
        

        // When the user clicks the button, open the modal
        btn_todo.addEventListener(`click`, (e) => {
            e.preventDefault()
            modal.style.display = 'block'

                    // When the user clicks on <span> (x), close the modal
                close.addEventListener(`click`, () => {
                        modal.style.display = 'none'
                })
                  // When the user clicks anywhere outside of the modal, close it
                window.addEventListener(`click`, (e) => {
                    if(e.target == modal){
                        modal.style.display = 'none'
                    }
                })

        })


        //CODE FOR TODO LIST
        let todo_arr = []
        document.querySelector(`.btn-add-list`).addEventListener(`click`, () => {
            todo_arr.push(document.querySelector(`#add-list`).value)
            // localStorage.setItem('toDo', JSON.stringify(todo_arr))    
            let span = document.createElement(`span`)

            
            //ITERATE AND DISPLAYING ALL LIST ITEMS
            if(document.querySelector(`#add-list`).value != ""){
                    for(let i = 0; i < todo_arr.length; i+=1){
                        span.className = 'list-item-detail'
                        span.innerHTML = `
                            <input type="checkbox" class="check-list-item" id="check-list-item"><label class="list-value" id="list-value">${todo_arr[i]}</label><span class="close" id="close">&times;</span>
                        `
                    
                }
                document.querySelector(`.list-item`).append(span)
                document.querySelector(`#add-list`).value = ''
            }


        })

        // CROSSING OUT LIST ITEMS WHEN CHECKBOX WAS CHECKED OR DELETING SPECIFIC LIST ITEMS
        document.querySelector(`.list-item`).addEventListener(`click`, (e)=> {
            let checkBox = e.target.id == "check-list-item"
            let close = e.target.id == "close"

                // WHEN CROSSING OUT SPECIFIC LIST ITEMS
                if(checkBox){
                    if(e.target.checked){
                        e.target.nextElementSibling.style.textDecoration = `line-through`
                    }  
                    else{
                        e.target.nextElementSibling.style.textDecoration = `none`
                    }
                }  

                // WHEN DELETING SPECIFIC LIST ITEMS
                if(close){
                    if(confirm(`Do you really want to delete this list ? `)){
                        e.target.parentElement.remove()
                        let index = todo_arr.indexOf(`${e.target.previousElementSibling.textContent}`)
                        todo_arr.splice(index, 1)
                        console.log(todo_arr)
                    }
                    
                }
        })

        //REMOVING ALL LIST ITEMS
        document.querySelector(`.btn-clear-todo`).addEventListener(`click`, () => {
            todo_arr = []
            let allList = document.querySelectorAll(`.list-item-detail`)

            for(let i = 0; i < allList.length; i+=1){
                allList[i].remove()
                allList[allList.length - 1].remove()
            }
            console.log(todo_arr)
        })

        
        
        
})  