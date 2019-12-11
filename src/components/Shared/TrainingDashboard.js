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
    justifyContent: 'center'
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

  // iPad Pro 10.5" Portrait
  '@media only screen and (max-width:834px) and (orientation:portrait)': {
    viewButtons: {
      maxWidth: '395px'
    }
  },

  // iPad-Mini Portrait
  '@media only screen and (max-width:768px) and (orientation:portrait)': {
    viewButtons: {
      maxWidth: '240px'
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
