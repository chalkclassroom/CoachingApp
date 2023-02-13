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
class MathInstructionBarDetails extends React.Component<Props, {}> {
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


    var teacherNames = [];
    var graphData = {};


    var noSupportAverage = [];
    var teacherSupportAverage = [];
    var noSupportTotal = 0;
    var teacherSupportTotal = 0;
    let numberOfTeachersWithData = 0;
    for(var teacherIndex in data)
    {

      // Create Names to display as labels
      var teacher = data[teacherIndex];
      teacherNames.push(teacher.name);

      // We only need the name for the site Average Bar. We'll take care of the data after this loop.
      if(teacher.name === "Site Average")
      {
        continue;
      }

      // If we're looking at the teacher graph, get the support data
      if(type == "teacherAverage")
      {
        var tempNoSupport = Math.round((teacher['noSupportAverage'] + Number.EPSILON) * 100) / 100;
        var tempTeacherSupport = 100 - tempNoSupport;
      }
      else
      {
        var tempNoSupport = Math.round((teacher['childOtherAverage'] + Number.EPSILON) * 100) / 100;
        var tempTeacherSupport = 100 - tempNoSupport;
      }

      // Only push this data if there are actually observation done
      if(teacher.totalInstructions > 0)
      {
        noSupportAverage.push(tempNoSupport);
        teacherSupportAverage.push(tempTeacherSupport);
        numberOfTeachersWithData++;
      }
      else
      {
        noSupportAverage.push(0);
        teacherSupportAverage.push(0);
      }

      noSupportTotal += tempNoSupport;
      teacherSupportTotal += tempTeacherSupport;

      // Create bar graph data
      //var tempAvg = teacher[type];
      //var tempAvg = [specificApproval, generalApproval, redirectionAverage, disapprovalAverage];

      // Round the number just in case there are trailing decimals (There were for some reason)
      //tempAvg = Math.round((tempAvg + Number.EPSILON) * 100) / 100
      //graphData.push(tempAvg);

    }

    teacherNames.push("Site Average");


    // We need to set the site average data
    // NOTE: I couldn't find a way to  modify style of just the 'Site Averages' bar so I'm setting the data to an array of all 0's except the last item in the array will hold the site average data
    var dataSize = Object.keys(data).length;

    var siteAverageNoSupport = new Array(dataSize + 1).fill(0);
    //siteAverageHlqAverage[dataSize - 1] = Math.round((data.siteBar.hlqAverage + data.siteBar.hlqResponseAverage + Number.EPSILON) * 100) / 100;
    siteAverageNoSupport[dataSize] = Math.round((noSupportTotal / numberOfTeachersWithData + Number.EPSILON) * 100) / 100;
    siteAverageNoSupport[dataSize] = Math.round(siteAverageNoSupport[dataSize]); // Round isn't working the first time for some reason. Just going to do it again


    var siteAverageTeacherSupport = new Array(dataSize + 1).fill(0);
    //siteAverageTeacherSupport[dataSize] = Math.round((teacherSupportTotal / dataSize + Number.EPSILON) * 100) / 100;;
    siteAverageTeacherSupport[dataSize] = 100 - siteAverageNoSupport[dataSize];

    // Use that data to create our dataset
    var dataSets = [

      {
        label: 'Teacher Support',
        data: teacherSupportAverage,
        backgroundColor: "#5B9BD5",
      },
      {
        label: 'No Support',
        data: noSupportAverage,
        backgroundColor: "#C00000",
      },

      // The total Site Averages
      {
        label: 'Teacher Support Site Average',
        data: siteAverageTeacherSupport,
        backgroundColor: "#FFF",
        borderColor: "#5B9BD5",
        borderWidth: 4,
      },
      {
        label: 'No Support Site Average',
        data: siteAverageNoSupport,
        backgroundColor: "#FFF",
        borderColor: "#C00000",
        borderWidth: 4,
      },

    ]

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
        <h2 style={{width: '100%', textAlign: 'center', position: 'absolute', top: '0'}}>Math Instruction</h2>
        <div className={"realChart"} style={{height: 500, width: 300 + this.state.teacherNames.length *160}}>
          <Bar
            data={childBehaviorsData}
            options={{
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
                      max: 100,
                      stepSize: 10,
                      fixedStepSize: 1,
                      fontSize: 16,
                      fontColor: 'black',
                      padding: 20,
                      // Include a percent sign in the ticks
                      callback: function(value, index, values) {
                          return value + '%';
                      },
                    },
                    scaleLabel: {
                      display: false,
                      labelString: '',
                      fontSize: 16,
                      fontColor: 'black'
                    },
                    stacked: true,
                    gridLines: {
                      drawBorder: false,
                      drawTicks: false,
                    }
                  }
                ],
                xAxes: [
                  {
                    ticks: {
                      fontSize: 16,
                      fontColor: 'black',
                      callback: (value, index, values) => {
                        return value
                      }
                    },
                    stacked: true,
                    gridLines: {
                      display: false,
                      color: "rgba(0,0,0,0)",
                    }
                  }
                ]
              },
              legend: {
                display: true,
                labels: {
                  filter: function(legendItem, data) {
                        return !legendItem.text.includes('Site Average')
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
                fontStyle: "bold"
              },
              plugins: {
                datalabels: {
                  display: 'auto',
                  color: 'black',
                  font: {
                    size: 14,
                    weight: '400'
                  },
                  formatter: function(value: number): number | null {
                    if (value > 0) {
                      return value + "%";
                    } else {
                      return null;
                    }
                  }
                },

              },
              maintainAspectRatio: false
            }}
            plugins={[plugin]}
          />
        </div>
      </div>
    );
  }
}


export default MathInstructionBarDetails;
