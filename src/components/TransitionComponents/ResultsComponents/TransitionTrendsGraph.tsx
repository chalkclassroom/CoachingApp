import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Line } from "react-chartjs-2";

const styles = {};

interface Props {
  data: object,
  completed?(): void,
  title?: boolean
}

/**
 * specifies data sets and formatting for the transition trends graph
 * @class TransitionTrendsGraph
 */
class TransitionTrendsGraph extends React.Component<Props, {}> {
  static propTypes = {
    data: PropTypes.func.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
  }
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
          showScale: true,
          pointDot: true,
          showLines: true,
          // title: {
          //     display: true,
          //     text: 'Transition Time Trends',
          //     fontSize: 20,
          //     fontStyle: 'bold'
          // },
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          legend: {
            display: true,
            labels: {
              fontColor: 'black'
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
                  labelString: "Date & Total Time in Transition",
                  fontSize: 18,
                  fontColor: 'black',
                  fontFamily: 'Arimo'
                },
                ticks: {

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
                  labelString: "% of Time Spent in Transition",
                  fontSize: 18,
                  fontColor: 'black',
                  fontFamily: 'Arimo'
                }
              }
            ]
          },
          plugins: {
            datalabels: {
              display: 'auto',
              color: 'black',
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
        width={600}
        height={350}
      />
    );
  }
}

TransitionTrendsGraph.propTypes = {
  data: PropTypes.func.isRequired
};

export default withStyles(styles)(TransitionTrendsGraph);
