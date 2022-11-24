import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const DisplayAllClosets = () => {
    const [allClosets, setAllClosets] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/closet')
            .then((response) => {
                console.log('response', response)
                setAllClosets(response.data)
            })
            .catch((err, response) => { console.log('err.response', err) })
    }, [])


    return (
        <div className='body'>
            <div className='closet-container'>
                <div className='allClosets'>
                    {allClosets.map((closet, index) => {
                        return (
                            <div key={closet._id} className='closet-icon'>
                                <img src={closet.closetImage} alt='' />
                                <p>{closet.closetName}</p>
                            </div>
                        )
                    })}
                </div>
                <h3>Select Your Closet</h3>
            </div>
            <div>
                <p>or Create a <span>NEW</span> Closet</p>
                <Link to={'/newCloset'}>
                    <button>+</button>
                </Link>
            </div>
        </div>
    )
}

export default DisplayAllClosets