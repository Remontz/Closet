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
            <h1>Welcome to Closets</h1>
            <h4>by GilbertDEV</h4>
            <div className='closet-container'>
                <div className='allClosets'>
                    {allClosets.map((closet, index) => {
                        return (
                            <div key={closet._id} className='closet-icon'>
                                <Link to={`/dashboard/${closet._id}`}>
                                    <img src={closet.closetImage} alt='' height='110px' width='110px' />
                                </Link>
                                <p>{closet.closetName}</p>
                            </div>
                        )
                    })}
                </div>
                <h2>Select Your Closet</h2>
            </div>
            <div className='newCloset'>
                <p>or Create a <span>NEW</span> Closet</p>
                <Link to={'/new'}>
                    <button id='createPlus'>+</button>
                </Link>
            </div>
        </div>
    )
}

export default DisplayAllClosets