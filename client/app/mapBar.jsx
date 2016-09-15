import React from 'react';
import {Map, Marker} from 'google-maps-react'


var mapBar = (props) => {
  console.log(props.bars);
  return (
    <div>
      <Map google={window.google}>
	<Marker
	    name={'SOMA'}
	    position={{lat: 37.778519, lng: -122.405640}} />
      </Map>
    </div>
  );
};


export default mapBar;
