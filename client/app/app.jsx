import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'San Francisco',
      bars: []
    };
  }

  setLocation(loc) {
    fetch('/api/search?ll=' + loc)
      .then(response => {
        return response.json();
      })
      .then(value => {
        this.setState({
          bars: value.businesses
        });
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      location: loc
    });
  }

  render() {
    return (
      <div>
        <div className='container'>
        {React.cloneElement(this.props.children, {setLocation: this.setLocation.bind(this)})}
        </div>
      </div>
    );
  }
};

export default App;
