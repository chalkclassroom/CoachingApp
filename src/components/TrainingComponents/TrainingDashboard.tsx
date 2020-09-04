import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { Button, Card, Grid } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
// import * as Types from '../../constants/Types';

const AppBarTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.AppBar
    }
  },
  typography: {
    useNextVariants: true
  }
});

const styles: object = {
  card: {
    border: "3px solid #d9d9d9",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: "100%",
    boxShadow: "5px",
    width: "90%",
    marginRight: "5%",
    marginLeft: "5%",
    marginBottom: "5%",
    alignItems: "center",
    justify: "space-evenly",
    display: "flex",
    flexDirection: 'column',
    flex: "1",
    flexWrap: 'nowrap'
  },
  icon: {
    width: "6em",
    height: "6em"
  },
  infoDisplayGrid: {
    height: "41vh",
    width:"90%",
    marginLeft:"5px",
    marginRight:"5px",
    marginTop:"5px",
    marginBottom:"5px",
    display: "flex",
    justifyItems: "center"
  },
  helpIcon: {
    width: "60px"
  },
  completeGrid: {
    marginTop: "5px",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "10px",
    alignContent: "flex-end",
    display: "flex"
  },
  gridTopMargin: {
    marginTop: "5px"
  },
  resultsButtons: {
    marginRight: '0.5em',
    marginLeft: '0.5em',
    width: '100%'
  },
  viewButtons: {
    minWidth: 150,
    fontFamily: "Arimo",
    width: '20vw'
  },
  viewButtonsSelected: {
    minWidth: 150,
    color: "#fff",
    fontFamily: "Arimo",
    width: '20vw'
  },
  button: {
    paddingTop: '1em',
    paddingBottom: '1em',
    width: '100%'
  },
  grid: {
    direction: 'column'
  },
  // ipad portait
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    grid: {
      direction: 'row'
    },
    card: {
      marginBottom: 0
    },
    resultsButtons: {
      width: 'auto'
    }
  }
};

interface Style {
  card: string,
  icon: string,
  infoDisplayGrid: string,
  helpIcon: string,
  completeGrid: string,
  gridTopMargin: string,
  resultsButtons: string,
  viewButtons: string,
  viewButtonsSelected: string,
  grid: string,
  button: string
}

interface Props {
  // magic8: string,
  // changeTeacher(teacher: string): void,
  classes: Style,
  viewClick(name: string): void
  view: string,
  // viewClick(name: string): void,
  // sessionId: string,
  // conferencePlanId?: string,
  // addNoteToPlan(conferencePlanId: string, note: string): void,
  // changeSessionId(event: React.SyntheticEvent): void,
  // sessionDates: Array<{id: string, sessionStart: {value: string}}>,
  // notes: Array<{content: string, timestamp: string}>,
  // handleOpenNotes(): void,
  // handleCloseNotes(): void,
  // notesModal: boolean,
  // teacherSelected: Types.Teacher,
  // teacherList: Array<Types.Teacher>
}

interface State {
  auth: boolean,
  icon: string,
  lookForsIcon: string,
  notesIcon: string,
  theme: Theme,
  help: boolean
}

/**
 * formatting and functionality for dashboard on training screens
 * @class TrainingDashboard
 */
