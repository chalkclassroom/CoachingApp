import * as React from "react";
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import FirebaseContext from "../Firebase/FirebaseContext";

interface Props {
  transitionTime: number,
  learningActivityTime: number,
}

/**
 * specifies data sets and formatting for the transition summary pie graph
 * @class TransitionTimePie
 */
class TransitionTimePie extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    transitionTime: PropTypes.number.isRequired,
    learningActivityTime: PropTypes.number.isRequired,
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const transitionData = {
      labels: ["Transition Time", "Learning Activity (No Transition)"],
      datasets: [
        {
          data: [this.props.transitionTime, this.props.learningActivityTime],
          backgroundColor: ["#E55529", "#0988EC"],
          hoverBackgroundColor: ["#E55529", "#0988EC"]
        }
      ]
    };

    return (
      <Pie
        data={transitionData}
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
          },
          legend: {
            onClick: null,
            position: "bottom",
            labels: {
              padding: 20,
              fontColor: "black",
              fontSize: 14,
            }
          },
          plugins: {
            datalabels: {
              display: 'auto',
              color: 'white',
              font: {
                size: 20
              },
              formatter: function(value: number) {
                return (
                  Math.floor((value/1000)/60) + "m "
                  + Math.round((((value/1000)/60) % 1) * 60) + "s"
                );
              }
            }
          }
        }}
        width={650}
        height={400}
      />
    );
  }
}

TransitionTimePie.contextType = FirebaseContext;
export default TransitionTimePie;
