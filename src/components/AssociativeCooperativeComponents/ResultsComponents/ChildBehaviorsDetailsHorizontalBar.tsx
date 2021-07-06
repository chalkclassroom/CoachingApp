import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";
import * as Constants from "../../../constants/Constants";


interface Props {
  ac1: number,
  ac2: number,
  ac3: number,
  ac4: number,
  totalVisits: number,
  completed?(): void,
  title?: boolean
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
    ac4: PropTypes.number.isRequired,
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
        ["Doing an activity together", "that does not have a", "predetermined sequence"],
        ["Playing a game together", "with formal rules"],
        ["Doing an activity together", "that has a predetermined", "sequence"]
      ],
      datasets: [
        {
          data: [this.props.ac1 + this.props.ac2, this.props.ac3, this.props.ac4],
          backgroundColor: ["#c5afe7", Constants.Colors.AC, Constants.Colors.AC],
          hoverBackgroundColor: ["#c5afe7", Constants.Colors.AC, Constants.Colors.AC]
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


export default ChildBehaviorsDetailsHorizontalBar;
