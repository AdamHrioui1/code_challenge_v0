import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import axios from "axios";

export const GlobalContext = createContext()

export const ContextProvider = ({ children }) => {

    const [IsAdmin, setIsAdmin] = useState(false)
    const [Token, setToken] = useState('')

    const getToken = () => {
        try {
            const token = Cookies.get('refreshtoken')
            setToken(token)       
        } catch (error) {
            console.log(error);
        }
    }

    const getCustomer = async () => {
        try {
            const res = await axios.get('/customer/info', {
                headers: {
                    'Authorization': Cookies.get('refreshtoken')
                }
            })

            res.data.data.role === 'admin' ? setIsAdmin(true) : setIsAdmin(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken()
        getCustomer()
    }, [])

    const state = {
        Token: [Token, setToken],
        IsAdmin: [IsAdmin, setIsAdmin]
    }

    return (
        <GlobalContext.Provider value={state}>
            { children }
        </GlobalContext.Provider>
    )
}