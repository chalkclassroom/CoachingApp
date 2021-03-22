import * as React from "react";
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import * as Constants from "../../../constants/Constants";

interface Props {
  noSupport: number,
  support: number,
  noTeacherOpp: number,
  completed?(): void,
  title?: boolean
}

/**
 * Pie Chart for Associative&Cooperative Teacher Behaviors
 * @class TeacherPieSummary
 * @return {void}
 */
class TeacherPieSummary extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    noSupport: PropTypes.number.isRequired,
    support: PropTypes.number.isRequired,
    noTeacherOpp: PropTypes.number.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    const teacherBehaviorsData = {
      labels: [
        "Teacher Support for Sequential Activities",
        "Teacher Present, No Support",
        "Teacher Not at Center"
      ],
      datasets: [
        {
          data: [this.props.support, this.props.noSupport, this.props.noTeacherOpp],
          backgroundColor: [Constants.Colors.AppBar, Constants.Colors.RedGraph, Constants.Colors.NotPresent],
          hoverBackgroundColor: [Constants.Colors.AppBar, Constants.Colors.RedGraph, Constants.Colors.NotPresent]
        }
      ]
    };
    const total = this.props.support + this.props.noSupport + this.props.noTeacherOpp;

    return (
      <Pie
        data={teacherBehaviorsData}
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
            },
            bodyFontSize: 16
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
            text: "Teacher Summary",
            fontSize: 20,
            fontColor: 'black',
            fontFamily: 'Arimo',
            fontStyle: "bold"
          },
          plugins: {
            datalabels: {
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
    );
  }
}

export default TeacherPieSummary;