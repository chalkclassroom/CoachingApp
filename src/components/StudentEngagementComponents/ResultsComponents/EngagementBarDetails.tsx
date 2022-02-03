import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";
import * as Constants from "../../../constants/Constants";


interface Props {
  offTaskDetailSplit: Array<number>,
  mildlyEngagedDetailSplit: Array<number>,
  engagedDetailSplit: Array<number>,
  highlyEngagedDetailSplit: Array<number>,
  completed?(): void,
  title?: boolean
}

/**
 * Horizontal Bar Graph for Sequential Child Behaviors
 * @class EngagementBarDetails
 * @return {void}
 */
class EngagementBarDetails extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    offTaskDetailSplit: PropTypes.array.isRequired,
    mildlyEngagedDetailSplit: PropTypes.array.isRequired,
    engagedDetailSplit: PropTypes.array.isRequired,
    highlyEngagedDetailSplit: PropTypes.array.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    const engagementData = {
      labels: [
        ["Off Task"],
        ["Mildly Engaged"],
        ["Engaged"],
        ["Highly Engaged"]
      ],
      datasets: [{
        label: 'Small Group',
        stack: '0',
        data: [this.props.offTaskDetailSplit[0],this.props.mildlyEngagedDetailSplit[0],this.props.engagedDetailSplit[0],this.props.highlyEngagedDetailSplit[0]],
        backgroundColor: Constants.Colors.SE,
        hoverBackgroundColor:  Constants.Colors.SE
      },{
        label: 'Whole Group',
        stack: '0',
        data: [this.props.offTaskDetailSplit[1],this.props.mildlyEngagedDetailSplit[1],this.props.engagedDetailSplit[1],this.props.highlyEngagedDetailSplit[1]],
        backgroundColor:  Constants.Colors.TT,
        hoverBackgroundColor:  Constants.Colors.TT
      },{
        label: 'Centers',
        stack: '0',
        data: [this.props.offTaskDetailSplit[3],this.props.mildlyEngagedDetailSplit[3],this.props.engagedDetailSplit[3],this.props.highlyEngagedDetailSplit[3]],
        backgroundColor:  Constants.Colors.SA,
        hoverBackgroundColor:  Constants.Colors.SA
      },{
        label: 'Transition',
        stack: '0',
        data: [this.props.offTaskDetailSplit[2],this.props.mildlyEngagedDetailSplit[2],this.props.engagedDetailSplit[2],this.props.highlyEngagedDetailSplit[2]],
        backgroundColor:  Constants.Colors.NotPresent,
        hoverBackgroundColor: Constants.Colors.NotPresent,
      }
      ]
    };

    return (
      <HorizontalBar
        data={engagementData}
        options={{
          animation: {
            onComplete: function(): void {
              isCompleted ? isCompleted() : null
            }
          },
          scales: {
            xAxes: [
              {
                stacked: true,
                ticks: {
                  stepSize: 5,
                  min: 0,
                  max:
                    (Math.max(
                      this.props.offTaskDetailSplit.reduce((a, b) => a + b, 0),
                      this.props.mildlyEngagedDetailSplit.reduce((a, b) => a + b, 0),
                      this.props.engagedDetailSplit.reduce((a, b) => a + b, 0),
                      this.props.highlyEngagedDetailSplit.reduce((a, b) => a + b, 0)
                    ) > 20) ?
                    Math.max(
                      this.props.offTaskDetailSplit.reduce((a, b) => a + b, 0),
                      this.props.mildlyEngagedDetailSplit.reduce((a, b) => a + b, 0),
                      this.props.engagedDetailSplit.reduce((a, b) => a + b, 0),
                      this.props.highlyEngagedDetailSplit.reduce((a, b) => a + b, 0)
                    ) : 20,
                  fontSize: 16,
                  fontColor: 'black'
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number Observed',
                  fontSize: 18,
                  fontFamily: 'Arimo',
                  fontColor: 'black'
                }
              }
            ],
            yAxes: [
              {
                stacked: true,
                ticks: {
                  fontSize: 16,
                  fontColor: 'black',
                }
              }
            ]
          },
          legend: {
            display: true
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
              color: 'white',
              font: {
                size: 16,
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
          }
        }}
        width={650}
        height={400}
      />
    );
  }
}


export default EngagementBarDetails;