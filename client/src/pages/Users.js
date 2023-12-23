import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import edit from '../assets/edit.svg'
import remove from '../assets/delete.svg'

function Users() {
    const [Users, setUsers] = useState([])

    const getUsers = async () => {
        try {
            const res = await axios.get('/user/', {
                headers: {
                    'Authorization': Cookies.get('refreshtoken')
                }
            })

            setUsers(res.data.data)
        } catch (error) {
            console.log(error.response);
        }
    }

    const deleteUser = async (id) => {
        
        if(window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/user/${id}`, {
                    headers: {
                        'Authorization': Cookies.get('refreshtoken')
                    }
                })
                getUsers()
            } catch (error) {
                console.log(error.response);
            }
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    if(Users.length === 0) return (
        <div className='data_container'>
            <div className="header">
                <h1>Users ({Users.length})</h1>
            </div>
            <p>No data</p>    
        </div>
    )
    
    return (
        <div className="data_container">
            <div className="header">
                <h1>Users ({Users.length})</h1>
            </div>

            {
                Users.map(user => {
                    return (
                        <div className='item' key={user._id}>
                            <div className="item-col">
                                <div className="item-row">
                                    <strong>Name:</strong>
                                    <p>{user.name}</p>
                                </div>

                                <div className="item-row">
                                    <strong>Sector:</strong>
                                    <p>{user.sector}</p>
                                </div>

                                <div className="item-row">
                                    <strong>Agree To Terms:</strong>
                                    <p>{user.agreeToTerms.toString()}</p>
                                </div>
                            </div>

                            <div className="item-col center">
                                <Link to={`/update_user/${user._id}`}>
                                    <img src={edit} alt='' />
                                </Link>
                                <button onClick={() => deleteUser(user._id)}>    
                                    <img src={remove} alt='' />
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Users