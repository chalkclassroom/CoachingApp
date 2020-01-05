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
  acTime: number,
  noAcTime: number,
  noOppTime: number,
  supportTime: number,
  noSupportTime: number
}

/**
 * Swipe View for Child and Teacher Associative&Cooperative Pie Charts
 * @class ChildTeacherBehaviorDetailsSlider
 * @return {void}
 */
class ChildTeacherBehaviorPieSlider extends React.Component<Props, {}> {
  
  static propTypes = {
    acTime: PropTypes.number.isRequired,
    noAcTime: PropTypes.number.isRequired,
    noOppTime: PropTypes.number.isRequired,
    supportTime: PropTypes.number.isRequired,
    noSupportTime: PropTypes.number.isRequired
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
      <Slider {...settings}>
        <div>
          <Grid justify={"center"} direction={"column"}>
            <Typography align={"center"} variant={"h2"}>
              Child Behaviors
            </Typography>
            <ChildBehaviorsPie
              acTime={this.props.acTime}
              noAcTime={this.props.noAcTime}
              noOppTime={this.props.noOppTime}
            />
          </Grid>
        </div>
        <div>
          <Grid justify={"center"} direction={"column"}>
            <Typography align={"center"} variant={"h2"}>
              Teacher Behaviors
            </Typography>
            <TeacherBehaviorsPie
              supportTime={this.props.supportTime}
              noSupportTime={this.props.noSupportTime}
            />
          </Grid>
        </div>
      </Slider>
    );
  }
}

export default ChildTeacherBehaviorPieSlider;
