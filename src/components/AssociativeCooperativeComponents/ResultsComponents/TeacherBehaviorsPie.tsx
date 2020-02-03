import * as React from "react";
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";

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

interface Props {
  noSupport: number,
  support: number,
  noTeacherOpp: number
}

/**
 * Pie Chart for Associative&Cooperative Teacher Behaviors
 * @class TeacherBehaviorsPie
 * @return {void}
 */
class TeacherBehaviorsPie extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    noSupport: PropTypes.number.isRequired,
    support: PropTypes.number.isRequired,
    noTeacherOpp: PropTypes.number.isRequired
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    // const { classes } = this.props;
    // console.log("inside time: ", this.state.inside);
    const teacherBehaviorsData = {
      labels: [
        "Teacher Support for Assoc./Coop. Interactions",
        "Teacher Present, No Support",
        "Teacher Not Present"
      ],

      datasets: [
        {
          data: [this.props.noSupport, this.props.support, this.props.noTeacherOpp],
          backgroundColor: ["#0988EC", "#E99C2E", "#094492"],
          hoverBackgroundColor: ["#0988EC", "#E99C2E", "#094492"]
        }
      ]
    };

    return (
      <Pie
        data={teacherBehaviorsData}
        options={{
          tooltips: {
            callbacks: {
              label: function(tooltipItem: { datasetIndex: number, index: number },
                  data: { datasets: Array<{data: Array<number>, backgroundColor: Array<string>, hoverBackgroundColor: Array<string>}> }) {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const meta = dataset._meta[Object.keys(dataset._meta)[0]];
                const total = meta.total;
                const currentValue = dataset.data[tooltipItem.index];
                const percentage = parseFloat(
                  ((currentValue / total) * 100).toFixed(1)
                );
                return currentValue + " (" + percentage + "%)";
              },
              title: function(tooltipItem: Array<{ index: number }>, data: { labels: Array<string> }) {
                return data.labels[tooltipItem[0].index];
              }
            }
          }
        }}
        // width={650}
        // height={400}
      />
    );
  }
}

export default TeacherBehaviorsPie;
