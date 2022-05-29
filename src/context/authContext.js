import React, {useReducer, createContext, useEffect} from "react";
import {auth} from "../firebase";
import {onAuthStateChanged} from "firebase/auth";

// reducer
const firebaseReducer = (state, action) => {
    switch (action.type) {
        case "LOGGED_IN_USER":
            return {...state, user: action.payload};
        default:
            return state;
    }
}
// state
const initialState = {
    user: null
}

// create context
const AuthContext = createContext();

// context provider
const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(firebaseReducer, initialState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            if (user) {
                const idTokenReult = await user.getIdTokenResult();

                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {email: user.email, token: idTokenReult}
                })
            } else {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: null
                })
            }
        })

        // cleanup function to run just before a component unmounts.
        return () => unsubscribe();
    }, [])

    const value = {state, dispatch};
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
// export
export {AuthContext, AuthProvider};