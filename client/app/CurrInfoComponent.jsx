import React from 'react';

class CurrInfoComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			current: this.props.current
		};
	}

	componentWillUpdate(){
		this.yelpSearch({name:this.props.current.name, location:this.props.current.vicinity});
	}

	yelpSearch(current){
		if (!this.state.current.name){
			$.ajax({
			  url: 'http://localhost:3000/yelp/search',
			  data: current,
			  success: (data) => this.setState(({current: JSON.parse(data)})),
			  error: (err) => console.log(err),
			  dataType: 'html'
			});
		}
	}

	render(){
		return (
			<div>
				<div>
					<h1>currInfoComponent!!!!!!!!!</h1>
					<h1>{JSON.stringify(this.state.current.name)}</h1>
				</div>
			</div>
		);
	}
}

module.exports = CurrInfoComponent;