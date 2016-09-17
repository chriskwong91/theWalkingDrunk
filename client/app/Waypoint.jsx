import React from 'react';


var Waypoint = (props) => {
  return (
    <li className="collection-item">
      {props.bar.name}
      <i className="material-icons">delete</i>
    </li>
  );
}


export default Waypoint;
