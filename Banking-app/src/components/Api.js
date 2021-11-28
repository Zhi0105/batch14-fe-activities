import React, { useEffect } from 'react'


const Api = () => {


    return (
        <div className="api-main">
            {
                
            useEffect(() => {

                fetch('https://type.fit/api/quotes')
                .then(res => res.json())
                .then(data => 
                    console.log(data)
                ).catch(err => {
                    console.log(err)
                })

                console.log(`data successfully retrieved!`)
            
            }, [])
            }
        </div>
    
    )

}

export default Api