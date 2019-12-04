import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";

const COLOR_1 = "#F9A796";
const COLOR_2 = "#E99C2E";
const COLOR_3 = "#E55529";
const obsTime = null;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: "5%",
    marginRight: "5%"
  }
});

let getHexFromType = type => {
  switch (type) {
    case "inside":
      return COLOR_2;
    case "outside":
      return COLOR_3;
    default:
      return "#FFFFFF";
  }
};

const TransitionLog = ({ entries, classes }) => {
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Recent Transitions
        </Typography>
        <Divider />
        <div
          style={{
            height: "28vh",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflow: "auto"
          }}
        >
          <List
            className={{
              display: "flex"
            }}
          >
            {entries.map((entry, index) => (
              <React.Fragment key={index}>
                <Divider />
                <ListItem
                  style={{
                    backgroundColor: "#759FE5"
                  }}
                >
                  {new Date(entry.end).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "numeric"
                  })}
                  <br />
                  Duration: {entry.duration}
                  <br />
                  {/* Type:{entry.transitionType === 'inside' ? "Inside Classroom" : "Outside Classroom"} */}
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </div>
      </Paper>
    </div>
  );
};

TransitionLog.propTypes = {
  entries: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    entries: state.transitionLogState.transitionStack
  };
};
export default withStyles(styles)(connect(mapStateToProps)(TransitionLog));
