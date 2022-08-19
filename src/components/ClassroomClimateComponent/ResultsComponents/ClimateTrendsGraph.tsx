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
  completed?(): void,
  title?: boolean
}

/**
 * specifies data sets and formatting for climate trends graph
 * @class ClimateTrendsGraph
 */
class ClimateTrendsGraph extends React.Component<Props, {}> {

  static propTypes = {
    data: PropTypes.func.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
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
          maintainAspectRatio: false
        }}
      />
    );
  }
}

export default ClimateTrendsGraph;
