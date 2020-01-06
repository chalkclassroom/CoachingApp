import * as React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ChildBehaviorsDetailsHorizontalBar from "./ChildBehaviorsDetailsHorizontalBar";
import TeacherBehaviorsDetailsHorizontalBar from "./TeacherBehaviorsDetailsHorizontalBar";

/**
 * Swipe View for Child and Teacher Associative&Cooperative Bar Charts
 * @class ChildTeacherBehaviorDetailsSlider
 * @return {void}
 */
class ChildTeacherBehaviorDetailsSlider extends React.Component {
  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    // const { classes } = this.props;
    // var settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1
    // };
    return (
      <div>
        <Grid justify={"center"} direction={"column"}>
          <Typography align={"center"}>Child Behaviors</Typography>
          <ChildBehaviorsDetailsHorizontalBar />
        </Grid>
        <Grid justify={"center"} direction={"column"}>
          <Typography align={"center"}>Teacher Behaviors</Typography>
          <TeacherBehaviorsDetailsHorizontalBar />
        </Grid>
      </div>
    );
  }
}


export default ChildTeacherBehaviorDetailsSlider;
