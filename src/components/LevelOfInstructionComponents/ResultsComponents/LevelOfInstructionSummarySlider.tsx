import * as React from 'react';
import * as PropTypes from "prop-types";
import InstructionResponsesSummaryChart from './InstructionResponsesSummaryChart';
import ToneSummary from './ToneSummary';
import Slider from "react-slick";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Pie } from "react-chartjs-2";
import FirebaseContext from "../../Firebase/FirebaseContext";
import * as Constants from '../../../constants';

interface Props {
  basicSkillsResponses: number, 
  inferentialResponses: number, 
//  averageToneRating: number
}
/**
 * 
 * @class LevelOfInstructionSummarySlider
 */
class LevelOfInstructionSummarySlider extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    basicSkillsResponses: PropTypes.number.isRequired, 
    inferentialResponses: PropTypes.number.isRequired,
//    averageToneRating: PropTypes.number
  }
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const instructionResponseData = {
      labels: ["Inferential Instruction", "Basic Skills Instruction"],
      datasets: [
        {
          data: [this.props.inferentialResponses, this.props.basicSkillsResponses],
          backgroundColor: [Constants.InstructionColor,"#6d9eeb"],
          hoverBackgroundColor: [Constants.InstructionColor, "#6d9eeb"] //6d9eeb
        }
      ]
    };
    return (
     
        <div>
           <Pie
        data={instructionResponseData}
        options={{ 
          tooltips: {
            callbacks: {
              label: function(tooltipItem: { datasetIndex: number, index: number },
                  data: { datasets: Array<{data: Array<number>, backgroundColor: Array<string>, hoverBackgroundColor: Array<string>}> }) {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const meta = dataset._meta[Object.keys(dataset._meta)[0]];
                const total = meta.total;
                const currentValue = dataset.data[tooltipItem.index];
                const percentage = parseFloat(
                  ((currentValue / total) * 100).toFixed(1)
                );
                return currentValue + " (" + percentage + "%)";
              },
              title: function(tooltipItem: Array<{ index: number }>, data: { labels: Array<string> }) {
                return data.labels[tooltipItem[0].index];
              }
            }
          },
          legend: {
            onClick: null,
            position: "bottom",
            labels: {
              padding: 20,
              fontColor: "black",
              fontSize: 14,
            }
          },
          title: {
            display: true,
            text: "Level of Instruction Summary",
            fontSize: 20,
            fontStyle: "bold"
          },
          plugins: {
            datalabels: {
              display: 'auto',
              color: 'white',
              font: {
                size: 20
              },
              formatter: function(value: number) {
                return (
                  value
                );
              }
            }
          }
        }}
        width={650}
        height={400}
      />
          {/* <Grid justify={"center"} direction={"column"}>
            <Typography align={"center"} variant={"h4"}>
              Summary
            </Typography>
            <InstructionResponsesSummaryChart
              basicSkillsResponses={this.props.basicSkillsResponses} 
              inferentialResponses={this.props.inferentialResponses} 
            />
          </Grid> */}
        </div>
       
    );
  }
}

export default LevelOfInstructionSummarySlider;