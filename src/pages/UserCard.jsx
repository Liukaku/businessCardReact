import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios'

import '../index.css'
import CTX from '../util/store'
import CardRender from '../components/CardRender'

const UserCard = () => {

    //set the base url for the database API calls
    axios.defaults.baseURL = 'https://europe-west1-boomerang-test-c69c0.cloudfunctions.net/api'

    const [cardData, updateCard] = useState(CTX)
    const [thisPage, updatePage] = useState()

    //get the url params
    const { cardName } = useParams();

    //create an empty variable, dont use state as to prevent needless DOM renders
    let cardDetails

    //upon initial load, get the card details of the user in the URL
    useEffect(() => {
        axios.get(`/card/${cardName}`)
        .then((res) => {
            //make sure that the response is 100%
            if (res.status = 200) {
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
        })
        .catch((err) => {
            console.log(err)
            updateCard({ error: err })
        })
    }, [])



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
            <CardRender details={cardData}/>
            )}
        </div>
    )
}


export default UserCard