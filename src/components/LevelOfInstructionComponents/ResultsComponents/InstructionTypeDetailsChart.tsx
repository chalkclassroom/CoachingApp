import * as React from 'react';
import * as PropTypes from 'prop-types';
import {HorizontalBar} from 'react-chartjs-2';

interface Props {
  hlqCount: number,
  hlqResponseCount: number,
  llqCount: number,
  llqResponseCount: number,
  completed?(): void
}

/**
 * specifies data sets and formatting for the Instruction details bar graph
 * @class InstructionTypeDetailsChart
 */
class InstructionTypeDetailsChart extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    hlqCount: PropTypes.number.isRequired,
    hlqResponseCount: PropTypes.number.isRequired,
    llqCount: PropTypes.number.isRequired,
    llqResponseCount: PropTypes.number.isRequired,
    completed: PropTypes.func
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    const instructionData = {  
      labels: [
        ["Teacher Asks", "High-Level Question"],
        ["Child Answers", "High-Level Question"],
        ["Teacher Asks", "Low-Level Question"], 
        ["Child Answers", "Low-Level Question"],
      ],
      datasets: [{
        data: [
          this.props.hlqCount,
          this.props.hlqResponseCount,
          this.props.llqCount,
          this.props.llqResponseCount
        ],
        backgroundColor: ["#38761d", "38761d", "#1155cc", "#1155cc"],
        hoverBackgroundColor: ["#38761d", "38761d", "#1155cc", "#1155cc"]
      }]
    };
    return (
      <HorizontalBar
        data={instructionData}
        options={{
          animation: {
            onComplete: function(): void {
              isCompleted ? isCompleted() : null
            }
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  min: 0,
                  max: (
                    Math.max(
                      this.props.llqResponseCount,
                      this.props.hlqResponseCount,
                      this.props.llqCount,
                      this.props.hlqCount
                    ) > 20) ?
                    Math.max(
                      this.props.llqResponseCount,
                      this.props.hlqResponseCount,
                      this.props.llqCount,
                      this.props.hlqCount
                    ) : 20,
                  fontSize: 16,
                  stepSize: 1
                },
                scaleLabel: {
                  display: true,
                  labelString: "Number Observed",
                  fontSize: 18,
                  fontColor: "#000000",
                },
                afterFit: function(scale: { height: number }): void {
                  scale.height = 100 // creates padding between ticks and scaleLabel
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  fontSize: 16
                },
                scaleLabel: {
                  display: false,
                  labelString: "Instruction Types",
                  fontSize: 18,
                  fontColor: "#000000"
                },
                afterFit: function(scale: { width: number }): void {
                  scale.width = 260
                },
              }
            ]
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Level of Instruction Details",
            fontSize: 20,
            fontStyle: "bold"
          },
          plugins: {
            datalabels: {
              display: 'auto',
              color: 'black',
              font: {
                size: 14,
                weight: 'bold'
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

export default InstructionTypeDetailsChart;