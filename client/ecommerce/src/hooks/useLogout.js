import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export const useLogout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT', payload: null });
        navigate('/')

    }
    return { logout }
}