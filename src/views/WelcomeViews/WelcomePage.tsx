import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../../components/AppBar';
import LandingPage from './LandingPage';
import FirebaseContext from "../../components/Firebase/FirebaseContext";
import * as Types from '../../constants/Types';
import Firebase from '../../components/Firebase'

const styles: object = {
  root: {
    flexGrow: 1,
    backgroundColor:'#ffffff',
    height: '100vh'
  },
};

interface Props {
  classes: { root: string }
}

/**
 * welcome page
 * @class WelcomePage
 */
class WelcomePage extends React.Component<Props, {}> {
  static propTypes = {
    classes: PropTypes.object.isRequired
  }
  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: Firebase): React.ReactNode => <AppBar firebase={firebase}/>}
        </FirebaseContext.Consumer>
        <FirebaseContext.Consumer>
          {(firebase: {
            emailListSignUp(email: string): Promise<void>,
            firebasePilotSignUp(userData: {
              email: string,
              program: string,
              firstName: string,
              lastName: string
            }): Promise<void>
          }): React.ReactNode => <LandingPage firebase={firebase}/> }
        </FirebaseContext.Consumer>
      </div>
    );
  }
}

WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WelcomePage);