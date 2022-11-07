import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";
import * as Constants from "../../constants/Constants";

// Set array so we can edit the label on top of the Chart based on type
const chartTitleArr = {
  bookReadingAverage: "Book Reading: Total Instruction",
  vocabFocusAverage: "Book Reading: Focuses on Vocabulary",
  languageConnectionsAverage: "Book Reading: Makes Connections",
  childrenSupportAverage: "Book Reading: Support Children's Speaking",
  fairnessDiscussionsAverage: "Book Reading: Facilitate Discussions",
  multimodalInstructionAverage: "Book Reading: Use Multimodal Instruction",
}

// Set the colors for the bars
const barColorChoices = {
  "classroomClimate" : [
    "#0988EC",
    "#094492",
    "#FFA812",
    "#FF7F00",
  ]
}

/**
 * Horizontal Bar Graph for Math Child Behaviors
 * @class EngagementBarDetails
 * @return {void}
 */
class TeacherProfileBarDetails extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      teacherNames: [],
      chartTitle: "",
      barColors: []
    }
  }

  // What to do when the data is recieved
  componentDidUpdate(nextProps) {
    const { data, type } = this.props

    if (nextProps.data !== data || nextProps.type !== type) {

      var teacherNames = [];
      var graphData = [];
      var barColors = this.state.barColors;
      for(var teacherIndex in data)
      {

        // Create Names to display as labels
        var teacher = data[teacherIndex];
        teacherNames.push(teacher.name);


        // Create bar graph data
        var tempAvg = teacher[type];

        // Round the number just in case there are trailing decimals (There were for some reason)
        tempAvg = Math.round((tempAvg + Number.EPSILON) * 100) / 100
        graphData.push(tempAvg);

        // Set random bar colors
        if(barColors.length < graphData.length)
        {
          barColors.push(this.randomRgbColor());
        }
      }

      this.setState({teacherNames: teacherNames, graphData: graphData, chartTitle: chartTitleArr[type], barColors: barColors });
    }
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
      datasets: [
        {
          //data: [this.props.math1, this.props.math2, this.props.math3, this.props.math4],
          data: this.state.graphData,
          backgroundColor: this.state.barColors,
          hoverBackgroundColor: this.state.barColors,

        }
      ]
    };

    return (
      <HorizontalBar
        data={childBehaviorsData}
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
                  max: 100,
                  stepSize: 10,
                  fixedStepSize: 1,
                  fontSize: 16,
                  fontColor: 'black',
                  // Include a percent sign in the ticks
                  callback: function(value, index, values) {
                      return value + '%';
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number Ovserved',
                  fontSize: 16,
                  fontColor: 'black'
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  fontSize: 16,
                  fontColor: 'black',
                }
              }
            ]
          },
          legend: {
            display: false
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
              color: 'white',
              font: {
                size: 14,
                weight: 'bold'
              },
              formatter: function(value: number): number | null {
                if (value > 0) {
                  return value + "%";
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


export default TeacherProfileBarDetails;
