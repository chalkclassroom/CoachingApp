import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Bar } from "react-chartjs-2";

const styles = {};

/**
 * formatting for transition trends graph, including title and scales for the axes
 * @type {{showScale: boolean, pointDot: boolean, scales: {yAxes: {ticks: {min: number, max: number, callback: (function(*): string), beginAtZero: boolean}, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[], xAxes: {display: boolean, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[]}, title: {display: boolean, fontSize: number, text: string, fontStyle: string}, showLines: boolean}}
 */
const climateTrendOptions = {
  title: {
    display: true,
    text: "Classroom Climate Trends",
    fontSize: 20,
    fontStyle: "bold"
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  tooltips: {
    displayColors: true,
    multiKeyBackground: "white"
  }
};

class ClimateTrendsGraph extends React.Component {
  render() {
    //const { classes } = this.props;

    return (
      <Bar
        data={this.props.data}
        options={climateTrendOptions}
        width="650"
        height="400"
      />
    );
  }
}

ClimateTrendsGraph.propTypes = {
  //classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default withStyles(styles)(ClimateTrendsGraph);
