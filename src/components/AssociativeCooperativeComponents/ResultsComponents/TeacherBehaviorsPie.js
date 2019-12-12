import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const styles = {};

/**
 * specifies data sets (and formatting) for child behaviors pie chart
 */
// const teacherBehaviorsData = {
//     labels: [
//         'Teacher Support for Assoc./Coop. Interactions',
//         'Teacher Present, No Support'
//     ],
//     datasets: [{
//         data: [300, 50],
//         backgroundColor: [
//             '#0988EC',
//             '#E99C2E'
//         ],
//         hoverBackgroundColor: [
//             '#0988EC',
//             '#E99C2E'
//         ]
//     }]
// };


/**
 * Pie Chart for Associative&Cooperative Teacher Behaviors
 * @class TeacherBehaviorsPie
 * @return {void}
 */
class TeacherBehaviorsPie extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
  }

  state = {};
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    // const { classes } = this.props;
    // console.log("inside time: ", this.state.inside);
    console.log("total session time: " + this.props.sessionTotal);
    const teacherBehaviorsData = {
      labels: [
        "Teacher Support for Assoc./Coop. Interactions",
        "Teacher Present, No Support"
      ],

      datasets: [
        {
          data: [this.props.noSupportTime, this.props.supportTime],
          backgroundColor: ["#0988EC", "#E99C2E"],
          hoverBackgroundColor: ["#0988EC", "#E99C2E"]
        }
      ]
    };

    return (
      <Pie
        data={teacherBehaviorsData}
        options={{
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const meta = dataset._meta[Object.keys(dataset._meta)[0]];
                const total = meta.total;
                const currentValue = dataset.data[tooltipItem.index];
                const percentage = parseFloat(
                  ((currentValue / total) * 100).toFixed(1)
                );
                return currentValue + " (" + percentage + "%)";
              },
              title: function(tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              }
            }
          }
        }}
        width="650"
        height="400"
      />
    );
  }
}

TeacherBehaviorsPie.propTypes = {
  // classes: PropTypes.object.isRequired,
  // data: PropTypes.object.isRequired,
  sessionTotal: PropTypes.number.isRequired,
  noSupportTime: PropTypes.number.isRequired,
  supportTime: PropTypes.number.isRequired
};

export default withStyles(styles)(TeacherBehaviorsPie);
