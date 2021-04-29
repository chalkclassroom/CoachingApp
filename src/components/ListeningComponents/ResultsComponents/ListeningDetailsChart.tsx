import * as React from 'react';
import * as PropTypes from 'prop-types';
import {HorizontalBar} from 'react-chartjs-2';
import * as Constants from '../../../constants/Constants';

interface Props {
  listening1: number,
  listening2: number,
  listening3: number,
  listening4: number,
  listening5: number,
  listening6: number,
  completed?(): void,
  title?: boolean
}

/**
 * specifies data sets and formatting for the Listening to Children details bar graph
 * @class ListeningDetailsChart
 */
class ListeningDetailsChart extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    listening1: PropTypes.number.isRequired,
    listening2: PropTypes.number.isRequired,
    listening3: PropTypes.number.isRequired,
    listening4: PropTypes.number.isRequired,
    listening5: PropTypes.number.isRequired,
    listening6: PropTypes.number.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    const listeningData = {  
      labels: [
        "At eye-level",
        ["Uses positive or", "interested expression", "to encourage child talk"],
        "Repeats or clarifies", 
        "Asks open-ended questions",
        ["Expands on children's", "play or talk"],
        "Encourages peer talk"
      ],
      datasets: [{
        data: [
          this.props.listening1,
          this.props.listening2,
          this.props.listening3,
          this.props.listening4,
          this.props.listening5,
          this.props.listening6
        ],
        backgroundColor: [Constants.Colors.LC, Constants.Colors.LC, Constants.Colors.LC, Constants.Colors.LC, Constants.Colors.LC, Constants.Colors.LC],
        hoverBackgroundColor: [Constants.Colors.LC, Constants.Colors.LC, Constants.Colors.LC, Constants.Colors.LC, Constants.Colors.LC, Constants.Colors.LC]
      }]
    };
    return (
      <HorizontalBar
        data={listeningData}
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
                  max: (
                    Math.max(
                      this.props.listening1,
                      this.props.listening2,
                      this.props.listening3,
                      this.props.listening4,
                      this.props.listening5,
                      this.props.listening6
                    ) > 20) ?
                    Math.max(
                      this.props.listening1,
                      this.props.listening2,
                      this.props.listening3,
                      this.props.listening4,
                      this.props.listening5,
                      this.props.listening6
                    ) : 20,
                  fontSize: 16,
                  stepSize: 1
                },
                scaleLabel: {
                  display: true,
                  labelString: "Number Observed",
                  fontSize: 18,
                  fontColor: "#000000",
                },
                afterFit: function(scale: { height: number }): void {
                  scale.height = 100 // creates padding between ticks and scaleLabel
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  fontSize: 12,
                  padding: 8
                },
                scaleLabel: {
                  display: false,
                  labelString: "Listening",
                  fontSize: 18,
                  fontColor: "#000000"
                },
                afterFit: function(scale: { width: number }): void {
                  scale.width = 260
                },
              }
            ]
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          legend: {
            display: false,
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
              color: 'black',
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

export default ListeningDetailsChart;