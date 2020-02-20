import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";
import * as Constants from "../../../constants";


interface Props {
  math1: number,
  math2: number,
  math3: number,
  math4: number
}

/**
 * Horizontal Bar Graph for Math Child Behaviors
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
    math1: PropTypes.number.isRequired,
    math2: PropTypes.number.isRequired,
    math3: PropTypes.number.isRequired,
    math4: PropTypes.number.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const childBehaviorsData = {
      labels: [
        "Counting and Numbers",
        "Shapes and Spatial Reasoning",
        "Patterns",
        "Measurement and Data"
      ],
      datasets: [
        {
          data: [this.props.math1, this.props.math2, this.props.math3, this.props.math4],
          backgroundColor: [Constants.MathColor, Constants.MathColor, Constants.MathColor, Constants.MathColor],
          hoverBackgroundColor: [Constants.MathColor, Constants.MathColor, Constants.MathColor, Constants.MathColor]
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
                    (Math.max(this.props.math1, this.props.math2, this.props.math3, this.props.math4) > 20) ? 
                    Math.max(this.props.math1, this.props.math2, this.props.math3, this.props.math4) : 20,
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