import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

const CreateCloset = () => {
    //closetName
    const [closetName, setClosetName] = useState("")
    //User
    const [user, setUser] = useState({ name: "", age: "", email: "", password: "" })
    let updatedUserValue = {};
    const userName = useRef("")
    const userAge = useRef("")
    const userEmail = useRef("")
    const userPassword = useRef("")

    // closetImage
    const [closetImage, setClosetImage] = useState("")

    const navigate = useNavigate()
    const [errors, setErrors] = useState([])

    const [allClosets, setAllClosets] = useState([])
    const [itemCloset, setItemCloset] = useState("")
    const [allShirts, setAllShirts] = useState([])


    useEffect(() => {
        axios
            .get('http://localhost:8000/api/closet')
            .then((response) => {
                console.log('response', response)
                setAllClosets(response.data)
                setAllShirts(response.data.shirts)
                console.log(allShirts)
            })
    }, [])

    const createCloset = (e) => {
        console.log(closetName)
        console.log(closetImage)
        console.log(user)

        e.preventDefault()
        axios.post("http://localhost:8000/api/closet", {
            closetName,
            user,
            closetImage
        })
            .then((response) => {
                console.log(response)
                navigate('/')
            })
            .catch((err) => {
                setErrors(err.response.data.message)
                console.log(errors)
            })
    }


    return (
        <div className='create-body'>
            <div className='create-nav'>
                <div>
                    <h2>Create Nav Bar</h2>
                    <div className='dash-nav'>
                        <div className='title'><h1>{userName.current}'s Dashboard</h1> </div>
                        <div className='nav-links'>
                            <p>Add Proper Nav Links</p>
                        </div>
                    </div>
                </div>
                <div className='create-main'>
                    <h2>Create Main Content</h2>
                    <div className='create-closet'>
                        <h3>Create Closet Form</h3>
                        <form className='closet-form' onSubmit={createCloset}>
                            <div className='form-content'>
                                <label>User Name:</label>
                                <input
                                    className='userName-input'
                                    type='text'
                                    name='userName'
                                    defaultValue={userName.current}
                                    onChange={(e) => {
                                        userName.current = (e.target.value)
                                        updatedUserValue = { name: userName.current }
                                        setUser(user => ({
                                            ...user,
                                            ...updatedUserValue
                                        }))

                                    }}
                                />
                                {/* {errors.user ? <p>{errors.user.message}</p> : null} */}
                            </div>
                            <div>
                                <label>User Age:</label>
                                <input
                                    className='userAge-input'
                                    type='text'
                                    name='userAge'
                                    defaultValue={userAge.current}
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
                            <div>
                                <label>User Email:</label>
                                <input
                                    className='userEmail-input'
                                    type='text'
                                    name='userEmail'
                                    defaultValue={userEmail.current}
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
                            <div>
                                <label>User Password:</label>
                                <input
                                    className='userPassword-input'
                                    type='text'
                                    name='userPassword'
                                    defaultValue={userPassword.current}
                                    onChange={(e) => {
                                        userPassword.current = (e.target.value)
                                        updatedUserValue = { password: userPassword.current }
                                        setUser(user => ({
                                            ...user,
                                            ...updatedUserValue
                                        }))
                                    }}
                                />
                            </div>
                            <div className='form-content'>
                                <label>Closet Name:</label>
                                <input
                                    className='closetName-input'
                                    type='text'
                                    value={closetName}
                                    onChange={(e) => setClosetName(e.target.value)}
                                />
                                {errors.closetName ? <p>{errors.closetName.message}</p> : null}
                            </div>
                            <div className='form-content'>
                                <label>Closet Image:</label>
                                <input
                                    className='closetImage-input'
                                    type='text'
                                    value={closetImage}
                                    onChange={(e) => setClosetImage(e.target.value)}
                                />
                                {errors.closetImage ? <p>{errors.closetImage.message}</p> : null}
                            </div>
                            <input className='submit-btn' type='submit' value='Add Closet' />
                        </form>
                    </div>

                </div>
                <div className='create-footer'>
                    <h2>Create Footer</h2>
                </div>
            </div>
        </div>
    )
}

export default CreateCloset