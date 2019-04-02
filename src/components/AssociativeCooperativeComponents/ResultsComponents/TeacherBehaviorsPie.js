import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const styles = {
    //idk how this works
};

/**
 * specifies data sets (and formatting) for child behaviors pie chart
 */
const teacherBehaviorsData = {
    labels: [
        'Teacher Support for Assoc./Coop. Interactions',
        'Teacher Present, No Support'
    ],
    datasets: [{
        data: [300, 50],
        backgroundColor: [
            '#0988EC',
            '#E99C2E'
        ],
        hoverBackgroundColor: [
            '#0988EC',
            '#E99C2E'
        ]
    }]
};

class TeacherBehaviorsPie extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Pie
                data={teacherBehaviorsData}
                width="650"
                height="400"
            />
        );
    }
}

 TeacherBehaviorsPie.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(TeacherBehaviorsPie);