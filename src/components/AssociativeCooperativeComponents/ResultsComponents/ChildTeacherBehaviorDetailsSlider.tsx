import * as React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ChildBehaviorsDetailsHorizontalBar from "./ChildBehaviorsDetailsHorizontalBar.tsx";
import TeacherBehaviorsDetailsHorizontalBar from "./TeacherBehaviorsDetailsHorizontalBar.tsx";

/**
 * Swipe View for Child and Teacher Associative&Cooperative Bar Charts
 * @class ChildTeacherBehaviorDetailsSlider
 * @return {void}
 */
class ChildTeacherBehaviorDetailsSlider extends React.Component {
  /**
   * render function
   * @return {ReactElement}
   */
  render() {
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
