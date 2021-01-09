import React from 'react';
import RoundButton from './roundButton';
import './courseList.css';
import Grid from '@material-ui/core/Grid';

class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: []
        }
    }

    renderButton(text) {
        return (
            <RoundButton
                text = {text}
            />
        )
    }

    componentDidMount() {
        this.getCourses(); 
    }

    getCourses() {
		var param = {
            "functionName": "getCoursesSplitByLevel"
        }

		var url = new URL("http://localhost:9000/testDB");
        url.search = new URLSearchParams(param).toString();
        fetch(url)
		.then(res => res.text())
		.then(res => {
            var courseList = JSON.parse(res);
            console.log(courseList);
            var courseButtons = [];
            var courses = [];
            for (let i = 0; i < courseList.length; i++) {
                for (let j = 0; j < courseList[i].length; j++) {
                    let courseSubject = courseList[i][j]["Subject"];
                    let courseNumber = courseList[i][j]["Number"];
                    let courseTitle = courseList[i][j]["Title"];
                    let button = this.renderButton(courseSubject + " " + courseNumber + "\n" + courseTitle);
                    courseButtons.push(<div className = "courseButton" key = {courseNumber} > {button} </div>);
                }
                courses.push(<div className = "courseListColumn" key = {i}> {courseButtons} </div>);
                courseButtons = [];
            }
            this.setState({
                courses: courses
            })
        });
    }

    render() {
        return (
            <Grid container alignItems="center" justify="center"> 
                {this.state.courses}
            </Grid>
        )
    }
};

export default CourseList;