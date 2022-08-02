import { useEffect, useState } from "react";

const useValidation = (
    value , 
    errorId,
    showError,
    validationFn, 
    isRequired,
    compareValue = 'null'
) => {
    const [error, setError ] = useState('');

    useEffect(() => {
        setError(validationFn(value, compareValue))
    } , [value , compareValue , validationFn]);

    return  [error, {
        'aria-description' : error && showError ? errorId : null,
        'aria-invalid' : error && showError ? 'true' : 'false',
        'aria-required' : isRequired ? 'true' : null,
        required : isRequired 

    }];

}

export default useValidation;