import * as React from 'react';
import * as PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import FirebaseContext from "../../Firebase/FirebaseContext";




/**
 * @class TrendsLineChart
 */
class TrendsLineChart extends React.Component<Props, {}> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);
    this.state= {
      dataValues: [0,0],
      labels: ["", ""],
    }
  }


  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data || prevProps.radioValue !== this.props.radioValue ) {
      this.setData();
    }
  }

  componentDidMount(): void {
    this.setData();
  }




  setData = () => {

    /*
    // Make sure the data is there
    if( !(this.props.data) || Object.keys(this.props.data).length <= 0 || !(this.props.teacherId) || this.props.teacherId == "" || !(this.props.type) || this.props.type == "" )
    {
      return;
    }


    // Get the values for the chart
    var firstValue = Math.round(this.props.data[this.props.teacherId][this.props.type]);

    var secondValue = 100 - firstValue;



    this.setState({dataValues: [firstValue, secondValue]});
    */

    let teacherData = this.props.data[this.props.teacherId];

    let trendsLabels, trendsData, lineColors;
    let borderDash = [0,0];
    switch (this.props.observationType)
    {
      default:
        trendsLabels = [""]
        trendsData = [0]
        lineColors = ["#ff0000"]
        break;

      case "transitionTime":
        trendsLabels = ["Transition Time", "Learning Activity"]
        trendsData = [teacherData.transitionTimeAverage, teacherData.transitionTimeAverage.map(x => {return x !== null ?  100 - x : null})]
        lineColors = ["#EA7150", "#00AAE6"]
        break;

      case "listeningToChildren":
        trendsLabels = ["Listening/Encouraging", "No Target Behaviors Observed"]
        trendsData = [teacherData.encouragingAverage, teacherData.encouragingAverage.map(x => {return x !== null ?  100 - x : null})]
        lineColors = ["#07DFBB", "#E94635"]
        break;

      case "foundationSkills":
        trendsLabels = this.props.radioValue == "teacherAverage" ? ["Foundational Skills Instruction", "No Target Behaviors Observed"] : ["Engaged in Foundational Skills Activities", "Engaged in Other Activities"];
        trendsData = this.props.radioValue == "teacherAverage" ?
          [teacherData.writingSkillsAverage, teacherData.foundationalSkillsAverage.map(x => {return x !== null ?  100 - x : null})]
          :
          [teacherData.childEngagedAverage, teacherData.childEngagedAverage.map(x => {return x !== null ?  100 - x : null})]
        lineColors = ["#C00000", "#BFBFBF"]
        break;

      case "writing":
        trendsLabels = this.props.radioValue == "teacherAverage" ? ["Writing Instruction", "No Target Behaviors Observed"] : ["Engaged in Writing Activities", "Engaged in Other Activities"];
        trendsData = this.props.radioValue == "teacherAverage" ?
          [teacherData.writingSkillsAverage, teacherData.writingSkillsAverage.map(x => {return x !== null ?  100 - x : null})]
          :
          [teacherData.childWritingSkillsAverage, teacherData.childWritingSkillsAverage.map(x => {return x !== null ?  100 - x : null})]
        lineColors = ["#C00000", "#BFBFBF"]
        break;

      case "sequentialActivities":
        trendsLabels = this.props.radioValue == "teacherAverage" ? ["Teacher Support", "No Suppoort"] : ["Sequential Activities", "Non-Sequential Activities"];
        trendsData = this.props.radioValue == "teacherAverage" ?
          [teacherData.noSupportAverage.map(x => {return x !== null ?  100 - x : null}), teacherData.noSupportAverage]
          :
          [teacherData.childNonSequentialActivitiesAverage.map(x => {return x !== null ?  100 - x : null}), teacherData.childNonSequentialActivitiesAverage]
        lineColors = this.props.radioValue == "teacherAverage" ? ["#5B9BD5", "#FF0000"] : ["#FFCE33", "#FF0000"]
        borderDash = [10, 5]
        break;

      case "associativeAndCooperative":
        trendsLabels = this.props.radioValue == "teacherAverage" ? ["Support for Associative and Cooperative Interactions", "No Suppoort"] : ["Engaged in Associative and Cooperative Interactions", "Did Not Interact"];
        trendsData = this.props.radioValue == "teacherAverage" ?
          [teacherData.teacherSupport.map(x => {return x !== null ?  100 - x : null}), teacherData.teacherSupport]
          :
          [teacherData.ac.map(x => {return x !== null ?  100 - x : null}), teacherData.ac]
        lineColors = this.props.radioValue == "teacherAverage" ? ["#E20000", "#2EB9EB"] : ["#E20000", "#7030A0"]
        borderDash = [10, 5]
        break;
    }



    // Add a zero to the beginning and end of each trends data to account for the space at beginning and end of the graph
    // teacherData = teacherData.map(item => {return [0].concat(item, [0])} );
    let dataSets = []
    for(var i = 0; i < trendsLabels.length; i++)
    {
      //teacherData[dataIndex] = [0].concat(teacherData[dataIndex], [0]);

      // Save the data
      var tempData = {
        label: trendsLabels[i],
        //data: [null].concat(trendsData[i], [null]),
        data: trendsData[i],
        borderColor: lineColors[i],
        borderWidth: 4,
        borderDash: borderDash,
        backgroundColor: lineColors[i],
        fill: false,
        tension: 0.0,
        pointStyle: 'circle',
      }

      dataSets.push(tempData);
    }

    // Convert the labels to show year and shortened month
    const labels = teacherData.lineChartLabels.map(x => { return new Date(x).toLocaleDateString('en-us', { month: 'short', year: 'numeric' }) } )

    const lineData = {
      // labels: [''].concat(labels, ['']),
      labels: labels,
      datasets: dataSets,
    }

    this.setState({data: lineData});
  }



  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    let teacherData = this.state.data;

    return (
      <>
        <div style={
          {
            border: 'solid 1px #eee',
            padding: 20,
            width: '100%',
            minHeight:500,
          }
        }>
          <h3 style={{textAlign: 'center', width: '100%'}}>Teacher Behaviors</h3>
          <div style={{width: '100%', minHeight:500, marginBottom: 20}}>
            <Line
              data={this.state.data}
              options={
                {
                  maintainAspectRatio: false,
                  showScale: true,
                  pointDot: true,
                  showLines: true,
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
                        display: true,
                        scaleLabel: {
                          display: true,
                          labelString: '',
                          fontFamily: 'Arimo',

                        },
                        ticks: {
                          //fontSize: 18,
                          //fontColor: 'black',
                        },
                        gridLines: {
                          //drawOnChartArea: false,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                          min: 0,
                          max: 100,
                          callback: function(value: number): string {
                            return value + '%'
                          },
                          //fontSize: 18,
                          //fontColor: 'black',
                          // padding: 20,
                        },
                        scaleLabel: {
                          display: true,
                          labelString: '',
                          fontFamily: 'Arimo',

                        },
                        gridLines: {
                          //drawBorder: false,
                          //drawTicks: false,
                        }
                      },
                    ],
                    layout: {},
                  },
                  legend: {
                    display: true,
                    labels: {
                      fontSize: 14,
                      fontColor: 'black',
                      padding: 10,
                      boxWidth: 12,
                      usePointStyle: true,
                    },
                    position: 'bottom',
                  },
                  plugins: {
                    datalabels: {
                      display: true,
                      formatter: function(value: number): string {
                        return value + '%'
                      },
                      align: 'right',
                    },
                    legend: {
                      display: true,
                      position: 'bottom',
                      align: 'center',
                      labels: {
                        generateLabels: {},
                      },
                    },
                  },
                }
              }
            />
          </div>
        </div>
      </>
    );
  }
}

TrendsLineChart.contextType = FirebaseContext;
export default TrendsLineChart;
