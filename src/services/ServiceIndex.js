import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'reactstrap';
import ServiceCreate from './ServiceCreate';
import ServiceTable from './ServiceTable';
import ServiceEdit from './ServiceEdit';


const ServiceIndex = (props) => {
    const [services, setServices] = useState([])
    const [updateActive, setUpdateActive] = useState(false);
    const [serviceToUpdate, setServiceToUpdate] = useState({});

    const fetchServices = () => {
        fetch('http://localhost:3000/service/getall', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
        .then((res) => res.json())
        .then((logData) => {
            setServices(logData);
            console.log(logData)
        })        
    }

    const editUpdateService = (service) => {
        setServiceToUpdate(service);
        console.log(service);
    }

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false)
    }

    useEffect(() => {
        fetchServices();
    }, [])

    return (
        <Container>
            <Row>
                <Col md='3'>
                    <ServiceCreate fetchServices={fetchServices} token={props.token} />
                </Col>
                <Col md='9'>
                    <ServiceTable services={services} editUpdateService={editUpdateService}
                    updateOn={updateOn} fetchServices={fetchServices} token={props.token} />
                </Col>
                {updateActive ? <ServiceEdit serviceToUpdate={serviceToUpdate}
                updateOff={updateOff} token={props.token} fetchServices={fetchServices} /> : <></>}
            </Row>
        </Container>
    )
}

export default ServiceIndex;