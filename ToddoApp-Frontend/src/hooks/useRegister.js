import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RegisterService } from "../services/registerServices";


export const useRegister = () => {
    const [formData, setFormData] = useState({ username: "", password: "" })
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await RegisterService(formData.username, formData.password);
            navigate("/");
        } catch (err) {
            setError(err);

        } finally {
            setLoading(false);
        }
    }

    return {formData,handleChange,handleSubmit,error,loading}
}