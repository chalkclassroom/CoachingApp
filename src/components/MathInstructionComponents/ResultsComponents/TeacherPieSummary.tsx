import * as React from "react";
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import * as Constants from "../../../constants";

interface Props {
  support: number,
  noSupport: number,
  noTeacherOpp: number
}

/**
 * Pie Chart for Math Teacher Behaviors
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
    support: PropTypes.number.isRequired,
    noSupport: PropTypes.number.isRequired,
    noTeacherOpp: PropTypes.number.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const teacherBehaviorsData = {
      labels: [
        "Teacher Support for Math",
        "Teacher Present, No Support",
        "Teacher Not at Center"
      ],
      datasets: [
        {
          data: [this.props.support, this.props.noSupport, this.props.noTeacherOpp],
          backgroundColor: [Constants.AppBarColor, Constants.RedGraphColor, Constants.NotPresentColor],
          hoverBackgroundColor: [Constants.AppBarColor, Constants.RedGraphColor, Constants.NotPresentColor]
        }
      ]
    };

    return (
      <Pie
        data={teacherBehaviorsData}
        options={{
          tooltips: {
            callbacks: {
              label: function(tooltipItem: { datasetIndex: number, index: number },
                  data: { datasets: Array<{data: Array<number>, backgroundColor: Array<string>, hoverBackgroundColor: Array<string>}> }): string {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const meta = dataset._meta[Object.keys(dataset._meta)[0]];
                const total = meta.total;
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
            display: false,
            position: 'bottom'
          },
          plugins: {
            datalabels: {
              color: 'white',
              font: {
                size: 20
              }
            }
          }
        }}
        width = {260}
      />
    );
  }
}

export default TeacherPieSummary;