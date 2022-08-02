import React  , { useEffect, useState , useRef } from 'react'; 
import useUniqueIds from '../hocks/useUniqueIds';

import IceCreamImage from './IceCreamImage';
import { validateDescription , validateQuantity , validatePrice} from '../util/validators';
import useValidation from '../hocks/useValidation';

import ErrorContainer from './ErrorContainer';

//import PropTypes from 'prop-types';


const IceCream = ({ iceCream = {},
                    price = 0,
                    quantity =0,
                    inStock = false,
                    description = '',
                    onSubmit, 
                    onDelete}) => {

    const [hasSubmitted, setHasSubmitted] = useState(false);

    const [ descriptionId, 
        descriptionErrorId, 
        stockId, 
        quantityId, 
        quantityErrorId,
        priceId,
        priceErrorId ] = useUniqueIds(7);

    const formRef = useRef(null); 

    const [internalData, setInternalData] = useState({
        description: '',
        inStock: true,
        quantity: '0',
        price: '0.00' 
    });

    const [descriptionError, descriptionErrorProps] = useValidation(
        internalData.description, 
        descriptionErrorId,
        hasSubmitted,
        validateDescription,
        true);

    const [quantityError, quantityErrorProps ] = useValidation(
        internalData.quantity, 
        quantityErrorId,
        hasSubmitted,
        validateQuantity, 
        false,
        internalData.inStock);

    const [priceError, priceErrorProps ] = useValidation(
        internalData.price, 
        priceErrorId,
        hasSubmitted,
        validatePrice,
        true);

    useEffect(() => {
        setInternalData({
            price: price.toFixed(2),
            inStock,
            quantity: quantity.toString(),
            description
        });
    }, [price, quantity, inStock, description]);

    const onChangeHandler = (e) => {
        let newInternalData = {
            ...internalData,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        };

        if(e.target.name === 'quantity') {
            console.log('quantity value',e.target.value)
            newInternalData.inStock = e.target.value !== '0';
            console.log( 'in stock value', newInternalData.inStock)
        }

        if(e.target.name === 'inStock'  && !e.target.checked ){
            newInternalData.quantity = '0';
            
        }

        setInternalData(newInternalData);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        setHasSubmitted(true);


        if(descriptionError || priceError  || quantityError ) {
          setTimeout(()=> {
              const errorControl = formRef.current.querySelector('[aria-invalid="true"]');
              errorControl.focus(); 
          })
          
        } else {
         onSubmit({
             iceCream : {id: iceCream.id},
             price: parseFloat(internalData.price),
             inStock: internalData.inStock,
             quantity: parseInt(internalData.quantity),
             description: internalData.description
         })

        }  
        
  };

  console.log('------- iccecream before to send to image ', iceCream , iceCream.id)

    return (<div className="form-frame">
                <div className="iamge-containe">
                <IceCreamImage iceCreamId={iceCream.id}/>
                </div>  
                <div className="form-container">
                    <dl>
                        <dt>Name: </dt>
                        <dd>{iceCream.name}</dd>
                    </dl>
                    <form onSubmit={onSubmitHandler} noValidate ref={formRef}>
                        <label htmlFor={descriptionId} >Description <span aria-hidden="true">*</span>:</label>
                        <ErrorContainer 
                        errorText = {descriptionError} 
                        hasSubmitted={hasSubmitted}
                        errorId={descriptionErrorId}
                        >
                            <textarea   id={descriptionId}  
                                    name="description" 
                                    rows="3"  
                                    value={internalData.description}
                                    onChange={onChangeHandler}
                                    {...descriptionErrorProps}
                            />
                        </ErrorContainer>
                        
                        <label htmlFor={stockId} >In Stock:</label>
                        <div className="checkbox-wrapper"> 
                            <input id={stockId} type="checkbox"
                                name="inStock"
                                checked={internalData.inStock}
                                onChange={onChangeHandler}
                                ></input>
                            <div className="checkbox-wrapper-checked" />
                        </div>
                        <label htmlFor={quantityId}>Quantity :</label>
                        <ErrorContainer 
                        errorText = {quantityError}  
                        hasSubmitted={hasSubmitted}
                        errorId={quantityErrorId}
                        >
                            <select  id={quantityId} 
                                name="quantity" 
                                value={internalData.quantity} 
                                onChange={onChangeHandler}
                                {...quantityErrorProps}
                                > 
                                <option value="0">0</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                                <option value="60">60</option>
                                <option value="70">70</option>
                            </select>
                        </ErrorContainer>
                        <label htmlFor={priceId}>Price <span aria-hidden="true">*</span>:</label>
                        <ErrorContainer 
                        errorText = {priceError}  
                        hasSubmitted={hasSubmitted}
                        errorId={priceErrorId}
                        >
                            <input id={priceId} 
                                    type="number" 
                                    name="price" 
                                    step='0.01' 
                                    value={internalData.price} 
                                    onChange={onChangeHandler}
                                    {...priceErrorProps}>

                            </input>
                        </ErrorContainer>
                        <div className="button-container">
                            <button  className="ok" type="submit">Save</button>
                            {onDelete && (<button  className="warning" type="button" onClick={onDelete}>
                                delete
                            </button>)}
                        </div>



                    </form>

                </div>
            </div>);
};

export default IceCream;