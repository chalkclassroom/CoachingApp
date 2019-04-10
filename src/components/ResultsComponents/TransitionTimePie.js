import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import FirebaseContext from "../../components/Firebase/context";

const styles = {
    //idk how this works
};


class TransitionTimePie extends React.Component {
    constructor(props){
        super(props);
    }

    state = {


    };


    render() {
        const { classes } = this.props;
        console.log("inside time: ", this.state.inside);
        let transitionData = {
            labels: [
                'Inside Transition',
                'Outside Transition',
                'Learning Activity (No Transition)'
            ],
            datasets: [{
                data: [this.props.insideTime, this.props.outsideTime, this.props.learningActivityTime],
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

TransitionTimePie.contextType = FirebaseContext;
export default withStyles(styles)(TransitionTimePie);