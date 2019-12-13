import React from "react";
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  count: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 5
  }
};

/**
 * displays count of center visits for centers-based observation tools
 * @class TotalVisitCount
 */
class TotalVisitCount extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="flex-end"
        alignItems="center"
        height="28vh"
      >
        <Grid>
          <div style={{ margin: 20 }} />
          <Typography variant="h5" component="h3">
            Total Visits:
          </Typography>
          <Typography
            variant="h4"
            component="h3"
            align="center"
            className={classes.count}
          >
            {this.props.count}
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

TotalVisitCount.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired
};

export default withStyles(styles)(TotalVisitCount);
