import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";
import * as Constants from '../../../constants/Constants';

interface Props {
  avgRating: number,
  completed?(): void,
  title?: boolean
}

/**
 * Bar Chart for Student Engagement
 * @class AvgBarSummary
 * @return {void}
 */
class AvgBarSummary extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    avgRating: PropTypes.number.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    const avgEngagementData = {
      datasets: [
        {
          label: "Avg Engagement",
          data: [Math.round((this.props.avgRating + Number.EPSILON) * 100) / 100],
          backgroundColor: [Constants.Colors.SE, Constants.Colors.RedGraph],
          hoverBackgroundColor: [Constants.Colors.SE, Constants.Colors.RedGraph]
        }
      ]
    };

    return (
      <HorizontalBar
        data={avgEngagementData}
        options={{
          animation: {
            onComplete: function(): void {
              isCompleted ? isCompleted() : null
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 3,
                stepSize:1,
                callback: function(index:number): string | void {
                  switch(index){
                    case 0: return 'off task';
                      break;
                    case 1: return 'mildly engaged';
                      break;
                    case 2: return 'engaged';
                      break;
                    case 3: return 'highly engaged';
                      break;
                    default:
                      break;
                  }
                }
              }
            }],
            yAxes: [
              {
                ticks: {
                  fontSize: 16,
                  fontColor: 'black',
                }
              }
            ]
          },
          title: {
            display: this.props.title,
            text: "Average Rating",
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
              }
            }
          }
        }}
      />
    );
  }
}

export default AvgBarSummary;
