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
const childBehaviorsData = {
    labels: ['August 19, 2018',
        'September 30, 2018',
        'October 22, 2018'
      ],
    datasets: [
        {
            label:'2+ People, No Assoc./Coop. Interaction',
            backgroundColor: '#E99C2E',
            borderColor: '#E99C2E',
            borderWidth: 2,
            data: [32, 27, 29]
        },
        {
          label: "Associative and/or Cooperative",
          backgroundColor: '#6F39C4',
          borderColor: '#6F39C4',
          borderWidth: 2,
          data: [12, 14, 19]

        }

    ]
};

class ChildBehaviorTrendsVerticalBar extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Bar data={childBehaviorsData}
                           width="650"
                           height="400"/>
        );
    }
}

ChildBehaviorTrendsVerticalBar.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(ChildBehaviorTrendsVerticalBar);
