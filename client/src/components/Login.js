import axios from 'axios'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [badLogin, setBadLogin] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        const loginData = {
            email: email,
            password: password
        }
        axios.post('http://localhost:3001/auth/login', loginData)
        .then((res) => {
            console.log(res.data)
            sessionStorage.setItem("jwt", res.data);
            history.push({
                pathname: '/recipes',
            })
        })
        .catch(err => setBadLogin(true))
    }

    return (
        <div className="contentContainer">
            <div className="loginContainer">
                <h1>Login</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control type='email' placeholder='example@gmail.com' onChange={e => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    {badLogin && <Alert variant='danger'>Email or password is incorrect</Alert>}
                    
                    <Button variant="primary" type="submit" block>Login</Button>
                </Form>

                <Link to="/register">
                    <Button variant="link" block>Don't have an account? Click to register.</Button>
                </Link>

            </div>
        </div>
    )
}

export default Login