import React from 'react';

var randomBar = (props) => {
  console.log(props.randomBar);
  if (props.randomBar === '') {
    return (
      <div className='randomBar spinner container center-align'>
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
    )
  } else {
    var bar = props.randomBar;
    return (
      <div className='randomBar'>
        <div className="location-h1 nav-Screen center-align">
         <h1 className="thin">Your random bar is:</h1>
        </div>
        <div className='row'>
          <div className='col s7 offset-s5'>
            <h1 className='thin randombar-name'>{bar.name}</h1>
            <p className='snippet thin flow-text'>"{bar.snippet_text}"</p>
          </div>
          <div className='randombar-info thin col s9 offset-s3'>
            <div><p className='randombar-header'>Address:</p>         {bar.location.address}, {bar.location.city}, {bar.location.state_code} {bar.location.postal_code}</div>
            <div><p className='randombar-header'>Rating:</p>          {bar.rating} / 5</div>
            <div><p className='randombar-header'>Review Count:</p>    {bar.review_count}</div>
            <div><p className='randombar-header'>Phone:</p>           {bar.phone === '' ? 'Not Available' : bar.phone}</div>
            <div><p className='randombar-header'>Go to Yelp Page:</p> <a href={bar.mobile_url}>{bar.name}</a></div>
          </div>
        </div>
        <div className='row'>
          <div className=''>
            <button className='btn' onClick={() => {props.addWaypoint(bar)}}>Add to routes!</button>
          </div>
          <div className=''>
            <button className='btn' onClick={() => {props.getRandomBar()}}>Another Random Bar!</button>
          </div>
        </div>
      </div>
    );
  }
};

export default randomBar;
