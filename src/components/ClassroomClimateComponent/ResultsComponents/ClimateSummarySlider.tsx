import * as React from 'react';
import * as PropTypes from "prop-types";
import BehaviorResponsesSummaryChart from './BehaviorResponsesSummaryChart';
import ToneSummary from './ToneSummary';
import Slider from "react-slick";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import PieSliceChildNonImage from '../../../assets/images/PieSliceChildNonImage.svg';
import PieSliceClimateImage from '../../../assets/images/PieSliceClimateImage.svg';

const styles: object = {
  comparisonText: {
    paddingLeft: '1em',
    lineHeight: '0.8em',
    fontFamily: 'Arimo'
  }
};

interface Props {
  negativeResponses: number,
  positiveResponses: number,
  averageToneRating: number,
  classes: {comparisonText: string},
  noText?: boolean
}

/**
 * @class ClimateSummarySlider
 */
class ClimateSummarySlider extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    negativeResponses: PropTypes.number.isRequired,
    positiveResponses: PropTypes.number.isRequired,
    averageToneRating: PropTypes.number,
    classes: PropTypes.object.isRequired,
    noText: PropTypes.bool
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
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
            {!this.props.noText ? (
            <div>
            <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em', paddingBottom: '1em'}}>
              Compare how often the teacher: 
            </Typography>
            <Grid container direction="column" alignItems="center">
              <Grid item style={{width: '100%'}}>
                <Grid container direction="row">
                  <Grid item xs={1}>
                    <Grid container direction="column" alignItems="flex-end" style={{height:'100%'}}>
                      <Grid item style={{height:"50%"}}>
                        <img alt="yellow" src={PieSliceClimateImage} height="95%"/>
                      </Grid>
                      <Grid item style={{height:"50%"}}>
                        <img alt="red" src={PieSliceChildNonImage} height="95%"/>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={11}>
                    <Grid container direction="column" justify="center" style={{height:'100%'}}>
                      <Grid item style={{height:"50%", paddingBottom: '1em'}}>
                        <Typography variant="subtitle1" className={classes.comparisonText}>
                          Approved of children&apos;s behavior.
                        </Typography>
                      </Grid>
                      <Grid item style={{height:"50%"}}>
                        <Typography variant="subtitle1" className={classes.comparisonText}>
                          Disapproved of children&apos;s behavior.
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            </div>) : (null)}
            <Grid item style={{paddingTop: '1em'}}>
              <BehaviorResponsesSummaryChart
                negativeResponses={this.props.negativeResponses}
                positiveResponses={this.props.positiveResponses}
              />
            </Grid>
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

export default withStyles(styles)(ClimateSummarySlider);