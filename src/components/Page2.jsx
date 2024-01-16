import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { useLocation } from "react-router-dom";


export default function Page2() {


    const location = useLocation();
    const { properties } = location.state;
    const [latLng, setLatLng] = useState({});
    const [direction, setDirection] = useState([]);



    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatLng({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            })
        }
    }, []);




    const [directions, setDirections] = useState([]);

    useEffect(() => {

        const geoAPI = `https://api.geoapify.com/v1/routing?waypoints=${latLng.lng},${latLng.lat}|${properties.lon},${properties.lat}&mode=drive&apiKey=fde6ce7ca3674761a4b07f617635dfdb`;

        axios
            .get(geoAPI)
            .then((res) => {
                const legs = res.data.features[0]?.properties?.legs;
                if (legs) {
                    const steps = legs.reduce((acc, leg) => [...acc, ...leg.steps], []);
                    const instructionTexts = steps.map((step) => step.instruction);
                    setDirections(instructionTexts);
                    console.log(instructionTexts);
                }
            })
            .catch((error) => {
                console.error("Error fetching directions:", error);
            });

    }, [latLng]);

    console.log(properties.name)
    return (
        <div>
            <Row>
                <Col className="bg-body-tertiary" style={{ margin: '10px', borderRadius: '20px' }}>
                    <h2>{properties.name}</h2>
                    <h4 style={{ margin: '10px', marginBottom: '20px' }}>User Latitude : {latLng.lat}</h4>
                    <h4 style={{ margin: '10px', marginBottom: '20px' }}>User Longitude : {latLng.lng}</h4>
                    <h4 style={{ margin: '10px', marginBottom: '20px' }}>Hospital Latitude : {properties.lat}</h4>
                    <h4 style={{ margin: '10px', marginBottom: '20px' }}>Hospital Longitude : {properties.lon}</h4>
                    <h4 style={{ margin: '10px', marginBottom: '20px' }}>Hospital Formated Address : {properties.formatted}</h4>
                    <h4 style={{ margin: '10px', marginBottom: '20px' }}>Hospital Website : {properties.datasource.raw.website}</h4>
                    <h4 style={{ margin: '10px', marginBottom: '20px' }}>Hospital Email : {properties.datasource.raw.phone}</h4>
                    <h4 style={{ margin: '10px', marginBottom: '20px' }}>State : {properties.state}</h4>
                    <h4 style={{ margin: '10px', marginBottom: '20px' }}>City : {properties.city}</h4>
                </Col>
                <Col className="bg-body-tertiary" style={{ borderRadius: '20px', margin: '10px' }}>
                    <h1>Directions</h1>
                    <ul>
                        {directions.map((instruction, index) => (
                            <li key={index} style={{fontSize:'25px'}}>{instruction.text}</li>
                        ))}
                    </ul>


                </Col>
            </Row>
        </div>
    )
}