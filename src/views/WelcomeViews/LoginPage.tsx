import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FirebaseContext from "../../components/Firebase/FirebaseContext";
import Firebase from '../../components/Firebase'
import LoginForm from '../../components/LoginComponent/LoginForm'

import * as Constants from '../../constants/Constants';

import LogoImage from "../../assets/images/LogoImage.svg";

let styles: object = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor:Constants.Colors.AppBar,
    height: '100vh'
  },
  logoWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'nowrap',
    marginBottom: '20px',
  },
  logoImageWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    height: '110px',
    width: '110px',
    borderRadius: '100px',
    marginBottom: '15px',
  },
  logoText: {
    color: 'white',
    fontFamily: 'Arimo',
    fontSize: '2.3rem',
    fontWeight: 'bold',
  },
  loginFormWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '800px',
    padding: '20px',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: '5px',
  },
};

interface Props {
  classes: {
    root: string,
    logoWrap: string,
    logoImageWrap: string,
    logoText: string,
    loginFormWrap: string,
  }
}

/**
 * Login/Home Page
 * @class LoginPage
 */
class LoginPage extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      screenOrientation: window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape",
    }
  }

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  // Update orientation state to update styles in rendering
  setScreenOrientation = () => {
    if (window.matchMedia("(orientation: portrait)").matches) {
      console.log('orientation: portrait');
      this.setState({
        screenOrientation: 'portrait'
      });
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
      console.log('orientation: landscape');
      this.setState({
        screenOrientation: 'landscape'
      });
    }
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const {classes} = this.props;

    // Event listener for orientation change (so we can change the view to column for portrait mode)
    window.addEventListener("resize", this.setScreenOrientation);

    // Update styles based on screen orientation.
    const wrapFlexDirection = this.state.screenOrientation == "portrait" ? "column" : "row";
    const wrapFlexJustifyContent = this.state.screenOrientation == "portrait" ? "center" : "space-around";
    const formWrapWidth = this.state.screenOrientation == "portrait" ? "55vw" : "45vw";

    return (
      // <div className={classes.root}>
      <div style={{ flexDirection: wrapFlexDirection, justifyContent: wrapFlexJustifyContent}} className={classes.root}>


        <div className={classes.logoWrap}>
          <div className={classes.logoImageWrap}>
            <img src={LogoImage} height="80" alt="OWL" />
          </div>
          <span className={classes.logoText}>CHALK COACHING</span>
        </div>
        <div style={{width: formWrapWidth}} className={classes.loginFormWrap}>
          <FirebaseContext.Consumer>
            {(firebase: Firebase): React.ReactNode => <LoginForm firebase={firebase} />}
          </FirebaseContext.Consumer>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);