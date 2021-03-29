import axios from 'axios'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'

import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [badEmail, setBadEmail] = useState(false)
    const [matchingPassword, setMatchingPassword] = useState(true)
    const history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()
        if(password !== password2) {
            setMatchingPassword(false)
        }

        const registerData = {
            name: name,
            email: email,
            password: password
        }

        axios.post('http://localhost:3001/auth/register', registerData)
        .then((res) => {
            history.push({
                pathname: '/login',
            })

        })  
        .catch(err => setBadEmail(true))
    }

    return (
        <div className="contentContainer">
            <div className="loginContainer">
                <h1>Register</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' placeholder='Name' onChange={e => setName(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email Adress</Form.Label>
                        <Form.Control type='email' placeholder='example@gmail.com' onChange={e => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>

                    {badEmail && <Alert variant='danger'>Email already exists</Alert>}

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Re-enter Password</Form.Label>
                        <Form.Control type='password' placeholder='Re-enter Password' onChange={e => setPassword2(e.target.value)}></Form.Control>
                    </Form.Group>

                    {!matchingPassword && <Alert variant='danger'>Passwords do not match</Alert>}
                    
                    <Button variant="primary" type="submit" block>Register</Button>
                </Form>

                <Link to="/login">
                    <Button variant="link" block>Already have an account? Click to login.</Button>
                </Link>

            </div>
        </div>
    )
}

export default Register
