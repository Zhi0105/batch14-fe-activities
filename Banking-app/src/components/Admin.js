import React from 'react'

const admin = () => {

    let storedMember = JSON.parse(localStorage.getItem('userRecord'))

    return (
        <div className="admin-main">
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Email</td>    
                    </tr>
                </thead>
                <tbody id="member-info">
                    {
                        storedMember.length ? 
                            storedMember.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{value.id}</td>
                                        <td>{value.firstname}</td>
                                        <td>{value.lastname}</td>
                                        <td>{value.email}</td>
                                    </tr>
                                )
                            }) : <span>No users found!</span>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default admin