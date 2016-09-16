import React from 'react';


var selectBar = (props) => {
  var bars = [];

	if (props.bars.length === 20) {
		bars = props.bars;	
    console.log('selectBar1: ', bars[0]);	
	} else {
    console.log('selectBar2: ', bars[0]);  
  }
  return (
    <div>
      <h1>Bars</h1>

      <a href="/#/mapbar">Go to Map</a><br/>
      
   		{bars.length === 0 ? 'loading...' : bars.map( (bar, index) =>
   			<div key={ index }>
   			  <h5>{ bar.name }</h5>
   			  <span>{ bar.location.address }</span><br/>
   			  <span>{ bar.location.city }</span><br/>
   			  <span>Rating: { bar.rating }</span><br/>
   			  <span>Review Count: { bar.review_count }</span>
   			  <p>{ bar.snippet_text }</p>
   			  <button onClick={ () => { 
   			  	  props.addWaypoint( bars[index] )
   			    } 
   			  }>Add</button>
   			  <br />
   			  <br />
   			</div>
   		)}
    </div>
  );

};

export default selectBar;
