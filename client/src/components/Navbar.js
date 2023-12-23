import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import { GlobalContext } from '../GlobalContext'
import add_user from '../assets/add_user.svg'
import users from '../assets/users.svg'
import sector from '../assets/sector.svg'
import customers from '../assets/customers.svg'
import add from '../assets/add.svg'

function Navbar() {
    const state = useContext(GlobalContext)
    const [IsAdmin] = state.IsAdmin
    const [Token] = state.Token
    const [BurgerActive, setBurgerActive] = useState(false)

    const burgerHandler = () => setBurgerActive(!BurgerActive)

    const logoutHandler = async e => {
        e.preventDefault()
        try {
            const res = await axios.get('/customer/logout')
            Cookies.remove('refreshtoken')

            if(res.data) {
                localStorage.setItem('logged', false)
                window.location.href = '/login'
            }
        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    return (
        <nav className={`navbar ${BurgerActive ? 'active' : ''}`}>
            {
                Token && IsAdmin ?
                <ul>
                    <li onClick={burgerHandler}>
                        <img src={add_user} alt='' />
                        <Link to='/add_user'>Add User</Link>
                    </li>
                    <li onClick={burgerHandler}>
                        <img src={users} alt='' />
                        <Link to='/users'>Users</Link>
                    </li>
                    <li onClick={burgerHandler}>
                        <img src={add} alt='' />
                        <Link to='/add_sector'>Add Sector</Link>
                    </li>
                    <li onClick={burgerHandler}>
                        <img src={sector} alt='' />
                        <Link to='/sectors'>Sectors</Link>
                    </li>
                    <li onClick={burgerHandler}>
                        <img src={customers} alt='' />
                        <Link to='/customers'>Customers</Link>
                    </li>
                    <li className='logout_container'>
                        <button onClick={logoutHandler}>Logout</button>    
                    </li>
                </ul> :

                Token && !IsAdmin ? 
                <ul>
                    <li onClick={burgerHandler}>
                        <img src={users} alt='' />
                        <Link to='/users'>Users</Link>
                    </li>
                    <li onClick={burgerHandler}>
                        <img src={add_user} alt='' />
                        <Link to='/add_user'>Add User</Link>
                    </li>
                    <li className='logout_container'>
                        <button onClick={logoutHandler}>Logout</button>    
                    </li>
                </ul> :
                <ul>
                    <li onClick={burgerHandler}>
                        <Link to='/login'>Login</Link>
                    </li>
                    <li onClick={burgerHandler}>
                        <Link to='/register'>Register</Link>
                    </li>
                </ul>
            }

            <div className={`burger ${BurgerActive ? 'active' : ''}`} onClick={burgerHandler}>
                <span></span>   
                <span></span>
            </div>
        </nav>
    )
}

export default Navbar