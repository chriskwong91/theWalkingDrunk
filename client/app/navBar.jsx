import React from 'react';

let navBar = (props) => {

  return (
  	<nav className='cyan lighten-4'>
  	  <div className="nav-wrapper">
  	    <a href="#" className="brand-logo center">yc</a>
  	    <ul id="slide-out" className="side-nav">
  	      <li><a href="#/location">Choose Location</a></li>
  	      <li><a href="#/selectbar">Select Bar</a></li>
  	      <li><a href="#/currentbars">Current Bars</a></li>
  	      <li><a href="#/mapbar">Map</a></li>
  	      <li><a href="#/Routes">List Routes</a></li>
  	      <li><a href="#/signup">Log Out</a></li>
  	      <li className="no-padding">
  	      </li>
  	    </ul>
  	    <a href="#" data-activates="slide-out" className="button-col"><i className="material-icons">menu</i></a>
  	  </div>
  	</nav>
  );
};


export default navBar;
