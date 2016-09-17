import React from 'react';
import {Link} from 'react-router';

let navBar = (props) => {

  return (
    <nav className='cyan lighten-4'>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo center">yc</Link>
        <ul id="slide-out" className="side-nav">
          <li><Link to="/location">Choose Location</Link></li>
          <li><Link to="/selectbar">Select Bar</Link></li>
          <li><Link to="/currentbars">Current Bars</Link></li>
          <li><Link to="/mapbar">Map</Link></li>
          <li><Link to="/Routes">List Routes</Link></li>
          <li><Link to="/signup">Log Out</Link></li>
          <li className="no-padding">
          </li>
        </ul>
        <Link to="#" data-activates="slide-out" className="button-col"><i className="material-icons">menu</i></Link>
      </div>
    </nav>
  );
};

export default navBar;
