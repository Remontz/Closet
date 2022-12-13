import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

const EditCloset = (props) => {
    const { id } = useParams()
    const [closet, setCloset] = useState({})
    const [closetName, setClosetName] = useState("")
    const [closetImage, setClosetImage] = useState("")

    const [user, setUser] = useState({ name: "", age: "", email: "", password: "" })
    let updatedUserValue = {}
    const userName = useRef("")
    const userAge = useRef("")
    const userEmail = useRef("")

    const navigate = useNavigate()
    const [shirts, setShirts] = useState([{ shirtType: "", shirtMaterial: "", sleeveType: "", weather: "", imageURL: "", size: "", color: "", isWorn: null }])
    let updatedShirtValue = ""
    const newShirts = useRef({})
    const shirtType = useRef("")
    const shirtMaterial = useRef("")
    const shirtSleeveType = useRef("")
    const shirtWeather = useRef("")
    const shirtImageURL = useRef("")
    const shirtSize = useRef("")
    const shirtColor = useRef("")
    const isShirtWorn = useRef()
    const [creatingShirt, setCreatingShirt] = useState(false)
    let z = creatingShirt

    const [pants, setPants] = useState([{ isWorn: null, pantMaterial: "", pantLength: null, waistSize: null, weather: "", imageURL: "", color: "" }])
    const pantWaistSizes = []
    for (let x = 24; x <= 48; x++) {
        pantWaistSizes.push(x)
    }
    const pantLengthSizes = []
    for (let y = 20; y <= 60; y++) {
        pantLengthSizes.push(y)
    }
    let updatedPantValue = ""
    const isPantWorn = useRef()
    const pantMaterial = useRef("")
    const pantLength = useRef()
    const pantWaistSize = useRef()
    const pantWeather = useRef("")
    const pantImageURL = useRef("")
    const pantColor = useRef("")

    const [errors, setErrors] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/closet/${id}`)
            .then((response) => {
                setCloset(response.data)
                console.log(response)
                setUser(response.data.user[0])
                setClosetName(response.data.closetName)
                setClosetImage(response.data.closetImage)

                userName.current = user.userName
                userAge.current = user.age
                userEmail.current = user.email

                setShirts(response.data.shirts)

                setPants(response.data.pants)

            })
            .catch((err) => {
                setErrors(err.response)
            })
    }, [])

    const shirtTypeChoiceHandler = (e, index, value) => {
        e.preventDefault()
        shirts[index].shirtType = value
        axios
            .put(`http://localhost:8000/api/closet/${id}`, {
                shirts: shirts
            })
            .then((response) => {
                console.log(response)
                navigate(`/edit/${id}`)
            })
            .catch((err) => {
                console.log(err.response)
                setErrors(err.response)
            })
    }
    const shirtSizeChoiceHandler = (e, index, value) => {
        e.preventDefault()
        shirts[index].size = value
        axios
            .put(`http://localhost:8000/api/closet/${id}`, {
                shirts: shirts
            })
            .then((response) => {
                navigate(`/edit/${id}`)
            })
            .catch((err) => {
                setErrors(err.response)
            })
    }
    const sleeveChoiceHandler = (e, index, value) => {
        e.preventDefault()
        shirts[index].sleeveType = value
        axios
            .put(`http://localhost:8000/api/closet/${id}`, {
                shirts: shirts
            })
            .then((response) => {
                navigate(`/edit/${id}`)
            })
            .catch((err) => {
                setErrors(err.response)
            })
    }
    const weatherChoiceHandler = (e, index, value) => {
        e.preventDefault()
        shirts[index].weather = value
        axios
            .put(`http://localhost:8000/api/closet/${id}`, {
                shirts: shirts
            })
            .then((response) => {
                navigate(`/edit/${id}`)
            })
            .catch((err) => {
                setErrors(err.response)
            })
    }
    const createShirtForm = (e) => {
        setCreatingShirt(!creatingShirt)
    }
    const createShirtHandler = (e) => {
        e.preventDefault()
        newShirts.current = { shirtType: shirtType.current, shirtMaterial: shirtMaterial.current, sleeveType: shirtSleeveType.current, weather: shirtWeather.current, imageURL: shirtImageURL.current, size: shirtSize.current, color: shirtColor.current, isWorn: false }
        shirts[shirts.length] = newShirts.current


        axios
            .put(`http://localhost:8000/api/closet/${id}`, {
                shirts: shirts
            })
            .then((response) => {
                navigate(`/edit/${id}`)
            })
            .catch((err) => {
                setErrors(err.response)
            })

        shirtType.current = ""
        shirtMaterial.current = ""
        shirtSleeveType.current = ""
        shirtWeather.current = ""
        shirtImageURL.current = ""
        shirtSize.current = ""
        shirtColor.current = ""
    }


    const isWornHandler = (e, index) => {
        e.preventDefault()
        shirts[index].isWorn = !shirts[index].isWorn
        axios
            .put(`http://localhost:8000/api/closet/${id}`, {
                shirts: shirts
            })
            .then((response) => {
                navigate(`/edit/${id}`)
            })
            .catch((err) => {
                setErrors(err.response)
            })
    }

    return (
        <div>
            <div className='nav'>
                <h1>Edit {user.name}'s Closet</h1>
                <Link to={`/dashboard/${id}`}>Back to Dashboard</Link>
                <Link to={`/laundry/${id}`} >Check Your Laundry</Link>
            </div>
            <div className='main'>
                <img src={closetImage} alt='' />
                <div className='editCloset'>
                    <div className='user-closet-DIV'>
                        <div className='user-info'>
                            <h2>Edit User Info</h2>
                            <form className='edit-form' id='user-data'>
                                <div className='form-data'>
                                    <label>User Name:</label>
                                    <input
                                        className='form-input' id='userName'
                                        type='text'
                                        name='userName'
                                        defaultValue={user.name}
                                        onChange={(e) => {
                                            userName.current = (e.target.value)
                                            updatedUserValue = { name: userName.current }
                                            setUser(user => ({
                                                ...user,
                                                ...updatedUserValue
                                            }))
                                        }}
                                    />
                                </div>
                                <div className='form-data'>
                                    <label>User Age:</label>
                                    <input
                                        className='form-input' id='userAge'
                                        type='text'
                                        name='userAge'
                                        defaultValue={user.age}
                                        onChange={(e) => {
                                            userAge.current = (e.target.value)
                                            updatedUserValue = { age: userAge.current }
                                            setUser(user => ({
                                                ...user,
                                                ...updatedUserValue
                                            }))
                                        }}
                                    />
                                </div>
                                <div className='form-data'>
                                    <label>User Email:</label>
                                    <input
                                        className='form-input' id='userEmail'
                                        type='text'
                                        name='userEmail'
                                        defaultValue={user.email}
                                        onChange={(e) => {
                                            userEmail.current = (e.target.value)
                                            updatedUserValue = { email: userEmail.current }
                                            setUser(user => ({
                                                ...user,
                                                ...updatedUserValue
                                            }))
                                        }}
                                    />
                                </div>
                                <input className='submit-btn' type='submit' value='Edit User' />
                            </form>
                        </div>
                        <div className='closet-info'>
                            <h2>Edit Closet Info</h2>
                            <form className='edit-form' id='closet-data'>
                                <div className='form-data'>
                                    <label>Closet Name:</label>
                                    <input
                                        className='form-input' id='closetName'
                                        type='text'
                                        value={closetName}
                                        onChange={(e) => setClosetName(e.target.value)}
                                    />
                                    {errors.closetName ? <p>{errors.closetName.message}</p> : null}
                                </div>
                                <div className='form-data'>
                                    <label>Closet Image:</label>
                                    <input
                                        className='form-input' id='closetImage'
                                        type='text'
                                        value={closetImage}
                                        onChange={(e) => setClosetImage(e.target.value)}
                                    />
                                    {errors.closetImage ? <p>{errors.closetImage.message}</p> : null}
                                </div>
                                <input className='submit-btn' type='submit' value='Edit Closet' />
                            </form>
                        </div>
                    </div>
                    <h3>Edit Shirts</h3>
                    <div className='shirts-info'>
                        {/* //Show All Shirts
                        //Edit Fields underneath each Shirt
                        //Add Shirt */}

                        {shirts.map((shirt, index) => {

                            return (
                                <div className='shirts' key={index}>
                                    <div className='shirt-details'>
                                        <img src={shirt.imageURL} alt='' id='shirtImage' />
                                        <form className='shirt-form'>
                                            <div className='form-data' id='shirtData'>
                                                <fieldset className='form-input' id='shirtType'>
                                                    <legend>Type of Shirt:</legend>
                                                    <div>
                                                        <input
                                                            name='shirtType' id='shirtTypeChoice1'
                                                            type='radio'
                                                            value='T-Shirt'
                                                            onChange={(e) => { shirtTypeChoiceHandler(e, index, 'T-Shirt') }}
                                                        />
                                                        <label for='shirtTypeChoice1'>T-Shirt</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            name='shirtType' id='shirtTypeChoice2'
                                                            type='radio'
                                                            value='Dress Shirt'
                                                            onChange={(e) => { shirtTypeChoiceHandler(e, index, 'Dress Shirt') }}
                                                        />
                                                        <label for='shirtTypeChoice2'>Dress Shirt</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            name='shirtType' id='shirtTypeChoice3'
                                                            type='radio'
                                                            value='Sweater'
                                                            onChange={(e) => { shirtTypeChoiceHandler(e, index, 'Sweater') }}
                                                        />
                                                        <label for='shirtTypeChoice3'>Sweater</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            name='shirtType' id='shirtTypeChoice4'
                                                            type='radio'
                                                            value='Jersey'
                                                            onChange={(e) => { shirtTypeChoiceHandler(e, index, 'Jersey') }}
                                                        />
                                                        <label for='shirtTypeChoice4'>Jersey</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            name='shirtType' id='shirtTypeChoice5'
                                                            type='radio'
                                                            value='Jacket'
                                                            onChange={(e) => { shirtTypeChoiceHandler(e, index, 'Jacket') }}
                                                        />
                                                        <label for='shirtTypeChoice5'>Jacket</label>
                                                    </div>
                                                </fieldset>
                                                <fieldset className='form-input' id='shirtSize'>
                                                    <legend>Size:</legend>
                                                    <div>
                                                        <input
                                                            name='shirtSize' id='shirtSizeChoice1'
                                                            type='radio'
                                                            value='4T'
                                                            onChange={(e) => { shirtSizeChoiceHandler(e, index, '4T') }}
                                                        />
                                                        <label for='shirtSizeChoice1'>4T</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            name='shirtSize' id='shirtSizeChoice2'
                                                            type='radio'
                                                            value='5T'
                                                            onChange={(e) => { shirtSizeChoiceHandler(e, index, '5T') }}
                                                        />
                                                        <label for='shirtSizeChoice1'>5T</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            name='shirtSize' id='shirtSizeChoice3'
                                                            type='radio'
                                                            value='6-7'
                                                            onChange={(e) => { shirtSizeChoiceHandler(e, index, '6-7') }}
                                                        />
                                                        <label for='shirtSizeChoice3'>6-7</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            name='shirtSize' id='shirtSizeChoice4'
                                                            type='radio'
                                                            value='S'
                                                            onChange={(e) => { shirtSizeChoiceHandler(e, index, 'S') }}
                                                        />
                                                        <label for='shirtSizeChoice4'>S</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            name='shirtSize' id='shirtSizeChoice5'
                                                            type='radio'
                                                            value='M'
                                                            onChange={(e) => { shirtSizeChoiceHandler(e, index, 'M') }}
                                                        />
                                                        <label for='shirtSizeChoice5'>M</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            name='shirtSize' id='shirtSizeChoice6'
                                                            type='radio'
                                                            value='L'
                                                            onChange={(e) => { shirtSizeChoiceHandler(e, index, 'L') }}
                                                        />
                                                        <label for='shirtSizeChoice6'>L</label>
                                                    </div>
                                                    <div>
                                                        <input
                                                            name='shirtSize' id='shirtSizeChoice7'
                                                            type='radio'
                                                            value='XL'
                                                            onChange={(e) => { shirtSizeChoiceHandler(e, index, 'XL') }}
                                                        />
                                                        <label for='shirtSizeChoice7'>XL</label>
                                                    </div>
                                                </fieldset>
                                                <div className='form-inputs'>
                                                    <div className='form-input' id='shirtMaterial'>
                                                        <label>Type of Material:</label>
                                                        <input
                                                            className='form-input' id='shirtMaterial'
                                                            type='text'
                                                            name='shirtMaterial'
                                                            defaultValue={shirt.shirtMaterial}
                                                            onChange={(e) => {
                                                                shirtMaterial.current = (e.target.value)
                                                                updatedShirtValue = { shirtMaterial: shirtMaterial.current }
                                                                setShirts(shirt => ({
                                                                    ...shirt,
                                                                    ...updatedShirtValue
                                                                }))
                                                            }}
                                                        />
                                                    </div>
                                                    <fieldset className='form-input' id='sleeveLength'>
                                                        <div>
                                                            <label>
                                                                Sleeve Length:_
                                                                <input
                                                                    name='sleeveLength' id='sleeveChoice1'
                                                                    type='radio'
                                                                    value='Short'
                                                                    onChange={(e) => { sleeveChoiceHandler(e, index, 'Short') }}
                                                                />Short
                                                                <input
                                                                    name='sleeveLength' id='sleeveChoice2'
                                                                    type='radio'
                                                                    value='Long'
                                                                    onChange={(e) => { sleeveChoiceHandler(e, index, 'Long') }}
                                                                />Long
                                                                <input
                                                                    name='sleeveLength' id='sleeveChoice3'
                                                                    type='radio'
                                                                    value='3/4'
                                                                    onChange={(e) => { sleeveChoiceHandler(e, index, '3/4') }}
                                                                />3/4
                                                                <input
                                                                    name='sleeveLength' id='sleeveChoice4'
                                                                    type='radio'
                                                                    value='None'
                                                                    onChange={(e) => { sleeveChoiceHandler(e, index, 'None') }}
                                                                />None
                                                            </label>
                                                        </div>
                                                    </fieldset>
                                                    <div className='form-input' id='isWorn'>
                                                        <label>
                                                            <input
                                                                name='isWorn' id='isWorn'
                                                                type='checkbox'
                                                                value={shirt.isWorn}
                                                                onChange={(e) => { isWornHandler(e, index) }}
                                                            />
                                                            Shirt worn?
                                                        </label>
                                                    </div>
                                                    <div className='form-input' id='shirtColor'>
                                                        <label>Color:</label>
                                                        <input
                                                            className='form-input' id='color'
                                                            type='text'
                                                            name='color'
                                                            defaultValue={shirt.color}
                                                            onChange={(e) => {
                                                                shirtColor.current = (e.target.value)
                                                                updatedShirtValue = { color: shirtColor.current }
                                                                setShirts(shirt => ({
                                                                    ...shirt,
                                                                    ...updatedShirtValue
                                                                }))
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <fieldset className='form-data' id='weather'>
                                                <label> Best Time to Wear? </label>
                                                <div>
                                                    <input
                                                        name="shirtWeather" id='shirtWeatherChoice1'
                                                        type='checkbox'
                                                        value='Winter'
                                                        onChange={(e) => { weatherChoiceHandler(e, index, 'Winter') }}
                                                    />Winter
                                                    <input
                                                        name="shirtWeather" id='shirtWeatherChoice2'
                                                        type='checkbox'
                                                        value='Spring'
                                                        onChange={(e) => { weatherChoiceHandler(e, index, 'Spring') }}
                                                    />Spring
                                                    <input
                                                        name="shirtWeather" id='shirtWeatherChoice3'
                                                        type='checkbox'
                                                        value='Summer'
                                                        onChange={(e) => { weatherChoiceHandler(e, index, 'Summer') }}
                                                    />Summer
                                                    <input
                                                        name="shirtWeather" id='shirtWeatherChoice4'
                                                        type='checkbox'
                                                        value='Fall'
                                                        onChange={(e) => { weatherChoiceHandler(e, index, 'Fall') }}
                                                    />Fall
                                                </div>
                                            </fieldset>
                                            <br />
                                            <div className='form-data' id='imageURL'>
                                                <label>Image URL:</label>
                                                <input
                                                    className='form-input' id='imageURL'
                                                    type='text'
                                                    name='imageURL'
                                                    defaultValue={shirt.imageURL}
                                                    onChange={(e) => {
                                                        shirtImageURL.current = (e.target.value)
                                                        updatedShirtValue = { imageURL: shirtImageURL.current }
                                                        setShirts(shirt => ({
                                                            ...shirt,
                                                            ...updatedShirtValue
                                                        }))
                                                    }}
                                                />
                                                {/* Change: appending newShirts Obj then pushing into shirts(State) */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h3>Create a Shirt</h3>
                    <button onClick={createShirtForm}>{z ? 'Creating' : 'Create a Shirt'}</button>
                    {
                        z && (
                            <div id='box'>
                                <div className='shirt-details'>
                                    <form className='create-shirt-form shirt-details' onSubmit={createShirtHandler}>
                                        <fieldset className='form-input' id='shirtType'>
                                            <legend>Type of Shirt:</legend>
                                            <div>
                                                <input
                                                    name='shirtType' id='shirtTypeChoice1'
                                                    type='radio'
                                                    value='T-Shirt'
                                                    onChange={(e) => { shirtType.current = 'T-Shirt' }}
                                                />
                                                <label for='shirtTypeChoice1'>T-Shirt</label>
                                            </div>
                                            <div>
                                                <input
                                                    name='shirtType' id='shirtTypeChoice2'
                                                    type='radio'
                                                    value='Dress Shirt'
                                                    onChange={(e) => { shirtType.current = 'Dress Shirt' }}
                                                />
                                                <label for='shirtTypeChoice2'>Dress Shirt</label>
                                            </div>
                                            <div>
                                                <input
                                                    name='shirtType' id='shirtTypeChoice3'
                                                    type='radio'
                                                    value='Sweater'
                                                    onChange={(e) => { shirtType.current = 'Sweater' }}
                                                />
                                                <label for='shirtTypeChoice3'>Sweater</label>
                                            </div>
                                            <div>
                                                <input
                                                    name='shirtType' id='shirtTypeChoice4'
                                                    type='radio'
                                                    value='Jersey'
                                                    onChange={(e) => { shirtType.current = 'Jersey' }}
                                                />
                                                <label for='shirtTypeChoice4'>Jersey</label>
                                            </div>
                                            <div>
                                                <input
                                                    name='shirtType' id='shirtTypeChoice5'
                                                    type='radio'
                                                    value='Jacket'
                                                    onChange={(e) => { shirtType.current = 'Jacket' }}
                                                />
                                                <label for='shirtTypeChoice5'>Jacket</label>
                                            </div>
                                        </fieldset>
                                        <fieldset className='form-input' id='shirtSize'>
                                            <legend>Size:</legend>
                                            <div>
                                                <input
                                                    name='shirtSize' id='shirtSizeChoice1'
                                                    type='radio'
                                                    value='4T'
                                                    onChange={(e) => { shirtSize.current = '4T' }}
                                                />
                                                <label for='shirtSizeChoice1'>4T</label>
                                            </div>
                                            <div>
                                                <input
                                                    name='shirtSize' id='shirtSizeChoice2'
                                                    type='radio'
                                                    value='5T'
                                                    onChange={(e) => { shirtSize.current = '5T' }}
                                                />
                                                <label for='shirtSizeChoice1'>5T</label>
                                            </div>
                                            <div>
                                                <input
                                                    name='shirtSize' id='shirtSizeChoice3'
                                                    type='radio'
                                                    value='6-7'
                                                    onChange={(e) => { shirtSize.current = '6-7' }}
                                                />
                                                <label for='shirtSizeChoice3'>6-7</label>
                                            </div>
                                            <div>
                                                <input
                                                    name='shirtSize' id='shirtSizeChoice4'
                                                    type='radio'
                                                    value='S'
                                                    onChange={(e) => { shirtSize.current = 'S' }}
                                                />
                                                <label for='shirtSizeChoice4'>S</label>
                                            </div>
                                            <div>
                                                <input
                                                    name='shirtSize' id='shirtSizeChoice5'
                                                    type='radio'
                                                    value='M'
                                                    onChange={(e) => { shirtSize.current = 'M' }}
                                                />
                                                <label for='shirtSizeChoice5'>M</label>
                                            </div>
                                            <div>
                                                <input
                                                    name='shirtSize' id='shirtSizeChoice6'
                                                    type='radio'
                                                    value='L'
                                                    onChange={(e) => { shirtSize.current = 'L' }}
                                                />
                                                <label for='shirtSizeChoice6'>L</label>
                                            </div>
                                            <div>
                                                <input
                                                    name='shirtSize' id='shirtSizeChoice7'
                                                    type='radio'
                                                    value='XL'
                                                    onChange={(e) => { shirtSize.current = 'XL' }}
                                                />
                                                <label for='shirtSizeChoice7'>XL</label>
                                            </div>
                                        </fieldset>
                                        <div className='form-inputs'>
                                            <div className='form-input' id='shirtMaterial'>
                                                <label>Type of Material:</label>
                                                <input
                                                    className='form-input' id='shirtMaterial'
                                                    type='text'
                                                    name='shirtMaterial'
                                                    onChange={(e) => { shirtMaterial.current = (e.target.value) }}
                                                />
                                            </div>
                                            <fieldset className='form-input' id='sleeveLength'>
                                                <div>
                                                    <label>
                                                        Sleeve Length:_
                                                        <input
                                                            name='sleeveLength' id='sleeveChoice1'
                                                            type='radio'
                                                            value='Short'
                                                            onChange={(e) => { shirtSleeveType.current = 'Short' }}
                                                        />Short
                                                        <input
                                                            name='sleeveLength' id='sleeveChoice2'
                                                            type='radio'
                                                            value='Long'
                                                            onChange={(e) => { shirtSleeveType.current = 'Long' }}
                                                        />Long
                                                        <input
                                                            name='sleeveLength' id='sleeveChoice3'
                                                            type='radio'
                                                            value='3/4'
                                                            onChange={(e) => { shirtSleeveType.current = '3/4' }}
                                                        />3/4
                                                        <input
                                                            name='sleeveLength' id='sleeveChoice4'
                                                            type='radio'
                                                            value='None'
                                                            onChange={(e) => { shirtSleeveType.current = 'None' }}
                                                        />None
                                                    </label>
                                                </div>
                                            </fieldset>
                                            <div className='form-input' id='shirtColor'>
                                                <label>Color:</label>
                                                <input
                                                    className='form-input' id='color'
                                                    type='text'
                                                    name='color'
                                                    onChange={(e) => { shirtColor.current = (e.target.value) }}
                                                />
                                            </div>
                                            <div className='form-data' id='imageURL'>
                                                <label>Image URL:</label>
                                                <input
                                                    className='form-input' id='imageURL'
                                                    type='text'
                                                    name='imageURL'
                                                    onChange={(e) => { shirtImageURL.current = (e.target.value) }}
                                                />
                                            </div>
                                            <input className='submit-btn' type='submit' value='Add Shirt' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )

                    }

                    <h3>Edit or Add Pants</h3>
                    <div className='pants-info'>
                        {/* //Show All Pants
                        //Edit Fields underneath each Pant
                        //Add Pant */}
                        {pants.map((pant, index) => {
                            return (
                                <div className='pants' key={index}>
                                    <div className='pant-details'>
                                        <form className='pant-form'>
                                            <fieldset className='form-data' id='pantWeather'>
                                                <label>
                                                    Best Time to Wear?
                                                    <input
                                                        name="pantWeather" id='pantWeatherChoice1'
                                                        type='checkbox'
                                                        value='Winter'
                                                        onChange={(e) => { weatherChoiceHandler(e, index, 'Winter') }}
                                                    />Winter
                                                    <input
                                                        name="pantWeather" id='pantWeatherChoice2'
                                                        type='checkbox'
                                                        value='Spring'
                                                        onChange={(e) => { weatherChoiceHandler(e, index, 'Spring') }}
                                                    />Spring
                                                    <input
                                                        name="pantWeather" id='pantWeatherChoice3'
                                                        type='checkbox'
                                                        value='Summer'
                                                        onChange={(e) => { weatherChoiceHandler(e, index, 'Summer') }}
                                                    />Summer
                                                    <input
                                                        name="pantWeather" id='pantWeatherChoice4'
                                                        type='checkbox'
                                                        value='Fall'
                                                        onChange={(e) => { weatherChoiceHandler(e, index, 'Fall') }}
                                                    />Fall
                                                </label>
                                            </fieldset>
                                            <div className='length-waist--material-color'>
                                                <div className='length-waist'>
                                                    <div className='form-data' id='pantLength'>
                                                        <label htmlFor='pantLength'>Length: </label>
                                                        <select name='pantLength'>
                                                            {pantLengthSizes.map((size, idx) => {
                                                                if (idx % 2 === 0) {
                                                                    return (
                                                                        <option value={size}><p>{size} - {size + 2}</p> </option>
                                                                    )
                                                                }
                                                                else { return (<p>----------</p>) }
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className='form-data' id='pantWaistSize'>
                                                        <label htmlFor='pantWaistSize'>Waist: </label>
                                                        <select name='pantWaistSize'>
                                                            {pantWaistSizes.map((size, idx) => {
                                                                if (idx % 2 === 0) {
                                                                    return (
                                                                        <option value={size}><p>{size} - {size + 2}</p> </option>
                                                                    )
                                                                }
                                                                else { return (<p>----------</p>) }
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='material-color'>
                                                    <div className='form-data' id='pantColor'>
                                                        <label></label>
                                                        <input
                                                            className='form-input' id='pantColor'
                                                            type='text'
                                                            name='pantColor'
                                                            defaultValue={pant.color}
                                                            onChange={(e) => {
                                                                pantColor.current = (e.target.value)
                                                                updatedPantValue = { color: pantColor.current }
                                                                setPants(pant => ({
                                                                    ...pant,
                                                                    ...updatedPantValue
                                                                }))
                                                            }}
                                                        />
                                                    </div>
                                                    <div className='form-data' id='pantMaterial'>
                                                        <label></label>
                                                        <input
                                                            className='form-input' id='pantMaterial'
                                                            type='text'
                                                            name='pantMaterial'
                                                            defaultValue={pant.pantMaterial}
                                                            onChange={(e) => {
                                                                pantMaterial.current = (e.target.value)
                                                                updatedPantValue = { pantMaterial: pantMaterial.current }
                                                                setPants(pant => ({
                                                                    ...pant,
                                                                    ...updatedPantValue
                                                                }))
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='form-data' id='pantImageURL'>
                                                <label>Image URL</label>
                                                <input
                                                    className='form-input' id='pantImageURL'
                                                    type='text'
                                                    name='pantImageURL'
                                                    defaultValue={pant.imageURL}
                                                    onChange={(e) => {
                                                        pantImageURL.current = (e.target.value)
                                                        updatedPantValue = { imageURL: pantImageURL.current }
                                                        setPants(pant => ({
                                                            ...pant,
                                                            ...updatedPantValue
                                                        }))
                                                    }}
                                                />
                                            </div>
                                            <div className='form-data' id='pantIsWorn'>
                                                <label>
                                                    <input
                                                        name='isWorn' id='isWorn'
                                                        type='checkbox'
                                                        value={pant.isWorn}
                                                        onChange={(e) => { isWornHandler(e, index) }}
                                                    />
                                                    Pants worn?
                                                </label>
                                            </div>
                                        </form>
                                        <img src={pant.imageURL} alt='' id='pantImage' />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <h6>Create A Pair</h6>
                </div>
            </div>
            <div className='footer'>

            </div>
        </div>
    )
}

export default EditCloset