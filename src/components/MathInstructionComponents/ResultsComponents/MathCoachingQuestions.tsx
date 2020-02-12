import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataQuestions from '../../ResultsComponents/DataQuestions';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as Constants from '../../../constants';

const MathTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.MathColor
    }
  }
});


interface State {
  categoryView: string,
  openPanel: string,
  addedToPrep: Array<string>
}

/**
 * data reflection question layout for math
 * @class MathCoachingQuestions
 */
class MathCoachingQuestions extends React.Component<{}, State> {
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

  countingClick = (): void => {
    if (this.state.categoryView !== "counting") {
      this.setState({
        categoryView: "counting",
        openPanel: null
      })
    }
  }

  measurementClick = (): void => {
    if (this.state.categoryView !== "measurement") {
      this.setState({
        categoryView: "measurement",
        openPanel: null
      })
    }
  }
  patternsClick = (): void => {
    if (this.state.categoryView !== "patterns") {
      this.setState({
        categoryView: "patterns",
        openPanel: null
      })
    }
  }
  shapesClick = (): void => {
    if (this.state.categoryView !== "shapes") {
      this.setState({
        categoryView: "shapes",
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
            <MuiThemeProvider theme={MathTheme}>
              <Button 
                onClick={this.countingClick}
                variant="contained"
                color="primary"
                style={{width:'8em', height: '8em'}}
              >
                <Typography>
                  Counting and Numbers
                </Typography>
              </Button >
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={MathTheme}>
              <Button
                onClick={this.measurementClick}
                variant="contained"
                color="primary"
                style={{width:'8em', height: '8em'}}
              >
                <Typography style={{color: 'black'}}>
                  Measurement and Data
                </Typography>
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={MathTheme}>
              <Button
                onClick={this.patternsClick}
                variant="contained"
                color="primary"
                style={{width:'8em', height: '8em'}}
              >
                <Typography style={{color: 'black'}}>
                  Patterns
                </Typography>
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={MathTheme}>
              <Button
                onClick={this.shapesClick}
                variant="contained"
                color="primary"
                style={{width:'8em', height: '8em'}}
              >
                <Typography style={{color: 'black'}}>
                  Shapes and Spatial Reasoning
                </Typography>
              </Button>
            </MuiThemeProvider>
          </Grid>
          <Grid item>
            <MuiThemeProvider theme={MathTheme}>
              <Button
                onClick={this.teacherSupportClick}
                variant="contained"
                color="primary"
                style={{width:'8em', height: '8em'}}
              >
                <Typography>
                  Teacher Support for Math
                </Typography>
              </Button>
            </MuiThemeProvider>
          </Grid>
        </Grid>
        <Grid container direction="column" style={{marginTop: "1vh"}}>
          {this.state.categoryView === "counting" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Math.CountingAndNumbers}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.MathColor}
            />
          ) : this.state.categoryView === "measurement" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Math.MeasurementAndData}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.MathColor}
            />
          ) : this.state.categoryView === "patterns" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Math.Patterns}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.MathColor}
            />
          ) : this.state.categoryView === "shapes" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Math.ShapesAndSpatialReasoning}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.MathColor}
            />
          ) : this.state.categoryView === "teacherSupport" ? (
            <DataQuestions
              questions={Constants.CoachingQuestions.Math.TeacherSupport}
              openPanel={this.state.openPanel}
              handlePanelChange={this.handlePanelChange}
              addedToPrep={this.state.addedToPrep}
              handleAddToPlan={this.handleAddToPlan}
              color={Constants.MathColor}
            />
          ) : <div/>}
        </Grid>
      </Grid>
    );
  }
}

export default MathCoachingQuestions;