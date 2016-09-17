import React from 'react';


var Waypoint = (props) => {
  return (
    <li className="collection-item">
      {props.bar.name}
      <a href="" className="secondary-content">
	<i className="material-icons">delete</i>
      </a>
    </li>
  );
}


export default Waypoint;
