import * as React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { HorizontalBar } from "react-chartjs-2";

const styles = {};

/**
 * specifies data sets (and formatting) for the child behaviors details horizontal bar
 * @type {{datasets: *[], labels: string[][]}}
 */
const childBehaviorsData = {
  labels: [
    "Using regular objects in a sequential way",
    "Writing names or meaningful messages",
    "Drawing meaninful images",
    "Using sequential materials in a prescribed way",
    "Following formal rules of a game and/or taking turns",
    "Speaking or acting according to a predetermined scenario"
  ],
  datasets: [
    {
      label: "Number of Times Observed",
      backgroundColor: "#FFD300",
      borderColor: "#FFD300",
      borderWidth: 2,
      data: [3, 8, 2, 7, 2, 1]
    }
  ]
};

/**
 * horizontal bar chart for sequential child behaviors
 * @class ChildBehaviorsDetailsHorizontalBar
 * @return {void}
 */
class ChildBehaviorsDetailsHorizontalBar extends React.Component {
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    // const { classes } = this.props;

    return (
      <HorizontalBar
        data={childBehaviorsData}
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

/* ChildBehaviorsDetailsHorizontalBar.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}; */

export default withStyles(styles)(ChildBehaviorsDetailsHorizontalBar);
