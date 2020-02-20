import * as React from "react";
import * as PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

/**
 * formatting for A&C child behavior trends graph, including title and scales for the axes
 * @type {{showScale: boolean, pointDot: boolean, scales: {yAxes: {ticks: {min: number, max: number, callback: (function(*): string), beginAtZero: boolean}, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[], xAxes: {display: boolean, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[]}, title: {display: boolean, fontSize: number, text: string, fontStyle: string}, showLines: boolean}}
 */
const ChildBehaviorTrendsOptions = {
  showScale: true,
  pointDot: true,
  showLines: true,
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
          callback: function(value: number): string {
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
      formatter: function(value: number): string {
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
   * @return {ReactNode}
   */
  render(): React.ReactNode {
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
  data: PropTypes.object.isRequired
};

export default ChildBehaviorTrendsVerticalBar;
