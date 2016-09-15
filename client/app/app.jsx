import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'San Francisco',
      waypoints: [],
      bars: []
    };
  }

  setLocation(loc, filt = 'bars,nightlife') {
    fetch(`/api/search?category_filter=${filt}&ll=${loc}`)
      .then(response => {
        return response.json();
      })
      .then(value => {
        this.setState({
          bars: value.businesses
        });
      })
      .catch(err => {
        console.error(`API error: ${err}`);
      });
    this.setState({
      location: loc
    });
  }

  addWaypoint(dest) {
    if (Array.isArray(dest)) {
      this.setState({
        waypoints: dest
      });
    } else {
      console.log('addwaypoint, this: ', this.state.waypoints);
      var waypoints = this.state.waypoints;
      waypoints.push(dest);
      this.setState({
        waypoints: waypoints
      });
    }
  }

  render() {
    return (
      <div>
        <div className='container'>
          {
	    React.cloneElement(this.props.children, {setLocation: this.setLocation.bind(this),
						     addWaypoint: this.addWaypoint.bind(this),
						     bars: this.state.bars,
						     waypoints: this.state.waypoints
	    })}
        </div>
      </div>
    );
  }
};

export default App;
