import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'San Francisco'
    };
  }

  setLocation(loc) {
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
