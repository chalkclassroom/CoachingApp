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
class SequentialActivitiesBarDetails extends React.Component<Props, {}> {
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

    let for_sorting = [];
    var sequentialActivities = [];
    var childNonSequential = [];
    var support = [];
    var noSupport = [];
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

      let result1 = round([teacher['noSupport'], teacher['support']])
      let result2 = round([teacher['noInteraction'], teacher['engaged']])
      for_sorting.push([teacher.name, result1[0], result1[1], result2[0], result2[1]])
      // noSupport.push(result1[0]);
      // support.push(result1[1]);
      // childNonSequential.push(result2[0]);
      // sequentialActivities.push(result2[1]);

    }

    for_sorting.sort((a,b) => (b[0].charAt(0) < a[0].charAt(0)) ? 1 : ((a[0].charAt(0) < b[0].charAt(0)) ? -1 : 0))
    for (let index = 0; index < for_sorting.length; index++) {
      teacherNames.push(for_sorting[index][0])
      noSupport.push(for_sorting[index][1])
      support.push(for_sorting[index][2])
      childNonSequential.push(for_sorting[index][3])
      sequentialActivities.push(for_sorting[index][4])
    }

    teacherNames.push("Program Average")


    // We need to set the site average data
    // NOTE: I couldn't find a way to  modify style of just the 'Site Averages' bar so I'm setting the data to an array of all 0's except the last item in the array will hold the site average data
    var dataSize = Object.keys(data).length;

    let siteResult1 = round([data.programBar.noSupport, data.programBar.support])
    let siteResult2 = round([data.programBar.noInteraction, data.programBar.engaged])


    var siteNoSupportAverage = new Array(dataSize).fill(0);
    siteNoSupportAverage[dataSize - 1] = siteResult1[0];

    var siteSupportAverage = new Array(dataSize).fill(0);
    siteSupportAverage[dataSize - 1] = siteResult1[1];

    var siteChildNonSequentialAverage = new Array(dataSize).fill(0);
    siteChildNonSequentialAverage[dataSize - 1] = siteResult2[0];

    var siteSequentialActivitiesAverage = new Array(dataSize).fill(0);
    siteSequentialActivitiesAverage[dataSize - 1] = siteResult2[1]




    // Use that data to create our dataset
    if (type === "teacherAverage") {
      var dataSets = [
        {
          label: 'Support',
          data: support,
          backgroundColor: "#5B9BD5",
        },
        {
          label: 'No Support',
          data: noSupport,
          backgroundColor: "#FF0000",
        },
        // The total Site Averages
        {
          label: 'Support Average Site Average',
          data: siteSupportAverage,
          backgroundColor: "#FFF",
          borderColor: "#5B9BD5",
          borderWidth: 4,
        },
        {
          label: 'No Support Average Site Average',
          data: siteNoSupportAverage,
          backgroundColor: "#FFF",
          borderColor: "#FF0000",
          borderWidth: 4,
        },
      ]
    } else {
      var dataSets = [
        {
          label: 'Sequential',
          data: sequentialActivities,
          backgroundColor: "#FFCE33",
        },
        {
          label: 'Non Sequential',
          data: childNonSequential,
          backgroundColor: "#E20000",
        },
        // The total Site Averages
        {
          label: 'Sequential Site Average',
          data: siteSequentialActivitiesAverage,
          backgroundColor: "#FFF",
          borderColor: "#FFCE33",
          borderWidth: 4,
        },
        {
          label: 'Non Sequential Site Average',
          data: siteChildNonSequentialAverage,
          backgroundColor: "#FFF",
          borderColor: "#E20000",
          borderWidth: 4,
        },
      ]
    }

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

    let heading = this.props.type == "teacherAverage" ? "Teacher Support for Sequential Activities" : "Child Behaviors"

    let loadLegend = this.props.loadLegend;


    return (
      <div style={{padding: '30px 30px 0px 30px', marginTop: '30px', overflowX: 'scroll', maxHeight: '440px', overflowY: 'hidden', maxWidth: '70vw',}}>
      <h2 style={{width: '100%', textAlign: 'center', position: 'absolute', top: '0'}}>{heading}</h2>
      <div className={"realChart line-chart"} style={{height: 500, width: "100%"}}>
          <Bar
            data={childBehaviorsData}
            options={{
              animation: {
                onComplete: function(chart): void {
                  // Set the chart legend to appear below graph
                  loadLegend(chart);
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


export default SequentialActivitiesBarDetails;
