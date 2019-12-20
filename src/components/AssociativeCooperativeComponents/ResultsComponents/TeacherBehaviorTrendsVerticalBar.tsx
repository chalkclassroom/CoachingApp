import * as React from "react";
import * as PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

/**
 * specifies data sets (and formatting) for the child behaviors details horizontal bar
 * @type {{datasets: *[], labels: string[][]}}
 */
/* const teacherBehaviorsData = {
  labels: ["August 19, 2018", "September 30, 2018", "October 22, 2018"],
  datasets: [
    {
      label: "Present, but No Support",
      backgroundColor: "#E99C2E",
      borderColor: "#E99C2E",
      borderWidth: 2,
      data: [4, 5, 7]
    },
    {
      label: "Teacher Support",
      backgroundColor: "#0988EC",
      borderColor: "#0988EC",
      borderWidth: 2,
      data: [6, 5, 8]
    }
  ]
}; */

/**
 * formatting for A&C teacher behavior trends graph, including title and scales for the axes
 * @type {{showScale: boolean, pointDot: boolean, scales: {yAxes: {ticks: {min: number, max: number, callback: (function(*): string), beginAtZero: boolean}, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[], xAxes: {display: boolean, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[]}, title: {display: boolean, fontSize: number, text: string, fontStyle: string}, showLines: boolean}}
 */
const TeacherBehaviorTrendsOptions = {
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
  data: {}
}

/**
 * Vertical Bar Chart for Associative&Cooperative Teacher Behaviors
 * @class TeacherBehaviorTrendsVerticalBar
 * @return {void}
 */
class TeacherBehaviorTrendsVerticalBar extends React.Component<Props, {}> {
  
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
        options={TeacherBehaviorTrendsOptions}
        width={650}
        height={400}
      />
    );
  }
}

TeacherBehaviorTrendsVerticalBar.propTypes = {
  // classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};

export default TeacherBehaviorTrendsVerticalBar;
