import React from 'react';
var googleKey = require('../../server/config/env/config.js').GOOGLE_MAPS_API_KEY;

// let location = props => {
  /**
   * @name getCurrLoc
   */
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startLoc: this.props.startLoc || 'SF'
    };
  }

  getCurrLoc () {
    navigator.geolocation.getCurrentPosition((res) => {
      props.setLocation('' + res.coords.latitude + ',' + res.coords.longitude);
    });
  }

  handleLocationSubmit (e) {
    var userInput = document.getElementById("userLocation").value;
    // now we need the google api
    console.log(userInput);
    var userInput = userInput.split(' ');
    var userInput = userInput.join('+');
    console.log(userInput);

    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput + '&key=' + googleKey).then(response => {
      return response.json();
    })
    .then(value => {
      var lat = value.results[0].geometry.location.lat;
      var lng = value.results[0].geometry.location.lng;
      var coord = '' + lat + ',' + lng;
      console.log(coord);

      props.setLocation(coord);
    }).catch(err => {
      console.error(`API error: ${err}`);
    })
    //https://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY


  }





  /* The add location form isn't working at the moment. */
   render () { 
    return (
      <div>
        <div className="navScreen center-align">
        <div className="location-h1">
         <h1 className="thin">Location</h1>
        </div>
        </div>
        <form action="" className="location-form" onSubmit={this.handleLocationSubmit}>
  	      <input id="userLocation" type="text" className="thin"/>
          <div className="center-align">
            <input type="submit" value="Add Location" className="waves-effect waves-light btn mat-btn"/>
          </div>
        </form>
        <br/>
        <div className="center-align current-loc-box">
          <a className="waves-effect waves-light btn mat-btn" href="/#/decision" onClick={this.getCurrLoc}>Use Current Location</a>
        </div>
      </div>
    );
  }
};

export default Location;
