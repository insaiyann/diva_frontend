import React, { createContext,useReducer,useEffect } from 'react';
import IdentitiesReducer from '../reducer/IdentitiesReducer';

export const IdentitiesContext = createContext();

const IdentitiesContextProvider = (props) => {
    const [identities, dispatch] = useReducer(IdentitiesReducer, [], () => {
        const localData = localStorage.getItem('identities');
        return localData ? JSON.parse(localData) : []; 
    });
    useEffect(() => {
        localStorage.setItem('identities', JSON.stringify(identities));
    }, [identities]);
    console.log(identities);
    return (
        <IdentitiesContext.Provider value={{ identities,dispatch}}>
        {props.children}
        </IdentitiesContext.Provider>
    )
}

export default IdentitiesContextProvider;