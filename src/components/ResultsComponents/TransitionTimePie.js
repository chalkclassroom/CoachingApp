import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const styles = {
    //idk how this works
};

const transitionData = {
    labels: [
        'Inside Transition',
        'Outside Transition',
        'Learning Activity (No Transition)'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#E99C2E',
            '#E55529',
            '#0988EC'
        ],
        hoverBackgroundColor: [
            '#E99C2E',
            '#E55529',
            '#0988EC'
        ]
    }]
};

class TransitionTimePie extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Pie data={transitionData}
                 width="650"
                 height="400"
            />
        );
    }
}

TransitionTimePie.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionTimePie);