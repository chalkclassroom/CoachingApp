import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";
import * as Constants from "../../../constants";


interface Props {
  sequential1: number,
  sequential2: number,
  sequential3: number,
  sequential4: number
}

/**
 * Horizontal Bar Graph for Sequential Child Behaviors
 * @class ChildBarDetails
 * @return {void}
 */
class ChildBarDetails extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    sequential1: PropTypes.number.isRequired,
    sequential2: PropTypes.number.isRequired,
    sequential3: PropTypes.number.isRequired,
    sequential4: PropTypes.number.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const childBehaviorsData = {
      labels: [
        ["Using materials in a step-by-step", "predictable way"],
        ["Drawing recognizable images or", "writing names or messages", "(letters or letter-like forms)"],
        ["Playing a game with set rules", "and/or taking turns"],
        ["Speaking or acting according to", "a pretend scenario that", "follows a predictable plot"]
      ],
      datasets: [
        {
          data: [this.props.sequential1, this.props.sequential2, this.props.sequential3, this.props.sequential4],
          backgroundColor: [Constants.SequentialColor, Constants.SequentialColor, Constants.SequentialColor, Constants.SequentialColor],
          hoverBackgroundColor: [Constants.SequentialColor, Constants.SequentialColor, Constants.SequentialColor, Constants.SequentialColor]
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
                    (Math.max(this.props.sequential1, this.props.sequential2, this.props.sequential3, this.props.sequential4) > 20) ? 
                    Math.max(this.props.sequential1, this.props.sequential2, this.props.sequential3, this.props.sequential4) : 20,
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


export default ChildBarDetails;