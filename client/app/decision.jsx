import React from 'react';

let decision = (props) => {

	var randomRedirect = () => {
		// used so when a user clicks the space of the 'a-random-box' div element, we'll redirect them to the random section
	}

	var selectRedirect = () => {
		// used so when a user clicks the space of the 'a-select-box' div element, we'll redirect them to the select section
	}

  return (
    <div className="decision-buttons">
    	<div className="randomButton thin valign center-align" onClick = {props.getRandomBar}>
    		<div className="a-random-box"></div>
      	<a href="/#/randombar" className="a-random">Random Bar</a>
      </div>
      <div className="selectButton thin center-align">
      	<div className="a-select-box"></div>
      	<div className="a-select">
      		<a href="/#/selectbar" className="a-select">Select Bar</a>
      	</div>
      </div>
    </div>
  );
};

export default decision;

