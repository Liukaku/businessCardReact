import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios'

import '../index.css'

import CTX from '../util/store'
import CardRender from '../components/CardRender'

const UserCardAdmin = (props) => {

    //set the base url for the database API calls
    axios.defaults.baseURL = 'https://europe-west1-boomerang-test-c69c0.cloudfunctions.net/api'

    const [cardData, updateCard] = useState(CTX)

    //get the url params
    const { cardName } = useParams();

    //create an empty variable, dont use state as to prevent needless DOM renders
    let cardDetails

    //upon initial load, get the card details of the user in the URL
    useEffect(() => {
        axios.get(`/card/${cardName}`)
        .then((res) => {
            //make sure that the response is 100%
            if (res.status === 200) {
                //update the global state with the new variable details
                cardDetails = res.data
                updateCard(cardDetails)

                //if the background url within the details isn't set then use the background colour
                if (cardDetails.imageURL === false) {
                    document.getElementById('left-card').style.backgroundColor = cardDetails.backgroundCol
                    
                    console.log(cardDetails.backgroundCol)
                }
                //otherwise, look to use the url
                else (
                    document.getElementById('left-card').style.backgroundImage = `url(${cardDetails.imageURL})`
                )
            }
            //throw the error message if it fails
            else{
                cardDetails = { error: 'this card does not exist'}
                console.log(cardDetails)
            }
        })
        //throw the error message if it fails
        .catch((err) => {
            console.log("does not exist")
            updateCard({ error: err })
        })
    }, [])

    //for handling the image upload
    const handleImageInput = (e) => {
        //get the file once its entered into the upload field
        const image = e.target.files[0]
        //set a new form data
        const formData = new FormData()



        //add this image data to the form
        formData.append('image', image, image.name)

        //post to the api endpoint
        axios.post(`/card/image/${cardName}`, formData)
        //while the image is being uploaded and awaiting the reponse update the page to show the loading text
        .then(
            //hide the upload while awaiting a response from the DB
            document.getElementById('imageUploadForm').style.display = 'none',
            document.getElementById('imageUploadFormLoading').style.display = 'block'
        )
        //on completion, reveal the upload & hide the loading
        .then((res) => {
            //this sets the background image to the new image URL now that it's uploaded
            document.getElementById('left-card').style.backgroundImage = `url(${res.data.image})`
            document.getElementById('imageUploadForm').style.display = 'block'
            document.getElementById('imageUploadFormLoading').style.display = 'none'
        }
        )
        .catch((err) => {
            console.log("something")
            console.error(err)
        })
    }

    //this returns you to the creation screen
    const startOver = () => {

        //double check to confirm, prevent accidental clicks
        const confirmBox = window.confirm('Are you sure you wish to leave this page?')
        if (confirmBox === true) {
            props.history.push('/')
        }
    }

    return (
        <div className="container-xl">
            {/*a conditional statement to check whether there is any data to display, if not it shows a 404 page */}
            {cardData.error ? (
                <div className="container">
                    <div className="col">
                        <div className="row">
                        <div className="errorPage mt-5">Card not Found </div>
                        </div>
                        <div className="row">
                        <div className="errorPage mt-5">This business card does not exist, please check your spelling of the URL, the URL is case sensitive </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                <CardRender details={cardData} admin={true}/>
                <div className="row">
                    <div className="col" id='imageUploadForm'>
                        <label htmlFor="imageUpload" className="uploadLab">Use an image as your card bacground instead of a single colour background</label>
                        <input className="cent" type="file" name="" id="imageUpload" onChange={handleImageInput}/>
                    </div>
                    <div className="col hidden" id='imageUploadFormLoading'>
                        Image is uploading, please wait
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="shareLink">
                            <p><strong>URL to share</strong> {document.location.href.split('/admin')}</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="cent">
                        <input type="button" value="START AGAIN" className="btn restartBtn btn-secondary btn-lg pl-5 pr-5 pt-3 pb-3" onClick={startOver}/>
                    </div>
                </div>
                </div>
                ) }
        </div>
    )
}


export default UserCardAdmin