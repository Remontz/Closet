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
                console.log('test' + response.data.pants[0])
                setPants(response.data.pants)
                console.log('pants:' + pants)

            })
            .catch((err) => {
                setErrors(err.response)
            })
    }, [])

    const submitHandler = (e, index, item) => {
        e.preventDefault()
        if (item === 's') { shirts[index].isWorn = !shirts[index].isWorn }
        if (item === 'p') { pants[index].isWorn = !pants[index].isWorn }

        axios
            .put(`http://localhost:8000/api/closet/${id}`, {
                shirts: shirts,
                pants: pants
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
        <div className='body'>
            <div className='nav'>
                <div className='title'>
                    <div><h1>{userName}'s Laundry</h1></div>
                    <div><h3>{closetName}</h3></div>
                </div>
                <div className='nav-links'>
                    <div><Link to={`/dashboard/${id}`} id='nav-icons'>Back to Dashboard</Link></div>
                    <div>
                        <Link to={`/edit/${closet._id}`}>
                            <img id='nav-icons' src='https://cdn-icons-png.flaticon.com/512/649/649100.png' alt='' />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='main'>
                <h3>Dirty Laundry</h3>
                <div id='dirtyLaundry'>
                    <div className='dirtyShirts'>
                        {shirts.map((shirt, index) => {
                            if (shirt.isWorn) {
                                return (
                                    <div key={index}>
                                        <img src={shirt.imageURL} alt='' id='dirtyShirts' />
                                        <p>ShirtType: {shirt.shirtType} Shirt Size: {shirt.size}</p>
                                        <form className='editShirt'>
                                            <div>
                                                <label>
                                                    <input
                                                        type='checkbox'
                                                        value={shirt.isWorn}
                                                        onChange={(e) => { submitHandler(e, index, 's') }}
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
                    </div>
                    <div className='dirtyPants'>
                        {pants.map((pant, index) => {
                            if (pant.isWorn) {
                                return (
                                    <div key={index}>
                                        <img src={pant.imageURL} alt='' id='dirtyShirts' />
                                        <p>Pant Material: {pant.pantMaterial} Pant Size: {pant.waistSize} / {pants.pantLength}</p>
                                        <form className='editShirt'>
                                            <div>
                                                <label>
                                                    <input
                                                        type='checkbox'
                                                        value={pant.isWorn}
                                                        onChange={(e) => { submitHandler(e, index, 'p') }}
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
                    </div>
                </div>


                <h4>Clean Clothes</h4>
                <div>
                    <div className='cleanShirts'>
                        {shirts.map((shirt, index) => {
                            if (!shirt.isWorn) {
                                return (
                                    <div key={index}>
                                        <img src={shirt.imageURL} alt='' id='cleanShirts' />
                                        <p>ShirtType: {shirt.shirtType} Shirt Size: {shirt.size}</p>
                                        <form className='editShirt'>
                                            <div>
                                                <label>
                                                    <input
                                                        type='checkbox'
                                                        value={shirt.isWorn}
                                                        onChange={(e) => { submitHandler(e, index, 's') }}
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
                    <div className='cleanPants'>
                        {pants.map((pant, index) => {
                            if (!pant.isWorn) {
                                return (
                                    <div key={index}>
                                        <img src={pant.imageURL} alt='' id='cleanPants' />
                                        <p>Pant Material: {pant.pantMaterial}  Size: {pant.waistSize} / {pant.pantLength}</p>
                                        <form className='editPant'>
                                            <div>
                                                <label>
                                                    <input
                                                        type='checkbox'
                                                        value={pant.isWorn}
                                                        onChange={(e) => { submitHandler(e, index, 'p') }}
                                                    />
                                                    Pant worn?
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
            </div>
            <div className='laundry-footer'>

            </div>
        </div>
    )
}

export default DisplayLaundry
