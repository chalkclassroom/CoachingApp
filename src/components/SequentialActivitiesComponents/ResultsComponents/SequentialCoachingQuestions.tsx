import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataQuestions from '../../ResultsComponents/DataQuestions';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as Constants from '../../../constants';

const SequentialTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.SequentialColor
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
 * @class SequentialCoachingQuestions
 */
class SequentialCoachingQuestions extends React.Component<{}, State> {
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

  drawingWritingClick = (): void => {
    if (this.state.categoryView !== "drawingAndWriting") {
      this.setState({
        categoryView: "drawingAndWriting",
        openPanel: null
      })
    }
  }

  gamesClick = (): void => {
    if (this.state.categoryView !== "games") {
      this.setState({
        categoryView: "games",
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
            <MuiThemeProvider theme={SequentialTheme}>
              <Button 
                onClick={this.drawingWritingClick}
                variant="contained"
                color="primary"
                style={{width:'10em', height: '10em'}}
              >
                <Typography>
                  Drawing and Writing
                </Typography>
              </Button >
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={SequentialTheme}>
              <Button
                onClick={this.gamesClick}
                variant="contained"
                color="primary"
                style={{width:'10em', height: '10em'}}
              >
                <Typography style={{color: 'black'}}>
                  Games and Pretend Play
                </Typography>
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={SequentialTheme}>
              <Button
                onClick={this.teacherSupportClick}
                variant="contained"
                color="primary"
                style={{width:'10em', height: '10em'}}
              >
                <Typography>
                  Teacher Support for Sequential Activities
                </Typography>
              </Button>
            </MuiThemeProvider>
          </Grid>
        </Grid>
        <Grid container direction="column" style={{marginTop: "1vh"}}>
          {this.state.categoryView === "drawingAndWriting" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Sequential.DrawingAndWriting}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.SequentialColor}
            />
          ) : this.state.categoryView === "games" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Sequential.GamesAndPretendPlay}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.SequentialColor}
            />
          ) : this.state.categoryView === "teacherSupport" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Sequential.TeacherSupport}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.SequentialColor}
            />
          ) : <div/>}
        </Grid>
      </Grid>
    );
  }
}

export default SequentialCoachingQuestions;