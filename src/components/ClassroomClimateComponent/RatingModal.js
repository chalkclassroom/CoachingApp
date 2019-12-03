import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import YesNoDialog from "../../components/Shared/YesNoDialog";
import ExNegativeFaceImage from "../../assets/images/ExNegativeFaceImage.png";
import NegativeFaceImage from "../../assets/images/NegativeFaceImage.png";
import NeutralFaceImage from "../../assets/images/NeutralFaceImage.png";
import PleasantFaceImage from "../../assets/images/PleasantFaceImage.png";
import VibrantFaceImage from "../../assets/images/VibrantFaceImage.png";

function getModalStyle() {
  return {
    position: "fixed",
    top: `35%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: "80%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    borderRadius: 8
  }
});

class RatingModal extends React.Component {
  state = {
    rating: 0,
    value: "undefined"
  };

  handleAngerClick = event => {
    if (this.state.value !== "Anger") {
      this.setState({ value: "Anger" });
      this.setState({ rating: 1 });
    }
  };

  handleIrritationClick = () => {
    if (this.state.value !== "Irritation") {
      this.setState({ value: "Irritation" });
      this.setState({ rating: 2 });
    }
  };

  handleNeutralClick = () => {
    if (this.state.value !== "Neutral") {
      this.setState({ value: "Neutral" });
      this.setState({ rating: 3 });
    }
  };

  handlePositiveInterestClick = () => {
    if (this.state.value !== "Positive Interest") {
      this.setState({ value: "Positive Interest" });
      this.setState({ rating: 4 });
    }
  };

  handleExcitementClick = () => {
    if (this.state.value !== "Excitement") {
      this.setState({ value: "Excitement" });
      this.setState({ rating: 5 });
    }
  };

  /*
        N.B. You must wrap this "modal" component in a modal of your own.
        This is for performance reasons, cf. https://material-ui.com/utils/modal/#performance
     */
  render() {
    const { classes } = this.props;

    return (
      <div style={getModalStyle()} className={classes.paper}>
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="flex-start"
        >
          <Typography variant="h6" gutterBottom>
            Teacher Tone Rating
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            Please rate the teacher's current tone.
          </Typography>
          <div style={{ height: 20 }} />
          <Grid container direction={"row"} justify={"space-between"}>
            <Grid
              item
              align="center"
              alignItems="center"
              justify="center"
              direction={"column"}
              style={{ width: "20%" }}
            >
              <Grid item>
                <Button
                  onClick={this.handleAngerClick}
                  variant={this.state.value === "Anger" ? "contained" : "text"}
                >
                  <Typography variant="h2" align={"center"}>
                    1
                  </Typography>
                  {/* <img alt="angry face" src={ExNegativeFaceImage} width="100vw" /> */}
                </Button>
                <Typography variant={"h6"} align={"center"}>
                  Anger
                </Typography>
                <Typography variant={"body1"} align={"center"}>
                  (yelling, sarcasm)
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              align="center"
              alignItems="center"
              justify="center"
              direction={"column"}
              style={{ width: "20%" }}
            >
              <Grid item>
                <Button
                  onClick={this.handleIrritationClick}
                  variant={
                    this.state.value === "Irritation" ? "contained" : "text"
                  }
                >
                  <Typography variant="h2" align={"center"}>
                    2
                  </Typography>
                  {/* <img alt="irritated face" src={NegativeFaceImage} width="100vw" /> */}
                </Button>
                <Typography variant={"h6"} align={"center"}>
                  Irritation
                </Typography>
                <Typography variant={"body1"} align={"center"}>
                  (grimacing, eye-rolling)
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              align="center"
              alignItems="center"
              justify="center"
              direction={"column"}
              style={{ width: "20%" }}
            >
              <Grid item>
                <Button
                  onClick={this.handleNeutralClick}
                  variant={
                    this.state.value === "Neutral" ? "contained" : "text"
                  }
                >
                  <Typography variant="h2" align={"center"}>
                    3
                  </Typography>
                  {/* <img alt="neutral face" src={NeutralFaceImage} width="100vw" /> */}
                </Button>
                <Typography variant={"h6"} align={"center"}>
                  Neutral
                </Typography>
                <Typography variant={"body1"} align={"center"}>
                  (no facial expression)
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              align="center"
              alignItems="center"
              justify="center"
              direction={"column"}
              style={{ width: "20%" }}
            >
              <Button
                onClick={this.handlePositiveInterestClick}
                variant={
                  this.state.value === "Positive Interest"
                    ? "contained"
                    : "text"
                }
              >
                <Typography variant="h2" align={"center"}>
                  4
                </Typography>
                {/* <img
                  alt="positive interest face"
                  src={PleasantFaceImage}
                  width="100vw"
                /> */}
              </Button>
              <Typography variant={"h6"} align={"center"}>
                Positive Interest
              </Typography>
              <Typography variant={"body1"} align={"center"}>
                (smiling, nodding)
              </Typography>
            </Grid>
            <Grid
              item
              align="center"
              alignItems="center"
              justify="center"
              direction={"column"}
              style={{ width: "20%" }}
            >
              <Button
                onClick={this.handleExcitementClick}
                variant={
                  this.state.value === "Excitement" ? "contained" : "text"
                }
              >
                <Typography variant="h2" align={"center"}>
                  5
                </Typography>
                {/* <img alt="excited face" src={VibrantFaceImage} width="100vw" /> */}
              </Button>
              <Typography variant={"h6"} align={"center"}>
                Excitement
              </Typography>
              <Typography variant={"body1"} align={"center"}>
                (laughing, enthusiastic voice)
              </Typography>
            </Grid>
          </Grid>
          <div style={{ height: 20 }} />
          <Grid
            container
            alignItems={"center"}
            align="center"
            justify={"center"}
            direction={"row"}
            style={{ spacing: 4 }}
          >
            <Grid item xs={3} />
            <Grid item xs={3} justify={"center"}>
              <Button
                variant="contained"
                onClick={
                  this.state.rating === 0
                    ? this.props.handleIncomplete
                    : this.props.handleRatingConfirmation.bind(
                        this,
                        this.state.rating
                      )
                }
                style={{
                  backgroundColor: "#0988ec",
                  fontSize: "15px",
                  width: "170px"
                }}
              >
                Confirm Rating
              </Button>
            </Grid>
            <Grid item xs={3}>
              <YesNoDialog
                buttonText={"Skip Rating"}
                buttonVariant={"contained"}
                buttonColor={"#e55529"}
                buttonWidth={"170px"}
                backgroundColor={"#fff"}
                buttonStyle={{ margin: 10 }}
                dialogTitle={`Are you sure you want to skip this rating? This option should only be used in exceptional circumstances.`}
                onAccept={this.props.handleRatingConfirmation}
                onAcceptParams={0}
                shouldOpen={true}
              />
            </Grid>
            <Grid item xs={3} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

RatingModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RatingModal);
