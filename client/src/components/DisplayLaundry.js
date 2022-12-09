import { React, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../App.css'

const DisplayLaundry = (props) => {
    const { id } = useParams()
    const [closet, setCloset] = useState({})
    const [user, setUser] = useState({})
    const [userName, setUserName] = useState("")
    const [closetName, setClosetName] = useState("")

    const navigate = useNavigate()
    const [shirts, setShirts] = useState([])

    const [pants, setPants] = useState([])

    const [errors, setErrors] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/closet/${id}`)
            .then((response) => {
                setCloset(response.data)
                console.log(response)
                setUser(response.data.user[0])
                setUserName(response.data.user[0].name)
                setClosetName(response.data.closetName)

                setShirts(response.data.shirts)

                setPants(response.data.pants)

            })
            .catch((err) => {
                setErrors(err.response)
            })
    }, [])

    const submitHandler = (e, index) => {
        e.preventDefault()
        shirts[index].isWorn = !shirts[index].isWorn
        axios
            .put(`http://localhost:8000/api/closet/${id}`, {
                shirts: shirts
            })
            .then((response) => {
                console.log(response)
                navigate(`/laundry/${id}`)
            })
            .catch((err) => {
                console.log(err.response)
                setErrors(err.response)
            })
    }


    return (
        <div className='laundry-body'>
            <div className='laundry-nav'>
                <div><h1>{userName}'s Laundry</h1></div>
                <div className='nav-links'>
                    {/* //Back to Dashboard Link */}
                    <Link to={`/outfits/${closet._id}`}>
                        <img src='https://cdn-icons-png.flaticon.com/512/649/649100.png' alt='' height='30px' weight='30px' />
                    </Link>
                    <Link><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkYSptom0k0BqL39WJ-lZCKoEb0e4gD3-Lg&usqp=CAU' alt='' height='50px' weight='50px' />
                    </Link>
                </div>
            </div>
            <div className='laundry-main'>
                {shirts.map((shirt, index) => {
                    if (shirt.isWorn) {
                        return (
                            <div key={index}>
                                <img src={shirt.imageURL} alt='' />
                                <p>ShirtType: {shirt.shirtType} Shirt Size: {shirt.size}</p>
                                <form className='editShirt'>
                                    <div>
                                        <label>
                                            <input
                                                type='checkbox'
                                                value={shirt.isWorn}
                                                onChange={(e) => { submitHandler(e, index) }}
                                            />
                                            Shirts been Washed?
                                        </label>
                                    </div>
                                </form>
                            </div>
                        )
                    }
                    else { return (null) }
                })}
                <div>
                    <h4>Clean Clothes</h4>
                    {shirts.map((shirt, index) => {
                        if (!shirt.isWorn) {
                            return (
                                <div key={index}>
                                    <img src={shirt.imageURL} alt='' />
                                    <p>ShirtType: {shirt.shirtType} Shirt Size: {shirt.size}</p>
                                    <form className='editShirt'>
                                        <div>
                                            <label>
                                                <input
                                                    type='checkbox'
                                                    value={shirt.isWorn}
                                                    onChange={(e) => { submitHandler(e, index) }}
                                                />
                                                Shirt worn?
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                        else { return (null) }
                    })}
                </div>
            </div>
            <div className='laundry-footer'>

            </div>
        </div>
    )
}

export default DisplayLaundry
