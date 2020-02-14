import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";

interface Props {
  teacher1: number,
  teacher2: number,
  teacher3: number,
  teacher4: number
}

/**
 * Horizontal Bar Chart for Associative&Cooperative Teacher Behaviors
 * @class TeacherBarDetails
 * @return {void}
 */
class TeacherBarDetails extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    teacher1: PropTypes.number.isRequired,
    teacher2: PropTypes.number.isRequired,
    teacher3: PropTypes.number.isRequired,
    teacher4: PropTypes.number.isRequired
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const teacherBehaviorsData = {
      labels: [
        ["Helping children do sequential", "activities with manipulatives or toys"],
        ["Supporting children as they draw", "images or write messages"],
        ["Demonstrating the steps to an", "activity or game"],
        ["Supporting children as they act out", "a dramatic play scenario or book"],
      ],
      datasets: [
        {
          data: [this.props.teacher1, this.props.teacher2, this.props.teacher3, this.props.teacher4],
          backgroundColor: ["#459aeb", "#459aeb", "#459aeb", "#459aeb"],
          hoverBackgroundColor: ["#459aeb", "#459aeb", "#459aeb", "#459aeb"]
        }
      ]
    };

    return (
      <HorizontalBar
        data={teacherBehaviorsData}
        options={{
          scales: {
            xAxes: [
              {
                ticks: {
                  min: 0,
                  max: 
                    (Math.max(this.props.teacher1, this.props.teacher2, this.props.teacher3, this.props.teacher4) > 20) ? 
                    Math.max(this.props.teacher1, this.props.teacher2, this.props.teacher3, this.props.teacher4) : 20,
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

export default TeacherBarDetails;