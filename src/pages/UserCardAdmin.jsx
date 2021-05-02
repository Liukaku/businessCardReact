import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import axios from 'axios'

import '../index.css'

import CTX from '../util/store'
import CardRender from '../components/CardRender'

const UserCardAdmin = (props) => {

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
                cardDetails = { error: 'this card does not exist'}
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const handleImageInput = (e) => {
        const image = e.target.files[0]
        console.log(image)
        const formData = new FormData()

        formData.append('image', image, image.name)

        
        axios.post(`/card/image/${cardName}`, formData)
        .then((res) => {
            console.log(res.data)
            document.getElementById('left-card').style.backgroundImage = `url(${res.data.image})`
        })
        .catch((err) => {
            console.error(err)
        })
    }

    const startOver = () => {
        const confirmBox = window.confirm('Are you sure you wish to leave this page?')
        if (confirmBox == true) {
            props.history.push('/')
        }
    }

    return (
        <div className="container-xl">
            <CardRender details={cardData} admin={true}/>
            <div className="row">
                <div className="col">
                    <label htmlFor="imageUpload" className="uploadLab">Use an image as your card bacground instead of a black background</label>
                    <input className="cent" type="file" name="" id="imageUpload" onChange={handleImageInput}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="cent shareLink">
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
    )
}


export default UserCardAdmin