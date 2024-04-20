import { useState } from "react"
import toast from "react-hot-toast"
import { loginRequest } from "../../services/api.js"

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email, password) => {
        const user = { email, password}
        setIsLoading(true);
        const response = await loginRequest(user);
        setIsLoading(false);
        if (response.error) {
            console.log(response)
            return toast.error(
                response?.e?.response?.data ||
                'Error to try login'
            )
        } else {
            console.log(response)
            return toast.success('Login successfully');
        }
    }
    return {
        login,
        isLoading
    }
}
