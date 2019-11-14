import React from 'react';
import {Table, Button} from 'reactstrap';

const ServiceTable = (props) => {

    const deleteService = (service) => {
        fetch(`http://localhost:3000/service/delete/${service.id}`, {
            method: 'DELETE',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then(() => props.fetchServices())
    }

    const serviceMapper = () => {
        return props.services.map((service, index) => {
            return (
                <tr key={index}>
                    <th scope='row'>{service.id}</th>
                    <td>{service.service}</td>
                    <td>{service.price}</td>
                    <td>{service.availability}</td>
                    <td>
                        <Button onClick={() => {props.editUpdateService(service); props.updateOn()}} color='warning'>Update</Button>
                        <Button onClick={() => {deleteService(service)}} color='danger'>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <div>
            <h3>Service History</h3>
            <hr />
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Service</th>
                        <th>Price</th>
                        <th>Availability</th>
                    </tr>
                </thead>
                <tbody>
                    {serviceMapper()}
                </tbody>
            </Table>
        </div>
    )
}

export default ServiceTable;