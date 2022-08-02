import React  , { useEffect, useState , useRef } from 'react'; 
import { getMenuItem , putMenuItem, deleteMenuItem } from '../data/iceCreamData';
import { useParams , useNavigate } from 'react-router-dom';
import LoaderMessage from '../structure/LoaderMessage'; 
import Main from '../structure/Main'; 
  
 
import IceCream from './IceCream';

const EditIceCream = () => {
    
    const [isLoading, setIsLoading] = useState(false); 
    //const [menuItem, setMenuItem] = useState();

    const [menuItem, setMenuItem] = useState( 
                 {  iceCream : {id: 0},
                    price : 0,
                    quantity:0,
                    inStock: false,
                    description: ''});

   
    const { menuItemId } = useParams(); 
    const isMounted = useRef(true);
    let history = useNavigate(); 

   

     useEffect(()=>{
        return () => {
            isMounted.current = false;
        }
     }, []);


    useEffect(() => {
        console.log('1111111111')
        //setIsLoading(true);
        getMenuItem(menuItemId)
        .then((item)=>{
            if(isMounted.current){ 
                setMenuItem(item) 
            }
            setIsLoading(false)
        })
        .catch(err=>{
            if(err.response.status === 404 && isMounted.current){
                history('/', { replace: true })
            }
        });


        console.log('2222222')


    }, [menuItemId, history])

  
 

    const onSubmitHandler = (updatedItem) => { 
        putMenuItem({ id: menuItem.id, ...updatedItem}).then(() => {
            history('/', { replace: true })
        }); 
    };
    
    const onDeleteHandler = () => {

        console.log(' al eliminar menuItemId ', menuItemId)

        deleteMenuItem(menuItemId).then(() => {
            history('/', { focus: true })
        });

    }

    console.log("-----------------------")
    console.log('menuItem' , menuItem , isLoading)


    return (<Main headingText="Update this bauty">
         
        <LoaderMessage 
            loadingMessage="Loading an Ice Cream"  
            isLoading = {isLoading} 
            doneMessage = "Icrea Cream Loaded" >  
        </LoaderMessage> 

        {!isLoading && 
          (<IceCream
            {...menuItem}
            onDelete={onDeleteHandler}
            onSubmit={onSubmitHandler}
          />)
        }
    </Main>);
}


export default EditIceCream;