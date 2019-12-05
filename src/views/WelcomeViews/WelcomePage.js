import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../../components/AppBar';
import LandingPage from './LandingPage';
import FirebaseContext from "../../components/Firebase/FirebaseContext";

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor:'#ffffff',
    height: '100vh'
  },
  grow: {
    flexGrow: 1,
  }
};

class WelcomePage extends React.Component {
  render() {
    const {classes} = this.props;
    return ( 
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase}/>}
        </FirebaseContext.Consumer>
        <FirebaseContext.Consumer>
          {firebase => <LandingPage firebase={firebase}/> }
        </FirebaseContext.Consumer>
      </div>
    );
  }
}

WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WelcomePage);