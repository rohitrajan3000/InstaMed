import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



export default function Home() {
    const navigate = useNavigate();
    const [hospitals, setHospitals] = useState([]);
    const [latLng, setLatLng] = useState({});
    


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


    useEffect(() => {
        console.log(latLng);
        if (Object.keys(latLng).length > 0) {
            const geoAPI = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${latLng.lng},${latLng.lat},5000&bias=proximity:78.44202,17.3707564&limit=20&apiKey=fde6ce7ca3674761a4b07f617635dfdb`;
            
            axios.get(geoAPI).then(res => {
                const featuresArr = res.data.features;
                setHospitals(featuresArr)
                console.log(featuresArr)
            });
        }
    }, [latLng])



    const clickhandel =(hospital) => {
        
        navigate('/page2',  {state: hospital});

    }
    






    return (
        <div style={{ padding: 20, display: 'flex', flexWrap: 'wrap' }}>
            {
        
                hospitals.map((hospital,index) => {
                    return (
                        <div key={index} style={{ marginBottom: 20, display:"grid" }}>
                             <Card  onClick={()=> clickhandel(hospital)}   style={{ width: '35rem', display:"grid", padding: 25, height: 200, overflow: 'hidden', margin: 10 }}>
                               
                              
                             <h2>{hospital.properties.name}</h2>
                             <h6>{hospital.properties.formatted}</h6>
                             <h5>{hospital.properties.datasource.raw.website}</h5>

                           </Card>
                           
                        </div>
                    )
                })
            }


        </div>
    )
}