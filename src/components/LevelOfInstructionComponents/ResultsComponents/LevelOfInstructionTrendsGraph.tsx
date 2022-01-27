import * as React from "react";
import * as PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

interface Props {
  data(): {
    labels: Array<string>,
    datasets: Array<{
      label: string,
      backgroundColor: string,
      borderColor: string,
      fill: boolean,
      lineTension: number,
      data: Array<number>,
      borderDash?: Array<number>
    }>
  } | undefined,
  completed?(): void,
  title?: boolean
}

/**
 * formatting for instruction trends graph, including title and scales for the axes
 * @type {{showScale: boolean, pointDot: boolean, scales: {yAxes: {ticks: {min: number, max: number, callback: (function(*): string), beginAtZero: boolean}, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[], xAxes: {display: boolean, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[]}, title: {display: boolean, fontSize: number, text: string, fontStyle: string}, showLines: boolean}}
 */

/**
 * specifies data sets and formatting for level of instruction trends graph
 * @class LevelOfInstructionTrendsGraph
 */
class LevelOfInstructionTrendsGraph extends React.Component<Props, {}> {

  static propTypes = {
    data: PropTypes.func.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    return (
      <Line
        data={this.props.data}
        options={{
          animation: {
            onComplete: function(): void {
              isCompleted ? isCompleted() : null
            }
          },
          title: {
            display: this.props.title,
            text: "Trends",
            fontSize: 20,
            fontColor: 'black',
            fontFamily: 'Arimo',
            fontStyle: "bold"
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Date",
                  fontFamily: "Arimo",
                  fontSize: 18,
                  color: 'black'
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  min: 0,
                  max: 100,
                  callback: function(value: number): string {
                    return value + "%";
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: "% of Each Behavior",
                  fontFamily: "Arimo",
                  fontSize: 18,
                  color: 'black'
                }
              }
            ]
          },
          plugins: {
            datalabels: {
              display: "auto",
              color: "gray",
              align: function(value: {
                dataIndex: number,
                dataset: {
                  data: Array<number>
                }
              }): string {
                return value.dataset.data[value.dataIndex] >= 95 ? "bottom" : "top";
              },
              formatter: function(value: number): string {
                return value + "%";
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

export default LevelOfInstructionTrendsGraph;
