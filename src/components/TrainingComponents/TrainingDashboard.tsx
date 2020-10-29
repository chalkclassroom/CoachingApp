import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { Button, Card, Grid } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';
// import * as Types from '../../constants/Types';

const AppBarTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.AppBar
    }
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
  helpIcon: {
    width: "60px"
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
    fontFamily: "Arimo",
    width: '100%'
  },
  viewButtonsSelected: {
    color: "#fff",
    fontFamily: "Arimo",
    width: '100%'
  },
  item: {
    paddingTop: '1em',
    paddingBottom: '1em',
    width: '100%',
    marginRight: '0.5em',
    marginLeft: '0.5em',
  },
  button: {
    width: '100%'
  },
  grid: {
    direction: 'column'
  },
  // ipad portait
  '@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait)': {
    grid: {
      direction: 'row',
      paddingTop: '1em',
      paddingBottom: '1em'
    },
    item: {
      width: 'auto'
    },
    card: {
      marginBottom: 0,
      width: "94%",
      marginRight: "3%",
      marginLeft: "3%",
    },
    resultsButtons: {
      width: 'auto'
    }
  }
};

interface Style {
  card: string,
  icon: string,
  helpIcon: string,
  gridTopMargin: string,
  resultsButtons: string,
  viewButtons: string,
  viewButtonsSelected: string,
  grid: string,
  item: string,
  button: string
}

interface Props {
  classes: Style,
  viewClick(name: string): void
  view: string
}

interface State {
  auth: boolean,
  icon: string,
  lookForsIcon: string,
  notesIcon: string,
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
      icon: '',
      lookForsIcon: '',
      notesIcon: '',
      help: false
    }
  }

  handleCloseHelp = (): void => {
    this.setState({ help: false });
  };

  static propTypes = {
    view: PropTypes.string.isRequired,
    viewClick: PropTypes.func.isRequired,
    classes: PropTypes.exact({
      card: PropTypes.string,
      icon: PropTypes.string,
      helpIcon: PropTypes.string,
      gridTopMargin: PropTypes.string,
      resultsButtons: PropTypes.string,
      viewButtons: PropTypes.string,
      viewButtonsSelected: PropTypes.string,
      grid: PropTypes.string,
      item: PropTypes.string,
      button: PropTypes.string
    }).isRequired
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
            <Grid item className={classes.item}>
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
                >
                  Observation
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item className={classes.item}>
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
                >
                  Results
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item className={classes.item}>
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
                >
                  Conference Plan
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item className={classes.item}>
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
                >
                  Action Plan
                </Button>
              </MuiThemeProvider>
            </Grid>
            <Grid item className={classes.item}>
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
                >
                  Navigation
                </Button>
              </MuiThemeProvider>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(TrainingDashboard);