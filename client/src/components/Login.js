import '../App.css'
import { useState } from 'react'
import axios from 'axios';


const Login = () => {

    
    const loginURI = 'localhost:9000/login';


    const [userInfo, setUserInfo] = useState({})
    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;
        setUserInfo(values => ({ ...values, [name]: value }))

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(loginURI)
    }

    return (

        <div className="container d-flex justify-content-center align-items-center login-form">
            <form action='/login' method='post'>
                <div className="mb-3">
                    <label for="InputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control"
                        id="InputEmail1"
                        name='email'
                        onChange={handleChange}
                        value={userInfo.email || ''}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                    <label for="InputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control"
                        id="InputPassword1"
                        name='password'
                        onChange={handleChange}
                        value={userInfo.password || ''}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" name='saveLogin' value={userInfo.saveLogin || false} />
                    <label className="form-check-label" for="exampleCheck1">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>)
}
export default Login