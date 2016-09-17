import React from 'react';
import {Map, Marker} from 'google-maps-react'


var mapBar = (props) => {
  return (
    <div>
      <Map google={window.google}>
	{props.waypoints.map(bar => {
	   return (
	     <Marker
		 key={bar.id}
		 name={bar.name}
		 position={{
		   lat: bar.location.coordinate.latitude,
		   lng: bar.location.coordinate.longitude
		 }} />
	   );
	 })}
      </Map>
    </div>
  );
};


export default mapBar;
