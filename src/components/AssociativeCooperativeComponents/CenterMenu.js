import React from "react";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import purple from "@material-ui/core/colors/purple";
import grey from "@material-ui/core/colors/grey";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  cssRoot: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700]
    }
  }
});

const VisitCenterButton = ({ centerName, visitCount, onClick }) => {
  let hsl = Math.max(82 - 4 * visitCount, 54);

  return (
    <Button
      variant="contained"
      color="primary"
      style={{
        minHeight: 150,
        minWidth: 150,
        backgroundColor: `hsl(247, 92%, ${hsl}%`
      }}
      onClick={onClick}
    >
      {centerName}
      <br />
      <br />
      {visitCount}
    </Button>
  );
};

class NewCenterDialog extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a New Center</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the name of the new center.
          </DialogContentText>
          <TextField
            autoFocus
            inputRef={cn => (this.centerName = cn)}
            margin="dense"
            id="center-name"
            label="Center Name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => this.props.handleSubmit(this.centerName.value)}
            color="primary"
          >
            Add Center
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

class CenterMenu extends React.Component {
  state = {
    addDialog: false,
    centers: [
      { name: "a", count: 0 },
      { name: "b", count: 1 },
      { name: "c", count: 2 },
      { name: "d", count: 3 },
      { name: "e", count: 3 }
    ]
  };

  handleClickOpen = () => {
    this.setState({ addDialog: true });
  };

  handleClose = () => {
    this.setState({ addDialog: false });
  };

  handleAddCenter = centerName => {
    if (
      centerName === "" ||
      this.state.centers.some(center => center.name === centerName)
    ) {
      this.handleClose();
      return;
    }
    let newCenters = [...this.state.centers, { name: centerName, count: 0 }];
    this.setState({ centers: newCenters });
    console.log(centerName);
    this.handleClose();
  };

  // Entry point for a center visit.
  handleCenterVisit = centerName => {
    let success = true;
    /*
      Add logic here for the center rating pop up. 
      If the submission succeeds, then we call finishCenterVisit to add to the visit count.
    */
    if (success) {
      this.finishCenterVisit(centerName);
    }
  };

  // Exit point for a center visit.
  finishCenterVisit = centerName => {
    let newCenters = [...this.state.centers];
    newCenters.some(center => {
      if (center.name === centerName) {
        ++center.count;
        return true;
      }
      return false;
    });
    this.setState({ centers: newCenters });
  };

  render() {
    return (
      <Grid container spacing={8}>
        <NewCenterDialog
          open={this.state.addDialog}
          handleClose={this.handleClose}
          handleSubmit={this.handleAddCenter}
        />
        {this.state.centers.map((center, index) => (
          <Grid item xs={3}>
            <VisitCenterButton
              centerName={center.name}
              visitCount={center.count}
              onClick={() => this.handleCenterVisit(center.name)}
            />
          </Grid>
        ))}
        <Grid item xs={3}>
          <Button
            variant="contained"
            style={{
              minHeight: 150,
              minWidth: 150,
              backgroundColor: grey[400]
            }}
            onClick={this.handleClickOpen}
          >
            Add Center <br /> <br /> +
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(CenterMenu);
