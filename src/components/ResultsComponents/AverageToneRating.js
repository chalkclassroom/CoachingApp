import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { popOffClimateStack, pushOntoClimateStack } from "../../state/actions/classroom-climate";
import FirebaseContext from "../../components/Firebase/context";
import { VictoryPie } from "victory-pie";
import Grid from "@material-ui/core/Grid";

const styles = ({

});

class averageToneRating extends React.Component {
    constructor(props){
      super(props);
    }

    handlePushFire = entry => {

    };



  CustomUI = (props) => {
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
