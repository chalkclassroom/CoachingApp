import * as React from 'react';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/FirebaseContext";
import TeacherChecklist from '../../../components/ListeningComponents/TeacherChecklist';
import { withStyles } from '@material-ui/core/styles';

const styles: object = {
  backButton: {
    marginTop: '0.5em',
    marginBottom: '0.5em',
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  }
}

interface Teacher {
  email: string,
  firstName: string,
  lastName: string,
  notes: string,
  id: string,
  phone: string,
  role: string,
  school: string
};

interface Props {
  classes: {
    backButton: string
  },
  location: {
    state: {
      teacher: Teacher,
      teachers: Array<Teacher>
    }
  },
  history: {
    replace(
      param: {
        pathname: string,
        state: {
          type: string
        }
      }
    ): void
  }
};

/**
 * @function ListeningToChildrenPage
 * @param {Props} props
 * @return {ReactElement}
 */
function ListeningToChildrenPage(props: Props): React.ReactElement {
  const { classes, location, history } = props;
  return (
    <div>
      <FirebaseContext.Consumer>
        {(firebase: object): React.ReactNode => (<AppBar firebase={firebase} />)}
      </FirebaseContext.Consumer>
      <header>
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
      </header>
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

export default withStyles(styles)(ListeningToChildrenPage);