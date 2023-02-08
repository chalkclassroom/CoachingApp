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
    console.log("Teacher : ", this.props.teacherId);

    console.log("key : ", firstValueKeyName[this.props.observationType]);
    console.log("value : ", this.props.data[this.props.teacherId][this.props.type]);

    var firstValue = Math.round(this.props.data[this.props.teacherId][this.props.type]);

    // Need to check if we should be using total interval, total instruction, or total
    var secondValue = 100 - firstValue;



    this.setState({dataValues: [firstValue, secondValue]});

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
          backgroundColor: ["#C4395A","#BABABA"],
          hoverBackgroundColor: ["#C4395A", "#BABABA"]
        }
      ]
    };

    return (
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
                    //((currentValue) * 100).toFixed(1)
                  );
                  currentValue = usingTime ? convertMillisecondsToMinutes(currentValue) : currentValue;
                  return currentValue + " (" + percentage + "%)";
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
                fontFamily: 'Arimo'
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
                color: 'white',
                font: {
                  size: 20
                },

              }
            },
            maintainAspectRatio: false
          }}
        />
    );
  }
}

LiteracyInstructionAverages.contextType = FirebaseContext;
export default LiteracyInstructionAverages;
