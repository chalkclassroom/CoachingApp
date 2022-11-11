import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";
import * as Constants from "../../constants/Constants";
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
  "transitionTime" : [
    "#AED581",
    "#FFA726",
    "#FF7043",
    "#64B5F6",
    "#FF5252",
    "#536DFE",
  ],
  "classroomClimate" : [
    "#0988EC",
    "#094492",
    "#FFA812",
    "#FF7F00",
  ],
  "mathInstruction" : [
    "#459AEB",
    "#459AEB",
    "#459AEB",
    "#459AEB",
  ],
  "levelOfInstruction" : [
    "#38761D",
    "#38761D",
    "#1155CC",
    "#1155CC",
  ],
  "studentEngagement" : [
    "#E99C2E",
    "#E55529",
    "#FFD300",
    "#BABABA",
  ]
}

// Options for the bar graph labels
const barLabelChoices = {
  "classroomClimate" : [
    "Specific Approval",
    "General Approval",
    "Redirection",
    "Disapproval"
  ],
  "transitionTime" : [
    "Waiting in Line",
    "Traveling",
    "Children Waiting",
    "Classroom Routines",
    "Behavior Management",
    "Other",
  ],
  "mathInstruction" : [
    "Using math vocabulary",
    "Asking questions about math concepts",
    "Demonstrating math concepts",
    "Helping children use math to problem solve",
  ],
  "levelOfInstruction" : [
    "Teacher Asks High-Level Question",
    "Child Answers High-Level Question",
    "Teacher Asks Low-Level Question",
    "Child Answers Low-Level Question",
  ],
  "studentEngagement" : [
    "Small Group",
    "Whole Group",
    "Centers",
    "Transitions",
  ],
}

// This will hold the names of the variables that holds the data from the data props for each observation type
const barDataVariableName = {
  "classroomClimate" : [
    "specificapprovalAverage",
    "nonspecificapprovalAverage",
    "redirectionAverage",
    "disapprovalAverage"
  ],
  "transitionTime" : [
    "lineAverage",
    "travelingAverage",
    "waitingAverage",
    "routinesAverage",
    "behaviorManagementAverage",
    "otherAverage",
  ],
  "mathInstruction" : [
    "mathVocabularyAverage",
    "askingQuestionsAverage",
    "mathConceptsAverage",
    "helpingChildrenAverage",
    "notAtCenterAverage",
    "noSupportAverage",
    "supportAverage",
  ],
  "levelOfInstruction" : [
    "hlq",
    "hlqResponse",
    "llq",
    "llqResponse",
  ],
  "studentEngagement" : [
    "smallGroupAverage",
    "wholeGroupAverage",
    "transitionGroupAverage",
    "centersGroupAverage",
  ],
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
      barColors: [],
      labels: [],
      axisMax: 20,
      axisStepSize: 1,
      axisLabel: "Number Observed",
      graphData: [],
    }
  }

  componentDidMount = () => {

    var graphVariables = barDataVariableName[this.props.observationType];

    var colorChoices = barColorChoices[this.props.observationType];

    var chartData = [];
    var barColors = [];
    for(var i = 0; i < graphVariables.length; i++)
    {
        var variableName = graphVariables[i];

        var tempAvg = this.props.data[this.props.teacherId][variableName];
        tempAvg = Math.round((tempAvg + Number.EPSILON) * 100) / 100
        chartData.push(tempAvg);

        barColors.push(colorChoices[i % colorChoices.length]);
    }

    // Set the x-axis numbers
    var highestNumberInResults = Math.max.apply(null, chartData);
    var axisMax = 20;
    var axisStepSize = 1;
    if(highestNumberInResults > 20)
    {
      axisMax = highestNumberInResults + Math.round(highestNumberInResults * .2);
      axisStepSize = 2;
    }
    if(highestNumberInResults > 50)
    {
      axisStepSize = 5;
    }

    this.setState({axisMax: axisMax, axisStepSize: axisStepSize});

    this.setState({labels: barLabelChoices[this.props.observationType], graphData: chartData, barColors: barColors});


    // Set the x-axis numbers
    var highestNumberInResults = Math.max.apply(null, chartData);
    var axisMax = 20;
    var axisStepSize = 1;
    if(highestNumberInResults > 20)
    {
      axisMax = highestNumberInResults + Math.round(highestNumberInResults * .2);
      axisStepSize = 2;
    }
    if(highestNumberInResults > 50)
    {
      axisStepSize = 5;
    }

    this.setState({axisMax: axisMax, axisStepSize: axisStepSize});

    this.setState({labels: barLabelChoices[this.props.observationType], graphData: chartData, barColors: barColors});

    this.modifyGraphByObservationType();

  }

  // What to do when the data is recieved
  componentDidUpdate(nextProps) {
    const { data, type } = this.props

    if (nextProps.data !== data || nextProps.type !== type) {

      var teacherNames = [];
      var graphData = [];
      var barColors = this.state.barColors;
      /*
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
      */





      //this.setState({teacherNames: teacherNames, graphData: graphData, chartTitle: chartTitleArr[type], barColors: barColors });
    }
  }


  // Different observations will have differents styles for graphs. We need to set those
  modifyGraphByObservationType = () => {
    var axisLabel = "Number Observed";

    if(this.props.observationType === "classroomClimate")
    {
        axisLabel = "Average Number across Observations"
    }

    this.setState({
      axisLabel: axisLabel,
    });
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
      labels: this.state.labels,
      datasets: [
        {
          //data: [this.props.math1, this.props.math2, this.props.math3, this.props.math4],
          data: this.state.graphData,
          backgroundColor: this.state.barColors,
          hoverBackgroundColor: this.state.barColors,
          label: 'shibby',
        },
      ]
    };

    // Get the average percentages for the percentage label at the end of each bar in the graph
    function getPercentages(data){

      var results = [];
      if(data.length > 0)
      {
        var total = 0;
        data.forEach(element => {
          total += element;
        });

        data.forEach(element => {
          var tempPercentage = Math.round(element / total * 100);
          results.push(tempPercentage);
        });
      }
      return results;
    }

    const topLabels = {
      id: 'topLabels',
      afterDatasetsDraw(chart, args, pluginOptions) {
        const { ctx, scales} = chart;

        var x = scales['x-axis-0'];
        var y = scales['y-axis-0'];

        ctx.font = '18px sans-serif';
        ctx.fillStyle = '#000000';
        ctx.textAlign = 'left';

        var percentages = getPercentages(chart.config.data.datasets[0].data);

        chart.config.data.datasets.forEach(function (dataset) {

              if(dataset._meta[0].type === "horizontalBar"){
                  const dataArray = dataset.data;
                  dataset._meta[0].data.forEach(function (bar, index) {
                      ctx.fillText(percentages[index] + '%', bar._view.x + 10, bar._view.y + 5);
                  });
              };
          })

      }
    }

    return (
      <HorizontalBar
        data={childBehaviorsData}
        plugins={[ChartDataLabels, topLabels]}
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
                  max: this.state.axisMax,
                  stepSize: this.state.axisStepSize,
                  fixedStepSize: 1,
                  fontSize: 16,
                  fontColor: 'black',
                  // Include a percent sign in the ticks
                  callback: function(value, index, values) {
                      return value;
                  }
                },
                stacked: false,
                scaleLabel: {
                  display: true,
                  labelString: this.state.axisLabel,
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
                },
                stacked: true,
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
              color: 'black',
              font: {
                size: 14,
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
          },
          maintainAspectRatio: false
        }}
      />
    );
  }
}


export default TeacherProfileBarDetails;
