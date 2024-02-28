import '../App.css'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {


    const loginURI = 'http://localhost:9000/login';

    const [userInfo, setUserInfo] = useState({})
    const navigate = useNavigate();


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserInfo(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin()
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post(loginURI, userInfo)
            if (response.data) {
                const data = response.data;
                console.log(data)
                navigate('/home', { state: data.user})
            } else {
                const data = response.data;
                console.log(data.message)
            }
        } catch (error) {
            console.log("Error has been occured while login" + error);
        }
    }

    return (<div className="container d-flex justify-content-center align-items-center login-form">
        <form action='/login' method='post' onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control"
                    id="InputEmail1"
                    name='username'
                    onChange={handleChange}
                    value={userInfo.username || ''}
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control"
                    id="InputPassword1"
                    name='password'
                    onChange={handleChange}
                    value={userInfo.password || ''}
                />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label">Remember me</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>)
}
export default Login