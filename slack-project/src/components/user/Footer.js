import React, { useState } from 'react'
import ReactQuill from 'react-quill'

//CSS
import 'react-quill/dist/quill.snow.css'

const Footer = () => {
    const [value, setValue] = useState('');
    
    return (
        <>
            <div className="editor-header">
                <img src="/img/send.png" alt="send-icon" />
            </div>
            <div className="editor-container">
                <ReactQuill theme="snow" value={value} onChange={setValue}/ >
            </div>
        </>
    );
}

export default Footer
