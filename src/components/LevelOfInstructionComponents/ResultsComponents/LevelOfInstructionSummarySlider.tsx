import * as React from 'react';
import * as PropTypes from "prop-types";
import InstructionResponsesSummaryChart from './InstructionResponsesSummaryChart';
import ToneSummary from './ToneSummary';
import Slider from "react-slick";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface Props {
  basicSkillsResponses: number, 
  inferentialResponses: number, 
  // averageToneRating: number
}

class LevelOfInstructionSummarySlider extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    basicSkillsResponses: PropTypes.number.isRequired, 
    inferentialResponses: PropTypes.number.isRequired,
//    averageToneRating: PropTypes.number
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        <div>
          <Grid justify={"center"} direction={"column"}>
            <Typography align={"center"} variant={"h4"}>
              Summary
            </Typography>
            <InstructionResponsesSummaryChart
              basicSkillsResponses={this.props.basicSkillsResponses} 
              inferentialResponses={this.props.inferentialResponses} 
            />
          </Grid>
        </div>
        <div>
        {/*   <Grid justify={"center"} direction={"column"}>
            <Typography align={"center"} variant={"h4"}>
              Average Tone
            </Typography>
            <ToneSummary
              averageToneRating={this.props.averageToneRating}
            />
          </Grid> */}
        </div>
      </Slider>
    );
  }
}

export default LevelOfInstructionSummarySlider;