import axios from 'axios'
import React, { useState } from 'react'

import '../index.css'
import '../App.css';

import CTX from '../util/store'

const NewCard = (props) => {

    const [cardData, updateCard] = useState(CTX)
    const [ newCard, updateNewCard ] = useState({success: ''})

    const submitBtn = (e) => {
        e.preventDefault()
        console.log(newCard)
        let currentState = {
            name: document.getElementById('name').value,
            imageURL: '',
            jobtitle: document.getElementById('jobtitle').value,
            phonenumber: document.getElementById('phonenumber').value,
            site: document.getElementById('site').value,
            businessname: document.getElementById('businessname').value,
            email: document.getElementById('email').value,
            urlname: document.getElementById('urlname').value,
            imageURL: 'none',
            backgroundColour: '#121212'
        }
        let errorArr = []
        for(var key in currentState) {
            if(currentState[key] === "") {
               errorArr.push(key)
            }
        }
        console.log(errorArr)
        if (errorArr.length > 0) {
            for (let i = 0; i < errorArr.length; i++) {
                document.getElementById(errorArr[i]).style.borderColor = 'red'
                document.getElementById(errorArr[i]).style.boxShadow = 'red 1px 1px 10px'
            }
            document.getElementById('error').innerHTML = 'Please complete all fields'
        }
        else{
            axios.post('/card', currentState)
            .then((res) =>{
                if (res.data.duplicate) {
                    currentState.error = 'A card with that URL already exists, please choose a different URL'
                    if (currentState.success) {
                        delete currentState.success
                        updateCard(currentState)

                    }
                    else {
                        console.log(currentState)
                        updateCard(currentState)
                        console.log("beep")
                        document.getElementById('error').innerHTML = 'A card with that URL already exists, please choose a different URL'
                    }
                }
                else {
                    console.log(res.data)
                    currentState.success = 'Card Created Successfully'
                    console.log(currentState)
                    updateCard(currentState)
                    console.log(cardData)
                    props.history.push(`/${currentState.urlname}/admin`)
                }

            })
            .catch((err) => {
                currentState.error = err
                console.log(err)
                updateCard(currentState)
            })
        }
        
    }

    const handleChange = (e) => {
        const formData = {
            name: document.getElementById('name').value,
            imageURL: '',
            jobtitle: document.getElementById('jobtitle').value,
            phonenumber: document.getElementById('phonenumber').value,
            site: document.getElementById('site').value,
            businessname: document.getElementById('businessname').value,
            email: document.getElementById('email').value,
            urlname: document.getElementById('urlname').value,
            imageURL: 'none',
            backgroundColour: '#121212'
        }

        updateNewCard(formData)
    }

    return (
        <div className="container">
            <div className="row mb-5">
                <span>Create your <strong>business card</strong></span>
            </div>
            <form className="">
                <div className="row mb-4">
                    <div className="col">
                        <label for="name">Name</label>
                        <input className="form-control" type="text" name="" id="name" placeholder="Type your name here" onChange={handleChange}/>
                    </div>
                    <div className="col">
                        <label for="jobtitle">Job Title</label>
                        <input className="form-control" type="text" name="" id="jobtitle" placeholder="Type your job title here" onChange={handleChange}/>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label htmlFor="businessname">Business Name</label>
                    <input className="form-control" type="text" name="" id="businessname" placeholder="Type your business name here" onChange={handleChange}/>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col">
                        <label htmlFor="phonenumber">Phone Number</label>
                        <input className="form-control" type="text" name="" id="phonenumber" placeholder="Type your phone number here" onChange={handleChange}/>
                    </div>
                    <div className="col">
                        <label htmlFor="email">Email Address</label>
                        <input className="form-control" type="text" name="" id="email" placeholder="Type your email address here" onChange={handleChange}/>
                    </div>
                </div>
                
                <div className="row mb-4">
                    <div className="col">
                    <label htmlFor="site">Your Website</label>
                     <input className="form-control" type="text" name="" id="site" placeholder="type your webside address here" onChange={handleChange}/>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <label htmlFor="urlname">Business Card Name</label>
                        <input className="form-control" type="text" name="" id="urlname" aria-describedby="urlhelp" placeholder="Give your business card a unique URL handle here" onChange={handleChange}/>
                        <small id="urlhelp" className="form-text text-muted">e.g. www.thisWebsite.com/<strong>thisName</strong></small>
                    </div>
                </div>
                <div className="success" id="success">

                </div>
                <div className="error" id="error">

                </div>

                <div className="row">
                    <div className="cent">
                    <button className="btn btn-secondary btn-lg pl-5 pr-5 pt-3 pb-3 " onClick={submitBtn}>CREATE BUSINESS CARD</button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default NewCard 