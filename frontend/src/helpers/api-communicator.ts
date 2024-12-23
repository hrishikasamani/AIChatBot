import axios from "axios"

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("http://localhost:5001/api/v1/user/login", {email, password}, {
        withCredentials: true, // Ensure credentials (cookies) are sent with the request
    });
    if (res.status !== 200) {
        throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
}