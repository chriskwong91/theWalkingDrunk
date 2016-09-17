import React from 'react';
import {browserHistory} from 'react-router';

var profile = (props) => {
  let handleSignIn = () => {
    window.location.href = '/auth/facebook';
  };

  let handleStart = () => {
    browserHistory.push('#/location');
  };
	return (
		<div>
		  <div className="location-h1 center-align">
        <h1 className="thin">Profile</h1>
        {Object.keys(props.currentUser).length === 0 ?
        <button onClick={handleSignIn} className='btn'>Sign In!</button> :
        <div>
          <h3 className="thin">Welcome {props.currentUser.name}!</h3>
          <h4 className="thin">{props.currentUser.email}</h4>
          <button onClick={handleStart} className='btn'>Start the Journey!</button>
        </div>
        }
      </div>
    </div>
	);
};

export default profile;
