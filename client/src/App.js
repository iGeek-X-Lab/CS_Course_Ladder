import React from 'react';
import logo from './logo.png';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
    	this.state = {
			apiResponse: ""
    	};
	}

  	callAPI() {
		var param = {
			"lowerBound": "100",
			"upperBound": "200"
		}
		var url = new URL("http://localhost:9000/testDB");
		url.search = new URLSearchParams(param).toString();
		fetch(url)
		.then(res => res.text())
		.then(res => {
			var courseNumbers = "";
			for (const course of JSON.parse(res)) {
				courseNumbers += course.Number + " ";
			}
			this.setState({
				apiResponse: courseNumbers
			})
		});
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
