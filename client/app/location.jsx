import React from 'react';
var googleKey = require('../../server/config/env/config.js').GOOGLE_MAPS_API_KEY;

// let location = props => {
  /**
   * @name getCurrLoc
   */
class Location extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   startLoc: ''
    // };
    if (Object.keys(props.currentUser).length === 0) {
      props.getUser();
    }
  }

  getCurrLoc () {
    navigator.geolocation.getCurrentPosition((res) => {
      this.props.setLocation('' + res.coords.latitude + ',' + res.coords.longitude);
    });
  }

  handleLocationSubmit () {
    var userInput = document.getElementById("userLocation").value;
    // now we need the google api
    var userInput = userInput.split(' ');
    var userInput = userInput.join('+');

    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + userInput + '&key=' + googleKey).then(response => {
      return response.json();
    })
    .then(value => {
      var lat = value.results[0].geometry.location.lat;
      var lng = value.results[0].geometry.location.lng;
      var coord = '' + lat + ',' + lng;

      this.props.setLocation(coord);

    }).catch(err => {
      console.error(`API error: ${err}`);
    });

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
        <form action="" className="location-form" onSubmit={this.handleLocationSubmit.bind(this)}>
  	      <input id="userLocation" type="text" className="thin"/>
          <div className="center-align"></div>
        </form>
          <div className="center-align current-loc-box">
            <a className="waves-effect waves-light btn mat-btn" href="/#/decision" onClick={this.handleLocationSubmit.bind(this)}>Add Location</a>
          </div>
          <br/>
          <div className="center-align current-loc-box">
          <a className="waves-effect waves-light btn mat-btn" href="/#/decision" onClick={this.getCurrLoc.bind(this)}>Use Current Location</a>
          </div>
      </div>
    );
  }
};

export default Location;
