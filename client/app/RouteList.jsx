import React from 'react';
import Waypoint from './Waypoint.jsx';


var RouteList = (props) => {
  return (
    <ul className="collection">
      {props.waypoints.map(bar => {
	 return <Waypoint bar={bar}/>
       })}
    </ul>
  );
};


export default RouteList;
