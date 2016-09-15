import React from 'react';
import {Map, Marker} from 'google-maps-react'


var mapBar = (props) => {
  console.log(props.bars);
  return (
    <div>
      <Map google={window.google}>
	{props.bars.map(bar => {
	   return (
	     <Marker
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
