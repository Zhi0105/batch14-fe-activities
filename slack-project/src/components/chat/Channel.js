import React, {useState, useEffect } from 'react'
import toastr from 'toastr'
import { getMessageChannel } from '../../API/fetch'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';



const Channel = ({channel = '', userChannel = []}) => {
    const [messageList, setMessageList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [user] = useState(localStorage.getItem(`uid`))

    useEffect(() => {
        let filteredChannel = userChannel.filter(i => channel === i.name)
            if(filteredChannel.length){
                    (async() => {
                        setIsLoading(true)
                            const [res, error] = await getMessageChannel({
                                "access-token" : localStorage.getItem(`access-token`),
                                expiry : localStorage.getItem(`expiry`),
                                uid : localStorage.getItem(`uid`),
                                client : localStorage.getItem(`client`)
                            }, 'Channel', filteredChannel[0].id)

                            if(error.length){
                                toastr['error'](error[0])
                            } else {
                                if(!res.data.data.length){
                                    setHasError(true)
                                }

                                if(res.data.data.length){
                                        
                                        if(messageList.length){
                                            messageList.length = 0
                                            setMessageList(messageList)
                                        }
                                        res.data.data.map((value, index) => messageList.push({
                                            date : value.created_at,
                                            sender : value.sender.uid,
                                            body : value.body
                                            
                                        }))
                                        
                                        setMessageList(messageList)
                                        setHasError(false)
                                }
                            }
                        setIsLoading(false)
                    }
                        
                    )()
                }
    
    }, [channel, userChannel, messageList])
    return (
        <div className='channel-main'>
            {
                isLoading ? (<p>Loading.....</p>) : (
                    <ul>
                        {
                            hasError ? <li>No message yet</li> :
                            messageList.map((value, index) => (
                                <li key={index}>
                                    <p><strong>{value.date.slice(0, 10)}</strong></p>
                                    {/* <p>{value.sender}</p>
                                     */}
                                    <p>
                                        <Stack direction="row" spacing={2}>
                                            <Avatar alt="JD" src=''  sx={{ width: 20, height: 20 }}/>&nbsp;&nbsp;
                                                {
                                                    value.sender === user ? `${value.sender} (you)` : value.sender
                                                }
                                        </Stack>
                                    </p>
                                    <p className='body'>{value.body}</p>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default Channel
