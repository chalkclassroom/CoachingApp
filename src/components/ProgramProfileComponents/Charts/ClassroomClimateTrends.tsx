import * as React from "react";
import * as PropTypes from "prop-types";
import {Bar, Line} from "react-chartjs-2";
import * as Constants from "../../constants/Constants";

import {withStyles} from '@material-ui/core'



/**
 * Vertical Bar Graph for Classroom Climate Trends
 * @class EngagementBarDetails
 * @return {void}
 */
class ClassroomClimateTrends extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      teacherNames: [],
      approvalBarGraphData: [],
      toneLineGraphData: [],
      monthCount: 0,
      maxPercentage: 100, // The highest tick on the chart
      lineGraphData: {},
    }
  }

  // What to do when the data is recieved
  componentDidUpdate(nextProps) {
    const { data, type, selectedTeacher } = this.props

    if (nextProps.data !== data || nextProps.type !== type || nextProps.selectedTeacher !== selectedTeacher) {
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

    /*
      Get the months for the labels
    */
    // The months are stored by the teacher objects. Just get it from the first on
    let monthLabels = Object.values(data)[0].lineChartLabels;
    // Reformat the months to only show the month name. ex(Sep 2023 -> September)
    monthLabels = monthLabels.map(x => {return new Date(x).toLocaleDateString("en-US", {month: 'long'}) })

    /*
      Calculate the totals to use for the site average

      NOTE: We don't want to include teachers with no observations in the averages calculations.
            So we're initializing the siteApprovalValues with an object that will keep a 'count'
              of how many teachers had observations for that month, and the total sum of approval averages

            We don't need to keep track of the disapproval stats because we'll just do 100 - minus the
              approval stats.
    */
    const monthCount = monthLabels.length;

    let siteApprovalValues = new Array(monthCount).fill().map(u => ({approvalTotal: 0, count: 0}));
    let siteToneValues = new Array(monthCount).fill().map(u => ({toneTotal: 0, count: 0}));
    for(var teacherIndex in data)
    {
      let teacher = data[teacherIndex];

      // Add the averages to the site totals
      for(var i=0; i < monthCount; i++)
      {
        let tempApproval = 0;
        let tempTone = 0;

        // If there's no data, just skip
        if(teacher['total'][i] == 0)
        {
          continue;
        }

        tempApproval = teacher['nonspecificapprovalAverage'][i] + teacher['specificapprovalAverage'][i];
        tempTone = teacher['toneAverage'][i];

        siteApprovalValues[i].approvalTotal += tempApproval;
        siteApprovalValues[i].count++;

        // Get total score of tone averages for the month
        if(teacher['toneCount'][i] !== 0)
        {
          siteToneValues[i].toneTotal += tempTone;
          siteToneValues[i].count++;
        }

      }
    }

    // Calculate the site average
    const siteApprovalAverage = siteApprovalValues.map(x => {return x.count > 0 ? Math.round(x.approvalTotal / x.count + Number.EPSILON) : 0 });
    const siteDisapprovalAverage = siteApprovalValues.map(x => {return x.count > 0 ? 100 - Math.round(x.approvalTotal / x.count + Number.EPSILON) : 0 });
    const siteToneAverage = siteToneValues.map(x => {return x.count > 0 ? x.toneTotal / x.count : 0 });



    /*
     * Create dataset with site averages in it for the Approvals Graph
     */
    var approvalDataSets = [
      {
        label: 'Site Average Behavior Approval',
        //data: hlqAverage,
        data: siteApprovalAverage,
        backgroundColor: this.props.selectedTeacher !== "None" ? this.createDiagonalPattern('#5B9BD5') : this.createDiagonalPattern('#2F5597'),
        borderColor: this.props.selectedTeacher !== "None" ? "#5B9BD5" : "#2F5597",
        borderWidth: 3,
        // To press the grouped bars together and seperate from other groups
        categoryPercentage: .5,
        barPercentage: 1.0,
        barThickness: this.props.selectedTeacher !== "None" ? 30 : 50,
        order: 1,
      },
      {
        label: 'Site Average Behavior Disapproval',
        //data: siteAverageLlqAverage,
        data: siteDisapprovalAverage,
        backgroundColor: this.createDiagonalPattern('#ED7D31'),
        borderColor: "#ED7D31",
        borderWidth: 3,
        // To press the grouped bars together and seperate from other groups
        categoryPercentage: .5,
        barPercentage: 1.0,
        barThickness: this.props.selectedTeacher !== "None" ? 30 : 50,

        order: 3,
      },
    ]

    // Add null to the front and back of the data to account for the gaps
    let siteToneData = [null];
    siteToneData = siteToneData.concat(siteToneAverage, [null])
    let toneDataSets = [
      {
        label: 'Site Average',
        borderColor: '#4472C4',
        backgroundColor: 'rgba(255, 99, 132, 0)',
        data: siteToneData,
        borderDash: [10,5],
        tension: 0.0,
        pointStyle: 'dash',
        borderCapStyle: 'round'
      }
    ]


    /*
     * If a teacher is selected, we have to add their average to the dataset
     */
    let teacherApprovalAverages = [];
    let teacherDisapprovalAverages = [];
    if(this.props.selectedTeacher !== "None")
    {
      const selectedTeacher = data[this.props.selectedTeacher];

      // Calculate approval averages
      teacherApprovalAverages = selectedTeacher['nonspecificapprovalAverage'].map(
        function(currentValue, index, arr){
          return currentValue + selectedTeacher['specificapprovalAverage'][index]
        }
      );

      // Calculate disapproval averages (100 - approval averages)
      teacherDisapprovalAverages = teacherApprovalAverages.map(
        function(currentValue, index, arr){
          if(selectedTeacher['total'][index] > 0)
            return 100 - currentValue;
          else
            return 0;
        }
      );

      approvalDataSets.push(
        {
          label: selectedTeacher.name + ' Behavior Approval',
          //data: siteAverageHlqAverage,
          data: teacherApprovalAverages,
          backgroundColor: "#0070C0",
          borderColor: "#5B9BD5",
          borderWidth: 2,
          // To press the grouped bars together and seperate from other groups
          categoryPercentage: .5,
          barPercentage: 1.0,
          barThickness: 30,
          order: 0,
        },


        {
          label: selectedTeacher.name + ' Behavior Disapproval',
          //data: llqAverage,
          data: teacherDisapprovalAverages,
          backgroundColor: "#ED7D31",
          borderColor: "#2F5597",
          borderWidth: 2,
          // To press the grouped bars together and seperate from other groups
          categoryPercentage: .5,
          barPercentage: 1.0,
          barThickness: 30,
          order: 2,
        },
      );

      // Add the Trends data for the teacher
      // Add null to the front and back of the data to account for the gaps
      let toneData = [null];
      toneData = toneData.concat(selectedTeacher.toneAverage, [null])

      toneDataSets.push(
        {
          label: selectedTeacher.name,
          borderColor: '#4472C4',
          backgroundColor: 'rgba(255, 99, 132, 0)',
          data: toneData,
          tension: 0.0,
          pointStyle: 'line'
        }
      )

    }



    /*
     * Find the highest percentage number to show on graph. (10 above highest value)
     */
    // Find the highest number from all the arrays
    let maxArr = [...siteApprovalAverage, ...siteDisapprovalAverage, ...teacherApprovalAverages, ...teacherApprovalAverages]
    let maxValue = Math.max.apply(Math, maxArr);
    // Round to the next highest 10 (add 10 so if the highest is 70, we'll get 80)
    maxValue = Math.floor( (maxValue + 10) / 10) * 10;



    this.setState({
      monthLabels: monthLabels,
      monthCount: monthCount,
      approvalBarGraphData: approvalDataSets,
      toneLineGraphData: toneDataSets,
      maxPercentage: maxValue
    });

  }

  /*
    Function to create background pattern for site average
  */
  createDiagonalPattern(color = 'black') {
    let shape = document.createElement('canvas')
    shape.width = 10
    shape.height = 10
    let c = shape.getContext('2d')
    c.strokeStyle = color
    c.beginPath()

    c.moveTo(0, 10)
    c.lineTo(8, 2)
    c.stroke()
    c.beginPath()
    c.moveTo(8, 2)
    c.lineTo(10, 0)
    c.stroke()

    c.beginPath()
    c.moveTo(0, 5)
    c.lineTo(5, 0)
    c.stroke()

    c.beginPath()
    c.moveTo(5, 10)
    c.lineTo(10, 5)
    c.stroke()

    return c.createPattern(shape, 'repeat')
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
    const approvalBarGraphData = {
      labels: this.state.monthLabels,
      datasets: this.state.approvalBarGraphData
    };

    // Add null values to month to account for gaps in beginning and end of the graph
    let toneMonths = [''];
    toneMonths = toneMonths.concat(this.state.monthLabels, [''])

    let toneLineGraphData = {
      labels: toneMonths,
      //labels: ['', 'happ', 'joy', 'apple', ''],
      datasets: this.state.toneLineGraphData

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

    let graphContainerWidth = this.props.radioValue == "teacherApprovals" ? 300 + this.state.monthCount * 160 : 300 + this.state.monthCount * 60
    let headingFontSize = this.props.radioValue == "teacherApprovals" ? 18 : 26;


    return (
      <div className={"CCChartWrap"} style={{position: 'relative'}}>

        {/* The 'Excitement', 'Positive Interest', etc lables on right side of tone graph */}
        {this.props.radioValue == "teacherTone" ? (
          <div
            style={{
              position: 'absolute',
              left: '-220px',
              width: 200,
              height: 511,
              marginTop: 92,
              display: 'flex',
              flexDirection: 'column',
              paddingRight: 20,

            }}
            className={"toneLabelsSidebar"}
          >
            <div
              style={{flex:1, display:'flex', justifyContent: 'flex-end', alignItems:'center'}}
            >
              Excitement
            </div>
            <div
              style={{flex:1, display:'flex', justifyContent: 'flex-end', alignItems:'center', textAlign: 'right'}}
            >
              Positive<br/>Interest
            </div>
            <div
              style={{flex:1, display:'flex', justifyContent: 'flex-end', alignItems:'center'}}
            >
              Neutral
            </div>
            <div
              style={{flex:1, display:'flex', justifyContent: 'flex-end', alignItems:'center'}}
            >
              Irritation
            </div>
            <div
              style={{flex:1, display:'flex', justifyContent: 'flex-end', alignItems:'center'}}
            >
              Anger
            </div>

          </div>
        ) : null}



        <div style={{
          padding: '30px 30px 0px 30px',
          border: 'solid 2px #eee',
          marginTop: '30px',
          marginBottom: '30px',
          overflowX: 'scroll',
          maxWidth: '70vw',

        }}>
          <h4 style={{width: '100%', textAlign: 'center', marginTop: 0, fontWeight: 400, fontSize: headingFontSize}}>{this.props.radioValue == "teacherApprovals" ? 'Teacher Behaviors' : 'Teacher Tone'}</h4>
          <div className={"realChart"} style={{
            height: 500,
            width: graphContainerWidth, // This is the only way I can think of to get the chart to expand past the width of its container when there are too many months
            minWidth: '100%',
            position: 'relative'
          }}>

            {/*
              Show the Approvals BAR GRAPH
              */}
            {this.props.radioValue == "teacherApprovals" ? (
              <Bar
              data={approvalBarGraphData}
              options={{
                animation: {
                  onComplete: function(): void {
                    isCompleted ? isCompleted() : null
                  }
                },
                global: {
                  responsive: false,
                  maintainAspectRatio: false
               },
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        display:true,
                        min: 0,
                        max: this.state.maxPercentage,
                        stepSize: 10,
                        fixedStepSize: 1,
                        fontSize: 12,
                        fontColor: 'black',
                        padding: 10,
                        // Include a percent sign in the ticks
                        callback: function(value, index, values) {
                            return value + '%';
                        },

                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Percentage of each Behavior Type',
                        fontFamily: 'Arimo',
                        fontSize: 12,
                        fontColor: 'black',
                      },
                      //stacked: true,
                      gridLines: {
                        drawBorder: false,
                        drawTicks: false,
                      }
                    }
                  ],
                  xAxes: [
                    {

                      ticks: {
                        fontSize: 12,
                        fontColor: 'black',
                        callback: (value, index, values) => {
                          return value
                        }
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Month',
                        fontFamily: 'Arimo',
                        fontSize: 12,
                        fontColor: 'black',
                      },
                      //stacked: true,
                      gridLines: {
                        display: false,
                        color: "rgba(0,0,0,0)",
                      }
                    }
                  ]
                },
                legend: {
                  display: true,
                  fontSize: 12,
                  labels: {
                    padding: 20,
                    boxWidth: 12,
                  },
                  position: 'right',
                },
                plugins: {
                  datalabels: {
                    display: false,
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
                maintainAspectRatio: false,

                layout: {
                  padding: {
                    bottom: 50,
                  }
                }
              }}
              plugins={[plugin]}
            />
            ) : null}

            {/*
              Show the Tone LINE GRAPH
            */}
            {this.props.radioValue == "teacherTone" ? (
              <Line
                data={toneLineGraphData}
                options={
                    {
                    maintainAspectRatio: false,
                    showScale: true,
                    pointDot: false,
                    showLines: true,
                    legend: {
                      display: true,
                      position: 'bottom',
                      labels: {
                        usePointStyle: true,
                        pointStyle: 'start',
                        boxWidth: 80,
                        fontSize: 18
                      }
                    },
                    tooltips: {
                      mode: 'index',
                      intersect: false,
                    },
                    hover: {
                      mode: 'nearest',
                      intersect: true,
                    },
                    scales: {

                      xAxes: [
                        {
                          beginAtZero: false,
                          display: true,
                          scaleLabel: {
                            display: false,
                          },
                          ticks: {
                            fontSize: 18,
                            fontColor: 'black',
                            align: 'center',
                          },
                          gridLines: {
                            display: false,
                            color: "rgba(0,0,0,0)",
                          },


                        },
                      ],
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                            min: 1,
                            max: 5,
                            stepSize: 1,
                            callback: function(value: number): string {
                              return value + '.0'
                            },
                            fontSize: 18,
                            padding: 20,
                            fontColor: 'black',

                          },
                          gridLines: {
                            drawBorder: false,
                            drawTicks: false,
                          }
                        },
                      ],
                      grid: {
                        //lineWidth: 5,
                      }
                    },
                    plugins: {
                      datalabels: {
                        display: false,
                      },
                    },
                  }
                }
              />
            ) : null}

          </div>
        </div>
      </div>
    );
  }
}


export default ClassroomClimateTrends;
