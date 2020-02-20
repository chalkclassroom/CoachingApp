import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button/Button";
import ListItem from "@material-ui/core/ListItem/index";
import { withStyles } from '@material-ui/core/styles';

const styles = {
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
    flexDirection: 'column'
  },

  // iPad Pro 12.9" Portrait
  '@media only screen and (max-width:1024px) and (orientation:portrait)': {
    buttonsListContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    iconContainer: {
      display: 'none'
    },
    viewButtons: {
      minWidth: '240px',
      maxWidth: '325px'
    }
  },

  //iPad Pro 10.5" Landscape
  '@media only screen and (max-width:1112px) and (orientation:landscape)': {
    container: {
      fontSize: '0.7em'
    }
  },

  // iPad Pro 10.5" Portrait
  '@media only screen and (max-width:834px) and (orientation:portrait)': {
    viewButtons: {
      maxWidth: '395px'
    }
  },

  //iPad-Mini Landscape
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
    viewButtons: {
      maxWidth: '240px'
    }
  },

  // Minor Breakpoint - 920px width
  '@media only screen and (max-width:920px) and (orientation:landscape)': {
    buttonsListContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    iconContainer: {
      display: 'none'
    },
    viewButtons: {
      maxWidth: '250px'
    }
  },

  // Mobile Landscape
  '@media only screen and (max-width:600px)': {
    container: {
      fontSize: '0.8em'
    },
    viewButtons: {
      maxWidth: '180px'
    }
  }
};

function TrainingDashboard(props) {

  const {
    classes,
    ViewEnum,
    view,
    Icon,
    conceptsClick,
    definitionsClick,
    exampleClick,
    demonstrationClick,
    tryItClick,
    knowledgeCheckClick
  } = props;
  const { container, buttonsListContainer, iconContainer, viewButtons } = classes;

  return (
    <div className={container}>
      <ListItem className={iconContainer}>
        <img src={Icon} width={"100px"} alt="Magic Eight" />
      </ListItem>
      <div className={buttonsListContainer}>
        <ListItem className={viewButtons}>
          <Button
            size="large"
            color={"primary"}
            fullWidth={true}
            variant={view === ViewEnum.CONCEPTS ? "contained" : "outlined"}
            onClick={conceptsClick}
            style={{ fontSize:'1em' }} // necessary to responsively change font sizes w/ media queries
          >
            CONCEPTS
          </Button>
        </ListItem>
        <ListItem className={viewButtons}>
          <Button
            size="large"
            color={"primary"}
            fullWidth={true}
            variant={view === ViewEnum.DEFINITIONS ? "contained" : "outlined"}
            onClick={definitionsClick}
            style={{ fontSize:'1em' }}
          >
            DEFINITIONS
          </Button>
        </ListItem>
        <ListItem className={viewButtons}>
          <Button
            size="large"
            color={"primary"}
            fullWidth={true}
            variant={view === ViewEnum.EXAMPLE ? "contained" : "outlined"}
            onClick={exampleClick}
            style={{ fontSize:'1em' }}
            disabled
          >
            EXAMPLE
          </Button>
        </ListItem>
        <ListItem className={viewButtons}>
          <Button
            size="large"
            color={"primary"}
            fullWidth={true}
            variant={view === ViewEnum.DEMONSTRATION ? "contained" : "outlined"}
            onClick={demonstrationClick}
            style={{ fontSize:'1em' }}
          >
            DEMONSTRATION
          </Button>
        </ListItem>
        <ListItem className={viewButtons}>
          <Button
            size="large"
            color={"primary"}
            fullWidth={true}
            variant={view === ViewEnum.TRYIT ? "contained" : "outlined"}
            onClick={tryItClick}
            style={{ fontSize:'1em' }}
            disabled
          >
            TRY IT YOURSELF
          </Button>
        </ListItem>
        <ListItem className={viewButtons}>
          <Button
            size="large"
            color={"primary"}
            fullWidth={true}
            variant={view === ViewEnum.KNOWLEDGECHECK ? "contained" : "outlined"}
            onClick={knowledgeCheckClick}
            style={{ fontSize:'1em' }}
          >
            KNOWLEDGE CHECK
          </Button>
        </ListItem>
      </div>
    </div>
  );
}

TrainingDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  ViewEnum: PropTypes.object.isRequired,
  view: PropTypes.number.isRequired,
  Icon: PropTypes.object.isRequired,
  conceptsClick: PropTypes.func.isRequired,
  definitionsClick: PropTypes.func.isRequired,
  exampleClick: PropTypes.func.isRequired,
  demonstrationClick: PropTypes.func.isRequired,
  tryItClick: PropTypes.func.isRequired,
  knowledgeCheckClick: PropTypes.func.isRequired
};

export default withStyles(styles)(TrainingDashboard);
