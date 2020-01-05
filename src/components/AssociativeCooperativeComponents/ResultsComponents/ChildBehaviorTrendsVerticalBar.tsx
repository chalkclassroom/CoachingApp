import * as React from "react";
import * as PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

/**
 * specifies data sets (and formatting) for the child behaviors details horizontal bar
 * @type {{datasets: *[], labels: string[][]}}
 */
/* const childBehaviorsData = {
  labels: ["August 19, 2018", "September 30, 2018", "October 22, 2018"],
  datasets: [
    {
      label: "No Opportunity",
      backgroundColor: "#F44336",
      borderColor: "#F44336",
      fill: false,
      lineTension: 0,
      data: [32, 27, 29]
    },
    {
      label: "No Assoc./Coop. Interaction",
      backgroundColor: "#E99C2E",
      borderColor: "#E99C2E",
      fill: false,
      lineTension: 0,
      data: [12, 14, 19]
    },
    {
      label: "Associative and/or Cooperative",
      backgroundColor: "#6F39C4",
      borderColor: "#6F39C4",
      fill: false,
      lineTension: 0,
      data: [14, 20, 29]
    }
  ]
}; */

/**
 * formatting for A&C child behavior trends graph, including title and scales for the axes
 * @type {{showScale: boolean, pointDot: boolean, scales: {yAxes: {ticks: {min: number, max: number, callback: (function(*): string), beginAtZero: boolean}, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[], xAxes: {display: boolean, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[]}, title: {display: boolean, fontSize: number, text: string, fontStyle: string}, showLines: boolean}}
 */
const ChildBehaviorTrendsOptions = {
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
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: "Date",
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
          callback: function(value: number) {
            return value + "%";
          }
        },
        scaleLabel: {
          display: true,
          labelString: "% of Visits",
          fontStyle: "bold"
        }
      }
    ]
  },
  plugins: {
    datalabels: {
      display: "auto",
      color: "gray",
      align: "top",
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
 * Vertical Bar Chart for Associative&Cooperative Child Behaviors
 * @class ChildBehaviorTrendsVerticalBar
 * @return {void}
 */
class ChildBehaviorTrendsVerticalBar extends React.Component<Props, {}> {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    // const { classes } = this.props;

    return (
      <Line
        data={this.props.data}
        options={ChildBehaviorTrendsOptions}
        width={650}
        height={400}
      />
    );
  }
}

ChildBehaviorTrendsVerticalBar.propTypes = {
  // classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default ChildBehaviorTrendsVerticalBar;
