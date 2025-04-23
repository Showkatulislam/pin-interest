import { useNavigate } from "react-router";
import Image from '../../components/Image/Image'
import './authpage.css'
import apiRequest from '../../utils/ApiRequest';
import { useState } from 'react';
import useAuthStore from "../../utils/authStore";
const Authpage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {setCurrentUser}=useAuthStore()
    const handleSubmit = async(e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        try {
            const res = await apiRequest.post(
                `/users/auth/${isRegister ? "register" : "login"}`,
                data
              );
            setCurrentUser(res.data)
            setError("");
            navigate("/")
            
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    return (
        <div className='authpage'>
            <div className="authContainer">
                <Image path={"/general/logo.png"} w={36} h={36} />
                <h1>{isRegister ? "Create an Account" : "Login to Your Account"}</h1>
                {
                    isRegister ? (
                        <form key="Register" onSubmit={handleSubmit}>
                            <div className="formGroup">
                                <label htmlFor='username'>UserName</label>
                                <input type="text" name="username" id="username" placeholder='UserName' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="displayName">DisplayName</label>
                                <input type="text" name="displayName" id="displayName" placeholder='DisplayName' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" placeholder='Email' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" placeholder='Password' />
                            </div>
                            <button type="submit">Register</button>
                            <p onClick={() => setIsRegister(false)}>
                                Do you have an account? <b>Login</b>
                            </p>
                            {error && <p className="error">{error}</p>}
                        </form>)
                        : (<form key="login" onSubmit={handleSubmit}>
                            <div className="formGroup">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" placeholder='Email' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" id="password" placeholder='Password' />
                            </div>
                            <button type="submit">Login</button>
                            <p onClick={() => setIsRegister(true)}>
                                Don&apos;t have an account? <b>Register</b>
                            </p>
                            {error && <p className="error">{error}</p>}
                        </form>)
                }
            </div>
        </div>
    )
}

export default Authpage