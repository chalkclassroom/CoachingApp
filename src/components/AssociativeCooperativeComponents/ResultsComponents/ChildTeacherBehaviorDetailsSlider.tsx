import * as React from "react";
import * as PropTypes from "prop-types";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ChildBehaviorsDetailsHorizontalBar from "./ChildBehaviorsDetailsHorizontalBar.tsx";
import TeacherBehaviorsDetailsHorizontalBar from "./TeacherBehaviorsDetailsHorizontalBar.tsx";
import BarChildAssociativeImage from '../../../assets/images/BarChildAssociativeImage.svg'
import BarChildCooperativeImage from '../../../assets/images/BarChildCooperativeImage.svg'

interface Props {
  ac1: number,
  ac2: number,
  ac3: number,
  ac4: number,
  teacher1: number,
  teacher2: number,
  teacher3: number,
  teacher4: number
}

/**
 * Swipe View for Child and Teacher Associative&Cooperative Bar Charts
 * @class ChildTeacherBehaviorDetailsSlider
 * @return {void}
 */
class ChildTeacherBehaviorDetailsSlider extends React.Component<Props, {}> {
  
  static propTypes = {
    ac1: PropTypes.number.isRequired,
    ac2: PropTypes.number.isRequired,
    ac3: PropTypes.number.isRequired,
    ac4: PropTypes.number.isRequired,
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
            <Typography align="center" variant="h4" style={{fontFamily: 'Arimo'}}>
              Child Behaviors
            </Typography>
            {/* <Typography align="left" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
              Consider:
            </Typography> */}
            <Grid container direction="column">
              <Grid item style={{paddingTop: '0.5em'}}>
                <Grid container direction="row" alignItems="flex-start" justify="flex-start">
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <Typography align="center" style={{fontFamily: 'Arimo', paddingBottom: '1em'}}>
                      Were the children engaged in {" "}
                      <span style={{color: "#c5afe7", fontWeight: 'bold'}}>associative interactions</span> {" "}
                      or <span style={{color: "#6f39c4", fontWeight: 'bold'}}>cooperative interactions</span> more often?
                    </Typography>
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row">
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <Typography align="center" style={{fontFamily: 'Arimo'}}>
                      Which behaviors did children do more often?
                    </Typography>
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
              </Grid>
              <Grid item style={{paddingBottom: 0}}>
                <Grid container direction="row">
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <Typography align="center" style={{fontFamily: 'Arimo'}}>
                      Which behaviors did children do less often?
                    </Typography>
                  </Grid>
                  <Grid item xs={1} />
                </Grid>
              </Grid>
            </Grid>
            <ChildBehaviorsDetailsHorizontalBar
              ac1={this.props.ac1}
              ac2={this.props.ac2}
              ac3={this.props.ac3}
              ac4={this.props.ac4}
            />
          </Grid>
        </div>
        <div>
          <Grid justify={"center"} direction={"column"}>
            <Typography align={"center"}>Teacher Behaviors</Typography>
            <TeacherBehaviorsDetailsHorizontalBar
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


export default ChildTeacherBehaviorDetailsSlider;
