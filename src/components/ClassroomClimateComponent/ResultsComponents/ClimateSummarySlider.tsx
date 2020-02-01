import * as React from 'react';
import * as PropTypes from "prop-types";
import BehaviorResponsesSummaryChart from './BehaviorResponsesSummaryChart';
import ToneSummary from './ToneSummary';
import Slider from "react-slick";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface Props {
  negativeResponses: number,
  positiveResponses: number,
  averageToneRating: number
}

class ClimateSummarySlider extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    negativeResponses: PropTypes.number.isRequired,
    positiveResponses: PropTypes.number.isRequired,
    averageToneRating: PropTypes.number
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
            <BehaviorResponsesSummaryChart
              negativeResponses={this.props.negativeResponses}
              positiveResponses={this.props.positiveResponses}
            />
          </Grid>
        </div>
        <div>
          <Grid justify={"center"} direction={"column"}>
            <Typography align={"center"} variant={"h4"}>
              Average Tone
            </Typography>
            <ToneSummary
              averageToneRating={this.props.averageToneRating}
            />
          </Grid>
        </div>
      </Slider>
    );
  }
}

export default ClimateSummarySlider;