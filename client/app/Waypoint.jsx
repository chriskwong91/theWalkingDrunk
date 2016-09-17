import React from 'react';


var Waypoint = (props) => {
  return (
    <li className="collection-item">
      {props.bar.name}
      <a className="secondary-content">
	<i className="material-icons" onClick={() => {
	  }}>delete</i>
      </a>
    </li>
  );
}


export default Waypoint;
