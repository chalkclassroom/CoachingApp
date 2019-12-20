import * as React from "react";
import { HorizontalBar } from "react-chartjs-2";


/**
 * specifies data sets (and formatting) for the child behaviors details horizontal bar
 * @type {{datasets: *[], labels: string[][]}}
 */
const childBehaviorsData = {
  labels: [
    "Talking to each other about current activity",
    "Engaging in pretend play without clear roles or order",
    "Following formal rules and/or taking turns",
    "Speaking or acting in character during a clear pretend play scenario"
  ],
  datasets: [
    {
      label: "Number of Times Observed",
      backgroundColor: "#a086c9",
      borderColor: "#6F39C4",
      borderWidth: 2,
      data: [65, 59, 80, 81]
    }
  ]
};

/**
 * Horizontal Bar Graph for Associative&Cooperative Child Behaviors
 * @class ChildBehaviorsDetailsHorizontalBar
 * @return {void}
 */
class ChildBehaviorsDetailsHorizontalBar extends React.Component {
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    return <HorizontalBar data={childBehaviorsData} width={650} height={400} />;
  }
}


export default ChildBehaviorsDetailsHorizontalBar;
