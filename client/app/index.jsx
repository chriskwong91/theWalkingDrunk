import React from 'react';
var map = window.Map;

// const HACK_REACTOR = {
//   lat: 37.783654,
//   lng: -122.408945
// };

// const WAYPOINTS = [
//   {
//     location: '757 Leavenworth San Francisco, CA',
//     stopover: true
//   },
//   {
//     location: 'Civic Center, SF',
//     stopover: true
//   },
//   {
//     location: 'Union Square, SF',
//     stopover: true
//   }
// ];

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startLoc: 'Hack Reactor SF',
      waypoints: []
    };
  }
  
  // make use of React Software Component Lifecycle 
  componentDidMount() {
    this.initMap();

    this.handleLocationSubmit();

  }

  initMap() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(this.refs.panel);

    this.geocoder = new google.maps.Geocoder();
    this.placesService = new google.maps.places.PlacesService(this.map);
  }

  componentDidUpdate() {
    if (this.state.waypoints.length > 0) {

      var request = this.getRouteRequest();
      this.directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
        }
      }.bind(this));
    }
  }

  getRouteRequest() {
    //need to calculate farthest away waypoint and set to endLoc
    var endLoc = this.state.waypoints[this.state.waypoints.length - 1];

    var request = {
      origin: this.state.startLoc,
      destination: endLoc.location,
      travelMode: google.maps.DirectionsTravelMode.WALKING,
      //last waypoint already the destination
      waypoints: this.state.waypoints.slice(0, -1),
      optimizeWaypoints: true
    }

    return request;
  }

  handleLocationSubmit(e) {
    if (e) {
      e.preventDefault();
    }

    var address;

    if (this.state.waypoints[this.state.waypoints.length - 1]) {
      address = this.state.waypoints[this.state.waypoints.length - 1].location;
    } else if (this.refs.location.value) {
      address = this.refs.location.value;
    } else {
      address = this.state.startLoc;
    }
    
    this.getBars(address, (bars) => {

      bars = bars.slice(0, 7);

      this.setState({
        waypoints: bars
      });
    });
    
  }

  getBars(address, callback) {

    //geocode address into google.maps.LatLng object
    this.geocoder.geocode({
      address: address
    }, (results, status) => {

      if (status === 'OK') {

        var request = {
          location: results[0].geometry.location,
          keyword: 'bar',
          rankBy: google.maps.places.RankBy.DISTANCE
        }
        //nearby search of coordinates of address
        this.placesService.nearbySearch(request, (results, status) => {
          
          if (status === google.maps.places.PlacesServiceStatus.OK) {

            var visited = {};
            this.state.waypoints.forEach((waypoint) => {
              visited[waypoint.location] = true;
            });

            var i = 0;

            while (visited[results[i].vicinity]) {
              console.log(results[i].vicinity);
              i++;
            }

            var waypoint = {
              location: results[i].vicinity,
              stopover: true
            };

            callback(this.state.waypoints.concat(waypoint));
          }
        });
      } 
    });

  }

  // getBars(address, callback) {
  //   var geocoder = new google.maps.Geocoder();
    
  //   geocoder.geocode({
  //     address: address
  //   }, (results, status) => {
  //     if (status === 'OK') {
  //       console.log('Geocode results: ', results);
  //       var service = new google.maps.places.PlacesService(this.map);

  //       var request = {
  //         location: results[0].geometry.location,
  //         keyword: 'bar',
  //         rankBy: google.maps.places.RankBy.DISTANCE
  //       }

  //       service.nearbySearch(request, function(results, status) {
          
  //         console.log('Nearby restaurants: ', results)
  //         if (status === google.maps.places.PlacesServiceStatus.OK) {
  //           callback(results);
  //         }
  //       });
  //     } 
  //   });
  // }

  render() {
    const mapStyle = {
      width: 500,
      height: 300,
    };
    
    const mapDivStyle = {
      border: '1px solid black',
      display: 'table',
      margin: '0 auto'
    }

    return (
    	<div>
        <div>
          <button onClick={this.handleLocationSubmit.bind(this)}>Next Bar</button>
        </div>
        <div>
          <form onSubmit={(e) => {
            e.persist();
            var startLoc = this.refs.location.value;
            this.setState({
              startLoc: startLoc,
              waypoints: [],
            }, () => {
              this.handleLocationSubmit(e);
            });
            
          }}>

            <input placeholder="Your location" type="text" ref="location"/>
          </form>
        </div>
  	      <div style={mapDivStyle}>
  	        <div ref="map" style={mapStyle}>I should be a map!</div>
  	      </div>
  	      <div>
  					<div ref="panel">Hack Reactor to Tempest!!! Drink on my hacking drunkards!</div>
  				</div>
      </div>
    );
  }
}

module.exports = Map;