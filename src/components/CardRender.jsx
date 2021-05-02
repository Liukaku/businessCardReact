import React from 'react'

const CardRender = (props) => {

    console.log(props)

    return(
        <div>
            <p>{props.details.name}</p>
            <p>{props.details.businessname}</p>
            <p>{props.details.jobtitle}</p>
            <p>{props.details.phonenumber}</p>
            <p>{props.details.email}</p>
            <p>{props.details.site}</p>
        </div>
    )

}

export default CardRender