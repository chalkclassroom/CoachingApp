import * as React from 'react';
import * as PropTypes from 'prop-types';
import {HorizontalBar} from 'react-chartjs-2';
import * as Constants from '../../../constants/Constants';

interface Props {
  literacy1: number,
  literacy2: number,
  literacy3: number,
  literacy4: number,
  literacy5: number,
  literacy6: number,
  literacy7: number,
  literacy8: number,
  literacy9: number,
  literacy10: number,
  who: string
}

/**
 * specifies data sets and formatting for the Literacy Instruction details bar graph
 * @class LiteracyDetailsReadingChart
 */
class LiteracyDetailsReadingChart extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    literacy1: PropTypes.number.isRequired,
    literacy2: PropTypes.number.isRequired,
    literacy3: PropTypes.number.isRequired,
    literacy4: PropTypes.number.isRequired,
    literacy5: PropTypes.number.isRequired,
    literacy6: PropTypes.number.isRequired,
    literacy7: PropTypes.number.isRequired,
    literacy8: PropTypes.number.isRequired,
    literacy9: PropTypes.number.isRequired,
    literacy10: PropTypes.number.isRequired,
    who: PropTypes.string.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const teacherData = {  
      labels: [
        ["Defining and/or discussing vocabulary"],
        ["Discussing concepts related to a text"],
        ["Encouraging children to retell, reenact", "sequence, or summarize"],
        ["Relating the book to children's experiences"],
        ["Making connections to children's language", "and/or cultural backgrounds"],
        ["Asking children open-ended", "questions/prompts"],
        ["Responding to children with follow-up", "questions/comments"],
        ["Encouraging children to listen and", "respond to peers"],
        ["Facilitating discussion of social", 'issues around equity/fairness'],
        ["Using multimodal instruction"]
      ],
      datasets: [{
        data: [
          this.props.literacy1,
          this.props.literacy2,
          this.props.literacy3,
          this.props.literacy4,
          this.props.literacy5,
          this.props.literacy6,
          this.props.literacy7,
          this.props.literacy8,
          this.props.literacy9,
          this.props.literacy10
        ],
        backgroundColor: [
          '#3c78d8',
          '#3c78d8',
          '#3c78d8',
          '#6aa84f',
          '#6aa84f',
          '#f1c232',
          '#f1c232',
          '#f1c232',
          Constants.Colors.LI,
          '#674ea7'
        ],
        hoverBackgroundColor: [
          '#3c78d8',
          '#3c78d8',
          '#3c78d8',
          '#6aa84f',
          '#6aa84f',
          '#f1c232',
          '#f1c232',
          '#f1c232',
          Constants.Colors.LI,
          '#674ea7'
        ]
      }]
    };
    
    return (
      <HorizontalBar
        data={teacherData}
        options={{
          scales: {
            xAxes: [
              {
                ticks: {
                  min: 0,
                  max: (
                    Math.max(
                      this.props.literacy1,
                      this.props.literacy2,
                      this.props.literacy3,
                      this.props.literacy4,
                      this.props.literacy5,
                      this.props.literacy6,
                      this.props.literacy7,
                      this.props.literacy8,
                      this.props.literacy9,
                      this.props.literacy10
                    ) > 20) ?
                    Math.max(
                      this.props.literacy1,
                      this.props.literacy2,
                      this.props.literacy3,
                      this.props.literacy4,
                      this.props.literacy5,
                      this.props.literacy6,
                      this.props.literacy7,
                      this.props.literacy8,
                      this.props.literacy9,
                      this.props.literacy10
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
                  padding: 8,
                  fontColor: 'black',
                  backdropColor: 'blue',
                  font: 'Arimo',
                  /* callback: function(value: string) {
                    return <div style={{fontSize: '34'}}>{value}</div>;
                } */
                },
                scaleLabel: {
                  display: false,
                  labelString: "Literacy",
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
            display: false,
            text: "Literacy Instruction Details",
            fontSize: 20,
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
        height={500}       
      />
    );
  }
}

export default LiteracyDetailsReadingChart;