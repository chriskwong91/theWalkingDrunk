import React from 'react';

var randomBar = (props) => {
  console.log(props.randomBar);
  if (props.randomBar === '') {
    return (
      <div className="preloader-wrapper active">
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
    )
  } else {
    return (
      <div>
      Hi
      </div>
    );
  }
};

export default randomBar;
