import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData'
const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userID, setUserID] = useState(null)

    const login = useCallback((jwtToken, Id) => {
        setToken(jwtToken)
        setUserID(Id)
        localStorage.setItem(storageName, JSON.stringify({
            userID: Id, token: jwtToken
        }))
    }, [])
    const logOut = useCallback(() => {
        setToken(null)
        setUserID(null)
        localStorage.removeItem(storageName)
    }, [])
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) {
            login(data.token, data.userID)
        }
        setReady(true)
    }, [login])
    return {login, logOut, token, userID,ready}
};

export default useAuth;