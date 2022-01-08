import React, {useState, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'


//COMPONENTS
import Footer from './user/Footer'
import Search from './modal/Search'
import List from './channel/List'
import Channelmember from './modal/Channelmember'
import Addchannel from './modal/Addchannel'
import toastr from 'toastr'

//FETCH
import { getAllUser, getUserChannel, addToChannel, getChannelDetail } from '../api/fetch'
// import userheader from '../api/responseheader'


//MUI
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


//MODAL REDUCER
const modalReducer = (state, action) => {
    switch (action.type){
        case 'openSearchModal' :
            return{
                ...state,
                isSearchOpenModal : true
            }
        case 'closeSearchModal' :
            return{
                ...state,
                isSearchOpenModal : false
            }

            case 'openAddChannelModal' :
                return{
                    ...state,
                    isAddChannelOpenModal : true
                }
            case 'closeAddChannelModal' :
                return{
                    ...state,
                    isAddChannelOpenModal : false
                }
            case 'openChannelMemList' : 
                return{
                    ...state,
                    isChannelMemListOpenModal : true
                }
            case 'closeChannelMemList' : 
                return{
                    ...state,
                    isChannelMemListOpenModal : false
                }
            
        default :
            return state
    }
}

//DROPDOWN REDUCER
const dropdownReducer = (state, action) => {
    switch (action.method){
        case 'openChannelList' :
            return{
                ...state,
                isChannelListOpen : true
            }
        case 'closeChannelList' : 
            return{
                ...state,
                isChannelListOpen : false
            }

            case 'openDMList' :
                return{
                    ...state,
                    isDMSListOpen : true
                }
            case 'closeDMList' : 
                return{
                    ...state,
                    isDMSListOpen : false
                }
        default :
            return state
    }
}

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
        backgroundColor: purple[700],
        },
    }));

