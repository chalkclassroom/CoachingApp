import * as React from "react";
import * as PropTypes from "prop-types";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import PieSummary from "./PieSummary";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import PieSliceChildSequentialImage from "../../../assets/images/PieSliceChildSequentialImage.svg";
import PieSliceChildNonImage from "../../../assets/images/PieSliceChildNonImage.svg";
import PieSliceTeacherSupportImage from "../../../assets/images/PieSliceTeacherSupportImage.svg";
import PieSliceTeacherNoSupportImage from "../../../assets/images/PieSliceTeacherNoSupportImage.svg";
import PieSliceNoOppImage from "../../../assets/images/PieSliceNoOppImage.svg";
import { withStyles } from "@material-ui/core/styles";
import AvgBarSummary from "../../StudentEngagementComponents/ResultsComponents/AvgBarSummary";

const styles: object = {
  comparisonText: {
    paddingLeft: '1em',
    lineHeight:'1.8em',
    fontFamily: 'Arimo'
  }
}

interface Props {
  offTask: number,
  engaged: number,
  avgRating: number,
  classes: {
    comparisonText: string,
  }
}

/**
 * Swipe View for Child and Teacher Sequential Pie Charts
 * @class SummarySlider
 * @return {void}
 */
class SummarySlider extends React.Component<Props, {}> {

  static propTypes = {
    sequential: PropTypes.number.isRequired,
    notSequential: PropTypes.number.isRequired,
    support: PropTypes.number.isRequired,
    noSupport: PropTypes.number.isRequired,
    noTeacherOpp: PropTypes.number.isRequired
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
      <div>
        <Slider {...settings}>
          <div>
            <Grid container justify={"center"} direction={"column"}>
              <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                Compare how often the children were:
              </Typography>
              <Grid container direction="column" alignItems="center">
                <Grid item style={{width: '100%'}}>
                  <Grid container direction="row">
                    <Grid item xs={1}>
                      <Grid container direction="column" alignItems="flex-end" style={{height:'100%'}}>
                        <Grid item style={{height:"50%"}}>
                          <img alt="yellow" src={PieSliceChildSequentialImage} height="95%"/>
                        </Grid>
                        <Grid item style={{height:"50%"}}>
                          <img alt="red" src={PieSliceChildNonImage} height="95%"/>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={11}>
                      <Grid container direction="column" justify="center" style={{height:'100%'}}>
                        <Grid item style={{height:"50%"}}>
                          <Typography variant="subtitle1" className={classes.comparisonText}>
                            Engaged
                          </Typography>
                        </Grid>
                        <Grid item style={{height:"50%"}}>
                          <Typography variant="subtitle1" className={classes.comparisonText}>
                            Off Task
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <PieSummary
                  offTask={this.props.offTask}
                  engaged={this.props.engaged}
              />
            </Grid>
          </div>
          <div>
            <Grid container justify={"center"} direction={"column"}>
              <Typography align={"center"} variant="subtitle1" style={{fontFamily: 'Arimo', marginTop: '50px'}}>
                What do you notice about the average class room engagement?
              </Typography>
              <Typography align={"center"} variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em', marginBottom: '100px'}}>
                Average Level of Engagement Score: {Math.round((this.props.avgRating + Number.EPSILON) * 100) / 100}
              </Typography>
              <AvgBarSummary avgRating={this.props.avgRating}/>
            </Grid>
          </div>
        </Slider>
        <Typography variant="subtitle1" align="center" style={{paddingTop: '1.5em', fontFamily: 'Arimo'}}>
          Total Engagement Observations: {this.props.offTask + this.props.engaged}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(SummarySlider);