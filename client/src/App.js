import React from 'react';
import logo from './logo.png';
import './App.css';

// import css
import "./styles/CourseDetail.css";

class App extends React.Component {
	constructor(props) {
		super(props);
    	this.state = {
			apiResponse: ""
    	};
	}

  	callAPI() {
		fetch("http://localhost:9000/testAPI")
			.then(res => res.text())
			.then(res => this.setState( {
				apiResponse: res
			}));
  	}
	
	componentDidMount() {
		this.callAPI();
	}

	render() {
		return (
			<div className="App"> 
				<header className = "App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className = "App-title"> {this.state.apiResponse} </h1>
				</header>
			</div>
		)
	}
}

export default App;
