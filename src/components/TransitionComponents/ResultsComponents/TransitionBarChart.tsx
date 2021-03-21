import * as React from 'react';
import * as PropTypes from 'prop-types';
import {HorizontalBar} from 'react-chartjs-2';
import { lightGreen, orange, deepOrange, blue, indigo, red } from '@material-ui/core/colors';

interface Props {
  line: number,
  traveling: number,
  waiting: number,
  routines: number,
  behaviorManagement: number,
  other: number,
  completed?(): void
}

/**
 * specifies data sets and formatting for the transition details bar graph
 * @class TransitionBarChart
 */
class TransitionBarChart extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    line: PropTypes.number.isRequired,
    traveling: PropTypes.number.isRequired,
    waiting: PropTypes.number.isRequired,
    routines: PropTypes.number.isRequired,
    behaviorManagement: PropTypes.number.isRequired,
    other: PropTypes.number.isRequired,
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    const transitionData = {
      labels: [
        "Waiting in Line",
        "Traveling",
        "Children Waiting",
        "Classroom Routines",
        "Behavior Management",
        "Other"
      ],
      /* datasets: [{
        data: [this.props.line, this.props.traveling, this.props.waiting, this.props.routines, this.props.behaviorManagement, this.props.other],
        backgroundColor: [lightGreen[300], orange[400], deepOrange[400], blue[300], red['A200'], indigo['A200']],
        hoverBackgroundColor: [lightGreen[300], orange[400], deepOrange[400], blue[300], red['A200'], indigo['A200']],
      }] */
      datasets: [{
        data: [
          this.props.line/1000/60,
          this.props.traveling/1000/60,
          this.props.waiting/1000/60,
          this.props.routines/1000/60,
          this.props.behaviorManagement/1000/60,
          this.props.other/1000/60],
        backgroundColor: [lightGreen[300], orange[400], deepOrange[400], blue[300], red['A200'], indigo['A200']],
        hoverBackgroundColor: [lightGreen[300], orange[400], deepOrange[400], blue[300], red['A200'], indigo['A200']],
      }]
    };
    return(
      <HorizontalBar
        data={transitionData}
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
                  // max: 100,
                  max: (Math.max(this.props.line/1000/60, this.props.traveling/1000/60, this.props.waiting/1000/60, this.props.routines/1000/60, this.props.behaviorManagement/1000/60, this.props.other/1000/60) > 20) ?
                  Math.max(this.props.line/1000/60, this.props.traveling/1000/60, this.props.waiting/1000/60, this.props.routines/1000/60, this.props.behaviorManagement/1000/60, this.props.other/1000/60) : 
                    20,
                  fontSize: 16,
                  fontFamily: 'Arimo',
                  padding: 0
                },
                scaleLabel: {
                  display: true,
                  labelString: "Time (minutes) in Each Transition Type",
                  fontSize: 18,
                  fontColor: "#000000",
                  fontFamily: 'Arimo',
                  padding: 0,
                  lineHeight: 1
                },
                afterFit: function(scale: { height: number }): void {
                  scale.height = 100 // creates pading between ticks and scaleLabel
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  fontSize: 16,
                  fontFamily: 'Arimo'
                },
                scaleLabel: {
                  display: false,
                  labelString: "Transition Types",
                  fontSize: 18,
                  fontColor: "#000000",
                  fontFamily: 'Arimo'
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
            callbacks: {
              label: function(
                  tooltipItem: {xLabel: number, yLabel: string, label: string, index: number, datasetIndex: number, x: number, y: number},
                  data: {labels: Array<string>, datasets: Array<{backgroundColor: Array<string>, data: Array<number>, hoverBackgroundColor: Array<string>}>}
              ): string {
                console.log('transition bar chart data datasets', data.datasets);
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const currentValue = dataset.data[tooltipItem.index];
                return (Math.floor(currentValue) + 'm ' + Math.round((currentValue % 1) * 60) + 's');
              }
            }
          },
          legend: {
            display: false,
          },
          plugins: {
            datalabels: {
              display: 'auto',
              color: 'black',
              font: {
                size: 14,
                weight: 'bold'
              },
              fontFamily: 'Arimo',
              formatter: function(value: number): string | null {
                if (value > 3.5) {
                  // return value + '%';
                  return (Math.floor(value) + 'm ' + Math.round((value % 1) * 60) + 's');
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

export default TransitionBarChart;