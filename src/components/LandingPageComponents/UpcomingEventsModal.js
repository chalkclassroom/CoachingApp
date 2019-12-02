import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import ReimagineBadgeJPG from "../../assets/icons/ReimagineBadgeJPG.jpg";

function getModalStyle() {
  return {
    position: "fixed",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}
  
const styles = theme => ({
  paper: {
    position: "absolute",
    width: "67%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: 8
  },
  infoText: {
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    fontSize: 22,
    padding: 10
  },
  detailText: {
    fontFamily: "Arimo",
    fontSize: 18,
    padding: 10
  },
  titleText: {
    fontFamily: 'Arimo',
    fontWeight: 'bold',
    padding: 10
  }
});

class UpcomingEventsModal extends React.Component {
  state = {
      open: true
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal open={this.state.open}>
          <div style={getModalStyle()} className={classes.paper}>
            <Grid
              container
              alignItems="center"
              direction="column"
              justify="flex-start"
            >
              <Grid item>
                <Typography variant="h3" className={classes.titleText}>
                  Upcoming Events
                </Typography>
              </Grid>
              <Grid item>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                  <Grid item xs={6}>
                    <img src={ReimagineBadgeJPG} width="90%" alt="Reimagine Education" />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.infoText}>
                      December 8 - 10, 2019
                    </Typography>
                    <Typography className={classes.infoText}>
                      London, United Kingdom
                    </Typography>
                    <Typography className={classes.detailText}>
                      CHALK Coaching has been shortlisted by Reimagine Education for the ICT Tools for Teaching and Learning Award.
                      We will be presenting our work at the conference on Monday, December 9, 2019.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}
    
export default withStyles(styles)(UpcomingEventsModal);