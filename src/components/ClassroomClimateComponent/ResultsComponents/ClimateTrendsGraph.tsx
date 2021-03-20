import * as React from "react";
import * as PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

interface Props {
  data(): {
    labels: Array<string>,
    datasets: Array<{
      label: string,
      data: Array<number>,
      backgroundColor: string,
      borderColor: string,
      fill: boolean,
      lineTension: number
    }>
  } | undefined,
  completed?(): void
}


/**
 * formatting for transition trends graph, including title and scales for the axes
 * @type {{showScale: boolean, pointDot: boolean, scales: {yAxes: {ticks: {min: number, max: number, callback: (function(*): string), beginAtZero: boolean}, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[], xAxes: {display: boolean, scaleLabel: {labelString: string, display: boolean, fontStyle: string}}[]}, title: {display: boolean, fontSize: number, text: string, fontStyle: string}, showLines: boolean}}
 */
const climateTrendOptions = {
  title: {
    display: false,
    text: "Classroom Climate Trends",
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
          fontSize: 18,
          fontColor: 'black',
          fontFamily: 'Arimo'
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
          labelString: "% of Behavior Response Type",
          fontSize: 18,
          fontColor: 'black',
          fontFamily: 'Arimo'
        }
      }
    ]
  },
  /* tooltips: {
    displayColors: true,
    multiKeyBackground: "white"
  }, */
};

/**
 * specifies data sets and formatting for climate trends graph
 * @class ClimateTrendsGraph
 */
class ClimateTrendsGraph extends React.Component<Props, {}> {

  static propTypes = {
    data: PropTypes.func.isRequired
  };

  /**
   * render function
   * @return {ReactElement}
   */
  render(): React.ReactElement {
    // const { classes } = this.props;
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
            display: false,
            text: "Classroom Climate Trends",
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
                  fontSize: 18,
                  fontColor: 'black',
                  fontFamily: 'Arimo'
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
                  labelString: "% of Behavior Response Type",
                  fontSize: 18,
                  fontColor: 'black',
                  fontFamily: 'Arimo'
                }
              }
            ]
          }
        }}
        width={650}
        height={400}
      />
    );
  }
}

export default ClimateTrendsGraph;
