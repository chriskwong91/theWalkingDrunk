import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'San Francisco',
      waypoints: [],
      bars: [],
      randomBar: ''
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
      this.setState({
        waypoints: this.state.waypoints.push(dest)
      });
    }
  }

  getRandomBar() {
    console.log('entered into randomBar');
    var barsFound = this.state.bars;

    var setIntervalId = setInterval(() => {
      // Edge Case where there really aren't any results, and this will crash..
      if(barsFound.length !== 0){
        var randomNum = Math.floor(Math.random() * barsFound.length);
        console.log('value for randomNum is: ', randomNum);
        var randomBar = barsFound[randomNum];
        console.log('randomBar ', randomBar);
        this.setState({
          randomBar: randomBar
        });
      }
    }, 100);

    clearInterval(setIntervalId);

  }

  render() {
    return (
      <div>
        <div className='container'>
          {
      React.cloneElement(this.props.children, {setLocation: this.setLocation.bind(this),
                 addWaypoint: this.addWaypoint.bind(this),
                 bars: this.state.bars,
                 waypoints: this.state.waypoints,
                 getRandomBar: this.getRandomBar.bind(this),
                 randomBar: this.state.randomBar
      })}
        </div>
      </div>
    );
  }
};

export default App;
