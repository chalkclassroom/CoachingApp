import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ChildBehaviorsDetailsHorizontalBar from "./ChildBehaviorsDetailsHorizontalBar";
import TeacherBehaviorsDetailsHorizontalBar from "./TeacherBehaviorsDetailsHorizontalBar";

const styles = {
};


class ChildTeacherBehaviorDetailsSlider extends React.Component {
    render() {
        const { classes } = this.props;
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
                    <Typography align={"center"}>
                        Child Behaviors
                    </Typography>
                    <ChildBehaviorsDetailsHorizontalBar/>
                </Grid>


                <Grid justify={"center"} direction={"column"}>
                    <Typography align={"center"}>
                        Teacher Behaviors
                    </Typography>
                    <TeacherBehaviorsDetailsHorizontalBar/>
                </Grid>
            </div>

        );
    }
}

ChildTeacherBehaviorDetailsSlider.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(ChildTeacherBehaviorDetailsSlider);