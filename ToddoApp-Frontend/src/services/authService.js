import axios from "axios";

const API_URL = "http://localhost:3000/auth";


export const LoginService = async (username,password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {username,password});
        if(response.data.token){
            localStorage.setItem("token",response.data.token)
        }
        return response.data
    }catch(err){
     throw err.response?.data?.message || "Error connecting to the server";
    }
};



