import React, {useState, useEffect, useReducer} from 'react';
import List from './List';
import {getData, getPerson} from './fetch'
import {PeopleContext} from './context/people'

import './App.css';


const modalReducer = (state, action) => {
  switch (action.type){
    case 'openAddModal' :
      return {
          ...state,
          isAddModalOpen: true,
      }
    case 'closeAddModal' :
      return {
          ...state,
          isAddModalOpen: false,
        }
    case 'openEditModal' :
          return {
              ...state,
              isEditModalOpen: true,
          }
    case 'closeEditModal' :
          return {
              ...state,
              isEditModalOpen: false,
            }
        
    default :
      return state
  }
}

const App = () => {

  const handleOpenAddModal = () => {
    modalDispatch({ type : 'openAddModal'})
  }

  const handleCloseAddModal = () => {
    modalDispatch({type : 'closeAddModal'})
  }

  const handleEditOpenModal = (name, index) => {
    modalDispatch({type : 'openEditModal'})
    let nameLength = name.split(' ').length
      if(nameLength === 1){
        setFirstname(name)
        setLastname('ROBOT')
        setID(index)
      }
      if(nameLength === 2){
        setFirstname(`${name.split(' ')[0]}`)
        setLastname(`${name.split(' ')[1]}`)
        setID(index)
      }
      if(nameLength === 3){
        setFirstname(`${name.split(' ')[0]} ${name.split(' ')[1]}`)
        setLastname(`${name.split(' ')[2]}`)
        setID(index)
      }
  } 

  const handleCloseEditModal = () => {
    modalDispatch({type : 'closeEditModal'})
    setFirstname('')
    setLastname('')    
  }


  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [search, setSearchKeyword] = useState('')
  const [filteredListNames, setFilteredListNames] = useState([])
  const [names, setNames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [id, setID] = useState(0)
  const [modalState, modalDispatch] = useReducer(modalReducer, {
      isAddModalOpen : false,
      isEditModalOpen : false,
      
  })


  useEffect(()=>{
    (async () => {
    setIsLoading(true)
    const responseData = await getData(30)
    setNames(responseData)
    setIsLoading(false)

  })()

}, [])

  const handleFetch = async () => {
    setIsLoading(true)
    const person =  await getPerson(names.length + 2)
    setNames([...names, person])
    setIsLoading(false)

  }

  const handleFnameValue = (e) => {
    setFirstname(e.target.value)
  }

  const handleLnameValue = (e) => {
    setLastname(e.target.value)
  }

  const handleAdd = (e) => {
    e.preventDefault();
    setNames([...names, {name: `${firstname} ${lastname}`}])
    setFirstname('')
    setLastname('')
    handleCloseAddModal()
  }

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value)

    const filteredName = names.filter((i) => {
      return i.name.toLowerCase().includes(e.target.value.toLowerCase())
      
    })
    setFilteredListNames(filteredName)
  }

  const handleDelete = (name) => {
    if(
      window.confirm(`do you really want to remove this item?`)
    ){
      setNames(
        names.filter((i) => {
          return i.name !== name
        })
      )
      setFirstname('')
      setLastname('')
      setSearchKeyword('')
    }
  }
  
  const handleEdit = (e) => {
    e.preventDefault()
  
    const editName = names.find((i) => names.indexOf(i) === id)
    // console.log(editName)
    names.map((i) => {
          if(i.name === editName.name){
              i.name = `${firstname} ${lastname}`
          }
          return names
        })
        
    setNames(names)
    handleCloseEditModal()
  
  }

  return(
    <>
      <PeopleContext.Provider value={search === ''? names : filteredListNames}>
            <div className='main'>
                  { isLoading ? (
                    <p>{`Loading....`}</p>
                  ):(
                    <div>
                      <div className='container'>
                        <input type="search" placeholder='search 🔍' value={search} onChange={handleSearch}/>
                        <button onClick={handleOpenAddModal}>add modal</button>
                        <button onClick={handleFetch}>fetch</button>
                    
                      </div>
                        {modalState.isAddModalOpen && 
                        
                          <div className='modal'>
                              <div className='modal-container'>
                              <h1>Add new Name:</h1>
                              <form className='add-people' onSubmit={handleAdd}>
                                  <div className='field'>
                                      <input className='fname' placeholder='firstname' value={firstname} onChange={handleFnameValue} required/>
                                      <input className='lname' placeholder='lastname' value={lastname} onChange={handleLnameValue} required/>
                                  </div>
                                  <div className='buttons'>
                                    <input type="submit" value="save" />
                                    <button onClick={handleCloseAddModal}>Cancel</button>
                                  </div>
                              </form>
                            </div>
                          </div>

                        }
                        {modalState.isEditModalOpen && 

                          <div className='modal'>
                            <div className='modal-container'>
                            <h1>Modify Name:</h1>
                              <form className='edit-people' onSubmit={handleEdit}>
                                  <div className='field'>
                                      <input className='fname' placeholder='firstname' value={firstname} onChange={handleFnameValue} required/>
                                      <input className='lname' placeholder='lastname' value={lastname} onChange={handleLnameValue} required/>
                                  </div>
                                  <div className='buttons'>
                                    <input type="submit" value="save" />
                                    <button onClick={handleCloseEditModal}>Cancel</button>
                                  </div>
                            </form>
                            </div>
                          </div>


                        }
                      <div className='listname'>
                        <List onDelete={handleDelete} onEditOpenModal={handleEditOpenModal}/>  
                      </div>
                    </div>

                    )
                  }
              </div>
      </PeopleContext.Provider>
    </>
  )

}
export default App;
