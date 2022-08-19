import * as React from 'react';
import * as PropTypes from 'prop-types';
import { HorizontalBar } from 'react-chartjs-2';
import * as Constants from '../../../constants/Constants';

interface Props {
  disapprovalBehaviorCount: number,
  redirectionsBehaviorCount: number,
  nonspecificBehaviorCount: number,
  specificBehaviorCount: number,
  completed?(): void,
  title?: boolean
}

/**
 * specifies data sets and formatting for the climate details bar graph
 * @class BehaviorResponsesDetailsChart
 */
class BehaviorResponsesDetailsChart extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    disapprovalBehaviorCount: PropTypes.number.isRequired,
    redirectionsBehaviorCount: PropTypes.number.isRequired,
    nonspecificBehaviorCount: PropTypes.number.isRequired,
    specificBehaviorCount: PropTypes.number.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const climateData = {
      labels: [
        "Specific Approval",
        "General Approval",
        "Redirection", 
        "Disapproval",
      ],
      datasets: [{
        data: [
          this.props.specificBehaviorCount,
          this.props.nonspecificBehaviorCount,
          this.props.redirectionsBehaviorCount,
          this.props.disapprovalBehaviorCount
        ],
        backgroundColor: [
          Constants.ClimateTypeColors.specificApproval,
          Constants.ClimateTypeColors.nonSpecificApproval,
          Constants.ClimateTypeColors.redirection,
          Constants.ClimateTypeColors.disapproval
        ],
        hoverBackgroundColor: [
          Constants.ClimateTypeColors.specificApproval,
          Constants.ClimateTypeColors.nonSpecificApproval,
          Constants.ClimateTypeColors.redirection,
          Constants.ClimateTypeColors.disapproval
        ],
      }]
    };
    const isCompleted = this.props.completed;
    return(
      <HorizontalBar
        data={climateData}
        options={{
          layout: {
            padding: {
              left: -79
            }
          },
          animation: {
            onComplete: function(): void {
              isCompleted ? isCompleted() : null
            }
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  min: 0,
                  max: (Math.max(this.props.disapprovalBehaviorCount, this.props.redirectionsBehaviorCount, this.props.nonspecificBehaviorCount, this.props.specificBehaviorCount) > 20) ?
                    Math.max(this.props.disapprovalBehaviorCount, this.props.redirectionsBehaviorCount, this.props.nonspecificBehaviorCount, this.props.specificBehaviorCount) : 
                      20,
                  fontSize: 16,
                  stepSize: 1
                },
                scaleLabel: {
                  display: true,
                  labelString: "Number Observed",
                  fontSize: 18,
                  fontColor: "#000000",
                },
                afterFit: function(scale: { height: number }): void {
                  scale.height = 100 // creates pading between ticks and scaleLabel
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  fontSize: 16
                },
                scaleLabel: {
                  display: false,
                  labelString: "Behavior Responses",
                  fontSize: 18,
                  fontColor: "#000000"
                },
                afterFit: function(scale: { width: number }): void {
                  scale.width = 260
                },
              }
            ]
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          legend: {
            display: false,
          },
          title: {
            display: this.props.title,
            text: "Details",
            fontSize: 20,
            fontColor: 'black',
            fontFamily: 'Arimo',
            fontStyle: "bold"
          },
          plugins: {
            datalabels: {
              display: 'auto',
              color: 'black',
              font: {
                size: 14,
                weight: 'bold'
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

export default BehaviorResponsesDetailsChart;