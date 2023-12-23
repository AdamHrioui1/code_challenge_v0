import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

function AddSector() {    
    const [Error, setError] = useState('')
    const [Name, setName] = useState('')
    
    const submitHandler = async e => {
        e.preventDefault()
        try {
            await axios.post(`/sector`, {
                name: Name,
            }, {
                headers: {
                    'Authorization': Cookies.get('refreshtoken')
                }
            })
            setError('')
            setName('')

            window.location.href = '/sectors'
        } catch (error) {
            console.log(error.response.data.msg);
            setError(error.response.data.msg);
        }
    }

    return (
        <div className='container'>
            <form className="form" onSubmit={submitHandler}>
                <div className="header">
                    <h2>Add Sector</h2>
                </div>

                <div className="error_container">
                    <p>{Error}</p>
                </div>

                <div className="input_container">
                    <label htmlFor="name">Name</label>
                    <input id='name' type="text" onChange={e => setName(e.target.value)} value={Name} placeholder='Enter your name...' />
                </div>
                
                <div className="input_container">
                    <input type="submit" value='Add Sector'/>
                </div>
            </form>
        </div>
    )
}

export default AddSector