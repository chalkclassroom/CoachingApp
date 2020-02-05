import * as React from "react";
import * as PropTypes from "prop-types";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ChildBehaviorsPie from "./ChildBehaviorsPie.tsx";
import TeacherBehaviorsPie from "./TeacherBehaviorsPie.tsx";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import PieSliceChildACImage from "../../../assets/images/PieSliceChildACImage.svg";
import PieSliceChildNoACImage from "../../../assets/images/PieSliceChildNoACImage.svg";
import PieSliceChildNoOppImage from "../../../assets/images/PieSliceChildNoOppImage.svg";


interface Props {
  ac: number,
  noAc: number,
  noChildOpp: number,
  support: number,
  noSupport: number,
  noTeacherOpp: number,
}

/**
 * Swipe View for Child and Teacher Associative&Cooperative Pie Charts
 * @class ChildTeacherBehaviorDetailsSlider
 * @return {void}
 */
class ChildTeacherBehaviorPieSlider extends React.Component<Props, {}> {
  
  static propTypes = {
    ac: PropTypes.number.isRequired,
    noAc: PropTypes.number.isRequired,
    noChildOpp: PropTypes.number.isRequired,
    support: PropTypes.number.isRequired,
    noSupport: PropTypes.number.isRequired,
    noTeacherOpp: PropTypes.number.isRequired
  }
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    // const { classes } = this.props;
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
              <Typography align="left" style={{fontFamily: 'Arimo', paddingTop: '0.5em'}}>
                Compare how often children:
              </Typography>
              <Grid container direction="column">
                <Grid item style={{paddingTop: '0.5em'}}>
                  <Grid container direction="row" justify="flex-end">
                    <Grid item xs={2} />
                    <Grid item xs={1} alignItems="flex-end" justify="flex-end">
                      <img alt="purple" src={PieSliceChildACImage} width="50%"/>
                    </Grid>
                    <Grid item xs={7} justify="flex-start" alignItems="flex-end">
                      <Typography style={{lineHeight:'1em', fontFamily: 'Arimo'}}>
                        Engaged in associative and cooperative interactions.
                      </Typography>
                    </Grid>
                    <Grid item xs={2} />
                  </Grid>
                </Grid>
                <Grid item style={{paddingTop: '0.5em'}}>
                  <Grid container direction="row" justify="flex-end">
                  <Grid item xs={2} />
                    <Grid item xs={1} alignItems="flex-end" justify="flex-end">
                      <img alt="purple" src={PieSliceChildNoACImage} width="50%"/>
                    </Grid>
                    <Grid item xs={7} justify="flex-start" alignItems="flex-end">
                      <Typography style={{lineHeight:'1em', fontFamily: 'Arimo'}}>
                        Played in the same area but did not interact.
                      </Typography>
                    </Grid>
                    <Grid item xs={2} />
                  </Grid>
                </Grid>
                <Grid item style={{paddingTop: '0.5em'}}>
                  <Grid container direction="row" justify="flex-end">
                  <Grid item xs={2} />
                    <Grid item xs={1} alignItems="flex-end" justify="flex-end">
                      <img alt="purple" src={PieSliceChildNoOppImage} width="50%"/>
                    </Grid>
                    <Grid item xs={7} justify="flex-start" alignItems="flex-end">
                      <Typography style={{lineHeight:'1em', fontFamily: 'Arimo'}}>
                        Played alone (had no opportunity for interaction).
                      </Typography>
                    </Grid>
                    <Grid item xs={2} />
                  </Grid>
                </Grid>
              </Grid>
              <ChildBehaviorsPie
                ac={this.props.ac}
                noAc={this.props.noAc}
                noChildOpp={this.props.noChildOpp}
              />
            </Grid>
          </div>
          <div>
          <Grid container justify={"center"} direction={"column"}>
            <Typography style={{fontFamily: 'Arimo'}}>
                Compare how often the teacher:
                <ul>
                  <li>
                    Supported children&apos;s associative and cooperative interactions.
                  </li>
                  <li>
                    Was present in the center but did not support associative
                    and cooperative interactions.
                  </li>
                  <li>
                    Was not present in the centers observed.
                  </li>
                </ul>
              </Typography>
              <Typography align={"center"} variant="subtitle1" style={{fontFamily: 'Arimo'}}>
                Teacher Behaviors
              </Typography>
              <TeacherBehaviorsPie
                support={this.props.support}
                noSupport={this.props.noSupport}
                noTeacherOpp={this.props.noTeacherOpp}
              />
            </Grid>
          </div>
        </Slider>
        <Typography variant="subtitle1" align="center" style={{paddingTop: '1.5em', fontFamily: 'Arimo'}}>
          Total Center Observations: {this.props.ac + this.props.noAc + this.props.noChildOpp}
        </Typography>
      </div>
    );
  }
}

export default ChildTeacherBehaviorPieSlider;
