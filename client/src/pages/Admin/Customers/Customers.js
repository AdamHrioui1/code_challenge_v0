import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import remove from '../../../assets/delete.svg'

function Customers() {
    const [Customer, setCustomer] = useState([])

    const getCustomer = async () => {
        try {
            const res = await axios.get('/customer/', {
                headers: {
                    'Authorization': Cookies.get('refreshtoken')
                }
            })
            setCustomer(res.data.data)
        } catch (error) {
            console.log(error.response);
        }
    }

    const deleteCustomer = async (id) => {
        if(window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await axios.delete(`/customer/${id}`, {
                    headers: {
                        'Authorization': Cookies.get('refreshtoken')
                    }
                })
                getCustomer()
            } catch (error) {
                console.log(error.response);
            }
        }
    }

    useEffect(() => {
        getCustomer()
    }, [])

    return (
        <div className="data_container">
            <div className="header">
                <h1>Customers ({Customer.length})</h1>
            </div>

            {
                Customer.map(customer => {
                    return (
                        customer.name !== 'admin' &&
                        <div className="item" key={customer._id}>
                            <div className="item-col">
                                <div className="item-row">
                                    <strong>Name:</strong>
                                    <p>{customer.name}</p>
                                </div>
                            </div>

                            <div className="item-col center">
                                <button onClick={() => deleteCustomer(customer._id)}>
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

export default Customers