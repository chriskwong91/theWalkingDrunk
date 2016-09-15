import React from 'react';
// import styles from '../style/style.css';

class signup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>
          <p>WELCOME to yelpcrawl.</p>
          <p>{this.props.test}</p>
        </div>
        <div>
          <a href='auth/facebook' className="waves-effect waves-light btn">Login with Facebook</a>
        </div>
      </div>
    )
  }
}

export default signup;
