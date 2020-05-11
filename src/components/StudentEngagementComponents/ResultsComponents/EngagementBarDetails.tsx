import * as React from "react";
import * as PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import * as Constants from "../../../constants";


interface Props {
  offTaskDetailSplit: Array<number>,
  mildlyEngagedDetailSplit: Array<number>,
  engagedDetailSplit: Array<number>,
  highlyEngagedDetailSplit: Array<number>,
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
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const engagementData = {
      labels: [
        ["Off Task"],
        ["Mildly Engaged"],
        ["Engaged"],
        ["Highly Engaged"]
      ],
      datasets: [{
        label: 'small',
        stack: '0',
        data: [this.props.offTaskDetailSplit[0],this.props.mildlyEngagedDetailSplit[0],this.props.engagedDetailSplit[0],this.props.highlyEngagedDetailSplit[0]],
        backgroundColor: "rgba(63,103,126,1)",
        hoverBackgroundColor: "rgba(50,90,100,1)"
      },{
        label: 'whole',
        stack: '1',
        data: [this.props.offTaskDetailSplit[1],this.props.mildlyEngagedDetailSplit[1],this.props.engagedDetailSplit[1],this.props.highlyEngagedDetailSplit[1]],
        backgroundColor: "rgba(163,103,126,1)",
        hoverBackgroundColor: "rgba(140,85,100,1)"
      },{
        label: 'transition',
        stack: '2',
        data: [this.props.offTaskDetailSplit[2],this.props.mildlyEngagedDetailSplit[2],this.props.engagedDetailSplit[2],this.props.highlyEngagedDetailSplit[2]],
        backgroundColor: "rgba(63,203,226,1)",
        hoverBackgroundColor: "rgba(46,185,235,1)"
      }
      ]
    };

    return (
      <Bar
        data={engagementData}
        options={{
          scales: {
            xAxes: [
              {
                stacked: true,
                ticks: {
                  min: 0,
                  // max:
                  //   (Math.max(Math.max(...this.props.offTaskDetailSplit), Math.max(...this.props.mildlyEngagedDetailSplit), Math.max(...this.props.engagedDetailSplit), Math.max(...this.props.highlyEngagedDetailSplit)) > 20) ?
                  //   Math.max(Math.max(...this.props.offTaskDetailSplit), Math.max(...this.props.mildlyEngagedDetailSplit), Math.max(...this.props.engagedDetailSplit), Math.max(...this.props.highlyEngagedDetailSplit))  : 20,
                  fontSize: 16,
                  fontColor: 'black'
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Times Observed',
                  fontSize: 16,
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
          plugins: {
            datalabels: {
              display: 'auto',
              color: 'white',
              font: {
                size: 16,
                weight: 'bold'
              }
            }
          }
        }}
        width={260}
      />
    );
  }
}


export default EngagementBarDetails;