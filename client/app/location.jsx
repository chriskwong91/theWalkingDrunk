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

  /* The add location form isn't working at the moment. */
  return (
    <div>
      <form action="">
	<input name="userLocation" type="text"/>
	<button>Add Location</button>
      </form>
      <br/>
      <a href="/#/decision" onClick={getCurrLoc}>Use Current Location</a>
    </div>
  );
};

export default location;
