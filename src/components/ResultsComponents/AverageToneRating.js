import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { popOffClimateStack, pushOntoClimateStack } from "../../state/actions/classroom-climate";
import FirebaseContext from "../../components/Firebase/context";
import { VictoryPie } from "victory-pie";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import ExNegativeFace from "../../assets/icons/ExNegativeFaceImage.png";
import NegativeFace from "../../assets/icons/NegativeFaceImage.png";
import NeutralFace from "../../assets/icons/NeutralFaceImage.png";
import PleasantFace from "../../assets/icons/PleasantFaceImage.png";
import VibrantFace from "../../assets/icons/VibrantFaceImage.png";

const styles = ({

});

class averageToneRating extends React.Component {
  constructor(props){
    super(props);
  }

  handlePushFire = entry => {

  };



  CustomUI = (props) => {
    return(
      <div>
        <Grid
          container
          direction={"row"}
          justify={"space-between"}
        >
          <Grid item>
            <img
              alt="extreme negative face"
              src={ExNegativeFace}
              width="70vw"
            />
          </Grid>
          <Grid item>
            <img
              alt="negative face"
              src={NegativeFace}
              width="70vw"
            />
          </Grid>
          <Grid item>
            <img
              alt="flat face"
              src={NeutralFace}
              width="70vw"
            />
          </Grid>
          <Grid item>
            <img
              alt="pleasant face"
              src={PleasantFace}
              width="70vw"
            />
          </Grid>
          <Grid item>
            <img
              alt="vibrant face"
              src={VibrantFace}
              width="70vw"
            />
          </Grid>
        </Grid>
        <div style={{marginTop: "5%"}}>
          <LinearProgress
            variant="determinate"
            value={this.props.averageToneRating *20}
            style={{ height: 10, width: "75vh"}}>
          </LinearProgress>
        </div>
      </div>
    )
  };


  render() {
    return (
      <>
        {this.CustomUI(this.props)}
      </>
    );
  }
}

averageToneRating.propTypes = {

};
averageToneRating.contextType = FirebaseContext;
export default withStyles(styles)(averageToneRating);
