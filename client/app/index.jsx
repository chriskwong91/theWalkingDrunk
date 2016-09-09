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

    this.handleLocationSubmit();

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

    var address = this.refs.location.value || this.state.startLoc; 
    
    this.getBars(address, (bars) => {
      //var firstEigthBars = bars.slice(0, 8);
      //console.log('Final waypoints: ', firstEigthBars);
      console.log('Final waypoints: ', bars);
      var waypoints = bars.map((bar) => {
        return {
          location: bar.vicinity,
          stopover: true
        }
      });
      this.setState({
        startLoc: address,
        waypoints: waypoints
      });
    });
    
  }

  getBars(address, callback) {
    //array of bar objects
    var waypoints = [];
    //object containing names of already visited bars
    var visited = {};
    const MAX_WAYPOINTS = 8;

    var populateWaypoints = (newAddress, count) => {
      if (count === 0) {
        callback(waypoints);
      } else {
        //geocode address into google.maps.LatLng object
        this.geocoder.geocode({
          address: newAddress
        }, (results, status) => {
          if (status === 'OK') {
            console.log('Geocode results: ', results);

            var request = {
              location: results[0].geometry.location,
              keyword: 'bar',
              rankBy: google.maps.places.RankBy.DISTANCE
            }
            //nearby search of coordinates of address
            this.placesService.nearbySearch(request, function(results, status) {
              
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                var current = '';
                //push closest unvisited bar to waypoints
                for (var i = 0; i < results.length; i++) {
                  if (!visited[results[i].name]) {
                    visited[results[i].name] = true;
                    waypoints.push(results[i]);
                    current = results[i].vicinity;
                    break;
                  }
                }
                console.log('Bar ' + waypoints.length + ': ' + current);
                populateWaypoints(current, count - 1);
              }
            });
          } 
        });
      }
    };

    populateWaypoints(address, MAX_WAYPOINTS);

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
      <form onSubmit={this.handleLocationSubmit.bind(this)}>
        <input placeholder="Your location" type="text" ref="location"/>
      </form>
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