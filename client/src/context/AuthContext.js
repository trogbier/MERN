import {createContext} from 'react';

const noop = () => {

}

const AuthContext = createContext({
    token: null,
    userID: null,
    login: noop,
    logOut: noop,
    isAuthenticated: false
})

export default AuthContext;