import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios'

import '../index.css'
import CTX from '../util/store'
import CardRender from '../components/CardRender'

const UserCard = () => {

    const [cardData, updateCard] = useState(CTX)
    const [thisPage, updatePage] = useState()

    const { cardName } = useParams();

    let cardDetails


    useEffect(() => {
        axios.get(`/card/${cardName}`)
        .then((res) => {
            if (res.status = 200) {
                cardDetails = res.data
                updateCard(cardDetails)
                if (cardDetails.imageURL != '') {
                    document.getElementById('left-card').style.backgroundImage = `url(${cardDetails.imageURL})`
                }
            }
            else{
                let cardDetails = { error: 'this card does not exist'}
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])


    //add component did mount axios request to generate the details
    //https://stackoverflow.com/questions/44506207/reactjs-lifecycle-method-inside-a-function-component
    //dont use component did mount, that doesn't work inside a fucntional component, maybe switch to class component to save effort

    return (
        <div className="container-xl">
        <CardRender details={cardData}/>
        </div>
    )
}


export default UserCard