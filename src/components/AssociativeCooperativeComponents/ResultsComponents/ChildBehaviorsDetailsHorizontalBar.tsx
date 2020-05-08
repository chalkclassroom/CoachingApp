import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";
import * as Constants from "../../../constants";


interface Props {
  ac1: number,
  ac2: number,
  ac3: number,
  ac4: number
}

/**
 * Horizontal Bar Graph for Associative&Cooperative Child Behaviors
 * @class ChildBehaviorsDetailsHorizontalBar
 * @return {void}
 */
class ChildBehaviorsDetailsHorizontalBar extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    ac1: PropTypes.number.isRequired,
    ac2: PropTypes.number.isRequired,
    ac3: PropTypes.number.isRequired,
    ac4: PropTypes.number.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const childBehaviorsData = {
      labels: [
        ["Participating in a conversation", "about a shared activity"],
        ["Engaging in an open-ended", "activity without clear", "roles or order"],
        ["Following formal rules of a", "game and/or taking turns"],
        ["Doing an activity together", "that has a predetermined", "sequence"]
      ],
      datasets: [
        {
          data: [this.props.ac1, this.props.ac2, this.props.ac3, this.props.ac4],
          backgroundColor: ["#c5afe7", "#c5afe7", Constants.ACColor, Constants.ACColor],
          hoverBackgroundColor: ["#c5afe7", "#c5afe7", Constants.ACColor, Constants.ACColor]
        }
      ]
    };

    return (
      <HorizontalBar
        data={childBehaviorsData}
        options={{
          scales: {
            xAxes: [
              {
                ticks: {
                  min: 0,
                  max:
                    (Math.max(this.props.ac1, this.props.ac2, this.props.ac3, this.props.ac4) > 20) ? 
                    Math.max(this.props.ac1, this.props.ac2, this.props.ac3, this.props.ac4) : 20,
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
                ticks: {
                  fontSize: 16,
                  fontColor: 'black',
                }
              }
            ]
          },
          legend: {
            display: false
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


export default ChildBehaviorsDetailsHorizontalBar;
