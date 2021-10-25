window.addEventListener('DOMContentLoaded', () => {

    document.querySelector(`.today-focus`).addEventListener(`change`, () => {
    
        $(`.today-focus`).fadeOut()

        let info = document.querySelector(`.focus-info`)
        let focusCheckBox = document.createElement(`input`)
        focusCheckBox.type = `checkbox`
        focusCheckBox.style.marginTop = "1em"
        focusCheckBox.className = "focus-checkbox"

        let focusLabel = document.createElement(`label`)
        focusLabel.className = "focus-label"
        focusLabel.textContent = document.querySelector(`.today-focus`).value
        focusLabel.style.color = "white"
        focusLabel.style.fontSize = "3.5vmin"
        focusLabel.style.cursor = "pointer"
        
        info.append(focusCheckBox, focusLabel)


        //CHECKBOX WAS CHECKED
        document.querySelector(`.focus-checkbox`).addEventListener(`click`, () => {

            focusLabel.style.textDecoration = "line-through"
            document.querySelector(`.focus-comment`).style.visibility = "visible"
            $(`.focus-info`).fadeOut(2000)
            $(`.focus-comment`).fadeOut(2000)
            document.querySelector(`.focus-greet`).textContent = "Job well done for this day!"
            
        })
        
        //EDITING YOUR FOCUS
        document.querySelector(`.focus-label`).addEventListener(`click`, () => {
            editFocus()
        })
    })
        //FUNCTION THAT CAN EDIT YOUR FOCUS
        const editFocus = () => {
            document.querySelector(`.focus-checkbox`).remove()
            document.querySelector(`.focus-label`).remove()
            $(`.today-focus`).fadeIn()
            
        }

    
})