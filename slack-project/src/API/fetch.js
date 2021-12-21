import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

const URL = 'https://slackapi.avionschool.com/api/v1'

export const Register = async (firstname, lastname , email, password, contact) => {
    let error = []
    const res = await axios.post(`${URL}/auth`, {
        id : uuidv4(),
        firstname,
        lastname,
        email,
        password,
        contact
    }).catch((err)=> {
        error = err.response.data.errors.full_messages
    })

    return [res, error]

}   