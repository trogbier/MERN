import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import 'materialize-css'
import {useRoutes} from "./Routs";
import useAuth from "./hooks/auth.hook";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

const App = () => {
        const {login, logOut, token, userID,ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    if(!ready){
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            login, logOut, token, userID,isAuthenticated
        }}>
            <Router>
                {isAuthenticated && <Navbar/>}
                <div className={'container'}>
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
