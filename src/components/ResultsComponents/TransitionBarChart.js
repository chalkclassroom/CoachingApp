import React from 'react';
import PropTypes from 'prop-types';
import {HorizontalBar} from 'react-chartjs-2';
import { lightGreen, orange, deepOrange, blue, indigo, red } from '@material-ui/core/colors';

/**
 * specifies data sets and formatting for the transition details bar graph
 * @class TransitionBarChart
 */
class TransitionBarChart extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const transitionData = {
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
      <HorizontalBar
        data={transitionData}
        options={{
          scales: {
            xAxes: [
              {
                ticks: {
                  min: 0,
                  max: 100,
                  fontSize: 16
                },
                scaleLabel: {
                  display: true,
                  labelString: "Percentage of Time in Each Transition Type",
                  fontSize: 18,
                  fontColor: "#000000",
                },
                afterFit: function(scale) {
                  scale.height = 100 // creates pading between ticks and scaleLabel
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  fontSize: 16
                },
                scaleLabel: {
                  display: true,
                  labelString: "Transition Types",
                  fontSize: 18,
                  fontColor: "#000000"
                },
                afterFit: function(scale) {
                  scale.width = 260
                },
              }
            ]
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          legend: {
            display: false,
          },
          plugins: {
            datalabels: {
              display: 'auto',
              color: 'black',
              font: {
                size: 14,
                weight: 'bold'
              },
              formatter: function(value) {
                if (value > 0) {
                  return value + '%';
                } else {
                  return null;
                }
              }
            }
          }
        }}
        width={650}
        height={400}
      />
    );
  }
}

TransitionBarChart.propTypes = {
  line: PropTypes.number.isRequired,
  traveling: PropTypes.number.isRequired,
  waiting: PropTypes.number.isRequired,
  routines: PropTypes.number.isRequired,
  behaviorManagement: PropTypes.number.isRequired,
  other: PropTypes.number.isRequired,
}

export default TransitionBarChart;