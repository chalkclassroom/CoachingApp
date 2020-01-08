import * as React from "react";
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";;
import FirebaseContext from "../../Firebase/FirebaseContext";
import * as Constants from '../../../constants';

interface Props {
  positiveResponses: number,
  negativeResponses: number,
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
   * @return {ReactElement}
   */
  render() {
    const behaviorResponseData = {
      labels: ["General/Specific Approvals", "Redirections/Disapprovals"],
      datasets: [
        {
          data: [this.props.positiveResponses, this.props.negativeResponses],
          backgroundColor: [Constants.ClimateColor, "#ec2409"],
          hoverBackgroundColor: [Constants.ClimateColor, "#ec2409"]
        }
      ]
    };

    return (
      <Pie
        data={behaviorResponseData}
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
              formatter: function(value: number) {
                return (
                  value
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

BehaviorResponsesSummaryChart.contextType = FirebaseContext;
export default BehaviorResponsesSummaryChart;