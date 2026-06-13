import { useState } from "react"
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isloading, setIsloading] = useState(null)
    const navigate = useNavigate();

    const signup = async (obj) => {

        setIsloading(true)
        setError(null)

        try {
            // if(obj.password == obj.confirmPassword) {
            //     throw new Error("Passwords do not match");
            // }
            const { data } = await axios.post(`${API_URL}/authUser/singup`, obj);
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