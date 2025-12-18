import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginService } from "../services/authService";


export const useLogin = () => {
    const [formData,setFormData] = useState({username: "", password: ""});
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);
        setLoading(true);

        try {
        await LoginService(formData.username, formData.password);
        navigate("/");  

        }catch(err){
            const errorMessage = err.response?.data?.message || err.message || "Error login in user";
    setError(errorMessage);

        }finally {
        setLoading(false);
    }
    }
    
    
    return {formData, handleChange, handleSubmit, error, loading}

};