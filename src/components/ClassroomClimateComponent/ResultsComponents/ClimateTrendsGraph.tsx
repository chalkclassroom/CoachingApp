import * as React from "react";
import * as PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

interface Props {
  data: {labels: Array<string>, datasets: Array<{label: string, data: number, backgroundColor: string}>}
}

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
  /* tooltips: {
    displayColors: true,
    multiKeyBackground: "white"
  }, */
};

/**
 * specifies data sets and formatting for climate trends graph
 * @class ClimateTrendsGraph
 */
class ClimateTrendsGraph extends React.Component<Props, {}> {
  
  static propTypes = {
    data: PropTypes.func.isRequired
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    // const { classes } = this.props;

    return (
      <Line
        data={this.props.data}
        options={climateTrendOptions}
        width={650}
        height={400}
      />
    );
  }
}

export default ClimateTrendsGraph;
