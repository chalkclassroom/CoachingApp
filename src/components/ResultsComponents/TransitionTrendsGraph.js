import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { lightGreen, deepOrange, orange, blue, indigo } from '@material-ui/core/colors';
import { red } from '@material-ui/core/es/colors';

const styles = {

};

const TransitionTypeColors = {
  lineColor: lightGreen[300],
  travelingColor: orange[400],
  waitingColor: deepOrange[400],
  routinesColor: blue[300],
  behaviorManagementColor: red['A200'],
  otherColor: indigo['A200'],
}

/**
 * specifies data sets (and formatting) for transition trends graph
 * @type {{datasets: *[], labels: string[][]}}
 */
const transitionTrendData = {
  labels: [
    ["Jan 5", "0:44:42"],
    ["Feb 16", "1:13:12"],
    ["Mar 8", "0:32:57"],
    ["Apr 23", "0:25:16"],
    ["May 12", "0:55:32"]
  ],
  datasets: [
    {
      label: "TOTAL",
      backgroundColor: "#0988EC", //blue
      borderColor: "#0988EC",
      fill: false,
      lineTension: 0,
      data: [27, 45, 49, 17, 30]
    },
    {
      label: "INSIDE",
      backgroundColor: "#E99C2E", //yellow
      borderColor: "#E99C2E",
      fill: false,
      lineTension: 0,
      data: [7, 5, 25, 0, 15]
    },
    {
      label: "OUTSIDE",
      backgroundColor: "#E55529", //orange
      borderColor: "#E55529",
      fill: false,
      lineTension: 0,
      data: [5, 20, 8, 0, 8]
    },
    // {
    //   label: "WAIT",
    //   backgroundColor: "rgb(54, 162, 235)",
    //   borderColor: "rgb(54, 162, 235)",
    //   fill: false,
    //   lineTension: 0,
    //   data: [15, 20, 16, 17, 8]
    // }
  ]
};

/**
 * formatting for transition trends graph, including title and scales for the axes
 * @type {{showScale: boolean, pointDot: boolean, scales: {yAxes: {ticks: {min: number, max: number, callback: (function(*): string), beginAtZero: boolean}, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[], xAxes: {display: boolean, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[]}, title: {display: boolean, fontSize: number, text: string, fontStyle: string}, showLines: boolean}}
 */
const transitionTrendOptions = {
  showScale: true,
  pointDot: true,
  showLines: true,
  // title: {
  //     display: true,
  //     text: 'Transition Time Trends',
  //     fontSize: 20,
  //     fontStyle: 'bold'
  // },
  tooltips: {
    mode: 'index',
    intersect: false
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  legend: {
    display: true
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Date & Total Time in Transition",
          fontStyle: "bold"
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          callback: function(value) {
            return value + "%";
          }
        },
        scaleLabel: {
          display: true,
          labelString: "Percentage of Total Time Spent in Transition",
          fontStyle: "bold"
        }
      }
    ]
  },
  plugins: {
    datalabels: {
      display: 'auto',
      color: 'gray',
      align: 'top',
      formatter: function(value, context) {
        return value + '%';
      }
    }
  }
};

class TransitionTrendsGraph extends React.Component {
  render() {
    const { classes } = this.props;
    /* let trendsData = {
      labels: [
        this.props.trendsDates
      ],
      datasets: [{
        labels: [
          'TOTAL',
          'WAITING IN LINE',
          'TRAVELING',
          'CHILD WAITING',
          'ROUTINES',
          'BEHAVIOR MANAGEMENT',
          'OTHER'
        ],
        data: [this.props.trendsTotal, this.props.trendsLine, this.props.trendsTraveling, this.props.trendsWaiting, this.props.trendsRoutines, this.props.trendsBehaviorManagement, this.props.trendsOther],
        backgroundColor: [
          '#0988ec',
          TransitionTypeColors.lineColor,
          TransitionTypeColors.travelingColor,
          TransitionTypeColors.waitingColor,
          TransitionTypeColors.routinesColor,
          TransitionTypeColors.behaviorManagementColor,
          TransitionTypeColors.otherColor
        ],
        hoverBackgroundColor: [
          '#0988ec',
          TransitionTypeColors.lineColor,
          TransitionTypeColors.travelingColor,
          TransitionTypeColors.waitingColor,
          TransitionTypeColors.routinesColor,
          TransitionTypeColors.behaviorManagementColor,
          TransitionTypeColors.otherColor
        ]
      }]
    }; */

    /* let trendsData = {
      labels: this.props.trendsDates,
      datasets:  [
        {
          label: 'TOTAL',
          backgroundColor: '#0988ec',
          borderColor: '#0988ec',
          fill: false,
          lineTension: 0,
          data: this.props.trendsTotal,
        },
        {
          label: 'WAITING IN LINE',
          backgroundColor: TransitionTypeColors.lineColor,
          borderColor: TransitionTypeColors.lineColor,
          fill: false,
          lineTension: 0,
          data: this.props.trendsLine,
        },
        {
          label: 'TRAVELING',
          backgroundColor: TransitionTypeColors.travelingColor,
          borderColor: TransitionTypeColors.travelingColor,
          fill: false,
          lineTension: 0,
          data: this.props.trendsTraveling,
        },
        {
          label: 'CHILD WAITING',
          backgroundColor: TransitionTypeColors.waitingColor,
          borderColor: TransitionTypeColors.waitingColor,
          fill: false,
          lineTension: 0,
          data: this.props.trendsWaiting,
        },
        {
          label: 'ROUTINES',
          backgroundColor: TransitionTypeColors.routinesColor,
          borderColor: TransitionTypeColors.routinesColor,
          fill: false,
          lineTension: 0,
          data: this.props.trendsRoutines,
        },
        {
          label: 'BEHAVIOR MANAGEMENT',
          backgroundColor: TransitionTypeColors.behaviorManagementColor,
          borderColor: TransitionTypeColors.behaviorManagementColor,
          fill: false,
          lineTension: 0,
          data: this.props.trendsBehaviorManagement,
        },
        {
          label: 'OTHER',
          backgroundColor: TransitionTypeColors.otherColor,
          borderColor: TransitionTypeColors.otherColor,
          fill: false,
          lineTension: 0,
          data: this.props.trendsOther,
        }
      ]
    }; */

    return (
      <Line
        data={this.props.data}
        options={transitionTrendOptions}
        width={650}
        height={400}
      />
    );
  }
}

TransitionTrendsGraph.propTypes = {
  classes: PropTypes.object.isRequired,
  //data: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionTrendsGraph);