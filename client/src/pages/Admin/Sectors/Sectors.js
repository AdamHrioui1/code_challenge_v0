import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import edit from '../../../assets/edit.svg'
import remove from '../../../assets/delete.svg'

function Sectors() {
    const [Sector, setSector] = useState([])

    const getSectors = async () => {
        try {
            const res = await axios.get('/sector/', {
                headers: {
                    'Authorization': Cookies.get('refreshtoken')
                }
            })
            setSector(res.data.data)
        } catch (error) {
            console.log(error.response);
        }
    }

    const deleteSector = async (id) => {
        if(window.confirm('Are you sure you want to delete this sector?')) {
            try {
                await axios.delete(`/sector/${id}`, {
                    headers: {
                        'Authorization': Cookies.get('refreshtoken')
                    }
                })
                getSectors()
            } catch (error) {
                console.log(error.response);
            }
        }
    }

    useEffect(() => {
        getSectors()
    }, [])

    return (
        <div className="data_container">
            <div className="header">
                <h1>Sectors ({Sector.length})</h1>
            </div>
            
            {
                Sector.map(sector => {
                    return (
                        <div className="item" key={sector._id}>
                            <div className="item-col">
                                <div className="item-row">
                                    <strong>Name:</strong>
                                    <p>{sector.name}</p>
                                </div>
                            </div>

                            <div className="item-col center">
                                <Link to={`/update_sector/${sector._id}`}>
                                    <img src={edit} alt='' />
                                </Link>
                                <button onClick={() => deleteSector(sector._id)}>
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

export default Sectors