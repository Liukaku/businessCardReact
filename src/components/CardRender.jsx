import React from 'react'

import '../index.css'

const CardRender = (props) => {



    const setBackground = () => {
        //TODO
        //https://material-ui.com/components/dialogs/
    }

    return(
<div className="row cardContainer">
    <div className="col m-3 leftCard" id="left-card">
        <p className="fullname">{props.details.name}</p>
        <strong>{props.details.businessname}</strong>
        {props.admin ? (
            <p className="cssSelector" onClick={setBackground}> Choose background colour </p>
        ) : (
            <p></p>
        )}
    </div>
    <div className="col m-3 rightCard">
        <p className="fullname">{props.details.name}</p>
        <p className="jobtitle">{props.details.jobtitle}</p>
        <p className="phone">{props.details.phonenumber}</p>
        <p className="email">{props.details.email}</p>
        <p className="site">{props.details.site}</p>
    </div>
</div>
    )

}

export default CardRender