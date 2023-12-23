import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AddSector from './pages/Admin/Sectors/AddSector'
import Customers from './pages/Admin/Customers/Customers'
import Sectors from './pages/Admin/Sectors/Sectors'
import UpdateSector from './pages/Admin/Sectors/UpdateSector'
import AddUser from './pages/AddUser'
import UpdateUser from './pages/UpdateUser'
import Users from './pages/Users'
import { GlobalContext } from './GlobalContext'
import Navbar from './components/Navbar'

function Routers() {
    const state = useContext(GlobalContext)
    const [IsAdmin] = state.IsAdmin
    const [Token] = state.Token
    
    return (
        <Router>
            <Navbar />
            {
                Token && !IsAdmin ?
                <Routes>
                    <Route path='/add_user' element={<AddUser />} />
                    <Route path='/update_user/:id' element={<UpdateUser />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='*' element={<Users />} />
                </Routes> :

                Token && IsAdmin ?
                <Routes>
                    <Route path='/add_user' element={<AddUser />} />
                    <Route path='/update_user/:id' element={<UpdateUser />} />
                    <Route path='/users' element={<Users />} />
                
                    <Route path='/customers' element={<Customers />} />

                    <Route path='/add_sector' element={<AddSector />} />
                    <Route path='/update_sector/:id' element={<UpdateSector />} />
                    <Route path='/sectors' element={<Sectors />} />
                    
                    <Route path='*' element={<Users />} />
                </Routes> :
                
                <Routes>
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='*' element={<Login />} />
                </Routes>
            }
        </Router>
    )
}

export default Routers