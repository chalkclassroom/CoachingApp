import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import {
  lightGreen,
  deepOrange,
  orange,
  blue,
  indigo
} from "@material-ui/core/colors";
import { red } from "@material-ui/core/es/colors";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: "5%",
    marginRight: "5%"
  }
});

const getHexFromType = type => {
  switch (type) {
    case "waiting":
      return lightGreen[300];
    case "traveling":
      return orange[400];
    case "child waiting":
      return deepOrange[400];
    case "classroom routines":
      return blue[300];
    case "behavior management disruption":
      return red["A200"];
    case "other":
      return indigo["A200"];
  }
}

const TransitionLog = ({ entries, classes }) => {
  return (
    <div>
      <Paper className={classes.root} elevation={0}>
        <Typography variant="h5" component="h3" align="center" style={{fontFamily: 'Arimo'}}>
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
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: 'Arimo'
            }}
          >
            {entries.map((entry, index) => (
              <React.Fragment key={index}>
                <Divider />
                <ListItem
                  style={{
                    backgroundColor: getHexFromType(entry.transitionType),
                    color: 'white'
                  }}
                >
                  {new Date(entry.end).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "numeric"
                  })}
                  <br />
                  {entry.duration}
                  <br />
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
  classes: PropTypes.object.isRequired,
  entries: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    entries: state.transitionLogState.transitionStack
  };
};
export default withStyles(styles)(connect(mapStateToProps)(TransitionLog));
