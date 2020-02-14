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
  math1: number,
  math2: number,
  math3: number,
  math4: number,
  teacher1: number,
  teacher2: number,
  teacher3: number,
  teacher4: number,
  classes: {
    questionText: string
  }
}

/**
 * Swipe View for Child and Teacher Math Activities Bar Charts
 * @class DetailsSlider
 * @return {void}
 */
class DetailsSlider extends React.Component<Props, {}> {
  
  static propTypes = {
    math1: PropTypes.number.isRequired,
    math2: PropTypes.number.isRequired,
    math3: PropTypes.number.isRequired,
    math4: PropTypes.number.isRequired,
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
                          What types of math did children do during the observation?
                        </Typography>
                      </Grid>
                      <Grid item style={{height:"33%", paddingBottom: '2em'}}>
                        <Typography variant="subtitle1" className={classes.questionText}>
                          Did they do one type of math more often than other types?
                        </Typography>
                      </Grid>
                      <Grid item style={{height:"33%"}}>
                        <Typography variant="subtitle1" className={classes.questionText}>
                          Did they do one type of math less often than other types?
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <ChildBarDetails
              math1={this.props.math1}
              math2={this.props.math2}
              math3={this.props.math3}
              math4={this.props.math4}
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
                          What behaviors did the teacher use during the observation?
                        </Typography>
                      </Grid>
                      <Grid item style={{height:"33%", paddingBottom: '2em'}}>
                        <Typography variant="subtitle1" className={classes.questionText}>
                          Did the teacher do one type of behavior more often than other behaviors?
                        </Typography>
                      </Grid>
                      <Grid item style={{height:"33%"}}>
                        <Typography variant="subtitle1" className={classes.questionText}>
                          Did the teacher do one behavior less often than other behaviors?
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