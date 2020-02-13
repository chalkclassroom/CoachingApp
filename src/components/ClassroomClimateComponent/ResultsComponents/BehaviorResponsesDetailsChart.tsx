import * as React from 'react';
import * as PropTypes from 'prop-types';
import {HorizontalBar} from 'react-chartjs-2';


interface Props {
  disapprovalBehaviorCount: number,
  redirectionsBehaviorCount: number,
  nonspecificBehaviorCount: number,
  specificBehaviorCount: number,
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
        data: [this.props.specificBehaviorCount, this.props.nonspecificBehaviorCount, this.props.redirectionsBehaviorCount, this.props.disapprovalBehaviorCount],
        backgroundColor: ["#0988ec", "#84C3F5", "#f37b6b", "#ec2409"],
        hoverBackgroundColor: ["#0988ec", "#84C3F5", "#f37b6b", "#ec2409"],
      }]
    };
    return(
      <HorizontalBar
        data={climateData}
        options={{
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
                afterFit: function(scale: { height: number }) {
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
                  display: true,
                  labelString: "Behavior Responses",
                  fontSize: 18,
                  fontColor: "#000000"
                },
                afterFit: function(scale: { width: number }) {
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
            display: true,
            text: "Classroom Climate Details",
            fontSize: 20,
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
              formatter: function(value: number) {
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

export default BehaviorResponsesDetailsChart;