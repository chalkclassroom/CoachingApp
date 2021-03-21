import * as React from "react";
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import FirebaseContext from "../../Firebase/FirebaseContext";
import * as Constants from "../../../constants/Constants";

interface Props {
  transitionTime: number,
  learningActivityTime: number,
  completed?(): void
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
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const transitionData = {
      labels: ["Transition Time", "Learning Activity (No Transition)"],
      datasets: [
        {
          data: [this.props.transitionTime, this.props.learningActivityTime],
          backgroundColor: [Constants.Colors.TT, Constants.Colors.AppBar],
          hoverBackgroundColor: [Constants.Colors.TT, Constants.Colors.AppBar]
        }
      ]
    };
    const total = this.props.transitionTime + this.props.learningActivityTime;
    const isCompleted = this.props.completed;
    return (
      <Pie
        data={transitionData}
        options={{
          animation: {
            onComplete: function(): void {
              isCompleted ? isCompleted() : null
            }
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem: { datasetIndex: number, index: number },
                  data: { datasets: Array<{data: Array<number>, backgroundColor: Array<string>, hoverBackgroundColor: Array<string>}> }): string {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const currentValue = dataset.data[tooltipItem.index];
                const percentage = parseFloat(
                  ((currentValue / total) * 100).toFixed(1)
                );
                return Math.floor((currentValue/1000)/60) + "m "
                + Math.round((((currentValue/1000)/60) % 1) * 60) + "s" + " (" + percentage + "%)";
              },
              title: function(tooltipItem: Array<{ index: number }>, data: { labels: Array<string> }): string {
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
              fontFamily: 'Arimo'
            }
          },
          plugins: {
            datalabels: {
              display: 'auto',
              color: 'white',
              font: {
                size: 20
              },
              fontFamily: 'Arimo',
              formatter: function(value: number): string | null {
                if (value > 0) {
                  return (
                    Math.floor((value/1000)/60) + "m "
                    + Math.round((((value/1000)/60) % 1) * 60) + "s"
                  );
                } else {
                  return null;
                }
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
