import * as React from "react";
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import * as Constants from '../../../constants/Constants';

interface Props {
  math: number,
  notMath: number,
  completed?(): void
}

/**
 * Pie Chart for Math Child Behaviors
 * @class AvgBarSummary
 * @return {void}
 */
class ChildPieSummary extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    math: PropTypes.number.isRequired,
    notMath: PropTypes.number.isRequired,
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    const childBehaviorsData = {
      labels: [
        "Math",
        "Other Activity",
      ],
      datasets: [
        {
          data: [this.props.math, this.props.notMath],
          backgroundColor: [Constants.Colors.MI, Constants.Colors.RedGraph],
          hoverBackgroundColor: [Constants.Colors.MI, Constants.Colors.RedGraph]
        }
      ]
    };

    const total = this.props.math + this.props.notMath;

    return (
      <Pie
        data={childBehaviorsData}
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
                return currentValue + " (" + percentage + "%)";
              },
              title: function(tooltipItem: Array<{ index: number }>, data: { labels: Array<string> }): string {
                return data.labels[tooltipItem[0].index];
              }
            },
            bodyFontSize: 16
          },
          legend: {
            display: true,
            position: 'bottom',
            onClick: null,
            labels: {
              padding: 20,
              fontColor: "black",
              fontSize: 14,
              fontFamily: 'Arimo'
            }
          },
          plugins: {
            datalabels: {
              color: 'white',
              font: {
                size: 20
              },
              formatter: function(value: number): number | null {
                if (value > 0) {
                  return value;
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

export default ChildPieSummary;
