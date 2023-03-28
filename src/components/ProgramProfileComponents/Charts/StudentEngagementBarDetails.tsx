import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar, Bar } from "react-chartjs-2";
import * as Constants from "../../constants/Constants";

import {withStyles} from '@material-ui/core'

// Set array so we can edit the label on top of the Chart based on type
const chartTitleArr = {
  bookReadingAverage: "Book Reading: Total Instruction",
  vocabFocusAverage: "Book Reading: Focuses on Vocabulary",
  languageConnectionsAverage: "Book Reading: Makes Connections",
  childrenSupportAverage: "Book Reading: Support Children's Speaking",
  fairnessDiscussionsAverage: "Book Reading: Facilitate Discussions",
  multimodalInstructionAverage: "Book Reading: Use Multimodal Instruction",
}

const averageLine = {
    width: '80%',
    marginRight: '15px',
    borderBottom: 'dashed 8px rgba(69, 129, 142, 0.6)'
}




/**
 * Horizontal Bar Graph for Math Child Behaviors
 * @class EngagementBarDetails
 * @return {void}
 */
class StudentEngagementBarDetails extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      teacherNames: [],
      chartTitle: "",
      barColors: [],
      averageLineWrapStyle: {
          display:'flex',
          alignItems:'center',
          justifyContent:'flex-start',
          marginBottom: 8,
          height: '20px',
          width: '96%',
          position: 'absolute',
          left: '95px',
          top: '36px',
      },
      dataSets: []
    }
  }

  // What to do when the data is recieved
  componentDidUpdate(nextProps) {
    const { data, type } = this.props

    if (nextProps.data !== data || nextProps.type !== type) {
      this.setData();
    }
  }

  componentDidMount = () => {
    this.setData();
  }

  setData = () => {
    const { data, type } = this.props

    let for_sorting = [];
    var teacherNames = [];
    var graphData = {};


    var dataSets = [
      {
        backgroundColor: [],
        hoverBackgroundColor: [],
        data: [],
        borderColor: [],
        borderWidth: 5,
      }
    ];


    var totalPointsAverage = [];
    for(var teacherIndex in data)
    {

      // Create Names to display as labels
      var teacher = data[teacherIndex];
      // teacherNames.push(teacher.name);

      // We only need the name for the site Average Bar. We'll take care of the data after this loop.
      if(teacher.name === "Program Average" || teacher.name === undefined)
      {
        continue;
      }


      var tempTotalPointsAverage = parseFloat(teacher['totalPointsAverage']);
      for_sorting.push([teacher.name, tempTotalPointsAverage])

      // dataSets[0].backgroundColor.push("#ED7D31");
      // dataSets[0].hoverBackgroundColor.push("#ED7D31");
      // dataSets[0].borderColor.push("rgba(0,0,0,0)");
      // dataSets[0].data.push(tempTotalPointsAverage);

    }

    for_sorting.sort((a,b) => (b[0].charAt(0) < a[0].charAt(0)) ? 1 : ((a[0].charAt(0) < b[0].charAt(0)) ? -1 : 0))
    for (let index = 0; index < for_sorting.length; index++) {
      teacherNames.push(for_sorting[index][0])
      dataSets[0].backgroundColor.push("#ED7D31");
      dataSets[0].hoverBackgroundColor.push("#ED7D31");
      dataSets[0].borderColor.push("rgba(0,0,0,0)");
      dataSets[0].data.push(for_sorting[index][1]);

    }

    teacherNames.push("Program Average")

    // Add the Site Average Bar
    dataSets[0].backgroundColor.push("#FFFFFF");
    dataSets[0].hoverBackgroundColor.push("#FFFFFF");
    dataSets[0].borderColor.push("#E94635");
    dataSets[0].data.push(data.programBar.totalPointsAverage);


    this.setState({teacherNames: teacherNames, dataSets: dataSets, chartTitle: chartTitleArr[type], barColors: this.props.barColors});

  }


  randomRgbColor() {
    return "rgba(" + this.randomInteger(255) + ", " + this.randomInteger(255) + ", " + this.randomInteger(255) + ")";
  }

  randomInteger(max) {
      return Math.floor(Math.random()*(max + 1));
  }


  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    const childBehaviorsData = {
      labels: this.state.teacherNames,
      datasets: this.state.dataSets
    };

    // Adds some space between the legend
    const plugin = {
      beforeInit(chart) {
        // Get reference to the original fit function
        const originalFit = chart.legend.fit;

        // Override the fit function
        chart.legend.fit = function fit() {
          // Call original function and bind scope in order to use `this` correctly inside it
          originalFit.bind(chart.legend)();
          // Change the height as suggested in another answers
          this.height += 30;
        };
      }
    };



    return (
<div style={{padding: '30px 30px 0px 30px', marginTop: '30px', overflowX: 'scroll', maxWidth: '70vw',}}>
        <h2 style={{width: '100%', textAlign: 'center', position: 'absolute', top: '0'}}>Engagement Rating</h2>
        <div className={"realChart line-chart"} style={{height: 500, width: "100%"}}>

          <div style={{height: 415, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'absolute', top: 77, left: '-150px'}}>
            <div style={{flex:1}}>Highly Engaged</div>
            <div style={{flex:1}}>Engaged</div>
            <div style={{flex:1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <div>Mildly Engaged</div>
              <div style={{transform: 'translateY(15px)', textAlign: 'right'}}>Off Task</div>
            </div>
          </div>

          <Bar
            data={childBehaviorsData}
            options={{
              layout: {
                padding: {
                  top: 20
                }
              },
              animation: {
                onComplete: function(): void {
                  isCompleted ? isCompleted() : null
                }
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      display:true,
                      min: 0,
                      max: 3,
                      stepSize: 1,
                      fixedStepSize: 1,
                      fontSize: 16,
                      fontColor: 'black',
                      padding: 20,
                      // Include a percent sign in the ticks
                      callback: (value, index, values) => {
                        return value
                      }
                    },
                    gridLines: {
                      drawBorder: false,
                      drawTicks: false,
                      tickMarkLength: 20,

                    }
                  }
                ],
                xAxes: [
                  {
                    ticks: {
                      display: true,
                      fontSize: 16,
                      fontColor: 'black',
                      callback: (value, index, values) => {
                        return value
                      }
                    },
                    gridLines: {
                      display: false,
                      color: "rgba(0,0,0,0)",
                    },
                    scaleLabel: {
                      display: false,
                      fontSize: 16,
                      fontColor: 'black'
                    },
                  }
                ]
              },
              legend: {
                display: true,
                labels: {
                  filter: function(legendItem, data) {
                        //return !legendItem.text.includes('Site Average')
                  },
                  padding: 20,
                  boxWidth: 12,
                },
                position: 'bottom',
              },
              title: {
                display: this.props.title,
                text: this.state.chartTitle,
                fontSize: 14,
                fontColor: 'black',
                fontFamily: 'Arimo',
                fontStyle: "bold",
              },
              plugins: {
                datalabels: {
                  anchor: 'end',
                  align: 'top',
                  offset: 0,
                  display: 'auto',
                  color: 'black',
                  font: {
                    size: 14,
                    weight: '400'
                  },
                  formatter: function(value: number): number | null {
                    if (value > 0) {
                      return value;
                    } else {
                      return null;
                    }

                  }
                },

              },
              maintainAspectRatio: false,
            }}
            plugins={[plugin]}
          />
        </div>
      </div>
    );
  }
}


export default StudentEngagementBarDetails;
