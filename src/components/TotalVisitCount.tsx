import * as React from "react";
import * as PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles: object = {
  count: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 5,
    fontFamily: 'Arimo'
  }
};

interface Props{
  classes: { count: string },
  count: number
}

/**
 * displays count of center visits for centers-based observation tools
 * @class TotalVisitCount
 */
class TotalVisitCount extends React.Component<Props, {}> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired 
  };

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
      >
        <Grid>
          <div style={{ margin: 20 }} />
          <Typography variant="h5" component="h3" style={{fontFamily: 'Arimo'}}>
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

export default withStyles(styles)(TotalVisitCount);
