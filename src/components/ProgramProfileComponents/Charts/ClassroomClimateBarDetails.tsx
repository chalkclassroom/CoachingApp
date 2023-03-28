import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar, Bar } from "react-chartjs-2";
import * as Constants from "../../constants/Constants";
import { round } from "./../../Shared/Math"

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
class ClassroomClimateBarDetails extends React.Component<Props, {}> {
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

    let for_sorting = [];
    var specificApproval = [];
    var generalApproval = [];
    var redirectionAverage = [];
    var disapprovalAverage = [];
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

      let result = round([
        teacher['specificapprovalAverage'],
        teacher['nonspecificapprovalAverage'],
        teacher['redirectionAverage'],
        teacher['disapprovalAverage']
      ])
      for_sorting.push([teacher.name, result[0], result[1], result[2], result[3]])
      // specificApproval.push(result[0]);
      // generalApproval.push(result[1]);
      // redirectionAverage.push(result[2]);
      // disapprovalAverage.push(result[3]);

      // Create bar graph data
      //var tempAvg = teacher[type];
      //var tempAvg = [specificApproval, generalApproval, redirectionAverage, disapprovalAverage];

      // Round the number just in case there are trailing decimals (There were for some reason)
      //tempAvg = Math.round((tempAvg + Number.EPSILON) * 100) / 100
      //graphData.push(tempAvg);

    }

    for_sorting.sort((a,b) => (b[0].charAt(0) < a[0].charAt(0)) ? 1 : ((a[0].charAt(0) < b[0].charAt(0)) ? -1 : 0))
    for (let index = 0; index < for_sorting.length; index++) {
      teacherNames.push(for_sorting[index][0])
      specificApproval.push(for_sorting[index][1])
      generalApproval.push(for_sorting[index][2])
      redirectionAverage.push(for_sorting[index][3])
      disapprovalAverage.push(for_sorting[index][4])
    }

    teacherNames.push("Program Average")

    // We need to set the site average data
    // NOTE: I couldn't find a way to  modify style of just the 'Site Averages' bar so I'm setting the data to an array of all 0's except the last item in the array will hold the site average data
    var dataSize = Object.keys(data).length;

    let siteResult = round([
      data.programBar.specificapprovalAverage,
      data.programBar.nonspecificapprovalAverage,
      data.programBar.redirectionAverage,
      data.programBar.disapprovalAverage
    ])

    var siteAverageSpecificeApproval = new Array(dataSize).fill(0);
    siteAverageSpecificeApproval[dataSize - 1] = siteResult[0];

    var siteAverageGeneralApproval = new Array(dataSize).fill(0);
    siteAverageGeneralApproval[dataSize - 1] = siteResult[1];

    var siteAverageRedirectionAverage = new Array(dataSize).fill(0);
    siteAverageRedirectionAverage[dataSize - 1] = siteResult[2];

    var siteAverageDisapprovalAverage = new Array(dataSize).fill(0);
    siteAverageDisapprovalAverage[dataSize - 1] = siteResult[3];


    // Use that data to create our dataset
    var dataSets = [
      {
        label: 'Specific Approval',
        data: specificApproval,
        backgroundColor: "#0988EC"
      },
      {
        label: 'General Approval',
        data: generalApproval,
        backgroundColor: "#094492"
      },
      {
        label: 'Redirection',
        data: redirectionAverage,
        backgroundColor: "#FFA812"
      },
      {
        label: 'Disapproval',
        data: disapprovalAverage,
        backgroundColor: "#FF7F00"
      },

      // The total Site Averages
      {
        label: 'Specific Approval Site Average',
        data: siteAverageSpecificeApproval,
        backgroundColor: "#FFF",
        borderColor: "#0988EC",
        borderWidth: 4,
      },
      {
        label: 'General Approval Site Average',
        data: siteAverageGeneralApproval,
        backgroundColor: "#FFF",
        borderColor: "#094492",
        borderWidth: 4,
      },
      {
        label: 'Redirection Site Average',
        data: siteAverageRedirectionAverage,
        backgroundColor: "#FFF",
        borderColor: "#FFA812",
        borderWidth: 4,
      },
      {
        label: 'Disapproval Site Average',
        data: siteAverageDisapprovalAverage,
        backgroundColor: "#FFF",
        borderColor: "#FF7F00",
        borderWidth: 4,
      }
    ]

    /*
     * Set placement for the site average bar
     */
    var siteAverage = 0;
    for(var i = 0; i < graphData.length; i++)
    {
      siteAverage += graphData[i];
    }
    siteAverage = (siteAverage / graphData.length) / 100;

    const chartHeight = 342;
    const chartTopPadding = 36;


    var topPos = (chartTopPadding + chartHeight - (chartHeight * siteAverage));

    var averageLineStyle = {
        display:'flex',
        alignItems:'center',
        justifyContent:'flex-start',
        marginBottom: 8,
        height: '20px',
        width: '105%',
        position: 'absolute',
        left: '95px',
        top: topPos + 'px',
    };


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

    let width = 300 + this.state.teacherNames.length * 160

    return (
      <div style={{padding: '30px 30px 0px 30px', marginTop: '30px', overflowX: 'scroll', maxWidth: '71vw',}}>
        <h2 style={{width: '100%', textAlign: 'center', position: 'absolute', top: '0'}}>Teacher Behaviors</h2>
        <div className={"realChart line-chart"} style={{marginLeft: 40, height: 500, width: width}}>
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
                      display:false,
                      min: 0,
                      max: 100,
                      stepSize: 10,
                      fixedStepSize: 1,
                      fontSize: 16,
                      fontColor: 'black',
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
                      color: "rgba(0,0,0,0)",
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
        <div
          style={{
            width: width,
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            marginBottom: 30,
            transform: 'translateX(40px)',
          }}
        >
          <div style={{ position: 'absolute', left: '-40px' }}>
            <h4>Teacher Tone</h4>
          </div>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {Object.values(this.props.data).map((value, index) => {
              return (
                <div style={{ flex: '1', alignItems: 'center' }}>
                  <h4
                    style={{
                      color: '#094492',
                      textAlign: 'center',
                      fontWeight: '400',
                    }}
                  >
                    {value['toneAverage']}
                  </h4>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}


export default ClassroomClimateBarDetails;
