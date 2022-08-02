import React  , { useEffect, useState , useRef } from 'react'; 
import { getIceCream, postMenuItem } from '../data/iceCreamData';
import { useNavigate, useLocation } from 'react-router-dom';
import LoaderMessage from '../structure/LoaderMessage'; 
import Main from '../structure/Main'; 
  
 
import IceCream from './IceCream';

const AddIceCream = () => {
    
    const [isLoading, setIsLoading] = useState(false); 
    //const [menuItem, setMenuItem] = useState();

    const [iceCream, setIceCream] = useState( 
                 {  id: 0,
                    iceCream : {id: 0},
                    price : 0,
                    quantity:0,
                    inStock: false,
                    description: ''});


    console.log('DEFAULT iceCream ', iceCream)                

   
    const isMounted = useRef(true);
    let history = useNavigate(); 
    let location = useLocation().search;


    console.log('LOCATION' , location)

   

     useEffect(()=>{
        return () => {
            isMounted.current = false;
        }
     }, []);


    useEffect(() => { 
        setIsLoading(true);
        getIceCream(location.split('=')[1]) //add?itemId=1
        .then((item)=>{
            if(isMounted.current){ 
                setIceCream(item) 
            }
            setIsLoading(false)
        })
        .catch(err=>{
            if(err.response.status === 404 && isMounted.current){
                history('/', { replace: true })
            }
        });


        console.log('2222222')


    }, [ history, location])

  
 

    const onSubmitHandler = (menuItem) => { 
        postMenuItem(menuItem).then(() => {
            history('/', {focus: true});
        });
    };
    
    


    return (<Main headingText="Add some goodness to the menu">
         
        <LoaderMessage 
            loadingMessage="Loading an Ice Cream"  
            isLoading = {isLoading} 
            doneMessage = "Icrea Cream Loaded" >  
        </LoaderMessage> 

        {!isLoading && 
          (<IceCream
            iceCream={iceCream} 
            onSubmit={onSubmitHandler}
          />)
        }
    </Main>);
}


export default AddIceCream;