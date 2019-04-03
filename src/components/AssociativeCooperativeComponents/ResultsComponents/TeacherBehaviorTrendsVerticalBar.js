import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Bar, Line } from "react-chartjs-2";

const styles = {
    //idk how this works
};

/**
 * specifies data sets (and formatting) for the child behaviors details horizontal bar
 * @type {{datasets: *[], labels: string[][]}}
 */
const teacherBehaviorsData = {
    labels: [
        'August 19, 2018',
        'September 30, 2018',
        'October 22, 2018'
    ],
    datasets: [
        {
            label:'Present, but No Support',
            backgroundColor: '#E99C2E',
            borderColor: '#E99C2E',
            borderWidth: 2,
            data: [4, 5, 7]
        },
        {
          label: 'Teacher Support',
          backgroundColor: '#0988EC',
          borderColor: '#0988EC',
          borderWidth: 2,
          data: [6, 5, 8]

        }

    ]
};

class TeacherBehaviorTrendsVerticalBar extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Bar data={teacherBehaviorsData}
                           width="650"
                           height="400"
                 options={{
                     scales: {
                         yAxes: [{
                             ticks: {
                                 suggestedMin: 0,
                                 suggestedMax: 10
                             }
                         }]
                     }
                 }}
            />
        );
    }
}

TeacherBehaviorTrendsVerticalBar.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(TeacherBehaviorTrendsVerticalBar);
