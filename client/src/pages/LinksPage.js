import React, {useCallback, useContext, useEffect, useState} from 'react';
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

const LinksPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState([])

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(fetched)
        } catch (e) {

        }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])
    if(loading){
        return <Loader/>
    }
    return (
<>
    {!loading && <LinksList links={link}/>}
</>
    );
};

export default LinksPage;