import { useEffect, useState } from "react"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
// לבדוק מה לעשות אם רידקס
// 
export const useFetchData = (url) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [resp, setResp] = useState({});
    const [error, setError] = useState(null)
    const [isloading, setIsloading] = useState(null)
    const orderSuccess = useSelector(state => state.cart.orderSuccess)

    useEffect(() => {
        setIsloading(true)
        axios.get(url, { withCredentials: true }).then(({ data }) => {
            setData(data)
            setIsloading(false)
        }).catch(err => {
            setError(err)
            setIsloading(false)
        })

    }, [url, resp, orderSuccess])

    const addData = async (obj) => {
        setIsloading(true);
        try {
            const { statusText ,data } = await axios.post(url, obj, { withCredentials: true });
            setResp(data);
            setIsloading(false);
            return statusText
        } catch (error) {
            const message = error.response?.data?.error || 'Request failed';
            setError(message);
            setIsloading(false);
            throw new Error(message);  
        } finally {
            setIsloading(false);
        }
    };

    const updateData = async (id, obj) => {
        setIsloading(true)
        try {
            const { statusText, data } = await axios.put(`${url}/${id}`, obj, { withCredentials: true });
            console.log(statusText)
            setIsloading(false)
            setResp(data);
            return statusText
        } catch (error) {
            const message = error.response?.data?.error || 'Update failed';
            setError(message)
            setIsloading(false)
            throw new Error(message); 
        } finally {
            setIsloading(false);
        }
    };
    const deleteData = async (id) => {
        setIsloading(true)
        try {
            const { statusText ,data } = await axios.delete(`${url}/${id}`, { withCredentials: true });
            setResp(data);
            setIsloading(false)
            return statusText
        } catch (error) {
            const message = error.response?.data?.error || 'Request failed';
            setError(message)
            setIsloading(false)
            throw new Error(message); 
        }finally {
            setIsloading(false);
        }
    }

    return { addData, updateData, deleteData, data, error, isloading }
}