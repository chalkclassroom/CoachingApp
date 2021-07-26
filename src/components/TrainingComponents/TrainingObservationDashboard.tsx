import * as React from "react";
import * as PropTypes from "prop-types";
import { Button, Card, ListItem, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, Theme } from '@material-ui/core/styles';
import * as Constants from '../../constants/Constants';

const styles: object = {
  card: {
    border: '3px solid #d9d9d9',
    borderRadius: 10,
    backgroundColor: '#fff',
    height: '100%',
    boxShadow: '5px',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justify: 'space-evenly',
    display: 'flex',
    flex: '1',
    flexWrap: 'nowrap'
  },
  container: {
    minWidth: '240px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '1em'
  },
  iconContainer: {
    display: 'flex',
    flexDireciton: 'column',
    justifyContent: 'center'
  },
  buttonsListContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  // iPad Pro 12.9" Portrait
  '@media only screen and (max-width:1024px) and (orientation:portrait)': {
    iconContainer: {
      display: 'none'
    },
    card: {
      border: '3px solid #d9d9d9',
      borderRadius: 10,
      backgroundColor: '#fff',
      height: '100%',
      boxShadow: '5px',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justify: 'space-evenly',
      display: 'flex',
      flex: '1',
      flexWrap: 'nowrap'
    },
  },

  // iPad Pro 10.5" Landscape
  '@media only screen and (max-width:1112px) and (orientation:landscape)': {
    container: {
      fontSize: '0.7em'
    }
  },

  // iPad Pro 10.5" Portrait
  '@media only screen and (max-width:834px) and (orientation:portrait)': {
    card: {
      border: '3px solid #d9d9d9',
      borderRadius: 10,
      backgroundColor: '#fff',
      height: '100%',
      boxShadow: '5px',
      width: '35%',
      flexDirection: 'column',
      alignItems: 'center',
      justify: 'space-evenly',
      display: 'flex',
      flex: '1',
      flexWrap: 'nowrap'
    },
  },

  // iPad-Mini Landscape
  '@media only screen and (max-width:1024px) and (orientation:landscape)': {
    container: {
      fontSize: '0.9em'
    }
  },

  // iPad-Mini Portrait
  '@media only screen and (max-width:768px) and (orientation:portrait)': {
    container: {
      fontSize: '0.6em'
    },
    card: {
      border: '3px solid #d9d9d9',
      borderRadius: 10,
      backgroundColor: '#fff',
      height: '100%',
      boxShadow: '5px',
      width: '30%',
      flexDirection: 'column',
      alignItems: 'center',
      justify: 'space-evenly',
      display: 'flex',
      flex: '1',
      flexWrap: 'nowrap'
    },
  },

  // Minor Breakpoint - 920px width
  '@media only screen and (max-width:920px) and (orientation:landscape)': {
    iconContainer: {
      display: 'none'
    },
  },

  // Mobile Landscape
  '@media only screen and (max-width:600px)': {
    container: {
      fontSize: '0.8em'
    },
  }
};

interface Props {
  classes: {
    container: string,
    card: string,
    iconContainer: string,
    buttonsListContainer: string
  },
  ViewEnum: {
    CONCEPTS: number,
    DEFINITIONS: number,
    DEMONSTRATION: number,
    KNOWLEDGECHECK: number
  },
  view: number,
  Icon: string,
  conceptsClick(): void,
  definitionsClick(): void,
  demonstrationClick(): void,
  knowledgeCheckClick(): void,
  colorTheme: Theme,
  literacyType: Constants.LiteracyTypes
}

/**
 * dashboard for all training pages
 * @param {Props} props
 * @return {ReactElement}
 */
function TrainingDashboard(props: Props): React.ReactElement {
  const {
    classes,
    ViewEnum,
    view,
    Icon,
    conceptsClick,
    definitionsClick,
    demonstrationClick,
    knowledgeCheckClick,
    colorTheme,
    literacyType
  } = props;
  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <ListItem className={classes.iconContainer}>
          <img src={Icon} width={"100px"} alt="Magic Eight" />
        </ListItem>
        <Typography>
          {literacyType === Constants.LiteracyTypes.FOUNDATIONAL ? 'Foundational Skills'
            : literacyType === Constants.LiteracyTypes.WRITING ? 'Writing'
            : literacyType === Constants.LiteracyTypes.READING ? 'Book Reading'
            : literacyType === Constants.LiteracyTypes.LANGUAGE ? 'Language Environment'
            : null
          }
        </Typography>
        <div className={classes.buttonsListContainer} style={{width:'90%'}}>
          <ListItem>
            <MuiThemeProvider theme={colorTheme}>
              <Button
                size="large"
                color={"primary"}
                fullWidth={true}
                variant={view === ViewEnum.CONCEPTS ? "contained" : "outlined"}
                onClick={conceptsClick}
                style={{ fontSize: '1em' }} // necessary to responsively change font sizes w/ media queries
              >
                CONCEPTS
              </Button>
            </MuiThemeProvider>
          </ListItem>
          <ListItem>
            <MuiThemeProvider theme={colorTheme}>
              <Button
                size="large"
                color={"primary"}
                fullWidth={true}
                variant={view === ViewEnum.DEFINITIONS ? "contained" : "outlined"}
                onClick={definitionsClick}
                style={{ fontSize: '1em' }}
              >
                DEFINITIONS
              </Button>
            </MuiThemeProvider>
          </ListItem>
          <ListItem>
            <MuiThemeProvider theme={colorTheme}>
              <Button
                size="large"
                color={"primary"}
                fullWidth={true}
                variant={view === ViewEnum.DEMONSTRATION ? "contained" : "outlined"}
                onClick={demonstrationClick}
                style={{ fontSize: '1em' }}
              >
                DEMONSTRATION
              </Button>
            </MuiThemeProvider>
          </ListItem>
          <ListItem>
            <MuiThemeProvider theme={colorTheme}>
              <Button
                size="large"
                color={"primary"}
                fullWidth={true}
                variant={view === ViewEnum.KNOWLEDGECHECK ? "contained" : "outlined"}
                onClick={knowledgeCheckClick}
                style={{ fontSize: '1em' }}
              >
                KNOWLEDGE CHECK
              </Button>
            </MuiThemeProvider>
          </ListItem>
        </div>
      </Card>
    </div>
  );
}

TrainingDashboard.propTypes = {
  classes: PropTypes.exact({
    container: PropTypes.string,
    card: PropTypes.string,
    iconContainer: PropTypes.string,
    buttonsListContainer: PropTypes.string
  }).isRequired,
  ViewEnum: PropTypes.exact({
    CONCEPTS: PropTypes.number,
    DEFINITIONS: PropTypes.number,
    DEMONSTRATION: PropTypes.number,
    KNOWLEDGECHECK: PropTypes.number
  }).isRequired,
  view: PropTypes.number.isRequired,
  Icon: PropTypes.string.isRequired,
  conceptsClick: PropTypes.func.isRequired,
  definitionsClick: PropTypes.func.isRequired,
  demonstrationClick: PropTypes.func.isRequired,
  knowledgeCheckClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(TrainingDashboard);