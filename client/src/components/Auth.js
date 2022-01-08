import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../actions';
import qs from 'query-string';

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = qs.parse(window.location.search);
        if (params.code) {
            dispatch(login(params.code));
        }
        navigate('/');
    }, []);

    return null;
}

export default Auth;