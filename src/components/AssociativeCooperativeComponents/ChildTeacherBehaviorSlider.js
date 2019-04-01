import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Slider from "react-slick";
import ChildBehaviorsPie from "./ChildBehaviorsPie";
import TeacherBehaviorsPie from "./TeacherBehaviorsPie";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";

const styles = {
};


class ChildTeacherBehaviorSlider extends React.Component {
    render() {
        const { classes } = this.props;
        var settings = {
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
                        <Typography align={"center"}>
                            Child Behaviors
                        </Typography>
                        <ChildBehaviorsPie/>
                    </Grid>
                </div>
                <div>
                    <Grid justify={"center"} direction={"column"}>
                        <Typography align={"center"}>
                            Teacher Behaviors
                        </Typography>
                        <TeacherBehaviorsPie/>
                    </Grid>
                </div>
            </Slider>
        );
    }
}

ChildTeacherBehaviorSlider.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(ChildTeacherBehaviorSlider);