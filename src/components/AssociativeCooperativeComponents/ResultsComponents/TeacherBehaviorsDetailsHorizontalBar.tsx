import * as React from "react";
import { HorizontalBar } from "react-chartjs-2";


/**
 * specifies data sets (and formatting) for the teacher behaviors details horizontal bar
 * @type {{datasets: *[], labels: string[][]}}
 */
const teacherBehaviorsData = {
  labels: [
    "Participating in children’s play",
    "Asking questions to check for understanding or extend children’s thinking",
    "Encouraging children to share, work, or interact with each other",
    "Helping children find the words to communicate"
  ],
  datasets: [
    {
      label: "Number of Times Observed",
      backgroundColor: "#90c4ed",
      borderColor: "#0988EC",
      borderWidth: 2,
      data: [65, 59, 80, 81]
    }
  ]
};

/**
 * Horizontal Bar Chart for Associative&Cooperative Teacher Behaviors
 * @class TeacherBehaviorsDetailsHorizontalBar
 * @return {void}
 */
class TeacherBehaviorsDetailsHorizontalBar extends React.Component {
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    // const { classes } = this.props;

    return (
      <HorizontalBar data={teacherBehaviorsData} width={650} height={400} />
    );
  }
}

/* TeacherBehaviorsDetailsHorizontalBar.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}; */

export default TeacherBehaviorsDetailsHorizontalBar;
