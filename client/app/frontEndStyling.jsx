// import React from 'react';

// class FrontEndStyling extends React.Component {
// 	constructor(props){
// 		super(props);
// 	}

// 	render() {
// 		return (
// 			<div className="row">
//         <div className="col s12 m4 l3">
//           <div> 

//             <div>
//               <button className="btn waves-effect waves-light btn-large red lighten-2 z-depth-5" type="submit" name="action"
//               onClick={this.handleNextBar.bind(this)}>Next Bar</button>
//             </div>
             
//             <div>
//               <button className="btn waves-effect waves-light btn-large red lighten-2 z-depth-5" type="submit" name="action" 
//               onClick={this.handleChangeBar.bind(this)}>Change Current Bar</button>
//             </div>
          
//           </div>
          
//           <div>
            
//             <form onSubmit={this.handleLocationSubmit.bind(this)}>
//               <span>
//               <input placeholder="Your location" type="text" ref="location"/>
//               </span>
//               <button className="btn waves-effect waves-light red lighten-2 z-depth-5" type="submit" name="action">Find
//                 <i className="material-icons right">send</i>
//               </button>

//             </form>
          
//           </div>
        
//           <div>
//             <CurrInfoComponent current={this.props.current} />
//           </div>
          
//         </div>

//         <div className="col s12 m8 l9">
          
//           <div style={mapDivStyle}> 
//             <div ref="map" style={mapStyle}>I should be a map!</div>
//           </div>
       
//         </div>
  	      
//         <div className="col s12 m12 l12">
// 					<div id="directions-panel" ref="panel"></div>
// 				</div>
//       </div>
// 		);


// 	}
// } 

// module.exports = FrontEndStyling;