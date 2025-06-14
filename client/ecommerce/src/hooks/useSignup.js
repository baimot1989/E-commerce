import { useState } from "react"
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isloading, setIsloading] = useState(null)
    const navigate = useNavigate();

    const signup = async (obj) => {
        
        setIsloading(true)
        setError(null)

        try {
            const { data } = await axios.post('http://localhost:3000/authUser/singup', obj);
            setIsloading(false);
            navigate('/login')
        } catch (error) {
           
            const message = error.response?.data?.error || 'Signup failed';
            setIsloading(false);
            setError(message);
        }
    }
    return { signup, error, isloading }
}