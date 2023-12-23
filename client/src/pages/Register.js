import axios from 'axios'
import React, { useState } from 'react'

function Register() {
    const [Name, setName] = useState('')
    const [Password, setPassword] = useState('')
    const [Error, setError] = useState('')

    const submitHandler = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/customer/register', {
                name: Name,
                password: Password,
            })

            if(res.data.accesstoken) {
                localStorage.setItem('logged', true)
                window.location.href = '/login'
            }
        } catch (error) {
            console.log(error.response.data.msg)
            setError(error.response.data.msg)
        }
    }

    return (
        <div className='container'>
            <form className="form" onSubmit={submitHandler}>
                <div className="header">
                    <h2>Register</h2>
                </div>

                <div className="error_container">
                    <p>{Error}</p>
                </div>

                <div className="input_container">
                    <label htmlFor="name">Name</label>
                    <input id='name' type="text" onChange={e => setName(e.target.value)} value={Name} placeholder='Enter your name...' />
                </div>
                
                <div className="input_container">
                    <label htmlFor="password">Password</label>
                    <input id='password' type="password" onChange={e => setPassword(e.target.value)} value={Password} placeholder='Enter your password...' />
                </div>
                
                <div className="input_container">
                    <input type="submit" value='Sign up'/>
                </div>
            </form>
        </div>
    )
}

export default Register