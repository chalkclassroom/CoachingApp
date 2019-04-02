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
const childBehaviorsData = {
    labels: [
        'Assoc./Coop. Interaction',
        'No Assoc./Coop. Interaction',
        'No Opportunity (1 Child)'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#6F39C4',
            '#E99C2E',
            '#E55529'
        ],
        hoverBackgroundColor: [
            '#6F39C4',
            '#E99C2E',
            '#E55529'
        ]
    }]
};

class ChildBehaviorsPie extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Pie
                data={childBehaviorsData}
                width="650"
                height="400"
            />
        );
    }
}

 ChildBehaviorsPie.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(ChildBehaviorsPie);