import React from "react";
import { useLocation } from "react-router-dom";


export default function Page2(){


    const location = useLocation();
    const {name} = location.state;
    return(
        <div>
            hiiiibkkhi
            <h5>{name}</h5>
        </div>
    )
}