//DASHBOARD COMPONENT
const Dashboard = () => {

    //HANDLE OPEN SEARCH MODAL
    const handleOpenSearchModal = () => {
        modalDispatch({type : 'openSearchModal'})
    }

    //HANDLE CLOSE SEARCH MODAL
    const handleCloseSearchModal = () => {
        modalDispatch({type : 'closeSearchModal'})
    }

    //HANDLE OPEN ADD CHANNEL MODAL
    const handleOpenAddChannelModal = () => {
        modalDispatch({type : 'openAddChannelModal'})
    }   
    
    //HANDLE CLOSE ADD CHANNEL MODAL
    const handleClosenAddChannelModal = () => {
        modalDispatch({type : 'closeAddChannelModal'})
    }

    //HANDLE OPEN MEMBER LIST ON A CHANNEL
    const openChannelMemList = () => {
        modalDispatch({type : 'openChannelMemList'})
    }

    //HANDLE CLOSE MEMBER LIST ON A CHANNEL
    const closeChannelMemList = () => {
        modalDispatch({type : 'closeChannelMemList'})
    }

    //HANDLE CHANNEL DROPDOWN
    const handleDropDownChannelToggle = () => {
        if(isDropDown === false){
            dropdownDispatch({method : 'openChannelList'})
            setIsDropDown(true)
        } else {
            dropdownDispatch({method : 'closeChannelList'})
            setIsDropDown(false)
        }
    }
    //HANDLE DM DROPDOWN
    const handleDropDownDMToggle = () => {
        if(isDMDropDown === false){
            dropdownDispatch({method : 'openDMList'})
            setIsDMDropDown(true)
        } else {
            dropdownDispatch({method : 'closeDMList'})
            setIsDMDropDown(false)
        }
    }

const navigate = useNavigate()
const [allUsers, setAllUsers] = useState([])
const [userChannel, setUserChannel] = useState([])
const [userID, setUserID] = useState(null)

const [status, setStatus] = useState(null)
const [channel, setChannel] = useState('')
const [channelMemCount, setMemCount] = useState(null)
const [chMemberID, setChMemberID] = useState([])

const [searchValue, setSearchValue] = useState('')
const [modalState, modalDispatch] = useReducer(modalReducer, {
    isSearchOpenModal : false,
    isAddChannelOpenModal: false,
    isChannelMemListOpenModal: false
})
const [isDropDown, setIsDropDown] = useState(false)
const [isDMDropDown, setIsDMDropDown] = useState(false)
const [dropdownState, dropdownDispatch] = useReducer(dropdownReducer, {
    isChannelListOpen : false,
    isDMSListOpen : false
})

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "500",
    "timeOut": "1000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

    //LOGOUT
    const handleLogout = () => {
        localStorage.removeItem(`user`)
        navigate(`/`)
    }
    //USER SESSION
    useEffect(() => {
        let session = localStorage.getItem(`user`)
            !session ? navigate(`/`) : navigate(`/user-panel`)
    }, [navigate])


    useEffect(() => {

        (async () => {
            const [res, error] = await getAllUser(
                {
                    "access-token" : localStorage.getItem(`access-token`),
                    expiry : localStorage.getItem(`expiry`),
                    uid : localStorage.getItem(`uid`),
                    client : localStorage.getItem(`client`)
                }
            )
                if(error.length){
                    toastr['error'](error[0])
                }
                    else {
                        setAllUsers(res.data.data)
                    }
        })()
        
    }, [])

    useEffect(() => {
            (async() => {
                const [res, error] = await getUserChannel({
                    "access-token" : localStorage.getItem(`access-token`),
                    expiry : localStorage.getItem(`expiry`),
                    uid : localStorage.getItem(`uid`),
                    client : localStorage.getItem(`client`)
                })
                    if(error.length){
                        toastr['error'](error[0])
                    }
                        else {
                            setUserChannel(res.data.data)
                            
                        }
            })()
    }, [])

    
    //FUNCTION HANDLE TO ADD MEMBER ON THE CHANNEL
    const addMemberToChannel = async(channel_id, user_id, channel) => {
        const [error] = await addToChannel({
            "access-token" : localStorage.getItem(`access-token`),
            expiry : localStorage.getItem(`expiry`),
            uid : localStorage.getItem(`uid`),
            client : localStorage.getItem(`client`)
        }, channel_id, user_id)

            if(error.length){
                toastr['error'](error[0])
            } else {
                toastr['success'](`${searchValue} successfully added to ${channel} channel!`)
                window.location.reload() 
            }

    }

    const channelDetail= async(e) => {
        const [res, error] = await getChannelDetail({
            "access-token" : localStorage.getItem(`access-token`),
            expiry : localStorage.getItem(`expiry`),
            uid : localStorage.getItem(`uid`),
            client : localStorage.getItem(`client`)
        }, e.target.id)

        if(error.length){
            toastr['error'](error[0])
        } else {
            let memblist = res.data.data.channel_members
            
            setStatus('channel')
            setChannel(res.data.data.name)
            setMemCount(memblist.length)
            
            setChMemberID(chMemberID.length = 0)
            memblist.length ? memblist.map((member, index) => chMemberID.push(member.user_id)) : (console.log(`no data found`))
            setChMemberID(chMemberID)
        
        }
    }
    
    return (
        
        <div className='dashboard-main'>
            <div className="dashboard-sidebar">
                <span>🟢 {localStorage.getItem(`uid`)}</span>
                <ColorButton variant="contained" onClick={handleOpenAddChannelModal}>➕ Add Channel</ColorButton>
                {modalState.isAddChannelOpenModal &&
                    <Addchannel onClose={handleClosenAddChannelModal} userChannel={userChannel}/>
                }
                <button className="dropdown-btn" onClick={handleDropDownChannelToggle}>{!isDropDown ? <span>➤</span> : <span>▼</span>} Channels 
                </button>
                <div className="dropdown-container">
                    {dropdownState.isChannelListOpen &&
                        <List userChannel={userChannel} channelOnClick={channelDetail}/>
                    }
                </div>

                <button className="dropdown-btn" onClick={handleDropDownDMToggle}>{!isDMDropDown ? <span>➤</span> : <span>▼</span>} Direct messages 
                </button>
                <div className="dropdown-container">
                    {dropdownState.isDMSListOpen &&

                        <ul>
                            <li>user1</li>
                            <li>user2</li>
                            <li>user3</li>
                        </ul> 
                    }
                </div>
                
            </div>
            <div className="dashboard-container">
                <header>
                    <img src="/img/logout.png" alt="signout logo" onClick={handleLogout}/>
                    <input type="search" placeholder='search 🔎' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onClick={handleOpenSearchModal}/>
                    {/*ADD TO DROPDOWN */}
                    <div className="dropdown" >
                        <Button className="dropdown-btn" variant="contained" sx={searchValue === '' ? {display : 'none'} : {display : 'block'}}>add to 🡇</Button>
                        <div className="dropdown-content">
                            <span>
                                <Button className="DM" variant="contained" >Direct msg</Button>
                            </span>
                            <span>
                                <Accordion>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    >
                                    <h4>Channel</h4>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <ul>
                                            {
                                                userChannel.length ? userChannel.map( (channel, index) => 
                                                    <li key={index} onClick={() => {addMemberToChannel(channel.id, userID, channel.name)}}>{channel?.name}</li>
                                                ) : ( <li>no channel yet!</li>)
                                            }
                                        </ul>
                                    </AccordionDetails>
                                </Accordion>
                            </span>
                        </div>
                    </div>
                    
                        {modalState.isSearchOpenModal &&
                            < Search onClose={handleCloseSearchModal} allUsers={allUsers} setSearchValue={setSearchValue} setUserID={setUserID}/>
                        }
                </header>
                <section>
                    <div className="section-header">
                        {status === 'channel' ? <span>{channel}</span> : <span>direct message</span>}
                        <span style={{ display: 'none' }}>{status}</span>
                        <button style={status === 'channel' ? {display : 'block'} : {display: 'none'}} onClick={openChannelMemList}>
                            👥 members: <strong>{channelMemCount}</strong>
                        </button>
                            {modalState.isChannelMemListOpenModal &&
                                <Channelmember onClose={closeChannelMemList} chMemberID={chMemberID} allUsers={allUsers}/>
                            }
                    </div>
                    <div className="section-chat">
                        <p>chat</p>
                    </div>
                </section>
                <footer>< Footer /></footer>
            </div>
        </div>
    )
}

export default Dashboard
