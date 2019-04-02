import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import {
  withStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toggleNewTransitionType } from "../../../state/actions/transition-time";

// const COLOR_1 = "#F9A796";
const COLOR_2 = "#FFE79D";
const COLOR_3 = "#4DEDBC";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  grow: {
    flexGrow: 1
  }
});

class TransitionType extends React.Component {
  render() {
    const transitionTypeTheme = primary =>
      createMuiTheme({
        palette: {
          primary: {
            main: primary
          },
          secondary: {
            main: "#ffffff"
          }
        }
      });

    const transitionTypes = [
      {
        name: "inside",
        color: COLOR_2
      },
      {
        name: "outside",
        color: COLOR_3
      }
    ];

    return (
      <div>
        <Grid container className={this.props.classes.grow} spacing={16}>
          {transitionTypes.map((type, index) => (
            <Grid item key={index}>
              <MuiThemeProvider theme={transitionTypeTheme(type.color)}>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  style={{ maxWidth: 100, minHeight: 67 }}
                  onClick={() => this.props.toggleNewTransitionType(type.name)}
                >
                  {type.name === 'inside' ? "Inside Classroom" : "Outside Classroom"}
                </Button>
              </MuiThemeProvider>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

TransitionType.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    null,
    { toggleNewTransitionType }
  )(TransitionType)
);
