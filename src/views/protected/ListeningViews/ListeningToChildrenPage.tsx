import * as React from 'react';
// import * as PropTypes from 'prop-types';
// import Grid from "@material-ui/core/Grid";
// import Button from '@material-ui/core/Button';
// import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import TeacherChecklist from '../../../components/ListeningComponents/TeacherChecklist';
// import { withStyles } from '@material-ui/core/styles';
// import * as H from 'history';
import * as Types from '../../../constants/Types';
// import ReactRouterPropTypes from 'react-router-prop-types';

/* const styles: object = {
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  }
} */

/**
 * @function ListeningToChildrenPage
 * @return {ReactElement}
 */
function ListeningToChildrenPage(): React.ReactElement {
  // const { classes, history } = props;
  return (
    <div>
      <FirebaseContext.Consumer>
        {(firebase: Types.FirebaseAppBar): React.ReactNode => (<AppBar firebase={firebase} />)}
      </FirebaseContext.Consumer>
      {/* <header>
        <Grid container direction="row" alignItems="center" justify="flex-start">
          <Grid item xs={3}>
            <Grid container alignItems="center" justify="center">
              <Grid item>
                <Button variant="contained" size="medium" className={classes.backButton}
                  onClick={(): void => {
                    history.replace({
                      pathname: "/Magic8Menu",
                      state: {
                        type: "Observe"
                      }
                    })
                  }}>
                  <ChevronLeftRoundedIcon />
                  <b>Back</b>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </header> */}
      <main style={{ flexGrow: 1 }}>
        <FirebaseContext.Consumer>
          {(firebase: {
            auth: {
              currentUser: {
                uid: string
              }
            },
            handleSession(mEntry: {
              teacher: string,
              observedBy: string,
              type: string
            }): void,
            handlePushListening(mEntry: {
              checked: Array<number>
            }): Promise<void>
          }): React.ReactNode => (
            <TeacherChecklist
              firebase={firebase}
              type='LC'
            />
          )}
        </FirebaseContext.Consumer>
      </main>
    </div>
  );
}

ListeningToChildrenPage.propTypes = {
  // classes: PropTypes.object.isRequired,
  // history: ReactRouterPropTypes.history.isRequired
}

export default (ListeningToChildrenPage);