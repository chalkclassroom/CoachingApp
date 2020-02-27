import * as React from "react";
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";;
import FirebaseContext from "../../Firebase/FirebaseContext";
import * as Constants from '../../../constants';

interface Props {
  inferentialResponses: number,
  basicSkillsResponses: number,
}

/**
 * specifies data sets and formatting for the Instruction responses pie chart
 * @class InstructionResponsesSummaryChart
 */
class InstructionResponsesSummaryChart extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    inferentialResponses: PropTypes.number.isRequired,
    basicSkillsResponses: PropTypes.number.isRequired,
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const instructionResponseData = {
      labels: ["Inferential Instruction", "Basic Skills Instruction"],
      datasets: [
        {
          data: [this.props.inferentialResponses, this.props.basicSkillsResponses],
          backgroundColor: [Constants.InstructionColor,"#6d9eeb"],
          hoverBackgroundColor: [Constants.InstructionColor, "#6d9eeb"] //6d9eeb
        }
      ]
    };

    return (
      <Pie
        data={instructionResponseData}
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
            text: "Level of Instruction Summary",
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

InstructionResponsesSummaryChart.contextType = FirebaseContext;
export default InstructionResponsesSummaryChart;