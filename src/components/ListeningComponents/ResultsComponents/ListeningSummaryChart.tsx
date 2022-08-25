import * as React from 'react';
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import FirebaseContext from "../../Firebase/FirebaseContext";
import * as Constants from '../../../constants/Constants';

interface Props {
  listening: number,
  notListening: number,
  completed?(): void,
  title?: boolean
}

/**
 * @class ListeningSummaryChart
 */
class ListeningSummaryChart extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    listening: PropTypes.number.isRequired,
    notListening: PropTypes.number.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    const listeningData = {
      labels: ["Listening/Encouraging", "No Target Behaviors Observed"],
      datasets: [
        {
          data: [this.props.listening, this.props.notListening],
          backgroundColor: [Constants.Colors.LC, Constants.Colors.RedGraph],
          hoverBackgroundColor: [Constants.Colors.LC, Constants.Colors.RedGraph]
        }
      ]
    };
    const total = this.props.listening + this.props.notListening;
    return (
        <Pie
          data={listeningData}
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
              }
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
              text: "Summary",
              fontSize: 20,
              fontColor: 'black',
              fontFamily: 'Arimo',
              fontStyle: "bold"
            },
            plugins: {
              datalabels: {
                display: 'auto',
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
            },
            maintainAspectRatio: false
          }}
        />
    );
  }
}

ListeningSummaryChart.contextType = FirebaseContext;
export default ListeningSummaryChart;