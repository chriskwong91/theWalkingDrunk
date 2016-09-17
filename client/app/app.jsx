import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './navBar.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'San Francisco',
      waypoints: [],
      bars: [],
      randomBar: '',
      friends: []
    };
  }

  setLocation(loc, filt = 'bars,nightlife') {
    fetch(`/api/search?category_filter=${filt}&ll=${loc}`)
      .then(response => {
        return response.json();
      })
      .then(value => {
        console.log('value in app.jsx is: ', value);
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
      var waypoints = this.state.waypoints;
      waypoints.push(dest);
      this.setState({
        waypoints: waypoints
      });
    }
    console.log(this.state.waypoints);
  }

  getFriends() {
    fetch('/api/friends').then(response => {
      return response.json();
    }).then(friends => {
      this.setState({
        friends: friends
      });
    }).catch(err => {
      console.err('Grabbing Friends Error: ', err);
    });
  }

  getRandomBar() {
    console.log('entered into randomBar');

    var setIntervalId = setInterval(() => {
      var barsFound = this.state.bars;
      if(barsFound.length !== 0){
        var randomNum = Math.floor(Math.random() * barsFound.length);
        var randomBar = barsFound[randomNum];
        this.setState({
          randomBar: randomBar
        });
        clearInterval(setIntervalId);
      }
    }, 200);


  }

  render() {
    return (
      <div>
        <div className='container'>
          <Nav />
          {
      React.cloneElement(this.props.children, {setLocation: this.setLocation.bind(this),
                 addWaypoint: this.addWaypoint.bind(this),
                 bars: this.state.bars,
                 waypoints: this.state.waypoints,
                 getRandomBar: this.getRandomBar.bind(this),
                 randomBar: this.state.randomBar,
                 friends: this.state.friends,
                 getFriends: this.getFriends.bind(this)
      })}
        </div>
      </div>
    );
  }
};

export default App;
