import React from 'react';

let location = props => {
  /**
   * @name getCurrLoc
   */
  var getCurrLoc = function() {
    navigator.geolocation.getCurrentPosition((res) => {
      props.setLocation('' + res.coords.latitude + ',' + res.coords.longitude);
    });
  };
  
  return (
    <div>
      <input name="userLocation" type="text"/>
      <a href="/#/decision">Add</a>
      <br/>
      <a href="/#/decision" onClick={getCurrLoc}>Use Current Location</a>
    </div>
  );
};

export default location;
