import React, {useContext} from 'react'
import { PeopleContext } from './context/people'


const List = ({onDelete, onEditOpenModal}) => {
    const names = useContext(PeopleContext)
    return (
        <ul>
            {names.length > 0 ? names.map((person, index)=> (
                <li key={index}>
                    <div className='lists'>
                        <div className='person' onClick={() => onEditOpenModal(person.name, names.indexOf(person))}>
                            {person?.name}
                        </div>&nbsp;&nbsp;
                        <button className='btn-remove' onClick={() => onDelete(person.name)}>Remove</button>
                    </div>
                </li>
            )) : (
                <li>No Data found.</li>
            )
        
            }
        </ul>
    )
}

export default List
