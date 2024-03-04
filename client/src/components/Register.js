import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()

    const regURI = 'http://localhost:9000/register'
    const [newUserInfo, setNewUserInfo] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setNewUserInfo(values => ({ ...values, [name]: value }))

    }
    const handleSubmit = (e) => {
        e.preventDefault()
        handleRegister()
    }

    const handleRegister = async () => {
        try {
            const response = await axios.post(regURI, newUserInfo)
            const data = response.data
            if (response.data.success === true) {
                console.log('Success' + data)
                navigate('/login')
            } else {
                console.log(response.data.errorMessage.message)
            }
        } catch (error) {
            console.log("Error has been occured from posting")
        }
    }

    return (<>
        <br></br>
        <div className="container d-flex justify-content-center align-items-center flex-column" style={{ height: '100vh' }}>
            <h1>Register New User</h1>
            <form action="/register" method="post" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label id="firstname" >
                        First Name
                        <input id="firstname"
                            type="text"
                            name="fName"
                            className="form-control"
                            onChange={handleChange}
                            value={newUserInfo.fName || ''}
                        />
                    </label>
                </div>
                <br></br>
                <div>
                    <label id="lastname">
                        Last Name
                        <input
                            type="text"
                            id="lastname"
                            name="lName"
                            className="form-control"
                            onChange={handleChange}
                            value={newUserInfo.lName || ''}
                        />

                    </label>
                </div>
                <br></br>

                <div>
                    <label id="email">
                        Email
                        <input type="email"
                            id="email"
                            name="username"
                            className="form-control"
                            onChange={handleChange}
                            value={newUserInfo.username || ''}
                        />
                    </label>
                </div>
                <br></br>

                <div>
                    <label id="password">
                        Password
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            onChange={handleChange}
                            value={newUserInfo.password || ''}
                        />
                    </label>
                </div>
                <br></br>
                <p>Already a member? <Link to={'/login'}>Login</Link></p>
                <button className="btn btn-primary">Register</button>
            </form>

        </div>
    </>)
};

export default Register;
