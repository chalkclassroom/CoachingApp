import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Line } from "react-chartjs-2";

const styles = {};


/**
 * specifies data sets (and formatting) for transition trends graph
 * @type {{datasets: *[], labels: string[][]}}
 */

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
    mode: "index",
    intersect: false
  },
  hover: {
    mode: "nearest",
    intersect: true
  },
  legend: {
    display: true,
    labels: {
      fontColor: 'black'
    }
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Date & Total Time in Transition",
          // fontStyle: "bold",
          fontSize: 18,
          fontColor: 'black',
          fontFamily: 'Arimo'
        },
        ticks: {

        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          callback: function(value: number) {
            return value + "%";
          }
        },
        scaleLabel: {
          display: true,
          labelString: "Percentage of Time Spent in Transition",
          // fontStyle: "bold",
          fontSize: 18,
          fontColor: 'black',
          fontFamily: 'Arimo'
        }
      }
    ]
  },
  plugins: {
    datalabels: {
      display: 'auto',
      color: 'black',
      align: 'top',
      formatter: function(value: number) {
        return value + "%";
      }
    }
  }
};

interface Props {
  data: object
}

/**
 * specifies data sets and formatting for the transition trends graph
 * @class TransitionTrendsGraph
 */
class TransitionTrendsGraph extends React.Component<Props, {}> {
  static propTypes = {
    data: PropTypes.func.isRequired
  }
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    return (
      <Line
        data={this.props.data}
        options={transitionTrendOptions}
        width={600}
        height={350}
      />
    );
  }
}

TransitionTrendsGraph.propTypes = {
  data: PropTypes.func.isRequired
};

export default withStyles(styles)(TransitionTrendsGraph);
