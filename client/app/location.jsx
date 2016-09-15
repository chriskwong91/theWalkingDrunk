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
      <div className="navScreen center-align">
      <div className="location-h1">
       <h1 className="thin">Location</h1>
      </div>
      </div>
      <form action="" className="location-form">
	      <input name="userLocation" type="text" className="thin"/>
        <div className="center-align">
        <a className="waves-effect waves-light btn mat-btn">Add Location</a>
        </div>
      </form>
      <br/>
      <div className="center-align current-loc-box">
        <a className="waves-effect waves-light btn mat-btn" href="/#/decision" onClick={getCurrLoc}>Use Current Location</a>
      </div>
    </div>
  );
};

export default location;
