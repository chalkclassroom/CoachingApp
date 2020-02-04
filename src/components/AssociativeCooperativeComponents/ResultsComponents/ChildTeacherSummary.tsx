import * as React from "react";
import * as PropTypes from "prop-types";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import ChildBehaviorsPie from "./ChildBehaviorsPie.tsx";
import TeacherBehaviorsPie from "./TeacherBehaviorsPie.tsx";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

interface Props {
  ac: number,
  noAc: number,
  noChildOpp: number,
  support: number,
  noSupport: number,
  noTeacherOpp: number
}

/**
 * Swipe View for Child and Teacher Associative&Cooperative Pie Charts
 * @class ChildTeacherSummary
 * @return {void}
 */
class ChildTeacherSummary extends React.Component<Props, {}> {
  
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
        <Grid container direction="row">
          <Grid item xs={6}>
            <Grid container justify={"center"} direction={"column"}>
              <Typography style={{fontFamily: 'Arimo'}}>
                Compare how often children:
                <ul>
                  <li style={{color: '#6F39C4'}}>
                    Engaged in associative and cooperative interactions.
                  </li>
                  <li style={{color: '#ec2409'}}>
                    Played in the same area but did not interact.
                  </li>
                  <li style={{color: '#E99C2E'}}>
                    Played alone.
                  </li>
                </ul>
              </Typography>
              <Typography align={"center"} variant="subtitle1" style={{fontFamily: 'Arimo'}}>
                Child Behaviors
              </Typography>
              <ChildBehaviorsPie
                ac={this.props.ac}
                noAc={this.props.noAc}
                noChildOpp={this.props.noChildOpp}
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify={"center"} direction={"column"}>
            <Typography style={{fontFamily: 'Arimo'}}>
                Compare how often the teacher:
                <ul>
                  <li>
                    Supported children's associative and cooperative interactions.
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
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ChildTeacherSummary;