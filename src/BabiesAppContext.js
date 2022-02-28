import React, { createContext, useReducer } from 'react';
import { babiesReducer } from './reducers/BabiesReducer';
import { listsReducer } from './reducers/ListReducer';

export const BabiesAppContext = createContext();

const BabiesAppContextProvider = (props) => {

    const [babies, dispatchBabies] = useReducer(babiesReducer,[]);
    const [lists, dispatch] = useReducer(listsReducer,[]);
    
    return (
        <BabiesAppContext.Provider value={{ lists, babies, dispatch, dispatchBabies}}>
            {props.children}
        </BabiesAppContext.Provider>
    )
}
export default BabiesAppContextProvider;