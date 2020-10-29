import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { List, ListItem, ListItemText }from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { connect } from "react-redux";
import * as Constants from '../../../constants/Constants';
import * as Types from '../../../constants/Types';

interface TransitionEntry {
  duration: string,
  end: string,
  start: string,
  transitionType: string
}

interface Props {
  classes: { root: string, listDiv: string, list: string, listItem: string },
  entries: Array<TransitionEntry>
}

const styles: object = {
  root: {
    margin: '1em',
    paddingRight: '1em',
    paddingLeft: '1em',
    paddingBottom: '1em'
  },
  listDiv: {
    height: "22vh",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "scroll",
    overflowX: 'hidden',
    webkitOverflowScrolling: 'touch'
  },
  list: {
    display: "flex",
    flexDirection: "column",
    fontFamily: 'Arimo',
    // overflowY: 'auto'
  },
  listItem: {
    width: 'auto',
    padding: '0.5em'
  },
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation: portrait)': {
    listDiv: {
      height: 'auto',
      overflowX: 'auto',
      overflowY: 'hidden',
      maxWidth: '25vw'
    },
    list: {
      flexDirection: 'row',
      // overflowX: 'auto',
    },
    listItem: {
      width: '50em',
      // padding: '0.5em',
      // height: 'auto'
    }
  }
};

const getHexFromType = (type: string): string | undefined => {
  switch (type) {
    case "waiting":
      return Constants.TransitionTypeColors.lineColor;
    case "traveling":
      return Constants.TransitionTypeColors.travelingColor;
    case "child waiting":
      return Constants.TransitionTypeColors.waitingColor;
    case "classroom routines":
      return Constants.TransitionTypeColors.routinesColor;
    case "behavior management disruption":
      return Constants.TransitionTypeColors.behaviorManagementColor;
    case "other":
      return Constants.TransitionTypeColors.otherColor;
  }
}

/**
 * @param {Props} props 
 * @return {ReactElement}
 */
function TransitionLog(props: Props): React.ReactElement {
  const {classes, entries} = props;
  return (
    <div>
      <Paper className={classes.root} elevation={0} style={{overflowY: 'auto'}}>
        <Typography variant="h6" component="h3" align="center" style={{fontFamily: 'Arimo'}}>
          Recent Transitions
        </Typography>
        <Divider />
        <div className={classes.listDiv}>
          <List className={classes.list}>
            {entries.map((entry, index) => (
              <React.Fragment key={index}>
                <Divider />
                <ListItem
                  style={{
                    backgroundColor: getHexFromType(entry.transitionType),
                    color: 'white'
                  }}
                  className={classes.listItem}
                >
                  <ListItemText
                    primary={new Date(entry.end).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "numeric"
                    })}
                    secondary={entry.duration}
                    secondaryTypographyProps={{color: 'white'}}
                  />
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
  classes: PropTypes.exact({
    root: PropTypes.string,
    listDiv: PropTypes.string,
    list: PropTypes.string,
    listItem: PropTypes.string
  }).isRequired,
  entries: PropTypes.array.isRequired
};

const mapStateToProps = (state: Types.ReduxState): {entries: Array<{
  duration: string,
  end: string,
  start: string,
  transitionType: string
}>} => {
  return {
    entries: state.transitionLogState.transitionStack
  };
};

export default withStyles(styles)(connect(mapStateToProps)(TransitionLog));
