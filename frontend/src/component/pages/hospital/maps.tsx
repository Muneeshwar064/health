// GoogleMapComponent.js
import React from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const GoogleMapComponent = ({ google, latitude, longitude, zoom }:any) => {
    const mapStyles = {
        width: '100%',
        height: '200px'
    };

    return (
        //@ts-ignore
        <Map
            google={google}
            zoom={zoom}
            style={mapStyles}
            initialCenter={{ lat: latitude, lng: longitude }}
        >
            <Marker
            //@ts-ignore

                position={{ lat: latitude, lng: longitude }}
                title={'Marker'}
            />
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBl3f5QA3XISs9BudjbLPA2B1QmTWUr3mM' // Replace with your Google Maps API key
})(GoogleMapComponent);
