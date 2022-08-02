import React , { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types'

const LoaderMessage = ( { loadingMessage, isLoading , doneMessage} )=> {

    const [ showLoadingMessage , setShowLoadingMessage ] = useState(false);
    const [ showDoneMessage , setDoneMessage ] = useState(false);
    const isLoadingPrevious = useRef(null);
    
    
    useEffect(() => {
        let loadingMessageDelay;
        let doneMessageDelay;
        if(isLoading){
            loadingMessageDelay = setTimeout(() =>{
                setShowLoadingMessage(true);
            }, 400);
        } else {
            if(isLoadingPrevious.current){
                setDoneMessage(true)
                doneMessageDelay = setTimeout(() =>{
                    setDoneMessage(true);
                }, 300);
            }

        }
        
        isLoadingPrevious.current = isLoading;
        return () => {
            clearTimeout(loadingMessageDelay);
            clearTimeout(doneMessageDelay);
            setShowLoadingMessage(false);
            setDoneMessage(false);
        }
    } , [isLoading]); 



    //return showLoadingMessage ? <p className="loading">  {loadingMessage}</p> : null;

    return <div aria-live="assertive" aria-atomic="true"> 
        {showLoadingMessage && <p className="loading">  {loadingMessage}</p> }
        {showDoneMessage && <p className="visually-hidden"> {doneMessage}</p> }
    </div>;
}

LoaderMessage.propTypes = {
    loadingMessage: PropTypes.string.isRequired,
    doneMessage: PropTypes.string.isRequired,
    isLoading: PropTypes.bool

}

export default LoaderMessage;