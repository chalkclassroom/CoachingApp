import * as React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const styles = {};

/**
 * specifies data sets (and formatting) for child behaviors pie chart
 */
const teacherBehaviorsData = {
  labels: ["No Support", "Teacher Support"],
  datasets: [
    {
      data: [40, 60],
      backgroundColor: ["#E99C2E", "#0988EC"],
      hoverBackgroundColor: ["#E99C2E", "#0988EC"]
    }
  ]
};

/**
 * pie chart for sequential teacher behaviors
 * @class SummaryTeacherBehaviorsPieChart
 */
class SummaryTeacherBehaviorsPieChart extends React.Component {
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    // const { classes } = this.props;

    return <Pie data={teacherBehaviorsData} width={650} height={400} />;
  }
}

/* SummaryTeacherBehaviorsPieChart.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}; */

export default withStyles(styles)(SummaryTeacherBehaviorsPieChart);
