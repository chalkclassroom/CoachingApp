import * as React from 'react';
import * as PropTypes from "prop-types";
import { Pie } from "react-chartjs-2";
import FirebaseContext from "../../Firebase/FirebaseContext";




/**
 * @class LiteracyInstructionAverages
 */
class LiteracyInstructionAverages extends React.Component<Props, {}> {
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


    // Set array so we know the name of the key for the value we want to use
    const firstValueKeyName = {
      foundationSkills: "foundationalSkillsAverage",
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
    const labelArrays = {
      foundationSkills: {
        teacherAverage: ["Foundational Skills Instruction", "No Target Behaviors Observed"],
        childAverage: ["Engaged in Foundational Skills Activities", "Engaged in Other Activities"]
      },
      bookReading: {
        teacherAverage: ["Book Reading Instruction", "No Target Behaviors Observed"],
      },
      languageEnvironment: {
        teacherAverage: ["Supporting Language Development", "No Target Behaviors Observed"],
      },
      writing: {
        teacherAverage: ["Writing Instruction", "No Target Behaviors Observed"],
        childAverage: ["Engaged in Writing Activities", "Engaged in Other Activities"]
      },
    }
    let labels = labelArrays[this.props.observationType][this.props.type];
    const instructionResponseData = {
      labels: labels ? labels : ["Literacy Instruction", "No Target Behaviors Observed"],
      datasets: [
        {
          data: this.state.dataValues,
          backgroundColor: ["#C4395A","#BABABA"],
          hoverBackgroundColor: ["#C4395A", "#BABABA"]
        }
      ]
    };

    let teacherData = this.props.data[this.props.teacherId];

    return (
      <>
        {/* If there is No data for the selected type, show message */}
        {(this.props.type == "teacherAverage" && teacherData['totalIntervals'] == 0) || (this.props.type == "childAverage" && teacherData['totalChildIntervals'] == 0) ? (
          <h1 style={{textAlign: 'center'}}>No reports available</h1>
        ) : null}

        {(this.props.type == "teacherAverage" && teacherData['totalIntervals'] > 0) || (this.props.type == "childAverage" && teacherData['totalChildIntervals'] > 0) ? (
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
                    return currentValue + "%";
                  },
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
                display: true,
                text: "Literacy Instruction",
                fontSize: 26,
                fontColor: 'black',
                fontFamily: 'Arimo',
                fontStyle: "bold",
                padding: 40
              },
              plugins: {
                datalabels: {
                  display: 'auto',
                  color: 'white',
                  font: {
                    size: 20
                  },
                  formatter: function(value) {
                    return value + '%';
                  }
                }
              },
              maintainAspectRatio: false
            }}
          />
        ) : null}
      </>
    );
  }
}

LiteracyInstructionAverages.contextType = FirebaseContext;
export default LiteracyInstructionAverages;
