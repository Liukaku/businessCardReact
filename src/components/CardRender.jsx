import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

import '../index.css'
import axios from 'axios';

const CardRender = (props) => {

    //set the base url for the database API calls
    axios.defaults.baseURL = 'https://europe-west1-boomerang-test-c69c0.cloudfunctions.net/api'

    //this is used to control the pop up box for the colour picker
    const [ backCol, updatebackCol ] = useState({popu: false})

    //this handles the data for the colour picker
    const [color, setColor] = useColor("hex", "#121212");

    //handling the opening of the pop up window
    const setBackground = () => {
        updatebackCol({popu: true})
    }

    //handles the closing of the pop up window
    const handleClose = () => {
        updatebackCol({popu: false})
    }

    //setting the background colour to be behind a confirm window to prevent accidentally closing the window and
    //over writing the image
    const backgroundConfirm = () => {
        //get the hex value from the colour wheel
        const update = {
            "backCol": color.hex
        }

        //sends the value to the DB
        axios.put(`/card/background/${props.details.urlname}`, update)
            //uplon completion it updates the card on the fly
            .then((res) => {
                document.getElementById('left-card').style.backgroundImage = null
                document.getElementById('left-card').style.backgroundColor = res.data.colour
                handleClose()
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return(
<div className="row cardContainer">
    <div className="col m-3 leftCard" id="left-card">
        <p className="fullname">{props.details.name}</p>
        <strong>{props.details.businessname}</strong>
        {/*a conditional statement to check whether you are viewing this through the admin panel */}
        {props.admin ? (
            <div>
                {/*material-ui dialog box containing a colour wheel */}
                <Dialog
                open={backCol.popu}
                onClose={handleClose}>
                    <ColorPicker width={456} height={228} color={color} onChange={setColor} hideHSV dark />
                    <div className="colourBtns">
                        <button className="btn mr-1 btn-secondary btn-lg" onClick={backgroundConfirm}>Confirm</button>
                        <button className="btn ml-1 btn-secondary btn-lg" onClick={handleClose}>Nevermind</button>
                    </div>
                </Dialog>
                <p className="cssSelector" onClick={setBackground} id={'anchor'}> Choose background colour </p>
            </div>
        ) : (
            <p></p>
        )}
    </div>

    <div className="col m-3 rightCard">
        <p className="fullname">{props.details.name}</p>
        <p className="jobtitle">{props.details.jobtitle}</p>
        <p className="phone">{props.details.phonenumber}</p>
        <p className="email">{props.details.email}</p>
        <a href={props.details.site} className="site">{props.details.site}</a>
    </div>
</div>
    )

}

export default CardRender