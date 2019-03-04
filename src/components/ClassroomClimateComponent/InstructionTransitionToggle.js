import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { pushOntoClimateStack, toggleNewClimateType } from "../../state/actions/classroom-climate";
import purple from "@material-ui/core/colors/purple";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
  grow: {
    flexGrow: 1
  },
  colorSwitchBase: {
    color: purple[300],
    "&$colorChecked": {
      color: purple[500],
      "& + $colorBar": {
        backgroundColor: purple[500]
      }
    }
  },
  colorBar: {},
  colorChecked: {},
  iOSSwitchBase: {
    "&$iOSChecked": {
      color: theme.palette.common.white,
      "& + $iOSBar": {
        backgroundColor: "#74B9FF"
      }
    },
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp
    })
  },
  iOSChecked: {
    transform: "translateX(15px)",
    "& + $iOSBar": {
      opacity: 1,
      border: "none"
    }
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: "solid 1px",
    borderColor: theme.palette.grey[400],
    backgroundColor: "#81ECEC",
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"])
  },
  iOSIcon: {
    width: 24,
    height: 24
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1]
  }
});


class InstructionTransitionToggle extends React.Component {

  handleChange = () => {
    this.props.climateType === "transition" ? this.props.toggleNewClimateType("instruction") : this.props.toggleNewClimateType("transition");
  };

  constructor(props) {
    super(props);
  }

    render() {
        return (
          <FormControlLabel
            value="start"
            control={<FormControlLabel
              style={{ paddingLeft: 10 }}
              control={
                <Switch
                  classes={{
                    switchBase: this.props.classes.iOSSwitchBase,
                    bar: this.props.classes.iOSBar,
                    icon: this.props.classes.iOSIcon,
                    iconChecked: this.props.classes.iOSIconChecked,
                    checked: this.props.classes.iOSChecked
                  }}
                  disableRipple
                  checked={this.props.climateType === "transition"}
                  onChange={() => this.handleChange()}
                  value="climateType"
                />
              }
              label="Transition"
            />
            }
            label="Instruction"
            labelPlacement="start"
          />
        );
    }
}

InstructionTransitionToggle.propTypes = {
  climateType: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    climateType: state.climateTypeState.climateType
  };
};

export default withStyles(styles)(
    connect(
      mapStateToProps,
      { pushOntoClimateStack, toggleNewClimateType }
    )(InstructionTransitionToggle)
);
