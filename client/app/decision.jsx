import React from 'react';

let decision = (props) => {

  return (
    <div>
    	<div onClick = {props.getRandomBar}>
      	<a href="/#/randombar">Random Bar</a>
      </div>
      <br/>
      <div>
      	<a href="/#/selectbar">Select Bar</a>
      </div>
    </div>
  );
};

export default decision;

