import React, { useState, useEffect } from 'react';
import getMenu from '../data/iceCreamData';  
import LoaderMessage from '../structure/LoaderMessage';
import { useNavigate }  from 'react-router-dom'; 
import Main from '../structure/Main';
import IceCreamCard from './IceCreamCard';
import IceCreamCardContainer from './IceCreamCardContainer';


const Menu = () => {
    let history = useNavigate(); 
    const [menu, setMenu] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
     
    useEffect(() => {
        let isMounted = true;
        getMenu().then( menuData => {
            if(isMounted){
                setMenu(menuData);
                setIsLoading(false);
                console.log(menuData)
            
            }
          
        });

        return () => {
            isMounted = false;
        }
    }, []);

  
    return <Main headingText="Rock your state buds with one of these!" > 
         
        <LoaderMessage 
            loadingMessage="Loading Menu" 
            isLoading = {isLoading} 
            doneMessage = "Loading Menu complete" > 

        </LoaderMessage>
        { menu.length > 0 ? (
        <IceCreamCardContainer> 
            { menu.map(( { id, iceCream, price, description,  inStock, quantity } ) => (
             
                    <IceCreamCard 
                        key={id.toString()}
                        iceCreamId = {iceCream.id}
                        to={`/menu-items/${id.toString()}`}
                        heading={iceCream.name}
                        history={history}
                    >
                       
                        <div className="content card-content">
                            <p className="price">
                                { `$${price.toFixed(2)}` }
                            </p>
                            <p className={`stock${inStock?'':' out'}`}>
                                {
                                    inStock?
                                        `${quantity} in stock`:
                                        `Currently out of stock`
                                }
                            </p>
                            <p className="description"> {process.env.PUBLIC_URL}
                                {description} 
                            </p>
                        </div>
                    </IceCreamCard> 
             ))}
        </IceCreamCardContainer>
        ) : (
           !isLoading && <p>Your menu is empty! The sadness!!</p>
        )}
         
    </Main>
}



// Menu.propTypes = {
//     history: PropTypes.shape({
//       push: PropTypes.func.isRequired,
//     }),
//   };

export default Menu;