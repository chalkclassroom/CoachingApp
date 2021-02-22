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
  }
}

/**
 * formatting for instruction trends graph, including title and scales for the axes
 * @type {{showScale: boolean, pointDot: boolean, scales: {yAxes: {ticks: {min: number, max: number, callback: (function(*): string), beginAtZero: boolean}, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[], xAxes: {display: boolean, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[]}, title: {display: boolean, fontSize: number, text: string, fontStyle: string}, showLines: boolean}}
 */
const instructionTrendOptions = {
  title: {
    display: false,
    text: "Level Of Instruction Trends",
    fontSize: 20,
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
};

/**
 * specifies data sets and formatting for level of instruction trends graph
 * @class LevelOfInstructionTrendsGraph
 */
class LevelOfInstructionTrendsGraph extends React.Component<Props, {}> {

  static propTypes = {
    data: PropTypes.func.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return (
      <Line
        data={this.props.data}
        options={instructionTrendOptions}
        width={650}
        height={400}
      />
    );
  }
}

export default LevelOfInstructionTrendsGraph;
