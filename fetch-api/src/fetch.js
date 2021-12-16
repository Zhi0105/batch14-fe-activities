import axios from 'axios'

// const url = 'https://swapi.dev/api'

const url = 'https://swapi.py4e.com/api'


export const getData = async (people  = 30) => {
    let numFetch = Math.ceil(people / 10)
    let DATA = []

    for(let i = 1; i <= numFetch; i+=1){
        if(i === 1){
            const responseData = await axios.get(`${url}/people`).then(res => res.data)
            DATA.push(...responseData.results)
        } else {
            const responseData = await axios.get(`${url}/people?page=${i}`).then(res => res.data)
            DATA.push(...responseData.results)
        }
    }

    return DATA

}

export const getPerson = async (val = 1) => {
    const res = await axios.get(`${url}/people/${val}`).then(res => res.data)
    return res
}