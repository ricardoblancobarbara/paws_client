import React, {useState, useEffect} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';

const ServiceCreate = (props) => {
    const [service, setService] = useState('');
    const [price, setPrice] = useState('');
    const [availability, setAvailability] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/service/create', {
            method: 'POST',
            body: JSON.stringify({
                service: {
                    service: service,
                    price: price,
                    availability: availability
                }                
            }),
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            }) 
        })
        .then((res) => res.json())
        .then((logData) => {
            console.log(logData);
            setService('');
            setPrice('');
            setAvailability('');
            props.fetchServices();
        })
    }

    return (
        <div>
            <h3>Offer a Service</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='service'>Service</Label>
                    <Input onChange={(e) => setService(e.target.value)} name='service' value={service} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='price'>Price</Label>
                    <Input onChange={(e) => setPrice(e.target.value)} name='price' value={price} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='availability'>Availability</Label>
                    <Input onChange={(e) => setAvailability(e.target.value)} name='availability' value={availability} />
                </FormGroup>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default ServiceCreate;