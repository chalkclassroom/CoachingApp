import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import { lightGreen, orange, deepOrange, blue, indigo, red } from '@material-ui/core/colors';

const data = {

};

class TransitionBarChart2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }


  render() {
    let transitionData = {
      labels: [
        "Waiting in Line",
        "Traveling",
        "Children Waiting", 
        "Classroom Routines",
        "Behavior Management",
        "Other"
      ],
      datasets: [{
        data: [this.props.line, this.props.traveling, this.props.waiting, this.props.routines, this.props.behaviorManagement, this.props.other],
        backgroundColor: [lightGreen[300], orange[400], deepOrange[400], blue[300], red['A200'], indigo['A200']],
        hoverBackgroundColor: [lightGreen[300], orange[400], deepOrange[400], blue[300], red['A200'], indigo['A200']],
      }]
    };
    return(
      <HorizontalBar data={transitionData}/>
    );
  }
}

export default TransitionBarChart2;