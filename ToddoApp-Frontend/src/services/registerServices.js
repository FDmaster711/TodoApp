import axios from 'axios';



export const RegisterService = async (username, password) => {
    try {
        const response = await axios.post('/auth/register', { username, password });
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        return response.data
    } catch (err) {
        throw err.response?.data?.message || "Error connecting to the server";

    }

}