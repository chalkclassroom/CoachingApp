import * as React from "react";
import * as PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../components/AppBar";
import FirebaseContext from "../../components/Firebase/FirebaseContext";
import ResetForm from "./ResetForm";
import * as Types from '../../constants/Types';
import Firebase from '../../components/Firebase'

const styles: object = {
  root: {
    flexGrow: 1,
    backgroundColor: "#2196f3",
    height: "100vh"
  },
  grow: {
    flexGrow: 1
  }
};

interface Props {
  classes: {
    root: string,
    grow: string
  }
}

/**
 * @class ForgotPasswordPage
 */
class ForgotPasswordPage extends React.Component<Props, {}> {
  
  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {(firebase: Firebase): React.ReactElement => (
            <div>
              <AppBar firebase={firebase} />
              <ResetForm firebase={firebase} />
            </div>
          )}
        </FirebaseContext.Consumer>
      </div>
    );
  }
}

export default withStyles(styles)(ForgotPasswordPage);
