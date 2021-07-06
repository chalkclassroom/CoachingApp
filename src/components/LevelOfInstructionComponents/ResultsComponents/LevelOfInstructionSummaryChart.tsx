import * as React from 'react';
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import FirebaseContext from "../../Firebase/FirebaseContext";

interface Props {
  lowLevel: number, 
  highLevel: number,
  completed?(): void,
  title?: boolean
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
    lowLevel: PropTypes.number.isRequired, 
    highLevel: PropTypes.number.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    const instructionResponseData = {
      labels: ["High-Level Instruction", "Low-Level Instruction"],
      datasets: [
        {
          data: [this.props.highLevel, this.props.lowLevel],
          backgroundColor: ["#6aa84f","#6d9eeb"],
          hoverBackgroundColor: ["#6aa84f", "#6d9eeb"] 
        }
      ]
    };
    const total = this.props.highLevel + this.props.lowLevel;
    return (
      <div>
        <Pie
          data={instructionResponseData}
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
              display: this.props.title,
              text: "Summary",
              fontSize: 20,
              fontColor: 'black',
              fontFamily: 'Arimo',
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
      </div>
    );
  }
}

LevelOfInstructionSummaryChart.contextType = FirebaseContext;
export default LevelOfInstructionSummaryChart;
