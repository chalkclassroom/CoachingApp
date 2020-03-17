import * as React from 'react';
import * as PropTypes from 'prop-types';
import {HorizontalBar} from 'react-chartjs-2';
import * as Constants from '../../../constants';

interface Props {
  listening1: number,
  listening2: number,
  listening3: number,
  listening4: number,
  listening5: number,
  listening6: number
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
    listening6: PropTypes.number.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const listeningData = {  
      labels: [
        "At eye-level with children",
        ["Looks expectantly at children","and shows warmth to", "encourage child talk"],
        ["Repeats or clarifies", "children's comments"], 
        ["Asks open-ended questions", "to encourage conversation"],
        ["Expands on children's", "play or talk using", "questions or comments"],
        ["Encourages children to", "talk to peers"]
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
        backgroundColor: [Constants.ListeningColor, Constants.ListeningColor, Constants.ListeningColor, Constants.ListeningColor, Constants.ListeningColor, Constants.ListeningColor],
        hoverBackgroundColor: [Constants.ListeningColor, Constants.ListeningColor, Constants.ListeningColor, Constants.ListeningColor, Constants.ListeningColor, Constants.ListeningColor]
      }]
    };
    return (
      <HorizontalBar
        data={listeningData}
        options={{
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
                afterFit: function(scale: { height: number }) {
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
                  display: true,
                  labelString: "Listening",
                  fontSize: 18,
                  fontColor: "#000000"
                },
                afterFit: function(scale: { width: number }) {
                  scale.width = 260
                },
              }
            ]
          },
          tooltips: {
            mode: 'index',
            intersect: false,
            ypadding: '0.5em'
          },
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "Listening to Children Details",
            fontSize: 20,
            fontStyle: "bold"
          },
          plugins: {
            datalabels: {
              display: 'auto',
              color: 'black',
              font: {
                size: 14,
                weight: 'bold'
              },
              formatter: function(value: number) {
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