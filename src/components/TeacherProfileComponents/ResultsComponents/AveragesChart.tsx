import * as React from 'react';
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import FirebaseContext from "../../Firebase/FirebaseContext";

interface Props {
  lowLevel: number,
  highLevel: number,
  completed?(): void,
  title?: boolean
}


// Array used to match the name of a practice type to the labels
const labelsArr = {
  "line": ["Time Waiting in Line", "Not Waiting in Line"],
  "traveling": ["Time Traveling", "Not Traveling"],
  "waiting": ["Time Child Waiting", "Not Child Waiting"],
  "routines": ["Routines", "No Routines"],
  "behaviorManagement": ["Time Behavior Management", "No Behavior Management"],
  "other": ["Time for Other Activities", "No Other Activities"],

  "disapproval": ["Disapproval", "Not Disapproval"],
  "redirection": ["Redirection", "Not Redirection"],
  "specificapproval": ["Specific Approval", "Not Specific Approval"],
  "nonspecificapproval": ["General Approval", "Not General Approval"],

  "mathVocabulary": ["Using Math Vocabulary", "Not Using Math Vocabulary"],
  "askingQuestions": ["Asking Questions", "Not Asking Questions"],
  "mathConcepts": ["Demonstrating Math Concepts", "Not Demonstrating Math Concepts"],
  "helpingChildren": ["Helping Children", "Not Helping Children"],
  "notAtCenter": ["Teacher Not at Center", "Teacher at Center"],
  "noSupport": ["Teacher Present, No Support", "Support"],
  "support": ["Teacher Support", "No Teacher Support"],

  "hlq": ["Teacher Asks High-Level Question", "Other"],
  "hlqResponse": ["Child Answers High-Level Question", "Other"],
  "llq": ["Teacher Asks High-Level Question", "Other"],
  "llqResponse": ["Child Answers Low-Level Question", "Other"],

  "offTask": ["Off Task", "Other"],
  "mildlyEngaged": ["Mildly Engaged", "Other"],
  "engaged": ["Engaged", "Other"],
  "highlyEngaged": ["Highly Engaged", "Other"],

  "eyeLevel": ["At Eye Level", "Other"],
  "positiveExpression": ["Uses positive expression", "Other"],
  "repeats": ["Repeats or clarifies", "Other"],
  "openEndedQuestions": ["Asks open-ended questions", "Other"],
  "extendsPlay": ["Expands on children's play or talk", "Other"],
  "encouragesPeerTalk": ["Encourages peer talk", "Other"],
  "encouraging": ["Listening/Encouraging", "Other"],
  "noBehaviors": ["No Target Behaviors Observed", "Other"],

  "sequentialActivities": ["Helping children do sequential activities", "Other"],
  "drawImages": ["Supporting children as they draw", "Other"],
  "demonstrateSteps": ["Demonstrating the steps to an activity or game", "Other"],
  "actOut": ["Supporting children as they act", "Other"],


  "foundationalSkills": ["Literacy Instruction - Total Instruction", "No Target Behaviors Observed"],
  "phonological": ["Phonological awareness or the sounds of language", "Other"],
  "alphabetic": ["The alphabetic principle and print concepts", "Other"],
  "openEndedQuestions": ["Open-ended questions or prompts", "Other"],
  "realisticReading": ["Realistic reading and writing", "Other"],



  "writingSkills": ["Writing Instruction", "No Writing Instructions Observed"],
  "meaning": ["Has content or meaning", "Other"],
  "printProcesses": ["Print processes", "Other"],


  "bookReading": ["Book Reading Instruction", "No Target Behaviors Observed"],
  "vocabFocus": ["Focus on Vocabulary", "No Vocabulary Behaviors Observed"],
  "languageConnections": ["Make Connections to Children.", "No Connection Behaviors Observed"],
  "childrenSupport": ["Support Children's Speaking and Listening Skills", "No Support Behaviors Observed"],
  "fairnessDiscussions": ["Facilitates Discussions", "No Discussions Behaviors Observed"],
  "multimodalInstruction": ["Use Multimodal Instruction", "No Multimodal Behaviors Observed"],


  "languageEnvironment": ["Language Environment Instruction", "No Target Behaviors Observed"],
  "talk": ["Talk with children about vocabulary", "Other"],
  "encourageChildren": ["Encourage children to talk", "Other"],
  "respondChildren": ["Respond to children.", "Other"],


  "childrensPlay": ["Participating in children's play", "Other"],
  "encouragingChildren": ["Encouraging children to share", "Other"],
  "encourageChildren": ["Encourage children to talk", "Other"],
  "respondChildren": ["Respond to children.", "Other"],
}


/**
 * @class AveragesPieChart
 */
