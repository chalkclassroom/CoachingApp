import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles/index";
import AppBar from "../../../components/AppBar";
import FirebaseContext from "../../../components/Firebase/context";
import TransitionTimeIcon from "../../../assets/icons/TransitionTime.svg";
import 'chartjs-plugin-datalabels';
import TrainingVideo
    from "../../../components/Shared/TrainingVideo";
import ChildTeacherBehaviorTrendsSlider
    from "../../../components/AssociativeCooperativeComponents/ResultsComponents/ChildTeacherBehaviorTrendsSlider";
import TrainingQuestionnaire from "../../../components/Shared/TrainingQuestionnaire";
import TrainingDashboard from '../../../components/Shared/TrainingDashboard';
import TransitionHelpCard from '../../../components/TransitionComponents/TransitionHelpCard';
import Button from '@material-ui/core/Button';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';


const styles = () => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'stretch',
    overflowX: 'hidden',
    overflowY: 'scroll',
    margin: '0',
    padding: '0'
  },
  titleContainer: {
    width: '100%',
    margin: '0',
    padding: '0',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  backButton: {
    color: '#333333',
    borderRadius: 3,
    textTransform: 'none'
  },
  main: {
    height: 'auto',
    flexGrow: 1,
    display: 'grid',
    gridTemplateRows: '100%',
    gridTemplateColumns: '25% 75%',
    margin: '2% 5% 2% 5%'
  },
  trainingContentCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: '0% 4% 3% 4%',
    overflowY: 'scroll',
    overflowX: 'hidden'
  },

  // iPad Pro 12.9" Landscape
  '@media only screen and (max-width:1366px) and (min-height:800px) and (orientation:landscape)': {
    root: {
      fontSize: '1.5em'
    },
    main: {
      margin: '8% 2% 2% 2%'
    }
  },

  // iPad Pro 12.9" Portrait
  '@media only screen and (max-width:1024px) and (orientation:portrait)': {
    main: {
      height: '100%',
      margin: '2%',
      display: 'flex',
      flexDirection: 'column'
    },
    dashboardContainer: {
      boxShadow: '1px 1px 3px #8C8D91'
    },
    trainingContentCard: {
      flexGrow: 1,
      margin: '5% 0% 2% 0%',
      padding: '8% 2% 3% 2%',
      justifyContent: 'flex-start',
      borderTop: '2px solid #FFA726'
    }
  },

  // iPad-Mini Landscape
  '@media only screen and (max-width:1024px) and (orientation:landscape)': {
    main: {
      margin: '2%'
    }
  },

  // Minor Breakpoint - 900px height
  '@media only screen and (max-width:1024px) and (min-height:900px) and (orientation:portrait)': {
    root: {
      fontSize: '1.5em'
    }
  },

  // Minor Breakpoint - 920px width
  '@media only screen and (max-width:920px) and (orientation:landscape)': {
    main: {
      height: '100%',
      margin: '0% 2% 0% 2%',
      display: 'flex',
      flexDirection: 'column'
    },
    dashboardContainer: {
      boxShadow: '1px 1px 3px #8C8D91'
    },
    trainingContentCard: {
      flexGrow: 1,
      margin: '3% 0% 2% 0%',
      padding: '5% 2% 3% 2%',
      justifyContent: 'flex-start',
      borderTop: '2px solid #FFA726'
    }
  },

  // Mobile Landscape
  '@media only screen and (max-width:600px) and (orientation:landscape)': {
    root: {
      fontSize: '0.7em'
    }
  }
});

const ViewEnum = {
  CONCEPTS: 1,
  DEFINITIONS: 2,
  EXAMPLE: 3,
  DEMONSTRATION: 4,
  TRYIT: 5,
  KNOWLEDGECHECK: 6
};

class TransitionTimeTrainingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: ViewEnum.CONCEPTS
    };
  }

  conceptsClick = () => {
    if (this.state.view !== ViewEnum.CONCEPTS) {
      this.setState({view: ViewEnum.CONCEPTS})
    }
  }

  definitionsClick = () => {
    if (this.state.view !== ViewEnum.DEFINITIONS) {
      this.setState({view: ViewEnum.DEFINITIONS})
    }
  }

  exampleClick = () => {
    if (this.state.view !== ViewEnum.EXAMPLE) {
      this.setState({view: ViewEnum.EXAMPLE})
    }
  }

  demonstrationClick = () => {
    if (this.state.view !== ViewEnum.DEMONSTRATION) {
      this.setState({view: ViewEnum.DEMONSTRATION})
    }
  }

  tryItClick = () => {
    if (this.state.view !== ViewEnum.TRYIT) {
      this.setState({view: ViewEnum.TRYIT})
    }
  }

  knowledgeCheckClick = () => {
    if (this.state.view !== ViewEnum.KNOWLEDGECHECK) {
      this.setState({view: ViewEnum.KNOWLEDGECHECK})
    }
  }

  render() {
    const { classes } = this.props;
    const { view } = this.state;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase}/>}
        </FirebaseContext.Consumer>
        <div className={classes.titleContainer}>
        <Button variant="contained" size="medium" className={classes.backButton}
                  onClick={() => {
                    if (this.props.location.state !== undefined) { // came from MyTeachers
                      this.props.history.goBack();
                    } else {
                      this.props.history.replace({
                        pathname: "/Magic8Menu",
                        state: {type: "Training"}
                      })
                    }
                  }}>
            <ChevronLeftRoundedIcon />
            <b>Training Home</b>
          </Button>
          <h1 style={{ justifySelf: 'center' }}>Training Tool</h1>
          <Button variant='contained' size='medium' className={classes.backButton} onClick={null} style={{ visibility:'hidden' }}>
            <ChevronLeftRoundedIcon />
            <b>Training Home</b>
          </Button>
        </div>
        <div className={classes.main}>
          <div className={classes.dashboardContainer}>
            <TrainingDashboard
              ViewEnum={ViewEnum}
              view={view}
              Icon={TransitionTimeIcon}
              conceptsClick={this.conceptsClick}
              definitionsClick={this.definitionsClick}
              exampleClick={this.exampleClick}
              demonstrationClick={this.demonstrationClick}
              tryItClick={this.tryItClick}
              knowledgeCheckClick={this.knowledgeCheckClick}
            />
          </div>
          <div className={classes.trainingContentCard}>
            {view === ViewEnum.CONCEPTS ? 
              <TrainingVideo
                videoUrl={'https://firebasestorage.googleapis.com/v0/b/cqrefpwa.appspot.com/o/TT%20Concepts%205-31-19.mp4?alt=media&token=0f968fb5-047a-4fb9-90ec-7149b40a3e9c'} />
            : view === ViewEnum.DEFINITIONS ?
              <TransitionHelpCard />
            : view === ViewEnum.EXAMPLE ? 
              <div>EXAMPLE</div>
            : view === ViewEnum.DEMONSTRATION ? 
              <ChildTeacherBehaviorTrendsSlider/>
            : view === ViewEnum.TRYIT ? 
              <div>TRY IT</div>
            : view === ViewEnum.KNOWLEDGECHECK ? (
              <TrainingQuestionnaire section={'transition'}/>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

TransitionTimeTrainingPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransitionTimeTrainingPage);