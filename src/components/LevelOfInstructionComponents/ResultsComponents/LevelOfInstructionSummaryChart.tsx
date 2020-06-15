import * as React from 'react';
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import FirebaseContext from "../../Firebase/FirebaseContext";

interface Props {
  basicSkillsResponses: number, 
  inferentialResponses: number, 
}

/**
 * @class LevelOfInstructionSummaryChart
 */
class LevelOfInstructionSummaryChart extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */ 
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    basicSkillsResponses: PropTypes.number.isRequired, 
    inferentialResponses: PropTypes.number.isRequired,
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const instructionResponseData = {
      labels: ["Inferential Instruction", "Basic Skills Instruction"],
      datasets: [
        {
          data: [this.props.inferentialResponses, this.props.basicSkillsResponses],
          backgroundColor: ["#6aa84f","#6d9eeb"],
          hoverBackgroundColor: ["#6aa84f", "#6d9eeb"] 
        }
      ]
    };
    return (
      <div>
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
            title: {
              display: true,
              text: "Teacher Instruction",
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
                formatter: function(value: number): number | void {
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
      </div>
    );
  }
}

LevelOfInstructionSummaryChart.contextType = FirebaseContext;
export default LevelOfInstructionSummaryChart;
