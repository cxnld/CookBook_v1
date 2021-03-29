import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const NewRecipe = () => {
    const jwt = sessionStorage.getItem("jwt")
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [instructions, setInstructions] = useState(['']);
    const [image, setImage] = useState('');

    const handleInputChange = (index, event) => {
        const values = [...instructions];
        values[index] = event.target.value
        setInstructions(values);
    }

    const values = [...instructions];
    const handleAddFields = () => {
        values.push('');
        setInstructions(values)
    }

    const handleRemoveFields = index => {
        const values = [...instructions];
        values.splice(index, 1);
        setInstructions(values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            title: title,
            description: description,
            instructions: instructions,
            image: image
        }
        console.log(data)

        axios.post('http://localhost:3001/recipes/new', data, {
            headers: {
                'auth-token': jwt
            }})
        .then((res) => {
            history.push({
                pathname: '/recipes',
            })
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="contentContainer">
            <div className="formContainer">

                <h1>Create</h1>

                <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control type='text' placeholder='Recipe Name' onChange={e => setTitle(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Description' onChange={e => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Label>Instructions</Form.Label>


                        {instructions.map((instruction, index) => (
                                <div key={index} style={{display: 'flex', flexDirection: 'column'}}>
                                        <Form.Label>Step {index+1}</Form.Label>

                                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                            <Form.Group controlId="formDescription"style={{width: '100%', marginBottom: '10px', marginRight: '5px'}}>
                                                <Form.Control as="textarea" rows={2} onChange={event => handleInputChange(index, event)}/>
                                            </Form.Group>
                                            <Button variant="primary" type="button" onClick={() => handleRemoveFields(index)}>X</Button>
                                        </div>
                                </div>
                        ))}

                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                <Button variant="primary"
                                    style={{display: 'flex', justifyContent: 'flex-end'}}
                                    onClick={() => handleAddFields()}
                                >
                                    Add Step
                                </Button>
                            </div>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Image Link</Form.Label>
                            <Form.Control type='text' placeholder='Image Link' onChange={e => setImage(e.target.value)}></Form.Control>
                        </Form.Group>


                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <Link to="/recipes" ><Button variant="light" >Cancel</Button></Link>
                            <Button variant="primary" type="submit" style={{marginLeft: '10px'}}>Create</Button>
                        </div>
                    </Form>
                    
            </div>
        </div>
    )
}

export default NewRecipe