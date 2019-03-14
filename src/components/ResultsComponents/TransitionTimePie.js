import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { VictoryPie } from "victory-pie";

const styles = {
    //idk how this works
};

class TransitionTimePie extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <VictoryPie
                data={[
                    {
                        x: "Inside Transition\n(17%)",
                        y: 15
                    },
                    {
                        x: "Outside Transition\n(17%)",
                        y: 12
                    },
                    {
                        x: "Non-Transition\n(17%)",
                        y: 47
                    }
                ]}
                colorScale={["#E99C2E", "#E55529", "#0988EC"]}
                labelRadius={60}
                style={{
                    labels: {
                        fill: "white",
                        fontSize: 12
                    }
                }}
            />
        );
    }
}

TransitionTimePie.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionTimePie);