import * as React from 'react'
import * as PropTypes from 'prop-types'
import { HorizontalBar, Bar } from 'react-chartjs-2'
import * as Constants from '../../constants/Constants'
import html2canvas from 'html2canvas'

import { withStyles } from '@material-ui/core'

// Set array so we can edit the label on top of the Chart based on type
const chartTitleArr = {
  bookReadingAverage: 'Book Reading: Total Instruction',
  vocabFocusAverage: 'Book Reading: Focuses on Vocabulary',
  languageConnectionsAverage: 'Book Reading: Makes Connections',
  childrenSupportAverage: "Book Reading: Support Children's Speaking",
  fairnessDiscussionsAverage: 'Book Reading: Facilitate Discussions',
  multimodalInstructionAverage: 'Book Reading: Use Multimodal Instruction',
}

/**
 * Horizontal Bar Graph for Math Child Behaviors
 * @class EngagementBarDetails
 * @return {void}
 */
class TransitionAverageBarDetails extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props)
    this.state = {
      teacherNames: [],
      chartTitle: '',
      barColors: [],
      averageLineWrapStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 8,
        height: '20px',
        width: '96%',
        position: 'absolute',
        left: '95px',
        top: '36px',
      },
      dataSets: [],
    }
  }

  // What to do when the data is recieved
  componentDidUpdate(nextProps) {
    const { data, type } = this.props

    if (nextProps.data !== data || nextProps.type !== type) {
      this.setData()
    }
  }

  componentDidMount = () => {
    this.setData()
  }

  setData = () => {
    const { data, type } = this.props

    let for_sorting = [];
    var teacherNames = []
    var graphData = {}

    var transitionTimeAverage = []
    var learningActivityAverage = []
    for (var teacherIndex in data) {
      // Create Names to display as labels
      var teacher = data[teacherIndex]
      // teacherNames.push(teacher.name)

      // We only need the name for the site Average Bar. We'll take care of the data after this loop.
      if (teacher.name === 'Site Average' || teacher.name === undefined) {
        continue
      }
      if (teacher.totalTransitionTime === 0) {
        transitionTimeAverage.push(0)
        learningActivityAverage.push(0)
      } else {
        let tempAverage =
          Math.round(
            (teacher['learningActivityAverage'] + Number.EPSILON) * 100
          ) / 100

        let transitionTime = (100 - tempAverage)
        let learningActivity = (tempAverage)

        for_sorting.push([teacher.name, transitionTime, learningActivity])
      }

      // let tempAverage =
      //   Math.round(
      //     (teacher['learningActivityAverage'] + Number.EPSILON) * 100
      //   ) / 100

      // transitionTimeAverage.push(100 - tempAverage)
      // learningActivityAverage.push(tempAverage)
      // console.log(transitionTimeAverage)
      // console.log(learningActivityAverage)

      // Create bar graph data
      //var tempAvg = teacher[type];
      //var tempAvg = [specificApproval, generalApproval, redirectionAverage, disapprovalAverage];

      // Round the number just in case there are trailing decimals (There were for some reason)
      //tempAvg = Math.round((tempAvg + Number.EPSILON) * 100) / 100
      //graphData.push(tempAvg);
    }

    for_sorting.sort((a,b) => (b[0].split(' ')[1].charAt(0) < a[0].split(' ')[1].charAt(0)) ? 1 : ((a[0].split(' ')[1].charAt(0) < b[0].split(' ')[1].charAt(0)) ? -1 : 0))
    for (let index = 0; index < for_sorting.length; index++) {
      teacherNames.push(for_sorting[index][0])
      transitionTimeAverage.push(for_sorting[index][1])
      learningActivityAverage.push(for_sorting[index][2])

    }

    teacherNames.push("Site Average")

    // We need to set the site average data
    // NOTE: I couldn't find a way to  modify style of just the 'Site Averages' bar so I'm setting the data to an array of all 0's except the last item in the array will hold the site average data
    var dataSize = Object.keys(data).length

    var siteAverageTransitionTimeAverage = new Array(dataSize).fill(0)
    siteAverageTransitionTimeAverage[dataSize - 1] =
      Math.round((data.siteBar.transitionTimeAverage + Number.EPSILON) * 100) /
      100

    var siteAverageLearningActivityAverage = new Array(dataSize).fill(0)
    siteAverageLearningActivityAverage[dataSize - 1] =
      Math.round(
        (data.siteBar.learningActivityAverage + Number.EPSILON) * 100
      ) / 100

    // Use that data to create our dataset
    var dataSets = [
      {
        label: 'Transition Time',
        data: transitionTimeAverage,
        backgroundColor: '#fc8c03',
      },
      {
        label: 'Learning Activity',
        data: learningActivityAverage,
        backgroundColor: '#03b1fc',
      },

      // The total Site Averages
      {
        label: 'Transition Time Site Average',
        data: siteAverageTransitionTimeAverage,
        backgroundColor: '#FFF',
        borderColor: '#fc8c03',
        borderWidth: 4,
      },
      {
        label: 'Learning Activity Site Average',
        data: siteAverageLearningActivityAverage,
        backgroundColor: '#FFF',
        borderColor: '#03b1fc',
        borderWidth: 4,
      },
    ]

    this.setState({
      teacherNames: teacherNames,
      dataSets: dataSets,
      chartTitle: chartTitleArr[type],
      barColors: this.props.barColors,
    })
  }

  randomRgbColor() {
    return (
      'rgba(' +
      this.randomInteger(255) +
      ', ' +
      this.randomInteger(255) +
      ', ' +
      this.randomInteger(255) +
      ')'
    )
  }

  randomInteger(max) {
    return Math.floor(Math.random() * (max + 1))
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed
    const childBehaviorsData = {
      labels: this.state.teacherNames,
      datasets: this.state.dataSets,
    }

    // Adds some space between the legend
    const plugin = {
      beforeInit(chart) {
        // Get reference to the original fit function
        const originalFit = chart.legend.fit

        // Override the fit function
        chart.legend.fit = function fit() {
          // Call original function and bind scope in order to use `this` correctly inside it
          originalFit.bind(chart.legend)()
          // Change the height as suggested in another answers
          this.height += 30
        }
      },
    }


    let width = 300 + this.state.teacherNames.length * 160
    let loadLegend = this.props.loadLegend;

    return (
      <div style={{padding: '30px 30px 0px 30px', marginTop: '30px', overflowX: 'scroll', maxHeight: '440px', overflowY: 'hidden', maxWidth: '70vw',}}>
      <h2 style={{width: '100%', textAlign: 'center', position: 'absolute', top: '0'}}>Transition Time</h2>
      <div className={"realChart line-chart"} style={{height: 500, width: width}}>
          <Bar
            data={childBehaviorsData}
            options={{
              animation: {
                onComplete: function(chart): void {
                  // Set the chart legend to appear below graph
                  loadLegend(chart);
                },
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      display: true,
                      min: 0,
                      max: 100,
                      stepSize: 10,
                      fixedStepSize: 1,
                      fontSize: 16,
                      fontColor: 'black',
                      padding: 20,
                      // Include a percent sign in the ticks
                      callback: function(value, index, values) {
                        return value + '%'
                      },
                    },
                    scaleLabel: {
                      display: false,
                      labelString: '',
                      fontSize: 16,
                      fontColor: 'black',
                    },
                    stacked: true,
                    gridLines: {
                      drawBorder: false,
                      drawTicks: false,
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      fontSize: 16,
                      fontColor: 'black',
                      callback: (value, index, values) => {
                        return value
                      },
                    },
                    stacked: true,
                    gridLines: {
                      display: false,
                      color: 'rgba(0,0,0,0)',
                    },
                  },
                ],
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
                fontStyle: 'bold',
              },
              plugins: {
                datalabels: {
                  display: 'auto',
                  color: 'black',
                  font: {
                    size: 14,
                    weight: '400',
                  },
                  formatter: function(value: number): number | null {
                    if (value > 0) {
                      return value + '%'
                    } else {
                      return null
                    }
                  },
                },
              },
              maintainAspectRatio: false,
            }}
            plugins={[plugin]}
          />
        </div>
      </div>
    )
  }
}

export default TransitionAverageBarDetails
