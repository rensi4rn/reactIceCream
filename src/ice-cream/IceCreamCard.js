import React from 'react';
import IceCreamImage from './IceCreamImage';
import FocusLink from '../structure/FocusLink';
import PropTypes from 'prop-types';

const IceCreamCard = ({children , to, history, iceCreamId , heading}) => {

    const onItemClickHandler = () => {  
        history(to , { focus : true });
    };

    const onLinkClickHandler = e => {
        e.stopPropagation();
    };


    return  <section className="card"  onClick={onItemClickHandler}>
                <div className="image-container">
                    <IceCreamImage iceCreamId={iceCreamId} />
                </div>
                <div className="text-container">
                    <h3>
                        <FocusLink to={to}
                                   onClick={ onLinkClickHandler}
                        > 
                            { heading } 
                        </FocusLink>
                </h3>
                {children}
                </div>
            </section>

}

IceCreamCard.propTypes = {

    iceCreamId: PropTypes.number.isRequired,
    heading: PropTypes.string.isRequired,
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            pathname: PropTypes.string.isRequired,
            focus: PropTypes.bool
        })
    ]).isRequired,  
    children: PropTypes.node,
    //TODO how to add history here
}
     

export default IceCreamCard;