import React from 'react';

class SubComponent extends React.Component {
	render () {
		return (
			<h1> Automatically transpiles modified files. </h1>
		);
	}
}

class App extends React.Component {
  render () {
    return (
    	<div>
	    	<p> Hello React!</p>
	    	<SubComponent />
    	</div>
  	);
  }
}

module.exports = App;

