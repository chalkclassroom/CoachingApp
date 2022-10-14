import * as React from "react";
import * as PropTypes from "prop-types";
import { HorizontalBar, Bar } from "react-chartjs-2";
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

const averageLine = {
    width: '80%',
    marginRight: '15px',
    borderBottom: 'dashed 8px #45818E'
}



/**
 * Horizontal Bar Graph for Math Child Behaviors
 * @class EngagementBarDetails
 * @return {void}
 */
class SiteProfileBarDetails extends React.Component<Props, {}> {
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
      }
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
    console.log("what");

    var teacherNames = [];
    var graphData = [];
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

    }

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


    this.setState({teacherNames: teacherNames, graphData: graphData, chartTitle: chartTitleArr[type], barColors: this.props.barColors, averageLineWrapStyle: averageLineStyle });

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
      <>
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
                    labelString: 'Average % of 1-Minute Intervals',
                    fontSize: 16,
                    fontColor: 'black'
                  }
                }
              ],
              xAxes: [
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
        <div className={"averageLineWrap"} style={this.state.averageLineWrapStyle}>
          <div className={"averageLine"} style={averageLine}></div>
          <div className={"averageLineLabel"} style={{whiteSpace: 'nowrap', color: '#45818E'}}>Site Average</div>
        </div>
      </>
    );
  }
}


export default SiteProfileBarDetails;
