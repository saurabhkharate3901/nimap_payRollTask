import React from 'react'
import loader from "../../assets/spinner/loader.gif"

function Spinner({size}) {
    return (  
        <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
            <img style={{width: size || "inherit"}} src={loader} alt="notfound" />
        </div>
    );
}

export default Spinner;