class TrainingDashboard extends React.Component<Props, State> {
  /**
   * @param {Props} props 
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      auth: true,
      icon: null,
      lookForsIcon: null,
      notesIcon: null,
      theme: null,
      help: false
    }
  }

  handleCloseHelp = (): void => {
    this.setState({ help: false });
  };

  static propTypes = {
    // magic8: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    viewClick: PropTypes.func.isRequired,
    // changeSessionId: PropTypes.func.isRequired,
    // sessionId: PropTypes.string.isRequired,
    // sessionDates: PropTypes.array.isRequired,
    // conferencePlanId: PropTypes.string,
    // addNoteToPlan: PropTypes.func.isRequired,
    classes: PropTypes.exact({
      card: PropTypes.string,
      icon: PropTypes.string,
      infoDisplayGrid: PropTypes.string,
      helpIcon: PropTypes.string,
      completeGrid: PropTypes.string,
      gridTopMargin: PropTypes.string,
      resultsButtons: PropTypes.string,
      viewButtons: PropTypes.string,
      viewButtonsSelected: PropTypes.string,
      grid: PropTypes.string,
      button: PropTypes.string
    }).isRequired,
    // notes: PropTypes.array.isRequired,
    // changeTeacher: PropTypes.func.isRequired,
   /*  teacherSelected: PropTypes.exact({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      notes: PropTypes.string,
      id: PropTypes.string,
      phone: PropTypes.string,
      role: PropTypes.string,
      school: PropTypes.string
    }).isRequired, */
    // teacherList: PropTypes.array.isRequired,
    // notesModal: PropTypes.bool.isRequired,
    // handleOpenNotes: PropTypes.func.isRequired,
    // handleCloseNotes: PropTypes.func.isRequired
  }

  /**
   * render function
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    const { classes } = this.props;
    return(
      <div style={{width: '100%'}}>
        <Card className={classes.card}>
          <Grid
            container
            justify="space-evenly"
            alignItems="center"
            className={classes.grid}
          >
            <Grid item className={classes.resultsButtons}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item className={classes.button}>
                  <MuiThemeProvider theme={AppBarTheme}>
                    <Button
                      size="large"
                      color="primary"
                      variant={
                        this.props.view === 'observe'
                          ? "contained"
                          : "outlined"
                      }
                      className={this.props.view === 'observe' ? classes.viewButtonsSelected : classes.viewButtons}
                      onClick={(): void => this.props.viewClick('observe')}
                      style={{width: '100%'}}
                    >
                      Observation
                    </Button>
                  </MuiThemeProvider>
                </Grid>
                <Grid item className={classes.button}>
                  <MuiThemeProvider theme={AppBarTheme}>
                    <Button
                      size="large"
                      color="primary"
                      variant={
                        this.props.view === 'navigation'
                          ? "contained"
                          : "outlined"
                      }
                      className={this.props.view === 'navigation' ? classes.viewButtonsSelected : classes.viewButtons}
                      onClick={(): void => this.props.viewClick('navigation')}
                      style={{width: '100%'}}
                    >
                      Navigation
                    </Button>
                  </MuiThemeProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item className={classes.button}>
                  <MuiThemeProvider theme={AppBarTheme}>
                    <Button
                      size="large"
                      color="primary"
                      variant={
                        this.props.view === 'results'
                          ? "contained"
                          : "outlined"
                      }
                      className={this.props.view === 'results' ? classes.viewButtonsSelected : classes.viewButtons}
                      onClick={(): void => this.props.viewClick('results')}
                      style={{width: '100%'}}
                    >
                      Results
                    </Button>
                  </MuiThemeProvider>
                </Grid>
                <Grid item className={classes.button}>
                  <MuiThemeProvider theme={AppBarTheme}>
                    <Button
                      size="large"
                      color="primary"
                      variant={
                        this.props.view === 'conferencePlan'
                          ? "contained"
                          : "outlined"
                      }
                      className={this.props.view === 'conferencePlan' ? classes.viewButtonsSelected : classes.viewButtons}
                      onClick={(): void => this.props.viewClick('conferencePlan')}
                      style={{width: '100%'}}
                    >
                      Conference Plan
                    </Button>
                  </MuiThemeProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Grid item className={classes.button}>
                  <MuiThemeProvider theme={AppBarTheme}>
                    <Button
                      size="large"
                      color="primary"
                      variant={
                        this.props.view === 'actionPlan'
                          ? "contained"
                          : "outlined"
                      }
                      className={this.props.view === 'actionPlan' ? classes.viewButtonsSelected : classes.viewButtons}
                      onClick={(): void => this.props.viewClick('actionPlan')}
                      style={{width: '100%'}}
                    >
                      Action Plan
                    </Button>
                  </MuiThemeProvider>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(TrainingDashboard);