import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { popOffClimateStack, pushOntoClimateStack } from "../../state/actions/classroom-climate";
import FirebaseContext from "../../components/Firebase/FirebaseContext";
import { VictoryPie } from "victory-pie";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import exNegativeFace from "../../assets/icons/1-ex-negative-cqref.png";
import negativeFace from "../../assets/icons/2-negative-cqref.png";
import flatFace from "../../assets/icons/3-flat-cqref.png";
import pleasantFace from "../../assets/icons/4-pleasant-cqref.png";
import vibrantFace from "../../assets/icons/5-vibrant-cqref.png";

const styles = ({

});

class AverageToneRating extends React.Component {
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
              src={exNegativeFace}
              width="70vw"
            />
          </Grid>
          <Grid item>
            <img
              alt="negative face"
              src={negativeFace}
              width="70vw"
            />
          </Grid>
          <Grid item>
            <img
              alt="flat face"
              src={flatFace}
              width="70vw"
            />
          </Grid>
          <Grid item>
            <img
              alt="pleasant face"
              src={pleasantFace}
              width="70vw"
            />
          </Grid>
          <Grid item>
            <img
              alt="vibrant face"
              src={vibrantFace}
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

AverageToneRating.propTypes = {

};
AverageToneRating.contextType = FirebaseContext;
export default withStyles(styles)(AverageToneRating);
