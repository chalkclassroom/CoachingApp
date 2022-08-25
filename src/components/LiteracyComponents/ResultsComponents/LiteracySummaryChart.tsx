import * as React from 'react';
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import FirebaseContext from "../../Firebase/FirebaseContext";
import * as Constants from '../../../constants/Constants';
import { LiteracyTypes } from '../../../constants/Constants'

interface Props {
  literacy: number,
  noLiteracy: number,
  type: string,
  completed?(): void,
  title?: boolean
}

/**
 * @class ListeningSummaryChart
 */
class LiteracySummaryChart extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    literacy: PropTypes.number.isRequired,
    noLiteracy: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    let literacyLabel = '';
    let titleType = '';
    switch (this.props.type){
      case LiteracyTypes.FOUNDATIONAL:{
        literacyLabel = 'Foundational Skills Instruction';
        titleType = 'Foundational';
        break;
      }
      case LiteracyTypes.WRITING: {
        literacyLabel = 'Writing Instruction';
        titleType = 'Writing';
        break;
      }
      case LiteracyTypes.READING: {
        literacyLabel = 'Book Reading Instruction';
        titleType = 'Reading';
        break;
      }
      default:{
        literacyLabel = 'Supporting Language Development'
        titleType = 'Language'
      }
    }
    const literacyData = {
      labels: [
        literacyLabel,
        "No Target Behaviors Observed"
      ],
      datasets: [
        {
          data: [this.props.literacy, this.props.noLiteracy],
          backgroundColor: [Constants.Colors.LI, Constants.Colors.NotPresent],
          hoverBackgroundColor: [Constants.Colors.LI, Constants.Colors.NotPresent]
        }
      ]
    };
    const total = this.props.literacy + this.props.noLiteracy;
    return (
        <Pie
          data={literacyData}
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
              text: "Literacy " + titleType + " Summary",
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

LiteracySummaryChart.contextType = FirebaseContext;
export default LiteracySummaryChart;