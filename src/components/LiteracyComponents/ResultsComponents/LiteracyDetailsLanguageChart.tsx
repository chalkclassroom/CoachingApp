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
  completed?(): void,
  title?: boolean
}

/**
 * specifies data sets and formatting for the Literacy Instruction details bar graph
 * @class LiteracyDetailsLanguageChart
 */
class LiteracyDetailsLanguageChart extends React.Component<Props, {}> {
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
        ["Discussing advanced", "vocabulary and concepts"],
        ["Having a conversation with", "children about a", "social-emotional topic"],
        ["Encouraging children to", "tell stories from", "experiences in their lives"],
        ["Encouraging children to", "listen and respond", "to peers"],
        ["Asking open-ended", "questions"],
        ["Observing or using questions", "to enter children's", "ongoing activity"],
        ["Repeating or clarifying", "children's comments"],
        ["Responding to children", "with follow-up", "questions/comments"]
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
          '#3c78d8',
          '#3c78d8',
          '#6aa84f',
          '#6aa84f',
          '#6aa84f',
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI
        ],
        hoverBackgroundColor: [
          '#3c78d8',
          '#3c78d8',
          '#6aa84f',
          '#6aa84f',
          '#6aa84f',
          Constants.Colors.LI,
          Constants.Colors.LI,
          Constants.Colors.LI
        ]
      }]
    };
    
    return (
      <HorizontalBar
        data={teacherData}
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
                // afterFit: function(scale: { height: number }): void {
                //   scale.height = 100 // creates padding between ticks and scaleLabel
                // }
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
                },
                scaleLabel: {
                  display: false,
                  labelString: "Literacy",
                  fontSize: 18,
                  fontColor: "#000000"
                },
                // afterFit: function(scale: { width: number }): void {
                //   scale.width = 260
                // },
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
            text: "Literacy Language Environment Details",
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
          },
          maintainAspectRatio: false
        }}    
      />
    );
  }
}

export default LiteracyDetailsLanguageChart;