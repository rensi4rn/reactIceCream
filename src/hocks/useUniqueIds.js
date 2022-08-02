import { useRef } from 'react';
import uniqid from 'uniqid';

const useUniqueId = (count) => {
    const ids = useRef(...[new Array(count)].map(() => uniqid()));
    return ids.current; 
};

export default useUniqueId;