import * as React from "react";
import * as PropTypes from "prop-types";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ChildPieSummary from "./ChildPieSummary";
import TeacherPieSummary from "./TeacherPieSummary";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import PieSliceChildMathImage from "../../../assets/images/PieSliceChildMathImage.svg";
import PieSliceChildNonImage from "../../../assets/images/PieSliceChildNonImage.svg";
import PieSliceTeacherSupportImage from "../../../assets/images/PieSliceTeacherSupportImage.svg";
import PieSliceTeacherNoSupportImage from "../../../assets/images/PieSliceTeacherNoSupportImage.svg";
import PieSliceNoOppImage from "../../../assets/images/PieSliceNoOppImage.svg";
import { withStyles } from "@material-ui/core/styles";

const styles: object = {
  comparisonText: {
    paddingLeft: '1em',
    lineHeight:'1.8em',
    fontFamily: 'Arimo'
  }
}

interface Props {
  math: number,
  notMath: number,
  support: number,
  noSupport: number,
  noTeacherOpp: number,
  classes: {
    comparisonText: string,
  }
}

/**
 * Swipe View for Child and Teacher Math Pie Charts
 * @class SummarySlider
 * @return {void}
 */
class SummarySlider extends React.Component<Props, {}> {
  
  static propTypes = {
    math: PropTypes.number.isRequired,
    notMath: PropTypes.number.isRequired,
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
              <Typography align={"center"} variant="h4" style={{fontFamily: 'Arimo'}}>
                Child Behaviors
              </Typography>
              <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                Compare how often children:
              </Typography>
              <Grid container direction="column" alignItems="center">
                <Grid item style={{width: '100%'}}>
                  <Grid container direction="row">
                    <Grid item xs={1}>
                      <Grid container direction="column" alignItems="flex-end" style={{height:'100%'}}>
                        <Grid item style={{height:"50%"}}>
                          <img alt="yellow" src={PieSliceChildMathImage} height="95%"/>
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
                            Did math.
                          </Typography>
                        </Grid>
                        <Grid item style={{height:"50%"}}>
                          <Typography variant="subtitle1" className={classes.comparisonText}>
                            Did other activities.
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <ChildPieSummary
                math={this.props.math}
                notMath={this.props.notMath}
              />
            </Grid>
          </div>
          <div>
            <Grid container justify={"center"} direction={"column"}>
              <Typography align={"center"} variant="h4" style={{fontFamily: 'Arimo'}}>
                Teacher Behaviors
              </Typography>
              <Typography align="left" variant="subtitle1" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                Compare how often the teacher:
              </Typography>
              <Grid container direction="column" alignItems="center">
                <Grid item style={{width: '100%'}}>
                  <Grid container direction="row">
                    <Grid item xs={1}>
                      <Grid container direction="column" alignItems="flex-end" style={{height:'100%'}}>
                        <Grid item style={{height:"33%"}}>
                          <img alt="purple" src={PieSliceTeacherSupportImage} height="95%"/>
                        </Grid>
                        <Grid item style={{height:"33%"}}>
                          <img alt="red" src={PieSliceTeacherNoSupportImage} height="95%"/>
                        </Grid>
                        <Grid item style={{height:"33%"}}>
                          <img alt="orange" src={PieSliceNoOppImage} height="95%"/>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={11}>
                      <Grid container direction="column" justify="center" style={{height:'100%'}}>
                        <Grid item style={{height:"33%"}}>
                          <Typography variant="subtitle1" className={classes.comparisonText}>
                            Supported children&apos;s math learning.
                          </Typography>
                        </Grid>
                        <Grid item style={{height:"33%"}}>
                          <Typography variant="subtitle1" className={classes.comparisonText}>
                            Was present in the center but did not support math learning.
                          </Typography>
                        </Grid>
                        <Grid item style={{height:"33%"}}>
                          <Typography variant="subtitle1" className={classes.comparisonText}>
                            Was not present in the centers observed.
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <TeacherPieSummary
                support={this.props.support}
                noSupport={this.props.noSupport}
                noTeacherOpp={this.props.noTeacherOpp}
              />
            </Grid>
          </div>
        </Slider>
        <Typography variant="subtitle1" align="center" style={{paddingTop: '1.5em', fontFamily: 'Arimo'}}>
          Total Center Observations: {this.props.math + this.props.notMath}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(SummarySlider);