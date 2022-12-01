import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import '../App.css'


const ClosetDashboard = (props) => {
    const { id } = useParams()
    const [closet, setCloset] = useState({})
    const scrolls = useRef(0)
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({})
    const [userName, setUserName] = useState("")
    const [closetName, setClosetName] = useState("")
    const [closetImage, setClosetImage] = useState("")
    console.log("Shirts and Pants")
    const [shirts, setShirts] = useState([])
    const [pants, setPants] = useState({})
    const currentShirt = useRef("")
    const [shirtCurrent, setShirtCurrent] = useState()

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/closet/${id}`)
            .then((response) => {
                setCloset(response.data)
                setUser(response.data.user)
                setUserName(response.data.user[0].name)
                setClosetName(response.data.closetName)
                setClosetImage(response.data.closetImage)
                setShirts(response.data.shirts)
                setPants(response.data.pants)
                currentShirt.current = shirts[scrolls.current].imageURL
                console.log(currentShirt)
                console.log(currentShirt.current)
            })
            .catch((err) => {
                setErrors(err.response.data)
            })
    }, [])


    const handleNextShirt = (idFromBelow) => {
        axios.get(`http://localhost:8000/api/closet/${idFromBelow}`)
            .then((response) => {
                scrolls.current = scrolls.current + 1
                currentShirt.current = shirts[scrolls.current].imageURL
                setShirts(response.data.shirts)
            })
            .catch((err) => {
                console.log('error scrolling', err.response)
                setErrors(err.response)
                console.log(errors)
            })
    }
    const handlePreviousShirt = (idFromBelow) => {
        axios.get(`http://localhost:8000/api/closet/${idFromBelow}`)
            .then((response) => {

            })
            .catch((err) => {
                console.log('error scrolling', err.response)
                setErrors(err.response)
                console.log(errors)
            })
    }

    return (
        <div className='dash-body'>
            <div className='dash-nav'>
                <div className='title'><h1>{userName}'s Dashboard</h1> </div>
                <div className='nav-links'>
                    <Link to={`/laundry/${closet._id}`}>
                        <img src='https://cdn-icons-png.flaticon.com/512/3721/3721818.png' alt='' height='30px' width='30px' />
                    </Link>
                    <Link to={`/outfits/${closet._id}`}>
                        <img src='https://cdn-icons-png.flaticon.com/512/649/649100.png' alt='' height='30px' weight='30px' />
                    </Link>
                    <Link><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkYSptom0k0BqL39WJ-lZCKoEb0e4gD3-Lg&usqp=CAU' alt='' height='50px' weight='50px' />
                    </Link>
                </div>
                <div>
                    <Link to={`/newItem`}>
                        <button>Add New Item</button>
                    </Link>
                    <img src='https://www.creativefabrica.com/wp-content/uploads/2019/02/Support-icon-by-arus.jpg' alt='' height='25px' width='25px' />
                </div>
            </div>
            <div className='dash-main'>
                <div className='dash-left'>
                    <ul>
                        <li className='closet-links' id='shirts'>View All Shirts</li>
                        <li className='closet-links' id='pants'>View All Pants</li>
                        <li className='closet-links' id='dresses'>View All Dresses</li>
                        <li className='closet-links' id='shoes'>View All Shoes</li>
                        <li className='closet-links' id='accessories'>View Hats/Accessories</li>
                        <li className='closet-links' id='pajamas'>View All Pajamas</li>
                    </ul>
                    <br />
                    <ul>
                        <li className='closet-links' id='warm'>View Warm WX Clothes</li>
                        <li className='closet-links' id='cold'>View Cold WX Clothes</li>
                    </ul>
                </div>
                <div className='dash-center'>

                    <div id='tops' width='100px' height='100px'>
                        <button onClick={() => handleNextShirt(closet._id)}>scroll</button>
                        <img src={currentShirt.current} alt='' height='100px' width='100px' />
                        <button onClick={() => handlePreviousShirt(closet._id)}>scroll</button>
                    </div>
                    <div id='continue'>
                        <button id='createPlus'>+</button>
                    </div>
                    <div id='bottom' width='100px' height='100px'>
                        {/* <button onClick={() => { pantIndex = pantIndex - 1 }}>scroll</button>
                        <img src={pants[0]} alt='' height='100px' width='100px' />
                        <button onClick={() => { pantIndex = pantIndex + 1 }}>scroll</button> */}
                    </div>
                </div>
                <div className='dash-right'>
                    <img src='' alt='' height='120px' width='120px' />
                    <p><span>##</span> times worn</p>

                </div>
            </div>
        </div>
    )
}

export default ClosetDashboard