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
class LevelOfInstructionBarDetails extends React.Component<Props, {}> {
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


    var hlqAverage = [];
    var llqAverage = [];
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


      hlqAverage.push(Math.round((teacher['hlqAverage'] + teacher['hlqResponseAverage'] + Number.EPSILON) * 100) / 100);
      llqAverage.push(Math.round((teacher['llqAverage'] + teacher['llqResponseAverage'] + Number.EPSILON) * 100) / 100);

      // Create bar graph data
      //var tempAvg = teacher[type];
      //var tempAvg = [specificApproval, generalApproval, redirectionAverage, disapprovalAverage];

      // Round the number just in case there are trailing decimals (There were for some reason)
      //tempAvg = Math.round((tempAvg + Number.EPSILON) * 100) / 100
      //graphData.push(tempAvg);

    }


    // We need to set the site average data
    // NOTE: I couldn't find a way to  modify style of just the 'Site Averages' bar so I'm setting the data to an array of all 0's except the last item in the array will hold the site average data
    var dataSize = Object.keys(data).length;

    var siteAverageHlqAverage = new Array(dataSize).fill(0);
    siteAverageHlqAverage[dataSize - 1] = Math.round((data.siteBar.hlqAverage + data.siteBar.hlqResponseAverage + Number.EPSILON) * 100) / 100;

    var siteAverageLlqAverage = new Array(dataSize).fill(0);
    siteAverageLlqAverage[dataSize - 1] = Math.round((data.siteBar.llqAverage + data.siteBar.llqResponseAverage + Number.EPSILON) * 100) / 100;


    // Use that data to create our dataset
    var dataSets = [
      {
        label: 'High Level Instruction',
        data: hlqAverage,
        backgroundColor: "#38761D",
      },
      {
        label: 'Low Level Instruction',
        data: llqAverage,
        backgroundColor: "#1155CC",
      },

      // The total Site Averages
      {
        label: 'High Level Instruction Site Average',
        data: siteAverageHlqAverage,
        backgroundColor: "#FFF",
        borderColor: "#38761D",
        borderWidth: 4,
      },
      {
        label: 'Low Level Instruction Site Average',
        data: siteAverageLlqAverage,
        backgroundColor: "#FFF",
        borderColor: "#1155CC",
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
      <div style={{padding: '30px 30px 0px 30px'}}>
        <h2 style={{width: '100%', textAlign: 'center', marginTop: 0}}>Level of Instruction</h2>
        <div className={"realChart"} style={{height: 500}}>
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


export default LevelOfInstructionBarDetails;