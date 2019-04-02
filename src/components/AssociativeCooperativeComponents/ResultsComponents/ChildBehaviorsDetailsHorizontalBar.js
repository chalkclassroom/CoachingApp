import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { HorizontalBar, Line } from "react-chartjs-2";

const styles = {
    //idk how this works
};

/**
 * specifies data sets (and formatting) for the child behaviors details horizontal bar
 * @type {{datasets: *[], labels: string[][]}}
 */
const childBehaviorsData = {
    labels: ['Talking to each other about current activity',
        'Engaging in pretend play without clear roles or order',
        'Following formal rules and/or taking turns',
        'Speaking or acting in character during a clear pretend play scenario'],
    datasets: [
        {
            label:'Number of Times Oberserved',
            backgroundColor: '#a086c9',
            borderColor: '#6F39C4',
            borderWidth: 2,
            data: [65, 59, 80, 81]
        }
    ]
};

class ChildBehaviorsDetailsHorizontalBar extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <HorizontalBar data={childBehaviorsData}
                           width="650"
                           height="400"/>
        );
    }
}

ChildBehaviorsDetailsHorizontalBar.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(ChildBehaviorsDetailsHorizontalBar);