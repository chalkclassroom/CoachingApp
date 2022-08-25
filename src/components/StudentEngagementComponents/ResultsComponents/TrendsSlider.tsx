import * as React from "react";
import * as PropTypes from "prop-types";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Grid from "@material-ui/core/Grid/Grid";
import { Line } from "react-chartjs-2";

interface Props {
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
  completed?(): void,
  title?: boolean
}

/**
 * Swipe View for Child and Teacher Sequential Trends Graphs
 * @class TrendsSlider
 * @return {void}
 */
class TrendsSlider extends React.Component<Props, {}> {

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
              scales: {
                xAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: "Date",
                      fontColor: "black",
                      fontSize: 18,
                      fontFamily: 'Arimo'
                    }
                  }
                ],
                yAxes: [
                  {
                    scaleLabel: {
                      display: true,
                      labelString: "Average Engagement Rating",
                      fontFamily: 'Arimo',
                      fontSize: 18,
                      fontColor: 'black'
                    },
                    ticks: {
                      beginAtZero: true,
                      min: 0,
                      max: 3,
                      stepSize: 1,
                      callback: function (value: number): string | void {
                        switch (value) {
                          case 0:
                            return 'off task';
                            break;
                          case 1:
                            return 'mildly engaged';
                            break;
                          case 2:
                            return 'engaged';
                            break;
                          case 3:
                            return 'highly engaged';
                            break;
                          default:
                            break;
                        }
                      }
                    }
                  }
                ]
              },
              title: {
                display: this.props.title,
                text: "Trends",
                fontSize: 20,
                fontColor: 'black',
                fontFamily: 'Arimo',
                fontStyle: "bold"
              },
              plugins: {
                datalabels: {
                  display: "auto",
                  color: "gray",
                  fontFamily: 'Arimo',
                  align: function(value: {
                    dataIndex: number,
                    dataset: {
                      data: Array<number>
                    }
                  }): string {
                    return value.dataset.data[value.dataIndex] >= 4.9 ? "bottom" : "top";
                  }
                }
              },
              maintainAspectRatio: false
            }}
          />
    );
  }
}

export default TrendsSlider;