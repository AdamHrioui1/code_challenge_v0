import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'

function UpdateSector() {
    const [Error, setError] = useState('')
    const [Name, setName] = useState('')

    const params = useParams()
    
    const getSector = async () => {
        try {
            const res = await axios.get(`/sector/${params.id}`, {
                headers: {
                    'Authorization': Cookies.get('refreshtoken')
                }
            })

            const { name } = res.data.data
            setName(name)
        } catch (error) {
            setError(error.response.data.msg);
        }
    }

    const submitHandler = async e => {
        e.preventDefault()
        try {
            await axios.put(`/sector/${params.id}`, {
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
            setError(error.response.data.msg);
        }
    }

    useEffect(() => {
        getSector()
    }, [])

    return (
        <div className='container'>
            <form className="form" onSubmit={submitHandler}>
                <div className="header">
                    <h2>Update Sector</h2>
                </div>

                <div className="error_container">
                    <p>{Error}</p>
                </div>

                <div className="input_container">
                    <label htmlFor="name">Name</label>
                    <input id='name' type="text" onChange={e => setName(e.target.value)} value={Name} placeholder='Enter your name...' />
                </div>
                
                <div className="input_container">
                    <input type="submit" value='Update Sector'/>
                </div>
            </form>
        </div>
    )
}

export default UpdateSector