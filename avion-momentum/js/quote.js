window.addEventListener('DOMContentLoaded', () => {
    
    document.querySelector(`.quote-description`).style.visibility = "hidden"
    document.querySelector(`.btn-add-quote`).style.visibility = "hidden"


        let quote_arr = [
            "If you want something you never had, you have to do something you've never done.",
            "For every action, there is an equal and opposite reaction.",
            "Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning."
        ]
    
        var item = quote_arr[Math.floor(Math.random()*quote_arr.length)]
    
        let span = document.createElement(`span`)
            span.textContent = `"${item}"`
            span.style.cursor = "pointer"
        
        document.querySelector(`.quote`).append(span)

        span.addEventListener(`mouseenter`, () => { span.style.color = "green"})
        span.addEventListener(`mouseleave`, () => { span.style.color = "white"})

        span.addEventListener(`click`, () => {
            document.querySelector(`.btn-add-quote`).style.visibility = "visible"
            span.remove()
        })


    document.querySelector(`.btn-add-quote`).addEventListener(`click`, () => {

        document.querySelector(`.btn-add-quote`).style.visibility = "hidden"
        document.querySelector(`.quote-description`).style.visibility = "visible"

        document.querySelector(`.quote-description`).addEventListener(`change`, () => {
            
            //INSERTING NEW QUOTE INTO ARRAY
            quote_arr.push(document.querySelector(`.quote-description`).value)
            console.log(quote_arr)
            
            document.querySelector(`.quote-description`).value = ""
            document.querySelector(`.quote-description`).style.visibility = "hidden"

            //DISPLAYING NEW QUOTE INSIDE OF ARRAY
            document.querySelector(`.quote`).textContent = `"${quote_arr[quote_arr.length - 1]}"`
            document.querySelector(`.quote`).style.visibility = "visible"
            
        })

        document.querySelector(`.quote`).addEventListener(`click`, () => {
            document.querySelector(`.quote`).style.visibility = "hidden"
            document.querySelector(`.quote-description`).style.visibility = "visible"
        })

        
        document.querySelector(`.btn-change-quote`).addEventListener(`click`, () => {
            var newItem = quote_arr[Math.floor(Math.random()*quote_arr.length)]
            
            document.querySelector(`.quote`).textContent = `"${newItem}"`

        })

    })

})