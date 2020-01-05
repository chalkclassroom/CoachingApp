import * as React from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import SummaryChildBehaviorsPieChart from "./SummaryChildBehaviorsPieChart";
import SummaryTeacherBehaviorsPieChart from "./SummaryTeacherBehaviorsPieChart";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

const styles = {};

/**
 * swipe view between child and teacher sequential results
 * @class ChildTeacherBehaviorPieSlider
 */
class ChildTeacherBehaviorPieSlider extends React.Component {
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
      <Slider {...settings}>
        <div>
          <Grid justify={"center"} direction={"column"}>
            <Typography align={"center"}>Child Behaviors</Typography>
            <SummaryChildBehaviorsPieChart />
          </Grid>
        </div>
        <div>
          <Grid justify={"center"} direction={"column"}>
            <Typography align={"center"}>Teacher Behaviors</Typography>
            <SummaryTeacherBehaviorsPieChart />
          </Grid>
        </div>
      </Slider>
    );
  }
}

/* ChildTeacherBehaviorPieSlider.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
}; */

export default withStyles(styles)(ChildTeacherBehaviorPieSlider);
