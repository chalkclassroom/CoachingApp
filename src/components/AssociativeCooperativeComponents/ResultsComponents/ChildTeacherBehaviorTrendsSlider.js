import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Slider from "react-slick";
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import { Line } from "react-chartjs-2";

const styles = {};

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
    mode: "index",
    intersect: false
  },
  hover: {
    mode: "nearest",
    intersect: true
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
      display: "auto",
      color: "gray",
      align: "top",
      formatter: function(value) {
        return value + "%";
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
    mode: "index",
    intersect: false
  },
  hover: {
    mode: "nearest",
    intersect: true
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
      display: "auto",
      color: "gray",
      align: "top",
      formatter: function(value) {
        return value + "%";
      }
    }
  }
};

/**
 * Swipe View for Child and Teacher Associative&Cooperative Trends Graphs
 * @class ChildTeacherBehaviorTrendsSlider
 * @return {void}
 */
class ChildTeacherBehaviorTrendsSlider extends React.Component {
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
            <Line
              data={this.props.childData}
              options={ChildBehaviorTrendsOptions}
              width="650"
              height="400"
            />
          </Grid>
        </div>
        <div>
          <Grid justify={"center"} direction={"column"}>
            <Typography align={"center"}>Teacher Behaviors</Typography>
            <Line
              data={this.props.teacherData}
              options={TeacherBehaviorTrendsOptions}
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
  // classes: PropTypes.object.isRequired,
  // data: PropTypes.object.isRequired,
  childData: PropTypes.func.isRequired,
  teacherData: PropTypes.func.isRequired
};

export default withStyles(styles)(ChildTeacherBehaviorTrendsSlider);
