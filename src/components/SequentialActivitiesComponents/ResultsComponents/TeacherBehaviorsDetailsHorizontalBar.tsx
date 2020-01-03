import * as React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { HorizontalBar } from "react-chartjs-2";

const styles = {};

/**
 * specifies data sets (and formatting) for the teacher behaviors details horizontal bar
 * @type {{datasets: *[], labels: string[][]}}
 */
const teacherBehaviorsData = {
  labels: [
    "Encourage sequential use of materials",
    "Demonstrating the steps to an activity",
    "Helping children act out a play or a they have read"
  ],
  datasets: [
    {
      label: "Number of Times Observed",
      backgroundColor: "#0988EC",
      borderColor: "#0988EC",
      borderWidth: 2,
      data: [9, 5, 4]
    }
  ]
};

/**
 * horizontal bar chart for sequential teacher behaviors
 * @class TeacherBehaviorsDetailsHorizontalBar
 */
class TeacherBehaviorsDetailsHorizontalBar extends React.Component {
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    // const { classes } = this.props;

    return (
      <HorizontalBar
        data={teacherBehaviorsData}
        width={650}
        height={400}
        options={{
          scales: {
            xAxes: [
              {
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 10
                }
              }
            ]
          }
        }}
      />
    );
  }
}

/* TeacherBehaviorsDetailsHorizontalBar.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}; */

export default withStyles(styles)(TeacherBehaviorsDetailsHorizontalBar);
