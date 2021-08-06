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
  literacy8: number
  who: string,
  completed?(): void
  title?: boolean
}

/**
 * specifies data sets and formatting for the Literacy Instruction details bar graph
 * @class LiteracyDetailsWritingChart
 */
class LiteracyDetailsWritingChart extends React.Component<Props, {}> {
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
    who: PropTypes.string.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    const teacherData = {  
      labels: [
        ["Talks to children about the content", "or meaning of the writing/drawing"],
        ["Writes a meaningful message", "in front of children"],
        ["Demonstrates and talks about", "print processes"],
        ["Invites children to write", "part of a message"],
        ["Invites children to write", "their name"],
        ["Responds positively to all", "writing forms"],
        ["Supports children's", "inventive spelling"],
        ["Invites children to read", "the message"]
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
          this.props.literacy8
        ],
        backgroundColor: [
          '#45818e',
          '#45818e',
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI
        ],
        hoverBackgroundColor: [
          '#45818e',
          '#45818e',
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI
        ]
      }]
    };
    const childData = {
      labels: [
        ["Talks about the content", "or meaning of the writing/drawing"],
        ["Draws to communicate", "meaning"],
        ["Makes writing forms"],
        ["Says aloud the message", "to be written"],
        ["Writes one or more letters", "in their name"],
        ["Uses knowledge of the", "alphabet and/or letter-sound", "correspondence"],
        ["Invents spellings or", "generates conventional spellings"],
        ["“Reads” the message"]
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
          this.props.literacy8
        ],
        backgroundColor: [
          '#45818e',
          '#45818e',
          '#45818e',
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI
        ],
        hoverBackgroundColor: [
          '#45818e',
          '#45818e',
          '#45818e',
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI
        ]
      }]
    };
    return (
      <HorizontalBar
        data={this.props.who === 'Teacher' ? teacherData : childData}
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
                      this.props.literacy1,
                      this.props.literacy2,
                      this.props.literacy3,
                      this.props.literacy4,
                      this.props.literacy5,
                      this.props.literacy6,
                      this.props.literacy7,
                      this.props.literacy8
                    ) > 20) ?
                    Math.max(
                      this.props.literacy1,
                      this.props.literacy2,
                      this.props.literacy3,
                      this.props.literacy4,
                      this.props.literacy5,
                      this.props.literacy6,
                      this.props.literacy7,
                      this.props.literacy8
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
                  fontColor: 'black'
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
            display: this.props.title,
            text: "Literacy Writing Details",
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

export default LiteracyDetailsWritingChart;