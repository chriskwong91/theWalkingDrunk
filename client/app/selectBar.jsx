import React from 'react';


var selectBar = (props) => {
  var bars = [];

	if (props.bars.length === 20) {
		bars = props.bars;	
    console.log('selectBar1: ', bars[0]);	
	} else {
    console.log('selectBar2: ', bars[0]);  
  }

  /* removed items: 
   <button className="waves-effect waves-light btn mat-btn-select" onClick={ () => { 
              props.addWaypoint( bars[index] )
            } 
          }>Add</button>


  spinnig bar:
  () => {
        <div className='spinner container center-align'>
          <div className="preloader-wrapper active center-align">
            <div className="spinner-layer spinner-blue-only center-align">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div> }
  */

  //  <div href="/#/mapbar" className="select-go-to-map center-align thin">
  //   <a href="/#/mapbar" className="to-map">Kickoff My yelpCrawl!</a>
  // </div>

  var bars = bars.slice(0,10);

  return (
    <div>
      <div className = "h1-header">
        <p className="h1-select center-align thin">Select Bars</p>
      </div>

   		{bars.length === 0 ? <div className='spinner container center-align'>
          <div className="preloader-wrapper active center-align">
            <div className="spinner-layer spinner-blue-only center-align">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div> 
        </div> 

      : bars.map( (bar, index) => 
   			<div>
          <div key={ index }>
            <div className = "select-bar-info thin center-align">
       			  <h5>{ bar.name }</h5>
       			  <span>{ bar.location.address }</span><br/>
       			  <span>{ bar.location.city }</span><br/>
       			  <span>Rating: { bar.rating }</span><br/>
       			  <span>Review Count: { bar.review_count }</span>
       			  <p>{ bar.snippet_text }</p>
            </div>
     			  
            <div className="select-bar-test thin center-align" onClick={ () => { 
                props.addWaypoint( bars[index] )
              } 
            }>Add <b>{bar.name}</b> to your Route!</div>
     			</div>
          <span>{index === 9 ? 
             <div href="/#/mapbar" className="select-go-to-map center-align thin">
              <a href="/#/mapbar" className="to-map">Kickoff My yelpCrawl!</a>
            </div>
           : <div></div>}</span>
        </div>
      )
    }
    </div>
  )
};

export default selectBar;
