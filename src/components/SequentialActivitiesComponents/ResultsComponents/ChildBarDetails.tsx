import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";
import * as Constants from "../../../constants/Constants";


interface Props {
  sequential1: number,
  sequential2: number,
  sequential3: number,
  sequential4: number,
  totalVisits: number,
  completed?(): void,
  title?: boolean
}

/**
 * Horizontal Bar Graph for Sequential Child Behaviors
 * @class EngagementBarDetails
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
    sequential4: PropTypes.number.isRequired,
    totalVisits: PropTypes.number.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
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
          backgroundColor: [Constants.Colors.SA, Constants.Colors.SA, Constants.Colors.SA, Constants.Colors.SA],
          hoverBackgroundColor: [Constants.Colors.SA, Constants.Colors.SA, Constants.Colors.SA, Constants.Colors.SA]
        }
      ]
    };

    return (
      <HorizontalBar
        data={childBehaviorsData}
        options={{
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
                  max: this.props.totalVisits,
                  stepSize: 1,
                  fixedStepSize: 1,
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
          title: {
            display: this.props.title,
            text: "Child Details",
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


export default ChildBarDetails;