import * as React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const styles = {};

/**
 * specifies data sets (and formatting) for child behaviors pie chart
 */
const childBehaviorsData = {
  labels: ["Non-Sequential", "Sequential"],
  datasets: [
    {
      data: [60, 40],
      backgroundColor: ["#E55529", "#FFD300"],
      hoverBackgroundColor: ["#E55529", "#FFD300"]
    }
  ]
};

/**
 * pie chart for sequential child behaviors
 * @class SummaryChildBehaviorsPieChart
 */
class SummaryChildBehaviorsPieChart extends React.Component {
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    // const { classes } = this.props;

    return <Pie data={childBehaviorsData} width={650} height={400} />;
  }
}

/* SummaryChildBehaviorsPieChart.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}; */

export default withStyles(styles)(SummaryChildBehaviorsPieChart);
