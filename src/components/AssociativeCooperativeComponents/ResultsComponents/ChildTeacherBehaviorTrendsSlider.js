import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Slider from "react-slick";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import ChildBehaviorTrendsVerticalBar from "./ChildBehaviorTrendsVerticalBar";
import TeacherBehaviorTrendsVerticalBar from "./TeacherBehaviorTrendsVerticalBar";
import {Line} from "react-chartjs-2";

const styles = {
};

const ChildBehaviorTrendsOptions = {
    showScale: true,
    pointDot: true,
    showLines: true,
    // title: {
    //     display: true,
    //     text: 'Transition Time Trends',
    //     fontSize: 20,
    //     fontStyle: 'bold'
    // },
    tooltips: {
        mode: 'index',
        intersect: false
    },

    hover: {
        mode: 'nearest',
        intersect: true,
    },
    scales: {
        xAxes: [
            {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Date",
                    fontStyle: "bold"
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    callback: function(value) {
                        return value + "%";
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: "% of Visits",
                    fontStyle: "bold"
                }
            }
        ]
    },

    plugins: {
        datalabels: {
            display: 'auto',
            color: 'gray',
            align: 'top',
            formatter: function(value, context) {
                return value + '%';
            }
        }
    }
};

const TeacherBehaviorTrendsOptions = {
    showScale: true,
    pointDot: true,
    showLines: true,
    // title: {
    //     display: true,
    //     text: 'Transition Time Trends',
    //     fontSize: 20,
    //     fontStyle: 'bold'
    // },
    tooltips: {
        mode: 'index',
        intersect: false
    },

    hover: {
        mode: 'nearest',
        intersect: true,
    },
    scales: {
        xAxes: [
            {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Date",
                    fontStyle: "bold"
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
                    callback: function(value) {
                        return value + "%";
                    }
                },
                scaleLabel: {
                    display: true,
                    labelString: "% of Visits",
                    fontStyle: "bold"
                }
            }
        ]
    },

    plugins: {
        datalabels: {
            display: 'auto',
            color: 'gray',
            align: 'top',
            formatter: function(value, context) {
                return value + '%';
            }
        }
    }
};

class ChildTeacherBehaviorTrendsSlider extends React.Component {
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
                {/*<div>*/}
                {/*    <Grid justify={"center"} direction={"column"}>*/}
                {/*        <Typography align={"center"}>*/}
                {/*            Child Behaviors*/}
                {/*        </Typography>*/}
                {/*        <ChildBehaviorTrendsVerticalBar/>*/}
                {/*    </Grid>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <Grid justify={"center"} direction={"column"}>*/}
                {/*        <Typography align={"center"}>*/}
                {/*            Teacher Behaviors*/}
                {/*        </Typography>*/}
                {/*        <TeacherBehaviorTrendsVerticalBar/>*/}
                {/*    </Grid>*/}
                {/*</div>*/}
                <div>
                    <Grid justify={"center"} direction={"column"}>
                        <Typography align={"center"}>
                            Child Behaviors
                        </Typography>

                        <Line
                            data={this.props.data}
                            options = {ChildBehaviorTrendsOptions}
                            width="650"
                            height="400"
                        />
                    </Grid>
                </div>
                <div>
                    <Grid justify={"center"} direction={"column"}>
                        <Typography align={"center"}>
                            Teacher Behaviors
                        </Typography>

                        <Line
                            data={this.props.data}
                            options = {TeacherBehaviorTrendsOptions}
                            width="650"
                            height="400"
                        />
                    </Grid>
                </div>
            </Slider>
        );
    }
}

ChildTeacherBehaviorTrendsSlider.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(ChildTeacherBehaviorTrendsSlider);
