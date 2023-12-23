import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

function AddUser() {
    const [Error, setError] = useState('')
    const [Name, setName] = useState('')
    const [Sector, setSector] = useState('')
    const [Sectors, setSectors] = useState([])
    const [AgreeToTerms, setAgreeToTerms] = useState(false)

    const getSectors = async () => {
        try {
            const res = await axios.get('/sector/', {
                headers: {
                    'Authorization': Cookies.get('refreshtoken')
                }
            })

            setSectors(res.data.data)
        } catch (error) {
            console.log(error.response);
        }
    }

    const submitHandler = async e => {
        e.preventDefault()
        try {
            await axios.post(`/user`, {
                name: Name,
                sector: Sector,
                agreeToTerms: AgreeToTerms
            }, {
                headers: {
                    'Authorization': Cookies.get('refreshtoken')
                }
            })
            setError('')
            setName('')
            setSector('')
            setAgreeToTerms(false)

            window.location.href = '/users'
        } catch (error) {
            console.log(error.response.data.msg);
            setError(error.response.data.msg);
        }
    }

    useEffect(() => {
        getSectors()
    }, [])    

    return (
        <div className='container'>
            <form className="form" onSubmit={submitHandler}>
                <div className="header">
                    <h2>Add User</h2>
                </div>

                <div className="error_container">
                    <p>{Error}</p>
                </div>

                <div className="input_container">
                    <label htmlFor="name">Name</label>
                    <input id='name' type="text" placeholder='Enter your name...' onChange={e => setName(e.target.value)} value={Name} />
                </div>

                <div className="input_container">
                    <label htmlFor="sector">Sector</label>
                    <select id="sector" onChange={e => setSector(e.target.value)} value={Sector}>
                        {
                            Sectors.map(sector => {
                                return <option key={sector.name} value={sector.name}>{sector.name}</option>
                            })
                        }
                    </select>    
                </div>
                
                <div className="input_container">
                    <label htmlFor="agreeToTerms">Agree to terms</label>
                    <input id='agreeToTerms' type="checkbox" onChange={() => setAgreeToTerms(!AgreeToTerms)} />
                </div>
                
                <div className="input_container">
                    <input type="submit" value='Save'/>
                </div>
            </form>
        </div>
    )
}

export default AddUser