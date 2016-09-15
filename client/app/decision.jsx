import React from 'react';

let decision = (props) => {

	var randomRedirect = () => {
		
	}

	var selectRedirect = () => {

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

