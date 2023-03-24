import * as React from 'react';
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";
import FirebaseContext from "../../Firebase/FirebaseContext";




/**
 * @class SequentialActivitiesAverages
 */
class SequentialActivitiesAverages extends React.Component<Props, {}> {
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

    var secondValue = 100 - firstValue;



    this.setState({dataValues: [firstValue, secondValue]});

  }



  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const isCompleted = this.props.completed;

    let teacherData = this.props.data[this.props.teacherId];

    const sequentialActivityData = {
      //labels: this.state.labels,
      labels: this.props.type == "teacherAverage" ?
      [
        ['Helping children do sequential', 'activities with manipulatives or toys'],
        ['Supporting children as they draw ', 'images or write messages'],
        'Demonstrating the steps to an activity or game',
        ['Supporting children as they act out','a dramatic play scenario or book']
      ]
      :
      [
        ['Using materials in a step-by-step', 'predictable way'],
        ['Drawing recognizable images or', 'writing names or messages', '(letters or letter-like forms)'],
        ['Playing a game with set rules', 'and/or taking turns'],
        ['Speaking or acting according to', 'a pretend scenario that', 'follows a predictable plot']
      ],
      datasets: [
        {
          //data: [this.props.math1, this.props.math2, this.props.math3, this.props.math4],
          // data: this.state.graphData,
          data: this.props.type == "teacherAverage" ?
            [teacherData.sequentialActivitiesAverage ,teacherData.drawImagesAverage ,teacherData.demonstrateStepsAverage ,teacherData.actOutAverage]
            :
            [teacherData.materialsAverage, teacherData.drawingAverage, teacherData.playingAverage, teacherData.speakingAverage],
          label: 'Average',
          backgroundColor: this.props.type == "teacherAverage" ? ["#459AEB", "#459AEB", "#459AEB","#459AEB"] : ["#FFD300", "#FFD300", "#FFD300", "#FFD300"],
          hoverBackgroundColor: this.state.barColors,
        },
      ],
    }



    let heading = this.props.type == "teacherAverage" ? "Teacher Behaviors" : "Child Behaviors";

    return (
      <>
        <h3 style={{ textAlign: 'center', width: '100%', marginBottom: 0 }} >{heading}</h3>
        <div style={{transform: 'translateX(-100px)', width: '100%', minHeight:450}}>
          <HorizontalBar
            data={sequentialActivityData}
            // plugins={[ChartDataLabels, topLabels]}
            options={{
              tooltips: {
                enabled: false,
              },
              animation: {
                onComplete: function(): void {
                  isCompleted ? isCompleted() : null
                },
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      min: 0,
                      max: 30,
                      stepSize: 1,
                      fixedStepSize: 1,
                      fontSize: 16,
                      fontColor: 'black',
                    },
                    stacked: false,
                    scaleLabel: {
                      display: true,
                      labelString: "Average Number across Observations",
                      fontSize: 16,
                      fontColor: 'black',
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      fontSize: 16,
                      fontColor: 'black',
                    },
                    scaleLabel: {
                      display: true,
                      labelString:
                        this.props.observationType == 'studentEngagement'
                          ? 'Activity Type'
                          : '',
                      fontSize: 16,
                      fontColor: 'black',
                    },
                    stacked: true,
                  },
                ],
              },
              legend: {
                display: false,
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
                    weight: 'bold',
                  },
                  formatter: function(value: number): number | null {
                    if (value > 0) {
                      return value
                    } else {
                      return null
                    }
                  },
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </>
    );
  }
}

SequentialActivitiesAverages.contextType = FirebaseContext;
export default SequentialActivitiesAverages;
