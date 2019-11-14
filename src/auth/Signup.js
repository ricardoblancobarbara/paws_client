import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    password: password
                }}),
            headers: new Headers ({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken)
        })
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='firstName'>First Name</Label>
                    <Input onChange={(e) => setFirstName(e.target.value)} name='firstName' value={firstName} /> 
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='lastName'>Last Name</Label>
                    <Input onChange={(e) => setLastName(e.target.value)} name='lastName' value={lastName} /> 
                </FormGroup>                                
                <FormGroup>
                    <Label htmlFor='email'>E-mail</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} name='email' value={email} /> 
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name='password' value={password} /> 
                </FormGroup>
                <Button type='submit'>Sign Up</Button>                
            </Form>
        </div>
    )
}

export default Signup;