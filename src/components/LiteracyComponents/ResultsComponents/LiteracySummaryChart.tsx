import * as React from 'react';
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import FirebaseContext from "../../Firebase/FirebaseContext";
import * as Constants from '../../../constants/Constants';

interface Props {
  literacy: number,
  noLiteracy: number,
  type: Constants.LiteracyTypes
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
    type: PropTypes.string.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const literacyData = {
      labels: [
        this.props.type === Constants.LiteracyTypes.FOUNDATIONAL ? "Foundational Skills Instruction" : 
        this.props.type === Constants.LiteracyTypes.WRITING ? "Writing Instruction" :
        "Supporting Language Development",
        "No Target Behaviors Observed"],
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
      <div>
        <Pie
          data={literacyData}
          options={{
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
              display: false,
              text: "Literacy Instruction",
              fontSize: 20,
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
            }
          }}
          width={650}
          height={400}
        />
      </div>
    );
  }
}

LiteracySummaryChart.contextType = FirebaseContext;
export default LiteracySummaryChart;