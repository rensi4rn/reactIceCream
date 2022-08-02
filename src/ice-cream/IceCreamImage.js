import React from 'react';
import PropTypes from 'prop-types'

const IceCreamImage = ({iceCreamId}) => {
    console.log("------------------------->" , iceCreamId , process.env.PUBLIC_URL)
    return (<img src={`/ice-cream-images/ice-cream-${iceCreamId.toString()}.svg`}
          alt=""
          ></img>) 
}

IceCreamImage.propTypes = {
    iceCreamId: PropTypes.number.isRequired
}

export default IceCreamImage