import React from "react";
import { withStyles } from "@material-ui/core/styles";
//import PropTypes from "prop-types";
/* import { connect } from "react-redux";
import {
  popOffClimateStack,
  pushOntoClimateStack
} from "../../state/actions/classroom-climate"; */
import FirebaseContext from "../../components/Firebase/FirebaseContext";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import ExNegativeFaceImage from "../../assets/images/ExNegativeFaceImage.png";
import NegativeFaceImage from "../../assets/images/NegativeFaceImage.png";
import NeutralFaceImage from "../../assets/images/NeutralFaceImage.png";
import PleasantFaceImage from "../../assets/images/PleasantFaceImage.png";
import VibrantFaceImage from "../../assets/images/VibrantFaceImage.png";

const styles = {};

class AverageToneRating extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePushFire = entry => {};

  CustomUI = props => {
    return (
      <div>
        <Grid container direction={"row"} justify={"space-between"}>
          <Grid item>
            <img
              alt="extreme negative face"
              src={ExNegativeFaceImage}
              width="70vw"
            />
          </Grid>
          <Grid item>
            <img alt="negative face" src={NegativeFaceImage} width="70vw" />
          </Grid>
          <Grid item>
            <img alt="flat face" src={NeutralFaceImage} width="70vw" />
          </Grid>
          <Grid item>
            <img alt="pleasant face" src={PleasantFaceImage} width="70vw" />
          </Grid>
          <Grid item>
            <img alt="vibrant face" src={VibrantFaceImage} width="70vw" />
          </Grid>
        </Grid>
        <div style={{ marginTop: "5%" }}>
          <LinearProgress
            variant="determinate"
            value={this.props.averageToneRating * 20}
            style={{ height: 10, width: "75vh" }}
          ></LinearProgress>
        </div>
      </div>
    );
  };

  render() {
    return <>{this.CustomUI(this.props)}</>;
  }
}

AverageToneRating.propTypes = {};
AverageToneRating.contextType = FirebaseContext;
export default withStyles(styles)(AverageToneRating);
