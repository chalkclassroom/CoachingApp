import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";
import * as Constants from '../../../constants';

interface Props {
  avgRating: number,
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
  };

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const avgEngagementData = {
      datasets: [
        {
          label: "Avg Engagement",
          data: [Math.round((this.props.avgRating + Number.EPSILON) * 100) / 100],
          backgroundColor: [Constants.EngagementColor, Constants.RedGraphColor],
          hoverBackgroundColor: [Constants.EngagementColor, Constants.RedGraphColor]
        }
      ]
    };

    return (
      <HorizontalBar
        data={avgEngagementData}
        width={260}
        height={50}
        options={{
          responsive: true,
          maintainAspectRatio: true,
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
            }]
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
