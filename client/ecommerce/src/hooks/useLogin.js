import { useState } from "react"
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export const useLogin = () => {
    const [error, setError] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (userName, password) => {

        console.log('hello')
        setError(null)

        try {
            const { data } = await axios.post(`${API_URL}/authUser/login`, { userName, password })
            console.log(data)
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({ type: 'LOGIN', payload: data });
            navigate(data.user.role == "admin" ? '/admindash' : '/customers')
        } catch (error) {
            setError(error)
        }
    }
    return { login, error }
}