import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataQuestions from '../../ResultsComponents/DataQuestions';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as Constants from '../../../constants/Constants';

const MathTheme = createMuiTheme({
  palette: {
    primary: {
      main: Constants.Colors.MI
    }
  },
  typography: {
    useNextVariants: true
  }
});

interface Props {
  handleAddToPlan(panelTitle: string, index: number, question: string, sessionId: string, teacherId: string, magic8: string): void,
  addedToPlan: Array<{panel: string, number: number, question: string}>,
  sessionId: string
  teacherId: string
}

interface State {
  categoryView: string,
  openPanel: string
}

/**
 * data reflection question layout for math
 * @class MathCoachingQuestions
 */
class MathCoachingQuestions extends React.Component<Props, State> {
  /**
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      categoryView: '',
      openPanel: ''
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
   * @return {ReactNode}
   */
  render(): React.ReactNode {
    return(
      <Grid container direction="column">
        <Grid item>
          <Grid container direction="row" justify="space-around" alignItems="center" style={{marginTop: "1vh"}}>
            <Grid item>
              <MuiThemeProvider theme={MathTheme}>
                <Button 
                  onClick={this.countingClick}
                  variant="contained"
                  color="primary"
                  style={{width:'8em', height: '8em'}}
                >
                  <Typography style={{color: 'white'}}>
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
                  <Typography style={{color: 'white'}}>
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
                  <Typography style={{color: 'white'}}>
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
                  <Typography style={{color: 'white'}}>
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
                  <Typography style={{color: 'white'}}>
                    Teacher Support for Math
                  </Typography>
                </Button>
              </MuiThemeProvider>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" style={{marginTop: "1vh"}}>
            {this.state.categoryView === "counting" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Math.CountingAndNumbers}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Math Instruction"}
                color={Constants.Colors.MI}
              />
            ) : this.state.categoryView === "measurement" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Math.MeasurementAndData}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Math Instruction"}
                color={Constants.Colors.MI}
              />
            ) : this.state.categoryView === "patterns" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Math.Patterns}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Math Instruction"}
                color={Constants.Colors.MI}
              />
            ) : this.state.categoryView === "shapes" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Math.ShapesAndSpatialReasoning}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Math Instruction"}
                color={Constants.Colors.MI}
              />
            ) : this.state.categoryView === "teacherSupport" ? (
              <DataQuestions
                questions={Constants.CoachingQuestions.Math.TeacherSupport}
                openPanel={this.state.openPanel}
                handlePanelChange={this.handlePanelChange}
                addedToPlan={this.props.addedToPlan}
                handleAddToPlan={this.props.handleAddToPlan}
                sessionId={this.props.sessionId}
                teacherId={this.props.teacherId}
                magic8={"Math Instruction"}
                color={Constants.Colors.MI}
              />
            ) : <div/>}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default MathCoachingQuestions;