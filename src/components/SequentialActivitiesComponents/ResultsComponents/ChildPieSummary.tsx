import * as React from "react";
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import * as Constants from '../../../constants';

interface Props {
  sequential: number,
  notSequential: number,
}

/**
 * Pie Chart for Associative&Cooperative Child Behaviors
 * @class ChildBehaviorsPie
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
    sequential: PropTypes.number.isRequired,
    notSequential: PropTypes.number.isRequired,
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const childBehaviorsData = {
      labels: [
        "Sequential Activities",
        "Non-Sequential Activities",
      ],
      datasets: [
        {
          data: [this.props.sequential, this.props.notSequential],
          backgroundColor: [Constants.SequentialColor, Constants.RedGraphColor],
          hoverBackgroundColor: [Constants.SequentialColor, Constants.RedGraphColor]
        }
      ]
    };

    return (
      <Pie
        data={childBehaviorsData}
        options={{
          tooltips: {
            callbacks: {
              label: function(tooltipItem: { datasetIndex: number, index: number },
                data: { datasets: Array<{data: Array<number>, backgroundColor: Array<string>, hoverBackgroundColor: Array<string>}> }): string {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const meta = dataset._meta[Object.keys(dataset._meta)[0]];
                const total = meta.total;
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
            display: false,
            position: 'bottom'
          },
          plugins: {
            datalabels: {
              color: 'white',
              font: {
                size: 20
              }
            }
          }
        }}
        width={260}
      />
    );
  }
}

export default ChildPieSummary;
