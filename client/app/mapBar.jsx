import React from 'react';
import Map from 'google-maps-react'


var mapBar = (props) => {
  return (
    <div>
      Hi.
      <Map google={window.google} />
    </div>
  );
};


export default mapBar;
