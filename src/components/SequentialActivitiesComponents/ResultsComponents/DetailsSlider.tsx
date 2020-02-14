import * as React from "react";
import * as PropTypes from "prop-types";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ChildBarDetails from "./ChildBarDetails";
import TeacherBarDetails from "./TeacherBarDetails";
import { withStyles } from "@material-ui/core/styles";

const styles: object = {
  questionText: {
    paddingLeft: '1em',
    lineHeight:'1.2em',
    fontFamily: 'Arimo'
  }
}

interface Props {
  sequential1: number,
  sequential2: number,
  sequential3: number,
  sequential4: number,
  teacher1: number,
  teacher2: number,
  teacher3: number,
  teacher4: number,
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
    sequential1: PropTypes.number.isRequired,
    sequential2: PropTypes.number.isRequired,
    sequential3: PropTypes.number.isRequired,
    sequential4: PropTypes.number.isRequired,
    teacher1: PropTypes.number.isRequired,
    teacher2: PropTypes.number.isRequired,
    teacher3: PropTypes.number.isRequired,
    teacher4: PropTypes.number.isRequired,
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
            <Typography align="center" variant="h4" style={{fontFamily: 'Arimo', paddingBottom: '0.5em'}}>
              Child Behaviors
            </Typography>
            <Grid container direction="column" alignItems="center">
              <Grid item style={{width: '100%'}}>
                <Grid container direction="row">
                  <Grid item xs={11}>
                    <Grid container direction="column" justify="center" alignItems="flex-start" style={{height:'100%'}}>
                      <Grid item style={{height:"33%", paddingBottom: '2em'}}>
                        <Typography variant="subtitle1" className={classes.questionText}>
                          Which behaviors did children do more often?
                        </Typography>
                      </Grid>
                      <Grid item style={{height:"33%"}}>
                        <Typography variant="subtitle1" className={classes.questionText}>
                          Which behaviors did children do less often?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <ChildBarDetails
              sequential1={this.props.sequential1}
              sequential2={this.props.sequential2}
              sequential3={this.props.sequential3}
              sequential4={this.props.sequential4}
            />
          </Grid>
        </div>
        <div>
          <Grid justify={"center"} direction={"column"}>
            <Typography align="center" variant="h4" style={{fontFamily: 'Arimo', paddingBottom: '0.5em'}}>
              Teacher Behaviors
            </Typography>
            <Grid container direction="column" alignItems="center">
              <Grid item style={{width: '100%'}}>
                <Grid container direction="row">
                  <Grid item xs={11}>
                    <Grid container direction="column" justify="center" alignItems="flex-start" style={{height:'100%'}}>
                      <Grid item style={{height:"33%", paddingBottom: '2em'}}>
                        <Typography variant="subtitle1" className={classes.questionText}>
                          Was there a strategy the teacher used more often to support children&apos;s sequential activities?
                        </Typography>
                      </Grid>
                      <Grid item style={{height:"33%", paddingTop: '0.5em'}}>
                        <Typography variant="subtitle1" className={classes.questionText}>
                          Was there a strategy the teacher used less often?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <TeacherBarDetails
              teacher1={this.props.teacher1}
              teacher2={this.props.teacher2}
              teacher3={this.props.teacher3}
              teacher4={this.props.teacher4}
            />
          </Grid>
        </div>
      </Slider>
    );
  }
}


export default withStyles(styles)(DetailsSlider);