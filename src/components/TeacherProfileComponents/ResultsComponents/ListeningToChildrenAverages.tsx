import * as React from 'react';
import * as PropTypes from "prop-types";
import { HorizontalBar } from "react-chartjs-2";
import FirebaseContext from "../../Firebase/FirebaseContext";




/**
 * @class ListeningToChildrenAverages
 */
class ListeningToChildrenAverages extends React.Component<Props, {}> {
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

    console.log("DATA => ", this.props.data);

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
      labels: [
        ['At eye-level'],
        ['Uses positive or', 'interested expression', 'to encourage child talk'],
        ['Repeats or clarifies'],
        ['Asks open-ended questions'],
        ["Expands on children's",'play or talk'],
        ['Encourages peer talk'],
      ],
      datasets: [
        {
          //data: [this.props.math1, this.props.math2, this.props.math3, this.props.math4],
          // data: this.state.graphData,
          data: [teacherData.eyeLevelAverage ,teacherData.positiveExpressionAverage ,teacherData.repeatsAverage ,teacherData.openEndedQuestionsAverage, teacherData.extendsPlayAverage, teacherData.encouragesPeerTalkAverage],
          label: 'Average',
          backgroundColor: ["#4FD9B3", "#4FD9B3", "#4FD9B3", "#4FD9B3","#4FD9B3","#4FD9B3"],
          hoverBackgroundColor: ["#4FD9B3", "#4FD9B3", "#4FD9B3", "#4FD9B3","#4FD9B3","#4FD9B3"],
        },
      ],
    }





    return (
      <>
        <h3 style={{textAlign: 'center'}}>Teacher Behaviors</h3>
        <div style={{transform: 'translateX(-100px)', width: '100%', minHeight:450, maxHeight: 500, }}>
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
                      fontSize: 14,
                    },
                    stacked: false,
                    scaleLabel: {
                      display: true,
                      labelString: "Average Number across Observations",
                      fontSize: 16,
                      fontColor: 'black',
                      padding: 20,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      fontSize: 14,
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

ListeningToChildrenAverages.contextType = FirebaseContext;
export default ListeningToChildrenAverages;
