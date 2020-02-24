import * as React from 'react';
import * as PropTypes from 'prop-types';
import {HorizontalBar} from 'react-chartjs-2';


interface Props {
  highLevelQuesInsCount: number,
  childResponseInsCount: number,
  lowLevelQuesInsCount: number,
  specificSkillInsCount: number,
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
    highLevelQuesInsCount: PropTypes.number.isRequired,
    childResponseInsCount: PropTypes.number.isRequired,
    lowLevelQuesInsCount: PropTypes.number.isRequired,
    specificSkillInsCount: PropTypes.number.isRequired,
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const instructionData = {
      labels: [
        "Ask High-Level Question",
        "Follow-up on Children’s Responses",
        "Ask Low-LevelQuestion", 
        "Teach Specific Skills",
      ],
      datasets: [{
        data: [this.props.highLevelQuesInsCount, this.props.lowLevelQuesInsCount, this.props.childResponseInsCount, this.props.specificSkillInsCount],
        backgroundColor: ["#0988ec", "#84C3F5", "#f37b6b", "#ec2409"],
        hoverBackgroundColor: ["#0988ec", "#84C3F5", "#f37b6b", "#ec2409"],
      }]
    };
    return(
      <HorizontalBar
        data={instructionData}
        options={{
          scales: {
            xAxes: [
              {
                ticks: {
                  min: 0,
                  max: (Math.max(this.props.specificSkillInsCount, this.props.childResponseInsCount, this.props.lowLevelQuesInsCount, this.props.highLevelQuesInsCount) > 20) ?
                    Math.max(this.props.specificSkillInsCount, this.props.childResponseInsCount, this.props.lowLevelQuesInsCount, this.props.highLevelQuesInsCount) : 
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