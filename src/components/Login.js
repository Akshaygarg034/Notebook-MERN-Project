import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

function Login(props) {
    const [cred, setCred] = useState({ email: '', password: '' });
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/noteauth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            history.push('/');
            props.showAlert("Logged in Successfully","success");
        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h1 className="my-3 text-center">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp" value={cred.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={onChange} value={cred.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
