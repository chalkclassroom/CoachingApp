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
  "bookReading": ["Book Reading Instruction", "No Target Behaviors Observed"],
  "vocabFocus": ["Focus on Vocabulary", "No Vocabulary Behaviors Observed"],
  "languageConnections": ["Make Connections to Children.", "No Connection Behaviors Observed"],
  "childrenSupport": ["Support Children's Speaking and Listening Skills", "No Support Behaviors Observed"],
  "fairnessDiscussions": ["Facilitates Discussions", "No Discussions Behaviors Observed"],
  "multimodalInstruction": ["Use Multimodal Instruction", "No Multimodal Behaviors Observed"],
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
    }
  }


  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data || prevProps.type !== this.props.type ) {

      // Get the values for the chart
      var firstValue = Math.round(this.props.data[this.props.teacherId][this.props.type]);

      // Need to check if we should be using total interval
      var secondValue = this.props.data[this.props.teacherId]["totalIntervals"] - firstValue;

      this.setState({dataValues: [firstValue, secondValue], labels: labelsArr[this.props.type]});

    }
  }

  componentDidMount(): void {

  }

  static propTypes = {
    lowLevel: PropTypes.number.isRequired,
    highLevel: PropTypes.number.isRequired,
    completed: PropTypes.func,
    title: PropTypes.bool
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
    const total = this.state.dataValues[0] + this.state.dataValues[1];
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
                  const currentValue = dataset.data[tooltipItem.index];
                  const percentage = parseFloat(
                    ((currentValue / total) * 100).toFixed(1)
                  );
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

AveragesPieChart.contextType = FirebaseContext;
export default AveragesPieChart;
