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
  literacy10: number
}

/**
 * specifies data sets and formatting for the Literacy Instruction details bar graph
 * @class LiteracyDetailsFoundationalChart
 */
class LiteracyDetailsFoundationalChart extends React.Component<Props, {}> {
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
    literacy10: PropTypes.number.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const literacyData = {  
      labels: [
        ["Focusing on rhyming, alliteration,", "and/or syllables"],
        "Focusing on individual sounds",
        ["Focusing on alphabet", "knowledge and/or word", "identification skills"],
        ["Focusing on letter-sound", "correspondence"],
        "Supporting inventive spelling",
        "Focusing on print concepts",
        "Matching spoken words to print",
        ["Asking open-ended questions", "or prompts"],
        ["Using foundational skills", "for a realistic reading", "and/or writing purpose"],
        "Using multimodal instruction",
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
          '#6aa84f',
          '#6aa84f',
          '#6aa84f',
          '#6aa84f',
          '#6aa84f',
          '#f1c232',
          Constants.Colors.LI,
          '#674ea7'
        ],
        hoverBackgroundColor: [
          '#3c78d8',
          '#3c78d8',
          '#6aa84f',
          '#6aa84f',
          '#6aa84f',
          '#6aa84f',
          '#6aa84f',
          '#f1c232',
          Constants.Colors.LI,
          '#674ea7'
        ]
      }]
    };
    return (
      <HorizontalBar
        data={literacyData}
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
                  padding: 8
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
        height={400}       
      />
    );
  }
}

export default LiteracyDetailsFoundationalChart;