class AveragesPieChart extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    this.state= {
      dataValues: [0,0],
      labels: ["", ""],
      chartTitle: "",
    }
  }


  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data || prevProps.type !== this.props.type ) {

      this.setData();
    }
  }

  componentDidMount(): void {
    this.setData();
  }


  setData = () => {

    // Make sure the data is there
    if( !(this.props.data) || Object.keys(this.props.data).length <= 0 || !(this.props.teacherId) || this.props.teacherId == "" || !(this.props.type) || this.props.type == "" )
    {
      return;
    }


    // Get the values for the chart
    var firstValue = Math.round(this.props.data[this.props.teacherId][this.props.type]);

    // Need to check if we should be using total interval, total instruction, or total
    var secondValue;



    if(this.props.data[this.props.teacherId]["totalIntervals"])
    {
      secondValue = this.props.data[this.props.teacherId]["totalIntervals"] - firstValue;
    }
    else if(this.props.data[this.props.teacherId]["totalInstructions"])
    {
      secondValue = this.props.data[this.props.teacherId]["totalInstructions"] - firstValue;
    }
    else
    {
      secondValue = this.props.data[this.props.teacherId]["total"] - firstValue;
    }

    const teacherData = this.props.data[this.props.teacherId]

    // Round all the numbers in the data object just in case
    for(var propertyName in teacherData){
      if(typeof teacherData[propertyName] === 'number'){
          teacherData[propertyName] = Math.round(teacherData[propertyName]);
      }
    }

    // Determine what values to put in the graph based on observation type
    let dataValues;
    let chartTitle;
    // Set the default values of the charts' colors and labels (based on how it was set when this component was originally created)
    let pieChartColors = ["#C4395A","#BABABA"];
    let labels = labelsArr[this.props.type];


    switch(this.props.observationType) {
      default:
        dataValues = [firstValue, secondValue];
        break;
      case "transitionTime":
        dataValues = [teacherData.lineAverage, teacherData.travelingAverage, teacherData.waitingAverage, teacherData.routinesAverage, teacherData.behaviorManagementAverage, teacherData.otherAverage];
        chartTitle = "Transition Types";
        pieChartColors = ["#92D050", "#FFC000", "#EA7150", "#5B9BD5","#E94635","#6666FF"]
        labels = ["Waiting in Line", "Traveling", "Children Waiting", "Classroom Routines", "Behavior Management", "Other"]
        break;
      case "listeningToChildren":
        dataValues = [teacherData.eyeLevel, teacherData.positiveExpression, teacherData.repeats, teacherData.openEndedQuestions, teacherData.extendsPlay, teacherData.encouragesPeerTalk];
        chartTitle = "Listening to Children";
        pieChartColors = ["#4FD9B3", "#4FD9B3", "#4FD9B3", "#4FD9B3","#4FD9B3","#4FD9B3"]
        labels = ["At Eye Level", "Uses positive or interested expression to encourage child talk", "Repeats or clarifies", "Asks open-ended questions", "Expands on children's play or talk", "Encourages peer talk"]
        break;
    }

    this.setState({
      dataValues: dataValues,
      labels: labels,
      pieChartColors: pieChartColors,
      chartTitle: chartTitle,
    });

  }


  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;
    const instructionResponseData = {
      labels: this.state.labels,
      datasets: [
        {
          data: this.state.dataValues,
          backgroundColor: this.state.pieChartColors,
          hoverBackgroundColor: this.state.pieChartColors,
        }
      ]
    };
    const total = this.state.dataValues[0] + this.state.dataValues[1];
    const usingTime = this.props.usingTime;
    function convertMillisecondsToMinutes(millis){
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + "m " + (seconds < 10 ? '0' : '') + seconds + "s";
    }

    return (
      <div style={{border: 'solid 1px #eee', padding: 30, width: '85%', minHeight: 450}}>
        <h3 style={{textAlign: 'center'}}>{this.state.chartTitle}</h3>
        <Pie
          data={instructionResponseData}
          options={{
            animation: {
              onComplete: function(): void {
                isCompleted ? isCompleted() : null
              }
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem: { datasetIndex: number, index: number },
                  data: { datasets: Array<{data: Array<number>, backgroundColor: Array<string>, hoverBackgroundColor: Array<string>}> }): string {
                  const dataset = data.datasets[tooltipItem.datasetIndex];
                  var currentValue = dataset.data[tooltipItem.index];
                  const percentage = parseFloat(
                    ((currentValue / total) * 100).toFixed(1)
                  );
                  currentValue = usingTime ? convertMillisecondsToMinutes(currentValue) : currentValue;
                  return currentValue + "%";
                },
                title: function(tooltipItem: Array<{ index: number }>, data: { labels: Array<string> }): string {
                  return data.labels[tooltipItem[0].index];
                }
              }
            },
            legend: {
              display: true,
              position: 'bottom',
              onClick: null,
              labels: {
                padding: 20,
                fontColor: "black",
                fontSize: 14,
                fontFamily: 'Arimo',
                boxWidth: 14,
              }
            },
            title: {
              display: this.props.title,
              text: "Summary",
              fontSize: 20,
              fontColor: 'black',
              fontFamily: 'Arimo',
              fontStyle: "bold"
            },
            plugins: {
              datalabels: {
                display: 'auto',
                color: 'black',
                font: {
                  size: 20
                },
                formatter: function(value: number): number | null {
                  if (value > 0) {
                    //value = usingTime ? convertMillisecondsToMinutes(value) : value;
                    return value + '%';
                  } else {
                    return null;
                  }
                }
              }
            },
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

AveragesPieChart.contextType = FirebaseContext;
export default AveragesPieChart;
