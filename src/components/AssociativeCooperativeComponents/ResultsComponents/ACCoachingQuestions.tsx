import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataQuestions from '../../ResultsComponents/DataQuestions';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as Constants from '../../../constants';

const AssociativeTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#c5afe7"
    }
  }
});

const CooperativeTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.ACColor
    }
  }
});

interface State {
  categoryView: string,
  openPanel: string,
  addedToPrep: Array<string>
}

/**
 * data reflection question layout for associative & cooperative
 * @class ACCoachingQuestions
 */
class ACCoachingQuestions extends React.Component<{}, State> {
  /**
   * @param {null} null
   */
  constructor({}) {
    super({});

    this.state = {
      categoryView: '',
      openPanel: '',
      addedToPrep: []
    }
  }

  associativeClick = (): void => {
    if (this.state.categoryView !== "associative") {
      this.setState({
        categoryView: "associative",
        openPanel: null
      })
    }
  }

  cooperativeClick = (): void => {
    if (this.state.categoryView !== "cooperative") {
      this.setState({
        categoryView: "cooperative",
        openPanel: null
      })
    }
  }

  teacherParticipationClick = (): void => {
    if (this.state.categoryView !== "teacherParticipation") {
      this.setState({
        categoryView: "teacherParticipation",
        openPanel: null
      })
    }
  }

  teacherSupportClick = (): void => {
    if (this.state.categoryView !== "teacherSupport") {
      this.setState({
        categoryView: "teacherSupport",
        openPanel: null
      })
    }
  }

  /**
   * @param {string} panel
   */
  handlePanelChange = (panel: string): void => {
    if (this.state.openPanel === panel) {
      this.setState({ openPanel: '' });
    } else {
      this.setState({ openPanel: panel });
    }
  };

  /**
   * @param {string} panel
   */
  handleAddToPlan = (panel: string): void => {
    if (!this.state.addedToPrep.includes(panel)) {
      this.setState({ addedToPrep: [...this.state.addedToPrep, panel] });
    }
  };

  /**
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return(
      <Grid container direction="column">
        <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "1vh"}}>
          <Grid item>
            <MuiThemeProvider theme={AssociativeTheme}>
              <Button 
                onClick={this.associativeClick}
                variant="contained"
                color="primary"
                style={{width:'10em', height: '10em'}}
              >
                <Typography>
                  Associative Interactions
                </Typography>
              </Button >
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={CooperativeTheme}>
              <Button
                onClick={this.cooperativeClick}
                variant="contained"
                color="primary"
                style={{width:'10em', height: '10em'}}
              >
                <Typography style={{color: 'white'}}>
                  Cooperative Interactions
                </Typography>
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <Button
              onClick={this.teacherParticipationClick}
              variant="contained"
              style={{width:'10em', height: '10em'}}
            >
              <Typography>
                Teacher Participation in Activities
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={this.teacherSupportClick}
              variant="contained"
              style={{width:'10em', height: '10em'}}
            >
              <Typography>
                Teacher Support for Child Interactions
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container direction="column" style={{marginTop: "1vh"}}>
          {this.state.categoryView === "associative" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.AC.Associative}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.ACColor}
            />
          ) : this.state.categoryView === "cooperative" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.AC.Cooperative}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.ACColor}
            />
          ) : this.state.categoryView === "teacherParticipation" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.AC.TeacherParticipation}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.ACColor}
            />
          ) : this.state.categoryView === "teacherSupport" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.AC.TeacherSupport}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.ACColor}
            />
          ) : <div/>}
        </Grid>
      </Grid>
    );
  }
}

export default ACCoachingQuestions;