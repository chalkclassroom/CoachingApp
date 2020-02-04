import * as React from "react";
import * as PropTypes from "prop-types";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ChildBehaviorsDetailsHorizontalBar from "./ChildBehaviorsDetailsHorizontalBar.tsx";
import TeacherBehaviorsDetailsHorizontalBar from "./TeacherBehaviorsDetailsHorizontalBar.tsx";

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
            <Typography align={"center"}>Child Behaviors</Typography>
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
