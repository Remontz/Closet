import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import '../App.css'


const ClosetDashboard = (props) => {
    const { id } = useParams()
    const [closet, setCloset] = useState({})
    const [closetName, setClosetName] = useState("")
    const [closetImage, setClosetImage] = useState("")

    const [user, setUser] = useState({})
    const scrolls = useRef(0)
    const scrollsP = useRef(0)
    const [errors, setErrors] = useState({})
    const [userName, setUserName] = useState("")
    console.log("Shirts and Pants")
    const [shirts, setShirts] = useState([])
    const currentShirt = useRef("")
    const [shirtCurrent, setShirtCurrent] = useState("")
    const [pants, setPants] = useState([])
    const currentPant = useRef("")
    const [pantCurrent, setPantCurrent] = useState("")
    console.log(pantCurrent)

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/closet/${id}`)
            .then((response) => {
                setCloset(response.data)
                console.log(user)
                setUser(response.data.user[0])
                setUserName(response.data.user[0].name)
                setClosetName(response.data.closetName)
                setClosetImage(response.data.closetImage)

                setShirts(response.data.shirts)
                currentShirt.current = shirts[scrolls.current].imageURL
                setShirtCurrent(currentShirt.current)

                setPants(response.data.pants)
                currentPant.current = pants[scrollsP.current].imageURL
                setPantCurrent(currentPant.current)

            })
            .catch((err) => {
                setErrors(err.response)
            })
    })


    const handleNextShirt = (idFromBelow) => {
        axios.get(`http://localhost:8000/api/closet/${idFromBelow}`)
            .then((response) => {
                if (scrolls.current !== shirts.length - 1) {
                    scrolls.current = scrolls.current + 1
                    currentShirt.current = shirts[scrolls.current].imageURL
                    setShirtCurrent(currentShirt.current)
                }
            })
            .catch((err) => {
                console.log('error scrolling', err.response)
                setErrors(err.response)
                console.log(errors)
            })
    }
    const handleNextPant = (idFromBelow) => {
        axios.get(`http://localhost:8000/api/closet/${idFromBelow}`)
            .then((response) => {
                if (scrollsP.current !== pants.length - 1) {
                    scrollsP.current = scrollsP.current + 1
                    currentPant.current = pants[scrollsP.current].imageURL
                    setPantCurrent(currentPant.current)
                }
            })
    }
    const handlePreviousShirt = (idFromBelow) => {
        axios.get(`http://localhost:8000/api/closet/${idFromBelow}`)
            .then((response) => {
                if (scrolls.current > 0) {
                    scrolls.current = scrolls.current - 1
                    currentShirt.current = shirts[scrolls.current].imageURL
                    setShirtCurrent(currentShirt.current)
                }
            })
            .catch((err) => {
                console.log('error scrolling', err.response)
                setErrors(err.response)
                console.log(errors)
            })
    }
    const handlePreviousPant = (idFromBelow) => {
        axios.get(`http://localhost:8000/api/closet/${idFromBelow}`)
            .then((response) => {
                if (scrollsP.current > 0) {
                    scrollsP.current = scrollsP.current - 1
                    currentPant.current = pants[scrollsP.current].imageURL
                    setPantCurrent(currentPant.current)
                }
            })
            .catch((err) => {
                console.log('error scrolling', err.response)
                setErrors(err.response)
                console.log(errors)
            })
    }

    return (
        <div className='body'>
            <div className='nav'>
                <div className='title'>
                    <h1>{userName}'s Dashboard</h1>
                    <h3>{closetName}</h3>
                </div>
            </div>
            <div>
                <div className='nav-links'>
                    <div>
                        <Link to={`/laundry/${closet._id}`}>
                            <img src='https://cdn-icons-png.flaticon.com/512/3721/3721818.png' alt='' id='nav-icons' />
                        </Link>
                    </div>
                    <div>
                        <Link to={`/edit/${closet._id}`} id='addNewBtn'>
                            <button>Add New or Edit an Item</button>
                        </Link>
                    </div>
                    <div>
                        <Link to={`/edit/${closet._id}`}>
                            <img src='https://cdn-icons-png.flaticon.com/512/649/649100.png' alt='' id='nav-icons' />
                        </Link>
                    </div>



                </div>
            </div>
            <div className='main'>
                <div className='dash-left'>
                    <div>
                        <h4>All Shirts</h4>
                        <div className='allShirts'>
                            {shirts.map((shirt, index) => {
                                return (
                                    <div key={index}>
                                        <img src={shirt.imageURL} alt='allImages' id='allImages' />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className='dash-center'>

                    <div id='tops'>
                        <button id='scrollButtons' onClick={() => handleNextShirt(closet._id)}>scroll</button>
                        <img src={shirtCurrent} alt='Current Shirt' id='currentShirt' />
                        <button id='scrollButtons' onClick={() => handlePreviousShirt(closet._id)}>scroll</button>
                    </div>
                    <div id='bottom'>
                        <button id='scrollButtons' onClick={() => handleNextPant(closet._id)}>scroll</button>
                        <img src={pantCurrent} alt='Current Pants' id='currentPant' />
                        <button id='scrollButtons' onClick={() => handlePreviousPant(closet._id)}>scroll</button>
                    </div>
                </div>
                <div className='dash-right'>
                    <div>
                        <h4>All Pants</h4>
                        <div className='allPants'>
                            {pants.map((pant, index) => {
                                return (
                                    <div key={index}>
                                        <img src={pant.imageURL} alt='' id='allImages' />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClosetDashboard