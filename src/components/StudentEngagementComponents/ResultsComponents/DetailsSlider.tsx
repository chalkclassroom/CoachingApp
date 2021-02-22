import * as React from "react";
import * as PropTypes from "prop-types";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import EngagementBarDetails from "./EngagementBarDetails";
import { withStyles } from "@material-ui/core/styles";

const styles: object = {
  questionText: {
    paddingLeft: '1em',
    lineHeight:'1.2em',
    fontFamily: 'Arimo'
  }
}

interface Props {
  offTaskDetailSplit: Array<number>,
  mildlyEngagedDetailSplit: Array<number>,
  engagedDetailSplit: Array<number>,
  highlyEngagedDetailSplit: Array<number>,
  classes: {
    questionText: string
  }
}

/**
 * Swipe View for Child and Teacher Sequential Activities Bar Charts
 * @class DetailsSlider
 * @return {void}
 */
class DetailsSlider extends React.Component<Props, {}> {
  
  static propTypes = {
    offTaskDetailSplit: PropTypes.array.isRequired,
    mildlyEngagedDetailSplit: PropTypes.array.isRequired,
    engagedDetailSplit: PropTypes.array.isRequired,
    highlyEngagedDetailSplit: PropTypes.array.isRequired,
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
          <Grid justify={"center"} direction={"column"}>
            <Typography variant="h5" style={{textAlign: "center", fontFamily: 'Arimo', paddingTop: '1em', paddingBottom: '0.5em'}}>
              Student Engagement
            </Typography>
            <Grid container direction="column" alignItems="center">
              <Grid item style={{width: '100%'}}>
                <Grid container direction="row">
                  <Grid item xs={11}>
                    <Grid container direction="column" justify="center" alignItems="flex-start" style={{height:'100%'}}>
                      <Grid item style={{height:"33%", paddingBottom: '2em'}}>
                        <Typography variant="subtitle1" className={classes.questionText}>
                          Compare how often the children were:
                        </Typography>
                      </Grid>
                      <Grid item style={{height:"33%"}}>
                        <Typography variant="subtitle1" className={classes.questionText}>
                          Off Task / Mildly Engaged / Engaged / Highly Engaged
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <EngagementBarDetails
                offTaskDetailSplit={this.props.offTaskDetailSplit}
                mildlyEngagedDetailSplit={this.props.mildlyEngagedDetailSplit}
                engagedDetailSplit={this.props.engagedDetailSplit}
                highlyEngagedDetailSplit={this.props.highlyEngagedDetailSplit}
            />
          </Grid>
        </div>
    );
  }
}


export default withStyles(styles)(DetailsSlider);