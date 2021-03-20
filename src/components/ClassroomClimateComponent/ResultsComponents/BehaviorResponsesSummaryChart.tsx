import * as React from "react";
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";;
import FirebaseContext from "../../Firebase/FirebaseContext";
import * as Constants from '../../../constants/Constants';

interface Props {
  positiveResponses: number,
  negativeResponses: number,
  completed?(): void
}

/**
 * specifies data sets and formatting for the climate behavior responses pie chart
 * @class BehaviorResponsesSummaryChart
 */
class BehaviorResponsesSummaryChart extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    positiveResponses: PropTypes.number.isRequired,
    negativeResponses: PropTypes.number.isRequired,
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const behaviorResponseData = {
      labels: ["General/Specific Approvals", "Redirections/Disapprovals"],
      datasets: [
        {
          data: [this.props.positiveResponses, this.props.negativeResponses],
          backgroundColor: [Constants.ClimateTypeColors.positiveBar, Constants.ClimateTypeColors.negativeBar],
          hoverBackgroundColor: [Constants.ClimateTypeColors.positiveBar, Constants.ClimateTypeColors.negativeBar]
        }
      ]
    };
    const total = this.props.positiveResponses + this.props.negativeResponses;
    const isCompleted = this.props.completed;
    return (
      <Pie
        data={behaviorResponseData}
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
            }
          },
          legend: {
            display: true,
            onClick: null,
            position: "bottom",
            labels: {
              padding: 20,
              fontColor: "black",
              fontSize: 14,
              fontFamily: 'Arimo'
            }
          },
          title: {
            display: true,
            text: "Classroom Climate Summary",
            fontSize: 20,
            fontStyle: "bold"
          },
          plugins: {
            datalabels: {
              display: 'auto',
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

BehaviorResponsesSummaryChart.contextType = FirebaseContext;
export default BehaviorResponsesSummaryChart;