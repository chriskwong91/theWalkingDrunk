import React from 'react';
import {Link} from 'react-router';

let decision = (props) => {

 	componentDidMount: {
 		console.log('hellooooo');
 	}

	var randomRedirect = () => {
		// used so when Link user clicks the space of the 'Link-random-box' div element, we'll redirect them to the random section
	}

	var selectRedirect = () => {
		// used so when Link user clicks the space of the 'Link-select-box' div element, we'll redirect them to the select section
	}

  return (
    <div className="decision-buttons">
    	<div className="randomButton thin valign center-align" onClick = {props.getRandomBar}>
    		<div className="Link-random-box"></div>
      	<Link to="/randombar" className="Link-random">Random Bar</Link>
      </div>
      <div className="selectButton thin center-align">
      	<div className="Link-select-box"></div>
      	<div className="Link-select">
      		<Link to="/selectbar" className="Link-select">Select Bar</Link>
      	</div>
      </div>
    </div>
  );
};

export default decision;

