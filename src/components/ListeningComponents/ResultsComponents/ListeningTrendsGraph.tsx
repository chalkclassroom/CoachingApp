import * as React from "react";
import * as PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

interface Props {
  // data: {labels: Array<string>, datasets: Array<{label: string, data: number, backgroundColor: string}>}
  data(): {
    labels: Array<Array<string>>,
    datasets: Array<{
      label: string,
      backgroundColor: string,
      borderColor: string,
      fill: boolean,
      lineTension: number,
      data: Array<number>
    }>
  } | undefined,
  completed?(): void
}

/**
 * specifies data sets and formatting for Listening to Children trends graph
 * @class ListeningTrendsGraph
 */
class ListeningTrendsGraph extends React.Component<Props, {}> {

  static propTypes = {
    data: PropTypes.func.isRequired,
    completed: PropTypes.func
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
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
          showScale: true,
          pointDot: true,
          showLines: true,
          tooltips: {
            mode: "index",
            intersect: false
          },
          hover: {
            mode: "nearest",
            intersect: true
          },
          title: {
            display: false,
            text: "Teacher Listening Trends",
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
                  labelString: "% of 1-minute Intervals",
                  fontSize: 18,
                  fontColor: 'black',
                  fontFamily: 'Arimo'
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

export default ListeningTrendsGraph;
