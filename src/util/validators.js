

export const validateDescription = description => {
    return description ? null : 'you must introduce a description'
};

export const validateQuantity = (quantity, inStock) =>{
    return inStock && quantity === '0'  ? 'In sotck item should have a quantity '  : null
};

export const validatePrice = (price) => {
    price = price + ''
    const regex = /^[0-9]+(\.[0-9][0-9])$/;

    if(!price || price === '0.00'){
        return 'you must enter a price';
    } else if(!regex.test(price.trim())) {
        return 'please enter a valid price!'
    }
}