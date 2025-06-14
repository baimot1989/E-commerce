import { useEffect, useState } from "react"
import axios from 'axios'
import { useDispatch } from 'react-redux';
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

    useEffect(() => {
        setIsloading(true)
        axios.get(url, { withCredentials: true }).then(({ data }) => {
            setData(data)
            setIsloading(false)
        }).catch(err => {
            console.log(err)
            setError(err)
            setIsloading(false)
        } )

    }, [url, resp])

    const addData = async (obj) => {
         setIsloading(true)
        try {
            const { data } = await axios.post(url, obj, { withCredentials: true });
            setResp(data);
            setIsloading(false)
        } catch (error) {
            const message = error.response?.data?.error || 'Request failed';
            setError(message)
            console.log(error);
            setIsloading(false)
        }
    }
    const updateData = async (id, obj) => {
        setIsloading(true)
        try {
            const { statusText, data } = await axios.put(`${url}/${id}`, obj, { withCredentials: true });
            setIsloading(false)
            setResp(data);
            return statusText
        } catch (error) {
            const message = error.response?.data?.error || 'Update failed';
            setError(message)
            setIsloading(false)
        }
    };
    const deleteData = async (id) => {
        setIsloading(true)
        try {
            const { data } = await axios.delete(`${url}/${id}`, { withCredentials: true });
            setResp(data);
            setIsloading(false)
        } catch (error) {
            const message = error.response?.data?.error || 'Request failed';
            setError(message)
            setIsloading(false)
        }
    }

    return { addData, updateData, deleteData, data, error, isloading }
}