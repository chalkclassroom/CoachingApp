import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../../components/AppBar';
import FirebaseContext from "../../components/Firebase/FirebaseContext";
import ResetForm from "./ResetForm"

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor:'#2196f3',
    height: '100vh'
  },
  grow: {
    flexGrow: 1,
  }
};

class Welcome extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase =>
            <div>
              <AppBar firebase={firebase}/>
              <ResetForm firebase={firebase}/>
            </div>
          }
        </FirebaseContext.Consumer>
      </div>
    );
  }
}

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);